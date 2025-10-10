const { DataTypes } = require("sequelize");
const db = require("../../config/connection");
const { Model } = require('sequelize');

class Aprendiz extends Model { }
Aprendiz.init({
    id_aprendiz: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    fecha_nacimiento: DataTypes.STRING,
    genero: DataTypes.STRING,
    discapacidad: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correo_misena: DataTypes.STRING,
    correo_alternativo: DataTypes.STRING,
    municipio_id: DataTypes.INTEGER,
    centro: DataTypes.STRING,
    programa_id: DataTypes.BIGINT,
    inicio_lectiva: DataTypes.STRING,
    incio_productiva: DataTypes.STRING,
    contrato_inicio: DataTypes.STRING,
    contrato_fin: DataTypes.STRING,
    ficha: DataTypes.STRING,
    identificacion: DataTypes.STRING,
    tipo_documento: DataTypes.STRING,
    //departamento: DataTypes.STRING,
    fin_lectiva: DataTypes.STRING,
    fin_productiva: DataTypes.STRING,
    regional: DataTypes.STRING,
    fase_aprendiz: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
        type: DataTypes.NOW,
        // allowNull: false,
        field: "creado",
    },
    updatedAt: {
        type: DataTypes.NOW,
        // allowNull: false,
        // defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        field: "actualizado",
    },
    perfil_id :DataTypes.BIGINT
},
    {
        db,
        sequelize: db,
        modelName: "Aprendiz",
        tableName: "aprendices"
    })

module.exports = Aprendiz;