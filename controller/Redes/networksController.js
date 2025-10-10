const network = require("../../models/Redes/Red");
const estructuraApi = require('../../helpers/estructuraApi')
const { request } = require("express");

exports.seeNetworks= async (req, res) => {
  let estructuraapi = new estructuraApi()

  const networks = await network.findAll();
  if (networks.length > 0) {
    estructuraapi.setResultado(networks);
  } else {
    estructuraapi.setEstado(404, "not found", "list networks not found");
  }
  res.json(estructuraapi.toResponse());
};


exports.seeNetwork= async (req, res) => {
  let estructuraapi = new estructuraApi()
  const id_red_conocimiento = req.params.id_red_conocimiento;
  const seenetwork = await network.findOne({ where: { id_red_conocimiento: id_red_conocimiento} })
  if (seenetwork) {
    estructuraapi.setResultado(seenetwork);
    // estructuraApi.setEstado();
  } else {
    estructuraapi.setEstado(404, "not found", "network not found");
  }
  res.json(estructuraapi.toResponse());
};

exports.createNetwork = async (req, res) => {
  const parameters = req.body

  const networkc = await network.create({
    red_conocimiento: parameters.red_conocimiento,
    observacion_red_conocimiento: parameters.observacion_red_conocimiento,
    activa: parameters.activa,
  })

  res.json(networkc)
}




