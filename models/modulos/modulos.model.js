const  {DataTypes,Model} = require('sequelize')
const sequelize = require('../../config/connection')
const moment = require('moment-timezone');


 class Module extends Model{}
 
 Module.init({
    id_modulo :{
        type : DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement : true,
    },
    modulo  :DataTypes.STRING ,
    descripcion_modulo :DataTypes.STRING ,
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
},{
    sequelize,
    sequelize : sequelize,
    modelName :"moduloModel",
    tableName:"modulo",
})

module.exports = Module