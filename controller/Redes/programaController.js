const ProgramaFormacion = require("../../models/ProgramaFormacion");
const associations = require("../../models/asociations")
const EstructuraApi = require("../../helpers/estructuraApi");
const Redes = require("../../models/Redes/Red");


exports.getProgramaFormacion = async (req, res) => {
    let estructuraApi = new EstructuraApi();
    const programas = await ProgramaFormacion.findAll();

    if (programas.length > 0) {
        estructuraApi.setResultado(programas);
    } else {
        estructuraApi.setEstado(404, "error", "list programs not found")
    }
    res.json(estructuraApi.toResponse())
}

exports.getByIdProgramaFormacion = async (req, res) => {

    let estructuraapi = new EstructuraApi();

    const { id } = req.params;
    const programa = await ProgramaFormacion.findOne({
        where: { id_programa_formacion: id }
    })

    if (programa) {
        estructuraapi.setResultado(programa);
    } else {
        estructuraapi.setEstado(404, "error", "program not found")
    }
    return res.json(estructuraapi.toResponse())

}

exports.getAreawithPrograms = async (req, res) => {
    let estructuraApi = new EstructuraApi();

    const { id } = req.params;
    const programs = await ProgramaFormacion.findAll({
        where: {
            red_id: id
        }
    })

    if(programs){
        estructuraApi.setResultado(programs)
    }else{
        estructuraApi.setEstado(404, "error", "this areas not found programs")
    }
    return res.json(estructuraApi.toResponse())
}