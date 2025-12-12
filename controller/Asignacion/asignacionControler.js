const estructuraApi = require("../../helpers/estructuraApi");
const associations = require("../../models/asociations");
const Fase = require("../../models/Fase/Estado.fase");
const Aprendiz = require("../../models/Aprendiz/Aprendiz");
const Usuario = require("../../models/Auth/login");
const Asignacion = require("../../models/Asignacion/Asignacion");
const Novedades = require("../../models/Asignacion/Novedad/Novedad");
const Notificacion = require("../../models/Notificacion/Notificacion");
const moment = require("moment-timezone");
const { Op } = require("sequelize");

var requestAssignment = require("../../models/DTO/AssignmentRequest");
var requestNotification = require("../../models/DTO/NotificacionRequest");
const { Pool } = require("pg");
const {pgConfig} = require("../../config/connection");

const pool = new Pool(pgConfig);

exports.seeAssignments = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const { id_centro, id_perfil } = req.query;
  
  try {
    if (!id_centro || !id_perfil) {
      estructuraapi.setEstado(400, "error", "Missing id_centro or id_perfil");
      return res.json(estructuraapi.toResponse());
    }

    let whereCondition = '';
    if (id_perfil !== '4') {
      whereCondition = 'WHERE aprendices.id_centro_formacion = $1';
    }

    const query = `
      SELECT 
        asignacion.id_asignacion,
        asignacion.aprendiz_id,
        asignacion.estado_fase_id,
        asignacion.usuario_responsable_id,
        asignacion.seg_1,
        asignacion.seg_2,
        asignacion.seg_3,
        to_char(asignacion.fecha_seguimiento_inicial,'YYYY/MM/DD') as fecha_seguimiento_inicial,
        to_char(asignacion.fecha_seguimiento_parcial,'YYYY/MM/DD') as fecha_seguimiento_parcial,
        to_char(asignacion.fecha_seguimiento_final,'YYYY/MM/DD') as fecha_seguimiento_final,
        to_char(asignacion.fecha_evaluacion_final,'YYYY/MM/DD') as fecha_evaluacion_final,
        aprendices.nombres as nombre_aprendiz,
        aprendices.apellidos as apellido_aprendiz,
        aprendices.identificacion,  
        aprendices.contrato_inicio,
        aprendices.contrato_fin,
        aprendices.id_aprendiz,
        usuario.nombres as nombre_usuario,
        usuario.apellidos as apellido_usuario,
        estado_fase.estado_fase,
        centro_formacion.id_centro_formacion AS id_centro_formacion,
        centro_formacion.nombre AS nombre_centro
      FROM asignacion
      JOIN aprendices 
        ON aprendices.id_aprendiz = asignacion.aprendiz_id
      JOIN usuario 
        ON usuario.id_usuario = asignacion.usuario_responsable_id
      JOIN estado_fase 
        ON estado_fase.id_estado_fase = asignacion.estado_fase_id
      LEFT JOIN centro_formacion
        ON centro_formacion.id_centro_formacion = aprendices.id_centro_formacion
      ${whereCondition}
    `;

    const asignaciones = id_perfil !== '4' 
      ? await pool.query(query, [id_centro])
      : await pool.query(query);

    if (asignaciones.rows.length > 0) {
      estructuraapi.setResultado(asignaciones.rows);
    } else {
      const message = id_perfil === '4' 
        ? "No assignments found" 
        : "No assignments found for apprentices in the specified center";
      estructuraapi.setEstado(404, "not found", message);
    }

    res.json(estructuraapi.toResponse());

  } catch (err) {
    console.error("Unexpected error:", err);
    estructuraapi.setEstado(500, "error", err.message || "An unexpected error occurred");
    res.json(estructuraapi.toResponse());
  }
};

exports.seeAssignment = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const id_asignacion = req.params.id_asignacion;
  const asignacion = await Asignacion.findOne({
    where: { id_asignacion: id_asignacion },
    include: [Usuario, Aprendiz, Fase, Novedades],
  });
  if (asignacion) {
    estructuraapi.setResultado(asignacion);
  } else {
    estructuraapi.setEstado(404, "error", "assignment not found");
  }
  res.json(estructuraapi.toResponse());
};

