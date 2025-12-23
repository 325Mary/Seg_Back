const EstructuraApi = require("../../helpers/estructuraApi");
const Seguimiento = require("../../models/Segumiento/Seguimiento");
const associations = require("../../models/asociations");
const Documentos = require("../../models/Documento/Documento");
const Asignacion = require("../../models/Asignacion/Asignacion");
const Bitacoras = require("../../models/Bitacora/Bitacora");
const { Pool } = require("pg");
const {pgConfig} = require("../../config/connection");
const pool = new Pool(pgConfig);
exports.getSeguimiento = async (req, res) => {
  let estructuraApi = new EstructuraApi();

  const seguimientos = await Seguimiento.findAll();

  if (seguimientos.length > 0) {
    estructuraApi.setResultado(seguimientos);
  } else {
    estructuraApi.setEstado(404, "error", "tracing not found");
  }
  res.json(estructuraApi.toResponse());
};

class SeguimientoOBJ {
  tipo_seguimiento_id = "";
  observacion = "";
  observacion_finalizacion = "";
  estado_documento = "";
  documento_id = "";
  asignacion_id = "";
}
exports.deleteSeguimiento = async (req, res) => {
  let estructuraApi = new EstructuraApi();

  const { id } = req.params;

  const seguimiento = await Seguimiento.destroy({
    where: { id_seguimiento: id },
  });

  estructuraApi.setResultado(seguimiento);

  estructuraApi.setEstado("Seguimiento Eliminado con exito");

  res.json(estructuraApi.toResponse());
};
exports.updateSeguimiento = async (req, res) => {
  let estructuraApi = new EstructuraApi();

  const { id } = req.params;

  seguimiObj = new SeguimientoOBJ();

  seguimiObj = req.body;

  const seguimiento = await Seguimiento.findOne({
    where: { id_seguimiento: id },
  });
  seguimiento.tipo_seguimiento_id = seguimiObj.tipo_seguimiento_id;
  seguimiento.observacion = seguimiObj.observacion;
  seguimiento.observacion_finalizaciono = seguimiObj.observacion_finalizacion;
  seguimiento.estado_documento = seguimiObj.estado_documento;
  seguimiento.documento_id = seguimiObj.documento_id;
  seguimiento.asignacion_id = seguimiObj.asignacion_id;
  await seguimiento.save();

  estructuraApi.setEstado("Seguimiento Actualizado con exito");
  estructuraApi.setResultado(seguimiento);
  return res.json(estructuraApi.toResponse());
};
exports.getSeguiminetoById = async (req, res) => {
  let estructuraApi = new EstructuraApi();

  const { id } = req.params;

  const seguimiento = await Seguimiento.findAll({
    where: { id_seguimiento: id },
  });

  if (seguimiento == []) {
    estructuraApi.setResultado(404, "error", "no existe este id");
  } else {
    estructuraApi.setResultado(seguimiento);
  }

  return res.json(estructuraApi.toResponse());
};

exports.crearSegumientoBack = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const docsegui = req.body.documento;
  let file_path = req.file.path;
let file_split = file_path.split("/");

if (file_split.length === 1) {
    file_split = file_path.split("\\");
}

