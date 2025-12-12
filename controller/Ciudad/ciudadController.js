const EstructuraApi = require("../../helpers/estructuraApi");
const Ciudad = require("../../models/Ciudad/ciudad");
const { Pool } = require("pg");
const { pgConfig } = require("../../config/connection");
const pool = new Pool(pgConfig);
const Departamento = require('../../models/Departamentos/Departamento')


exports.getCiudades = async (req, res) => {
  let estructuraApi = new EstructuraApi();

  try {
    const Ciudades = await Ciudad.findAll({
         include: [ Departamento],

    });

    if (Ciudades.length > 0) {
      estructuraApi.setResultado(Ciudades);
    } else {
      estructuraApi.setEstado(404, "error", "No se encontraron Ciudades");
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};

exports.getCiudadById = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const { id } = req.params;

  try {
    const ciudad = await Ciudad.findOne({
      where: { id_ciudad: id },
      include: [Departamento]
    });

    if (!ciudad) {
      estructuraApi.setEstado(404, "error", "Ciudad no encontrado");
    } else {
      estructuraApi.setResultado(ciudad);
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};


exports.crearCiudad = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const CiudadData = req.body;

  try {
    const nuevoCiudad = await Ciudad.create(CiudadData);
    estructuraApi.setEstado(201, "success", "Ciudad creado con éxito");
    estructuraApi.setResultado(nuevoCiudad);
    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};

exports.updateCiudad = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const { id } = req.params;
  const dataActualizada = req.body;

  try {
    const ciudadEncontrada = await Ciudad.findOne({ where: { id_ciudad: id } });

    if (!ciudadEncontrada) {
      estructuraApi.setEstado(404, "error", "Ciudad no encontrado");
    } else {
      await ciudadEncontrada.update(dataActualizada);
      estructuraApi.setEstado(200, "success", "Ciudad actualizado con éxito");
      estructuraApi.setResultado(ciudadEncontrada);
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};


exports.deleteCiudad = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const { id } = req.params;

  try {
    const eliminado = await Ciudad.destroy({ where: { id_ciudad: id } });

    if (eliminado === 0) {
      estructuraApi.setEstado(404, "error", "Ciudad no encontrado");
    } else {
      estructuraApi.setEstado(200, "success", "Ciudad eliminado con éxito");
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};
