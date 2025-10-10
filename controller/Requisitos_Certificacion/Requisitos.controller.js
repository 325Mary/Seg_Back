const EstructuraApi = require("../../helpers/estructuraApi");
const associations = require("../../models/asociations")
const Requisitos_Certificacion = require("../../models/Requisitos Certificacion/Requisitos")

exports.allRequisitos = async (req, res) =>{
    const estructuraApi = new EstructuraApi()
    const requisitos_certificacion = await Requisitos_Certificacion.findAll()
    if(requisitos_certificacion.length > 0){
        estructuraApi.setResultado(requisitos_certificacion)
    }else{
        estructuraApi.setEstado(404,"error","No se encuentra ningun requisito")
    }
    res.json(estructuraApi.toResponse())
}