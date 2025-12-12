
const municipiosModel = require('../../models/municipios/municipios')
const estructuraApi = require('../../helpers/estructuraApi')
const {sequelize} = require('../../config/connection')

exports.GetAllMunicipios = async(req , res ) => {
    const api = new  estructuraApi()
    const municipios = await sequelize.query(`SELECT m.*, d.departamento FROM municipios m JOIN departamentos d ON m.departamento_id = d.id_departamento`);
    api.setResultado(municipios)
    
    return res.json(api.toResponse())
}