const EstructuraApi = require("../../helpers/estructuraApi");
const CentroFormacion = require("../../models/CentroFormacion/centroFormacion");
const { Pool } = require("pg");
const { pgConfig } = require("../../config/connection");
const pool = new Pool(pgConfig);

exports.getCentros = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const { id_centro, id_perfil } = req.query;

  try {
    if (!id_perfil) {
      estructuraApi.setEstado(400, "error", "Missing id_perfil");
      return res.json(estructuraApi.toResponse());
    }

    let whereCondition = '';

    if (id_perfil !== '4' && id_centro) {
      whereCondition = { where: { id_centro_formacion: id_centro } };
    }

    const centros = id_perfil !== '4' && id_centro
      ? await CentroFormacion.findAll(whereCondition) 
      : await CentroFormacion.findAll(); 

    if (centros.length > 0) {
      estructuraApi.setResultado(centros);
    } else {
      estructuraApi.setEstado(404, "error", "No se encontraron centros");
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};


exports.getCentroById = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const { id } = req.params;

  try {
    const centro = await CentroFormacion.findOne({
      where: { id_centro_formacion: id },
    });

    if (!centro) {
      estructuraApi.setEstado(404, "error", "Centro no encontrado");
    } else {
      estructuraApi.setResultado(centro);
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};

exports.crearCentro = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const centroData = req.body;

  try {
    const nuevoCentro = await CentroFormacion.create(centroData);
    estructuraApi.setEstado(201, "success", "Centro creado con éxito");
    estructuraApi.setResultado(nuevoCentro);
    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};

exports.updateCentro = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const { id } = req.params;
  const dataActualizada = req.body;

  try {
    const centro = await CentroFormacion.findOne({ where: { id_centro_formacion: id } });

    if (!centro) {
      estructuraApi.setEstado(404, "error", "Centro no encontrado");
    } else {
      await centro.update(dataActualizada);
      estructuraApi.setEstado(200, "success", "Centro actualizado con éxito");
      estructuraApi.setResultado(centro);
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};

exports.deleteCentro = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const { id } = req.params;

  try {
    const eliminado = await CentroFormacion.destroy({ where: { id_centro_formacion: id } });

    if (eliminado === 0) {
      estructuraApi.setEstado(404, "error", "Centro no encontrado");
    } else {
      estructuraApi.setEstado(200, "success", "Centro eliminado con éxito");
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};
