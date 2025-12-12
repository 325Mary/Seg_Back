const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/connection');
const moment = require('moment-timezone');

class CentroFormacion extends Model {}

CentroFormacion.init({
  id_centro_formacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  direccion: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  municipio_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  departamento_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  responsable: {
    type: DataTypes.STRING
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    field: 'creado'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    field: 'actualizado'
  }
},
{
  sequelize,
  modelName: 'CentroFormacion',
  tableName: 'centro_formacion',
  timestamps: true
});

module.exports = CentroFormacion;
