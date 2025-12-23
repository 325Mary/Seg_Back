const Documentos = require("../../models/Documento/Documento");
const estructuraApi = require("../../helpers/estructuraApi");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs-extra");

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/docs");
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});

// Configuración de Multer con validaciones
const upload = multer({
  storage,
  limits: {
    fileSize: 2000000, // 2MB máximo
  },
  fileFilter: function (req, file, cb) {
   
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    
    console.log('❌ Archivo rechazado - No es PDF');
    return cb(null, false);
  },
});

exports.upload = upload.single("ruta");

exports.createDocument = async (req, res) => {
  let api = new estructuraApi();

  try {
    if (!req.file) {
      api.setEstado("204", "error", "No seleccionaste ningún archivo");
      return res.json(api.toResponse());
    }

    const documento = req.body.documento;
    let file_path = req.file.path;

    let file_split = file_path.split("/");
    
    if (file_split.length === 1) {
      file_split = file_path.split("\\");
    }

    let final_path = file_split[1] + "/" + file_split[2];


    const newDocument = {
      documento,
      ruta: final_path,
    };


    await Documentos.create(newDocument)
      .then((succ) => {
        api.setEstado("SUC-001", "success", "Documento creado exitosamente");
        api.setResultado(succ);
      })
      .catch((err) => {
        console.error('Error al crear documento:', err);
        api.setEstado("500", "error", err.message);
      });

  } catch (error) {
    console.error('Error en createDocument:', error);
    api.setEstado("500", "error", "Error interno del servidor");
  }

  return res.json(api.toResponse());
};

// Listar todos los documentos
exports.seeDocuments = async (req, res) => {
  let estructuraapi = new estructuraApi();
  
  try {
    const docs = await Documentos.findAll();
    
    if (docs.length > 0) {
      estructuraapi.setResultado(docs);
    } else {
      estructuraapi.setEstado(404, "error", "No se encontraron documentos");
    }
    
    res.json(estructuraapi.toResponse());
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    estructuraapi.setEstado("500", "error", "Error interno del servidor");
    res.json(estructuraapi.toResponse());
  }
};

// Ver un documento específico
exports.seeDocument = async (req, res) => {
  let estructuraapi = new estructuraApi();

  try {
    const id_documento = req.params.id_documento;
    const seedoc = await Documentos.findOne({
      where: { id_documento: id_documento },
    });

    if (seedoc) {
      estructuraapi.setResultado(seedoc);
    } else {
      estructuraapi.setEstado(404, "error", "Documento no encontrado");
    }

  } catch (error) {
    console.error('Error al obtener documento:', error);
    estructuraapi.setEstado("500", "error", "Error interno del servidor");
  }

  return res.json(estructuraapi.toResponse());
};

// Eliminar un documento
exports.deleteDocument = async (req, res) => {
  let api = new estructuraApi();
  
  try {
    let id_documento = req.params.id_documento;
    const doc = await Documentos.findOne({
      where: { id_documento: id_documento },
    });

    if (doc) {
      // Eliminar el archivo físico
      const exist = await fs.pathExists("storage/" + doc.ruta);
      if (exist) {
        await fs.unlink("storage/" + doc.ruta);
      } else {
        console.log('Archivo físico no encontrado:', doc.ruta);
      }

      // Eliminar el registro de la base de datos
      await doc.destroy();
      
      api.setEstado("SUCC", "success", "Documento eliminado exitosamente");
    } else {
      api.setEstado("INFO", "info", "Documento no encontrado");
    }
    
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    api.setEstado("500", "error", "Error interno del servidor");
  }

  res.json(api.toResponse());
};