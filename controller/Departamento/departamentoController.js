const EstructuraApi = require("../../helpers/estructuraApi");
const { Pool } = require("pg");
const { pgConfig } = require("../../config/connection");
const pool = new Pool(pgConfig);
const Departamento = require('../../models/Departamentos/Departamento')


exports.getDepartamentos = async (req, res) => {
  let estructuraApi = new EstructuraApi();

  try {
    const Departamentos = await Departamento.findAll();

    if (Departamentos.length > 0) {
      estructuraApi.setResultado(Departamentos);
    } else {
      estructuraApi.setEstado(404, "error", "No se encontraron Departamentos");
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};

exports.getDepartamentoById = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const { id } = req.params;

  try {
    const Departamento = await Departamento.findOne({
      where: { id_Departamento: id },
    });

    if (!Departamento) {
      estructuraApi.setEstado(404, "error", "Departamento no encontrado");
    } else {
      estructuraApi.setResultado(Departamento);
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};

exports.crearDepartamento = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const DepartamentoData = req.body;

  try {
    const nuevoDepartamento = await Departamento.create(DepartamentoData);
    estructuraApi.setEstado(201, "success", "Departamento creado con éxito");
    estructuraApi.setResultado(nuevoDepartamento);
    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};

exports.updateDepartamento = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const { id } = req.params;
  const dataActualizada = req.body;

  try {
    const Departamento = await Departamento.findOne({ where: { id_Departamento: id } });

    if (!Departamento) {
      estructuraApi.setEstado(404, "error", "Departamento no encontrado");
    } else {
      await Departamento.update(dataActualizada);
      estructuraApi.setEstado(200, "success", "Departamento actualizado con éxito");
      estructuraApi.setResultado(Departamento);
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};

exports.deleteDepartamento = async (req, res) => {
  let estructuraApi = new EstructuraApi();
  const { id } = req.params;

  try {
    const eliminado = await Departamento.destroy({ where: { id: id } });

    if (eliminado === 0) {
      estructuraApi.setEstado(404, "error", "Departamento no encontrado");
    } else {
      estructuraApi.setEstado(200, "success", "Departamento eliminado con éxito");
    }

    return res.json(estructuraApi.toResponse());
  } catch (err) {
    estructuraApi.setEstado(500, "error", err.message);
    return res.json(estructuraApi.toResponse());
  }
};
