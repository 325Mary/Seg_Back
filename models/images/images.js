const { DataTypes, Model } = require('sequelize')
const {sequelize} = require('../../config/connection')
const moment = require('moment-timezone');


class Images extends Model { }

Images.init({
    id_photo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: DataTypes.STRING,
    path: DataTypes.STRING,
    user_id: DataTypes.STRING,
    aprendiz_id: DataTypes.STRING,
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
    modelName: 'imagesModel',
    tableName: 'images'
})

module.exports = Images