exports.seeMyAssignments = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const id_usuarioLogueado = req.params.id_user;
  const asignacion = await pool.query(`SELECT 
  asignacion.id_asignacion,
  asignacion.aprendiz_id,
  asignacion.seg_1,
  asignacion.seg_2,
  asignacion.seg_3,
  asignacion.usuario_responsable_id,
  to_char(asignacion.fecha_seguimiento_inicial,'YYYY/MM/DD') as fecha_seguimiento_inicial,
  to_char(asignacion.fecha_seguimiento_parcial,'YYYY/MM/DD') as fecha_seguimiento_parcial,
  to_char(asignacion.fecha_seguimiento_final,'YYYY/MM/DD') as fecha_seguimiento_final,
  to_char(asignacion.fecha_evaluacion_final,'YYYY/MM/DD') as fecha_evaluacion_final,
  novedades.tipo_novedad,
  aprendices.nombres as nombre_aprendiz,
  aprendices.apellidos as apellido_aprendiz,
  aprendices.identificacion,
  aprendices.telefono,
  aprendices.correo_misena,
  aprendices.correo_alternativo,
  aprendices.ficha,
  usuario.nombres as nombre_usuario,
  usuario.apellidos as apellido_usuario,
  estado_fase.estado_fase
  FROM asignacion
   JOIN aprendices 
  ON aprendices.id_aprendiz = asignacion.aprendiz_id
   JOIN usuario 
  ON usuario.id_usuario = asignacion.usuario_responsable_id
   JOIN estado_fase 
  ON estado_fase.id_estado_fase = asignacion.estado_fase_id
  LEFT JOIN novedades
  ON novedades.id_novedad = asignacion.novedad_id
  WHERE asignacion.usuario_responsable_id = ${id_usuarioLogueado} AND estado_fase.estado_fase != 'Reasignado'`);
  if (asignacion.rows.length > 0) {
    estructuraapi.setResultado(asignacion.rows);
  } else {
    estructuraapi.setEstado(404, "info", "No tienes Asignaciones");
  }
  console.log("asig", asignacion);
  
  res.json(estructuraapi.toResponse());
};

exports.dataForform = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const { id_centro, id_perfil } = req.query; 

  try {
    
    if (!id_centro || !id_perfil) {
      estructuraapi.setEstado(400, "error", "Missing id_centro or id_perfil");
      return res.json(estructuraapi.toResponse());
    }

    
    let whereCondition = {};

    
    if (id_perfil !== '4') {
      whereCondition.id_centro_formacion = id_centro; 
    }

    
    const aprendices = await Aprendiz.findAll({
      where: whereCondition,  
    });

    
    let usuarios;
    if (id_perfil === '4') {
      
      usuarios = await Usuario.findAll();
    } else {
      
      usuarios = await Usuario.findAll({
        where: {
          perfil_id: { [Op.in]: [1, 3] },  
          id_centro_formacion: id_centro,   
        },
      });
    }

    
    const fases = await Fase.findAll();
    const novedades = await Novedades.findAll();

    
    if (aprendices.length === 0) {
      estructuraapi.setEstado(404, "error", "aprendices not found");
    }
    if (usuarios.length === 0) {
      estructuraapi.setEstado(404, "error", "usuarios not found");
    }
    if (fases.length === 0) {
      estructuraapi.setEstado(404, "error", "fases not found");
    }
    if (novedades.length === 0) {
      estructuraapi.setEstado(404, "error", "noveltys not found");
    }

    
    const results = {
      aprendices,
      usuarios,
      fases,
      novedades,
    };
    estructuraapi.setResultado(results);

    res.json(estructuraapi.toResponse());

  } catch (err) {
    console.error("Unexpected error:", err);
    estructuraapi.setEstado(500, "error", err.message || "An unexpected error occurred");
    res.json(estructuraapi.toResponse());
  }
};


