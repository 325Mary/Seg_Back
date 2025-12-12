const  { Model,DataTypes } = require('sequelize')
const {sequelize} = require('../../config/connection')
const moment = require('moment-timezone');


class Asignacion extends Model{}

Asignacion.init({
    
    id_asignacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    aprendiz_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,

    },
    fecha_seguimiento_inicial: DataTypes.DATEONLY,
    fecha_seguimiento_parcial: DataTypes.DATEONLY,
    fecha_seguimiento_final: DataTypes.DATEONLY,
    fecha_evaluacion_final: DataTypes.DATEONLY,
    seg_1: DataTypes.STRING,
    seg_2: DataTypes.STRING,
    seg_3: DataTypes.STRING,

    // fecha_evaluacion_final: DataTypes.DATEONLY,
    estado_fase_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,

    },
    usuario_responsable_id: {
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
      novedad_id: DataTypes.BIGINT

},
{
    sequelize,
    sequelize: sequelize,
    modelName: 'Asignacion',
    tableName: 'asignacion'
});

module.exports = Asignacion