let final_path;
if (file_split.length >= 3) {
    final_path = file_split[1] + "/" + file_split[2];
} else if (file_split.length === 2) {
    final_path = file_split[0] + "/" + file_split[1];
} else {
    final_path = file_path;
}
  const id_asignacion = req.body.asignacion_id;
  const tipo = req.body.tipo_seguimiento_id;

  const newDocument = {
    documento: docsegui,
    ruta: final_path,
  };
  //consulto si ya hay algun seguimiento
  const seguimiento = await Seguimiento.findAll({
    where: { asignacion_id: id_asignacion },
  });
  if (seguimiento.length == 0) {
    //si no hay ningun seguimiento
    const doc = await Documentos.create(newDocument);
    const newSeguimiento = await Seguimiento.create({
      asignacion_id: id_asignacion,
      documento_id: doc.dataValues.id_documento,
      tipo_seguimiento_id: tipo,
      estado_documento: "Por Aprobar",
    });
    estructuraApi.setEstado(
      "SUC-001",
      "success",
      "Primer seguimiento registrado con exito"
    );
    estructuraApi.setResultado(newSeguimiento);
  } else {
    //si ya hay un seguimiento
    const registro = seguimiento.slice(-1);
    let tipo_seguimiento = registro[0].tipo_seguimiento_id;
    //consulto si el tpo que viene del body es igual ultimo registro que encontre con esa asignacion
    if (tipo_seguimiento == tipo) {
      //realizo la condicional para cada estado
      if (registro[0].estado_documento == "No aprobado") {
        const doc = await Documentos.create(newDocument);
        const SeguimientoMismoTipo = await Seguimiento.create({
          tipo_seguimiento_id: tipo,
          estado_documento: "Por Aprobar",
          documento_id: doc.dataValues.id_documento,
          asignacion_id: id_asignacion,
        });
        estructuraApi.setEstado(
          "SUC-001",
          "success",
          "Seguimiento registrado con exito"
        );
        estructuraApi.setResultado(SeguimientoMismoTipo);
      } else if (registro[0].estado_documento == "Aprobado") {
        estructuraApi.setEstado(
          "SUC-001",
          "success",
          "Ya puedes subir un nuevo seguimiento"
        );
      } else if (registro[0].estado_documento == "Por Aprobar") {
        estructuraApi.setEstado(
          207,
          "error",
          "Aun no has cambiado el estado del documento ya subido"
        );
      }
      //si no es el mismo tipo
    } else {
      //condiciono si el estado del body  es aprobado
      if (registro[0].estado_documento == "Aprobado") {
        const doc = await Documentos.create(newDocument);
        const SeguimientoNuevoTipo = await Seguimiento.create({
          tipo_seguimiento_id: tipo,
          estado_documento: "Por Aprobar",
          documento_id: doc.dataValues.id_documento,
          asignacion_id: id_asignacion,
        });
        estructuraApi.setEstado(
          "SUC-001",
          "success",
          "Seguimiento registrado con exito"
        );
        estructuraApi.setResultado(SeguimientoNuevoTipo);
        //si no esta aprobado debe esperar
      } else {
        estructuraApi.setEstado(
          207,
          "error",
          "No puedes registrar el seguimiento,debes ir en orden"
        );
      }
    }
  }
  res.json(estructuraApi.toResponse());
};
exports.EstadoDocumento = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const id_seguimiento = req.body.id_seguimiento;
  const estado_documento = req.body.estado_documento;
  //condicional para que deje aprobar solamente si hay dos bitacoras aprobadas
  const NewSeguimiento = await Seguimiento.findOne({
    where: { id_seguimiento: id_seguimiento },
  });
  const id_asignacion = NewSeguimiento.asignacion_id;
  const tipo = NewSeguimiento.tipo_seguimiento_id;
  if (estado_documento == "Aprobado") {
    const verifyCondition = await pool.query(`select asignacion.id_asignacion
        from asignacion
        JOIN bitacoras on bitacoras.asignacion_id = asignacion.id_asignacion
        JOIN tipo_seguimiento on bitacoras.tipo_seguimiento_id = tipo_seguimiento.id_tipo_seguimiento
        JOIN documentos on bitacoras.documento_id = documentos.id_documento
        where id_asignacion = ${id_asignacion}
        and bitacoras.tipo_seguimiento_id = ${tipo}
        and bitacoras.estado_documento= 'Aprobado'`);
    //condicional para que solo hayan dos bitacoras aprobadas por cada tipo de documento
    if (verifyCondition.rows.length >= 2) {
      //condicion para cuando el tipo de seguimiento ya sea tres y pueda cambiarse la fase
      if (tipo == 3) {
        NewSeguimiento.estado_documento = estado_documento;
        await NewSeguimiento.save();
        const registroFase = await Asignacion.findOne({
          where: { id_asignacion: NewSeguimiento.asignacion_id },
        });
        registroFase.estado_fase_id = 3;
        await registroFase.save();
        estructuraApi.setEstado(
          "por_Certificar",
          "success",
          "El aprendiz ya paso a el estado por Certificar"
        );
        //si el tipo no es  igual a 3
      } else {
        NewSeguimiento.estado_documento = estado_documento;
        await NewSeguimiento.save();
        estructuraApi.setEstado(
          "SUC-001",
          "APROBO",
          "Ya puedes pasar a registrar los documentos del siguiente seguimiento"
        );
        estructuraApi.setResultado(NewSeguimiento);
      }
      //si hay menos bitacoras aprobadas
    } else {
      estructuraApi.setEstado(
        404,
        "error",
        "Debes esperar a que hayan dos bitacoras aprobadas de este tipo para aprobar el seguimiento"
      );
    }
    //si el estado del bosy es diferente a Aprobado se guarda el estado
  } else {
    NewSeguimiento.estado_documento = estado_documento;
    await NewSeguimiento.save();

    if (NewSeguimiento.estado_documento == "Aprobado") {
      estructuraApi.setEstado(
        "SUC-001",
        "APROBO",
        "Ya puedes pasar a registrar los documentos del siguiente seguimiento"
      );
      estructuraApi.setResultado(NewSeguimiento);
    } else {
      estructuraApi.setEstado(
        "SUC-001",
        "success",
        "Estado registrado con exito"
      );
      estructuraApi.setResultado(NewSeguimiento);
    }
  }
  res.json(estructuraApi.toResponse());
};
exports.getDocumentos = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const id_asignacion = req.body.asignacion_id;
  const tipo = req.body.tipo_seguimiento_id;

  const asignacion = await pool.query(`SELECT asignacion.id_asignacion,
    aprendices.nombres,
    aprendices.apellidos,
    aprendices.genero,
    aprendices.telefono,
    aprendices.correo_alternativo,
    aprendices.centro,
    aprendices.ficha,
    aprendices.identificacion,
    aprendices.fecha_nacimiento,
    seguimiento.tipo_seguimiento_id,
    seguimiento.estado_documento,
    seguimiento.documento_id,
    seguimiento.id_seguimiento,
    programa_formacion.programa_formacion,
    tipo_seguimiento.tipo_seguimiento,
    documentos.documento
    FROM asignacion
    JOIN aprendices ON asignacion.aprendiz_id = aprendices.id_aprendiz
    JOIN programa_formacion ON aprendices.programa_id = programa_formacion.id_programa_formacion
    JOIN seguimiento ON seguimiento.asignacion_id = asignacion.id_asignacion
    JOIN tipo_seguimiento ON seguimiento.tipo_seguimiento_id = tipo_seguimiento.id_tipo_seguimiento
    JOIN documentos ON seguimiento.documento_id = documentos.id_documento
    WHERE id_asignacion = ${id_asignacion}
    AND seguimiento.tipo_seguimiento_id = ${tipo}
    `);
  await Asignacion.findAll({
    where: { id_asignacion: id_asignacion },
  });
  if (asignacion.rows.length > 0) {
    estructuraApi.setResultado(asignacion.rows);
  } else {
    estructuraApi.setEstado(404, "info", "No tiene aprendices Asignados");
  }
  res.json(estructuraApi.toResponse());
};
exports.verifyBitacoras = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const id_asignacion = req.params.id_asignacion;
  const bitacora = await Bitacoras.findAll({
    where: { asignacion_id: id_asignacion },
  });
  console.log(bitacora);
  const estado = bitacora[0].estado_documento;
  if (bitacora.length > 0) {
    if (estado == "Aprobado") {
      estructuraApi.setEstado(
        "SUC-001",
        "success",
        "Ya puede empezar el seguimiento"
      );
    } else {
      estructuraApi.setEstado(
        404,
        "error",
        "Debe esperar a que este aprobada una Bitacora del aprendiz"
      );
    }
  } else {
    estructuraApi.setEstado(
      404,
      "error",
      "Debe esperar a que el aprendiz suba sus bitacoras"
    );
  }

  res.json(estructuraApi.toResponse());
};
exports.verifyBitacoraTipo = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const id_asignacion = req.body.asignacion_id;
  const tipo = req.body.tipo_seguimiento_id;
  const verifyCondition = await pool.query(`select asignacion.id_asignacion
    from asignacion
    JOIN bitacoras on bitacoras.asignacion_id = asignacion.id_asignacion
    JOIN tipo_seguimiento on bitacoras.tipo_seguimiento_id = tipo_seguimiento.id_tipo_seguimiento
    JOIN documentos on bitacoras.documento_id = documentos.id_documento
    where id_asignacion = ${id_asignacion}
    and bitacoras.tipo_seguimiento_id = ${tipo}
    and bitacoras.estado_documento= 'Aprobado'`);

  await Asignacion.findAll({
    where: { id_asignacion: id_asignacion },
  });
  //condicional para que solo hayan dos bitacoras aprobadas por cada tipo de documento
  if (verifyCondition.rows.length >= 1) {
  } else {
    estructuraApi.setEstado(
      416,
      "error",
      "No puedes subir un seguimiento hasta que no haya almenos una bitacora aprobada en esta fase"
    );
  }
  res.json(estructuraApi.toResponse());
};

