const  DataTypes = require('sequelize')
const sequelize = require('../../config/connection')
const moment = require('moment-timezone');
const { Model } = require('sequelize');



class  Redes extends Model{}

Redes.init({
    id_red_conocimiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    red_conocimiento: DataTypes.STRING,
    observacion_red_conocimiento: DataTypes.STRING,
    activa: DataTypes.CHAR,

    createdAt: {
        type: DataTypes.NOW,
        allowNull: false,
        defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        field: 'creado'
      },

    updatedAt:{
        type: DataTypes.NOW,
        allowNull: false,
        defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        field: 'actualizado'
      },
},
{
    sequelize: sequelize,
    modelName: 'Redes',
    tableName: 'redes'
});

module.exports = Redes