exports.createAssignment = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const {
    fecha_seguimiento_inicial,
    fecha_seguimiento_parcial,
    fecha_seguimiento_final,
  } = req.body;


  requestAssignment = req.body;
  const { aprendiz_id } = req.body;
  const aprendiz = await Aprendiz.findOne({
    where: { id_aprendiz: aprendiz_id },
  });
  const registro = Object.values(aprendiz.dataValues);
  const resultado = registro.find((res) => res === "Sin registrar");
  const resultado2 = registro.find((res) => res === "-1");
  if (resultado === undefined) {
    if (resultado2 === undefined) {
      if (fecha_seguimiento_parcial >= fecha_seguimiento_final) {
        console.log("La fecha parcia no puede ser mayor a la final");
        estructuraapi.setEstado(
          400,
          "info",
          "La fecha del seguimiento parcial no puede ser mayor a la del seguimiento final"
        );
      } else {
        await Asignacion.create(requestAssignment)
          .then((succes) => {
            estructuraapi.setResultado(succes);
          })
          .catch((error) => {
            estructuraapi.setEstado(
              error.parent.code || error,
              "Error al registrar la asignacion",
              error.parent.detail || error
            );
          });
      }
    } else {
     return estructuraapi.setEstado(
        416,
        "error",
        "Por favor editar el programa en el que esta el aprendiz" 
      );
    }
  } else {
    estructuraapi.setEstado(
      416,
      "error",
      "Por favor registrar la informacion completa del aprendiz"
    );
  }

  res.json(estructuraapi.toResponse());
};
exports.verifyAprendiz = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const { aprendiz_id } = req.params;
  console.log(aprendiz_id);
  const aprendiz = await Aprendiz.findOne({
    where: { id_aprendiz: aprendiz_id },
  });
  const registro = Object.values(aprendiz.dataValues);
  const resultado = registro.find((res) => res === "Sin registrar");
  const resultado2 = registro.find((res) => res === "-1");
  if (resultado === undefined) {
    if (resultado2 === undefined) {
    } else {
      estructuraapi.setEstado(
        416,
        "error",
        "Por favor editar el programa en el que esta el aprendiz"
      );
    }
  } else {
    estructuraapi.setEstado(
      416,
      "error",
      "Por favor registrar la informacion completa del aprendiz"
    );
  }

  res.json(estructuraapi.toResponse());
};
exports.updateAssignment = async (req, res) => {
  let estructuraapi = new estructuraApi();

  const id_asignacion = req.params.id_asignacion;

  requestAssignment = req.body;

  await Asignacion.update(requestAssignment, {
    where: {
      id_asignacion: id_asignacion,
    },
  })
    .then((succes) => {
      if (succes[0] > 0) {
        estructuraapi.setResultado(requestAssignment);
      } else {
        api.setEstado(204, "Empty", "consult success but Empty");
      }

      // console.log(succes);
    })
    .catch((error) => {
      estructuraapi.setEstado(
        error.parent.code || error,
        "Error al registrar la asignacion",
        error.parent.detail || error
      );
      console.log(error);
    });

  res.json(estructuraapi.toResponse());
};

exports.verifyAssignment = async (req, res) => {
  let estructuraapi = new estructuraApi();

  const aprendiz_id = req.params.aprendiz_id;

  const asignacion = await Asignacion.findOne({
    where: { aprendiz_id: aprendiz_id },
  });

  if (asignacion) {
    estructuraapi.setEstado(
      "INFO",
      "INFO",
      "La o el aprendiz ya esta asignad@ a un instructor"
    );
  }

  res.json(estructuraapi.toResponse());
};

exports.deleteAssignment = async (req, res) => {
  let estructuraapi = new estructuraApi();

  const id_asignacion = req.params.id_asignacion;

  const asignacion = await Asignacion.findOne({
    where: { id_asignacion: id_asignacion },
  });

  if (asignacion) {
    asignacion.destroy();
  } else {
    api.setEstado("INFO", "info", `Assignment not Found!`);
  }
  // .then((succes) => {
  //   if (succes != 0) {
  //     estructuraapi.setEstado(
  //       "SUCC",
  //       "success",
  //       `Assignment delete successfully`
  //     );
  //   } else {
  //     estructuraapi.setEstado("INFO", "info", `Assignment not found!`);
  //   }
  // })
  // .catch((err) => {
  //   estructuraapi.setEstado(err.parent.code, "error", err.parent.detail);
  // });
  res.json(estructuraapi.toResponse());
};

