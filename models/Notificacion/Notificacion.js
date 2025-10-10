const  { Model,DataTypes } = require('sequelize')
const db = require('../../config/connection')
const moment = require('moment-timezone');


class Notificacion extends Model{}

Notificacion.init({
    
    id_notificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: DataTypes.STRING,
    notificacion: DataTypes.STRING,
    ruta: DataTypes.STRING,
    usuario_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,

    },
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
    db,
    sequelize: db,
    modelName: 'Notificacion',
    tableName: 'notificaciones'
});

module.exports = Notificacion