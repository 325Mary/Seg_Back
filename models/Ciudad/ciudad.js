const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/connection');
const moment = require('moment-timezone');

class Ciudad extends Model {}

Ciudad.init({
  id_ciudad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  departamento_id: {
    type: DataTypes.INTEGER,
    allowNull: true
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
  modelName: 'Ciudad',
  tableName: 'ciudad',
  timestamps: true
});

module.exports = Ciudad;
