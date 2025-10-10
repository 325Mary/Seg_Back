const {validationResult} = require('express-validator');
const EstructuraApi = require('../helpers/estructuraApi');

const validateFields = (req, res, next) => {
    let estructuraApi = new EstructuraApi();
    const error = validationResult(req)
    if(!error.isEmpty()){
        estructuraApi.setEstado(404, "error", 'Todos los campos son requeridos');
        estructuraApi.setResultado(error)
        return res.json(estructuraApi.toResponse())
    } 
    next()
}

module.exports = {
    validateFields
}