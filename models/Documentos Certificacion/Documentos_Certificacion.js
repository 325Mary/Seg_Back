const { Model, DataTypes } = require('sequelize')
const {sequelize} = require('../../config/connection')
const moment = require('moment-timezone');
// const { database } = require('../../env');

class Documentos_Certificacion extends Model {}

Documentos_Certificacion.init({
    id_documentos_cert:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    asignacion_id:DataTypes.BIGINT,
    documento_id:DataTypes.BIGINT,
    observacion:DataTypes.STRING,
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
    requisito_id: DataTypes.BIGINT
},
    {
        sequelize,
        sequelize: sequelize,
        modelName: 'Documentos_Certificacion',
        tableName: 'documentos_certificacion'
})
module.exports = Documentos_Certificacion