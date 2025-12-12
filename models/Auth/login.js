const  {DataTypes,Model} = require('sequelize')
const {sequelize} = require('../../config/connection')
const moment = require('moment-timezone');


 class User extends Model{}
 
 User.init({
    id_usuario :{
        type : DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement : true,
    },
    perfil_id :DataTypes.INTEGER ,
    centro :DataTypes.STRING ,
    nombres :DataTypes.STRING ,
    apellidos :DataTypes.STRING,
    correo_institucional:DataTypes.STRING,
    correo_alternativo:DataTypes.STRING,
    identificacion:DataTypes.STRING,
    genero:DataTypes.STRING,
    ciudad_residencia :DataTypes.STRING,
    area_id :DataTypes.INTEGER,
    numero_telefono :DataTypes.INTEGER,
    contrasena:DataTypes.STRING,
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
    id_centro_formacion :DataTypes.INTEGER ,
},{
    sequelize,
    sequelize : sequelize,
    modelName :"User",
    tableName:"usuario",
})

module.exports = User