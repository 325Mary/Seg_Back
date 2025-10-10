const Documentos = require("../../models/Documento/Documento");
const estructuraApi = require("../../helpers/estructuraApi");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs-extra");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/docs");
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2000000,
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
exports.upload = upload.single("ruta"); //para evitar conflictos con la bd se pone el mismo campo que el de la base de datos
// exports.upload = this.upload.single('myFile')

exports.createDocument = async (req, res) => {
  let api = new estructuraApi(); //instanciar

  if (req.file != null || undefined) {
    const documento = req.body.documento;
    let file_path = req.file.path; //capturo la ruta del documento desde request file

    // WIN
    // let file_split = file_path.split("\\") //separo mi ruta con split donde tengan la similitud \\
    // let final_path = file_split[1] + "/" + file_split[2];

    // Linux
    let file_split = file_path.split("/")
    let final_path = file_split[1] + "/" + file_split[2];

    //justo la pocision uno y la dos para que se quede docs/laruta en vez de storage/docs/laruta esto
    //debido a que la carpeta storage aunque este publica solo se mostrara lo que este dentro de ella ose docs

    const newDocument = {
      documento,
      ruta: final_path,
    };
    // console.log(req.file);
    await Documentos.create(newDocument)
      .then((succ) => {
        api.setResultado(succ);
      })
      .catch((err) => {
        api.setEstado(err, "error", err);
      });
  } else {
    api.setEstado(
      "204",
      "error",
      "No seleccionaste ningun Archivo"
    );
  }
  return res.json(api.toResponse());
};

exports.seeDocuments = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const docs = await Documentos.findAll();
  if (docs.length > 0) {
    estructuraapi.setResultado(docs);
  } else {
    estructuraapi.setEstado(404, "error", "list docs not found");
  }
  res.json(estructuraapi.toResponse());
};

exports.seeDocument = async (req, res) => {
  let estructuraapi = new estructuraApi();

  const id_documento = req.params.id_documento;
  const seedoc = await Documentos.findOne({
    where: { id_documento: id_documento },
  });

  if (seedoc) {
    estructuraapi.setResultado(seedoc);
  } else {
    estructuraapi.setEstado(404, "error", "document not found");
  }

  return res.json(estructuraapi.toResponse());
};

exports.deleteDocument = async (req, res) => {
  let api = new estructuraApi();
  let id_documento = req.params.id_documento;
  const doc = await Documentos.findOne({
    where: { id_documento: id_documento },
  });
  if (doc) {
    doc.destroy();
    const exist = await fs.pathExists("storage/" + doc.ruta);
    if (exist) {
      fs.unlink("storage/" + doc.ruta);
    } else {
      api.setEstado("INFO", "info", `Document pdf not Found!`);
    }
    api.setEstado("SUCC", "success", `Document delete successfully`);
  } else {
    api.setEstado("INFO", "info", `Document not Found!`);
  }
  res.json(api.toResponse());
};
