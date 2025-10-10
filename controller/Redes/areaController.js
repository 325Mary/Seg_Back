const area = require("../../models/Redes/Area");
const Redes = require("../../models/Redes/Red");
const associations = require("../../models/asociations")
const estructuraApi = require("../../helpers/estructuraApi");

exports.seeAreas = async (req, res) => {
  let estructuraapi = new estructuraApi();
  const areas = await area.findAll({include: Redes});
  if (areas.length > 0) {
    estructuraapi.setResultado(areas);
  } else {
    estructuraapi.setEstado(404, "error", "list areas not found");
  }
  res.json(estructuraapi.toResponse());
};

exports.seeArea = async (req, res) => {
  
  let estructuraapi = new estructuraApi();

  const id_area = req.params.id_area;
  const seearea = await area.findOne({ where: { id_area: id_area },include:Redes,},
    
    
  );

  if (seearea) {
    estructuraapi.setResultado(seearea);
  } else {
    estructuraapi.setEstado(404, "error", "area not found");
  }

  return res.json(estructuraapi.toResponse());
};
 