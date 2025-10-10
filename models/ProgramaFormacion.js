const {Sequelize, DataTypes, Model} = require('sequelize');
const Red  = require ('../models/Redes/Red');
const db = require('../config/connection');


class ProgramaFormacion extends Model{}
ProgramaFormacion.init({
    id_programa_formacion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo_programa:DataTypes.STRING,
    tipo_programa:DataTypes.STRING,
    programa_formacion:DataTypes.STRING,
    red_id:DataTypes.BIGINT,
    createdAt: {
        type: DataTypes.NOW,
        allowNull: false,
        field: "creado",
      },
      updatedAt: {
        type: DataTypes.NOW,
        allowNull: false,
        field: "actualizado",
      },
},
    {
        db,
        sequelize:db,
        modelName:"ProgramaFormacion",
        tableName:"programa_formacion"
    }
);


module.exports = ProgramaFormacion;