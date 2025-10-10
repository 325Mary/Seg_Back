const EstructuraApi = require("../../helpers/estructuraApi");
const Fase = require("../../models/Fase/Estado.fase");

exports.AllFases= async (req, res) =>{
    let estructuraApi = new EstructuraApi()
    const fases = await Fase.findAll()
    estructuraApi.setResultado(fases)
    res.json(estructuraApi.toResponse())
}