exports.seeAprendizById = async (req, res) => {
  let EstructuraApi = new estructuraApi();
  const { id } = req.params;

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
    documentos.documento
    FROM asignacion
    JOIN aprendices ON asignacion.aprendiz_id = aprendices.id_aprendiz
    JOIN programa_formacion ON aprendices.programa_id = programa_formacion.id_programa_formacion
    JOIN seguimiento ON seguimiento.asignacion_id = asignacion.id_asignacion
    JOIN tipo_seguimiento ON seguimiento.tipo_seguimiento_id = tipo_seguimiento.id_tipo_seguimiento
    JOIN documentos ON seguimiento.documento_id = documentos.id_documento
    WHERE id_asignacion = ${id}
    `);
  await Asignacion.findAll({
    where: { id_asignacion: id },
  });
  if (asignacion.rows.length > 0) {
    const dato = asignacion.rows.slice(-1);
    EstructuraApi.setResultado(dato);
  } else {
    EstructuraApi.setEstado(404, "info", "No tiene aprendices Asignados");
  }
  res.json(EstructuraApi.toResponse());
};

exports.estadosTipoSeguimiento1 = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const { estado_seguimiento } = req.body;

  const id_asignacion = req.body.id_asignacion;

  const asignacion = await Asignacion.findOne({
    where: { id_asignacion },
  });

  if (asignacion.seg_1 == "Aprobado") {
    estructuraapi.setEstado("INFO", "info", `Error insesperado!`);
  } else {
    asignacion.seg_1 = estado_seguimiento;
    asignacion.save();
  }
  res.json(estructuraapi.toResponse());
};

exports.estadosTipoSeguimiento2 = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const { estado_seguimiento } = req.body;

  const id_asignacion = req.body.id_asignacion;

  const asignacion = await Asignacion.findOne({
    where: { id_asignacion },
  });

  if (asignacion.seg_2 == "Aprobado") {
    estructuraapi.setEstado("INFO", "info", `Error insesperado!`);
  } else {
    asignacion.seg_2 = estado_seguimiento;
    asignacion.save();
  }
  res.json(estructuraapi.toResponse());
};

exports.estadosTipoSeguimiento3 = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const { estado_seguimiento } = req.body;

  const id_asignacion = req.body.id_asignacion;

  const asignacion = await Asignacion.findOne({
    where: { id_asignacion },
  });

  if (asignacion.seg_3 == "Aprobado") {
    estructuraapi.setEstado("INFO", "info", `Error insesperado!`);
  } else {
    asignacion.seg_3 = estado_seguimiento;
    asignacion.save();
  }
  res.json(estructuraapi.toResponse());
};

/-------------------NOVEDADES--------------------------/;
exports.createNovedad = async (req, res) => {
  const { id } = req.params;
  novedad = req.body;
  let EstructuraApi = new estructuraApi();
  const asignacion = await Asignacion.findOne({ where: { id_asignacion: id } });
  console.log(asignacion.novedad_id);
  console.log(novedad.novedad_id);
  if (asignacion.novedad_id == novedad.novedad_id) {
    EstructuraApi.setEstado(
      207,
      "error",
      `Escoger una Novedad diferente a la que ya tiene`
    );
  } else {
    asignacion.novedad_id = novedad.novedad_id;
    await asignacion.save();
    EstructuraApi.setEstado("SUCC", "success", `Novedad creada con exito`);
    EstructuraApi.setResultado(asignacion);
  }
  return res.json(EstructuraApi.toResponse());
};

exports.getNovedades = async (req, res) => {
  let EstructuraApi = new estructuraApi();

  const ListNovedades = await Novedades.findAll();
  ListNovedades.shift();

  if (ListNovedades.length > 0) {
    EstructuraApi.setResultado(ListNovedades);
  } else {
    EstructuraApi.setEstado(404, "error", "novelty not found");
  }
  res.json(EstructuraApi.toResponse());
};
exports.filtrarFecha = async (req, res) => {
  const { fecha_inicial, fecha_final } = req.body;
  const fechaI = moment(fecha_inicial).format("YYYY-MM-DD");
  const fechaF = moment(fecha_final).format("YYYY-MM-DD");
  let EstructuraApi = new estructuraApi();
  const filtrar = await pool.query(`
  SELECT 
  asignacion.id_asignacion,
  asignacion.aprendiz_id,
  asignacion.estado_fase_id,
  asignacion.usuario_responsable_id,
  to_char(asignacion.fecha_seguimiento_inicial,'YYYY/MM/DD') as fecha_seguimiento_inicial,
  to_char(asignacion.fecha_seguimiento_parcial,'YYYY/MM/DD') as fecha_seguimiento_parcial,
  to_char(asignacion.fecha_seguimiento_final,'YYYY/MM/DD') as fecha_seguimiento_final,
  aprendices.nombres as nombre_aprendiz,
  aprendices.apellidos as apellido_aprendiz,
  aprendices.identificacion,  
  aprendices.contrato_inicio,
  aprendices.contrato_fin,
  aprendices.id_aprendiz,
  usuario.nombres as nombre_usuario,
  usuario.apellidos as apellido_usuario,
  estado_fase.estado_fase
  FROM asignacion
  JOIN aprendices 
  ON aprendices.id_aprendiz = asignacion.aprendiz_id
  JOIN usuario 
  ON usuario.id_usuario = asignacion.usuario_responsable_id
  JOIN estado_fase ON estado_fase.id_estado_fase = asignacion.estado_fase_id
  WHERE asignacion.creado BETWEEN '${fechaI}' AND '${fechaF}'
  `);
  if (filtrar.rows.length > 0) {
    EstructuraApi.setResultado(filtrar.rows);
  } else {
    EstructuraApi.setEstado(404, "error", "list assignments not found");
  }
  res.json(EstructuraApi.toResponse());
};
