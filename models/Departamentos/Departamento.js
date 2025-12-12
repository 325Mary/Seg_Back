const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/connection');
const moment = require('moment-timezone');

class Departamento extends Model {}

Departamento.init({
  id_departamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: false
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
  modelName: 'Departamentos',
  tableName: 'departamentos',
  timestamps: true
});

module.exports = Departamento;
