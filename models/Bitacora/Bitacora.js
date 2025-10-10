const { Model, DataTypes } = require('sequelize')
const db = require('../../config/connection')
const moment = require('moment-timezone');


class Bitacora extends Model { }

Bitacora.init({

    id_bitacora: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    observacion: DataTypes.STRING,
    estado_documento: DataTypes.STRING,
    documento_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,

    },
    asignacion_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,

    },
    tipo_seguimiento_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,

    },
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

},
    {
        db,
        sequelize: db,
        modelName: 'Bitacora',
        tableName: 'bitacoras',
    });

module.exports = Bitacora