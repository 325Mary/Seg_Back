const { DataTypes, Model } = require('sequelize')
const sequelize = require('../../config/connection')
const moment = require('moment-timezone');


class User extends Model { }

User.init({
    id_municipio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    municipio: DataTypes.STRING,
    codigo_municipio: DataTypes.STRING,
    departamento_id: DataTypes.INTEGER,
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
    modelName: "municipios",
    tableName: "municipios",
})

module.exports = User