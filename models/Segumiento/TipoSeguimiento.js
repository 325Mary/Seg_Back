const { Model, DataTypes } = require('sequelize')
const {sequelize} = require('../../config/connection')
const moment = require('moment-timezone');

class TipoSeguimiento extends Model { }
TipoSeguimiento.init({
    id_tipo_seguimiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_seguimiento: DataTypes.STRING,
    estado_seguimiento: DataTypes.STRING,
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
}, {
    sequelize,
    sequelize: sequelize,
    modelName: 'TipoSeguimiento',
    tableName: 'tipo_seguimiento',
})

module.exports = TipoSeguimiento