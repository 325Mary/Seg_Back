const estructuraApi = require("../../helpers/estructuraApi");
const associations = require("../../models/asociations");
const Usuario = require("../../models/Auth/login");
const Notificacion = require("../../models/Notificacion/Notificacion");

var requestNotification = require("../../models/DTO/NotificacionRequest");
// const { Pool } = require("pg");
// const db = require("../../env");

// const pool = new Pool(db);

exports.allNotificaciones = async (req, res) => {
  let estructuraapi = new estructuraApi();

  const notificaciones = await Notificacion.findAll({ include: Usuario });
  if (notificaciones.length > 0) {
    estructuraapi.setResultado(notificaciones);
  } else {
    estructuraapi.setEstado(404, "error", "No hay Notificaciones registradas");
  }
  res.json(estructuraapi.toResponse());
};

exports.notificacionByID = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const id_notificacion = req.params.id_notificacion;
  const notificacion = await Notificacion.findOne({
    where: { id_notificacion },
    include: [Usuario],
  });
  if (notificacion) {
    estructuraapi.setResultado(notificacion);
  } else {
    estructuraapi.setEstado(404, "error", "Notificación no encontrada");
  }
  res.json(estructuraapi.toResponse());
};

exports.misNotificaciones = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const id_usuarioLogueado = req.params.id_user;
  const notificacion = await Notificacion.findAll({
    where: { usuario_id: id_usuarioLogueado, estado: "Activa" },
    include: [Usuario],
  });
  if (notificacion.length > 0) {
    estructuraapi.setResultado(notificacion);
  } else {
    estructuraapi.setEstado(404, "info", "No tienes Notificaciones");
  }
  res.json(estructuraapi.toResponse());
};

exports.createNotification = async (req, res) => {
  let estructuraapi = new estructuraApi();

  requestNotification = req.body;

  await Notificacion.create(requestNotification)
    .then((succes) => {
      estructuraapi.setResultado(succes);
    })
    .catch((error) => {
      estructuraapi.setEstado(
        error.parent.code || error,
        "Error al registrar la Notificacion",
        error.parent.detail || error
      );
    });
  res.json(estructuraapi.toResponse());
};
exports.softdeleteNotificacion = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const { estado_notificacion } = req.body;

  const id_notificacion = req.body.id_notificacion;

  const notificacion = await Notificacion.findOne({
    where: { id_notificacion },
  });

  if (notificacion) {
    notificacion.estado = estado_notificacion;
    notificacion.save();
  } else {
    api.setEstado("INFO", "info", `Notificacion no encontrada!`);
  }
  res.json(estructuraapi.toResponse());
};