exports.segAprobados = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const id_asignacion = req.params.id_asignacion;
  const seguimiento = await Seguimiento.findAll({
    where: {
      // estado_documento: "Aprobado",
      asignacion_id: id_asignacion,
    },
    include: [Asignacion],
  });
  if (seguimiento.length > 0) {
    // console.log(asignacion.length)

    estructuraApi.setResultado(seguimiento);
  } else {
    const asignaciones = await Asignacion.findOne({
      where: { id_asignacion: id_asignacion }
    });
    estructuraApi.setResultado(asignaciones);
    estructuraApi.setEstado(404, "error", "Lista no encontrada");
  }
  res.json(estructuraApi.toResponse());
};

exports.ConsultByIdSeguimiento = async (req, res) => {

  const api = new EstructuraApi
  const { id_seguimiento } = req.params

  const data = await pool.query(
    `SELECT * 
    FROM seguimiento 
    JOIN asignacion ON asignacion.id_asignacion = seguimiento.asignacion_id 
    JOIN usuario ON usuario.id_usuario = asignacion.usuario_responsable_id 
    JOIN tipo_seguimiento ON tipo_seguimiento.id_tipo_seguimiento = seguimiento.tipo_seguimiento_id 
    WHERE seguimiento.id_seguimiento = ${id_seguimiento}
    `)

  if (data.rows.length === 0) {
    api.setEstado(204, 'emty', ' no se encuantra ningun dato ')
    return res.json(api.toResponse())
  }
  api.setResultado(data.rows)
  return res.json(api.toResponse())
}
