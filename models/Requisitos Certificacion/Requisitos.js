const { Model, DataTypes } = require('sequelize')
const db = require('../../config/connection')
const moment = require('moment-timezone');
const { database } = require('../../env');

class Requisitos_Certificacion extends Model {}

Requisitos_Certificacion.init({
    id_requisito_cert:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:DataTypes.STRING,
    estado:DataTypes.STRING,
    createdAt: {
        type: DataTypes.NOW,
        allowNull: false,
        defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        field: 'creado'
    },

    updatedAt: {
        type: DataTypes.NOW,
        allowNull: false,
        defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        field: 'actualizado'
    },
    observacion: DataTypes.STRING,
},
    {
        db,
        sequelize: db,
        modelName: 'Requisitos_Certificacion',
        tableName: 'requisitos_certificacion'
})
module.exports = Requisitos_Certificacion