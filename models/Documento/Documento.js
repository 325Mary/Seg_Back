const  { Model,DataTypes } = require('sequelize')
const {sequelize} = require('../../config/connection')
const moment = require('moment-timezone');


class Documentos extends Model{}

Documentos.init({
    
    id_documento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    documento: DataTypes.STRING,
    ruta: DataTypes.STRING,
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
    sequelize,
    sequelize: sequelize,
    modelName: 'Documentos',
    tableName: 'documentos'
});

module.exports = Documentos