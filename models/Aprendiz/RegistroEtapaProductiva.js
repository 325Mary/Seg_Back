const  DataTypes = require('sequelize')
const {sequelize} = require('../../config/connection')
// const moment = require('moment-timezone');
const { Model } = require('sequelize');

class RegistroEtapaProductiva extends Model { }

RegistroEtapaProductiva.init({
  id_empresa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nit_eps: DataTypes.STRING,
  eps: DataTypes.STRING,
  nit_arl: DataTypes.STRING,
  nombre_empresa: DataTypes.STRING,
  nit_empresa: DataTypes.STRING,
  municipio_id: DataTypes.INTEGER,
  direccion: DataTypes.STRING,
  telefono: DataTypes.STRING,
  correo: DataTypes.STRING,
  modalidad: DataTypes.STRING,
  observacion: DataTypes.STRING,
  representante_legal: DataTypes.STRING,
  identificacion_representante: DataTypes.STRING,
  arl: DataTypes.STRING,
  razon_social: DataTypes.STRING,
  //departamento_empresa: DataTypes.STRING,
  createdAt: {
  type: DataTypes.DATE,
  allowNull: false,
  defaultValue: DataTypes.NOW,
  field: 'creado'
},

updatedAt: {
  type: DataTypes.DATE,
  allowNull: false,
  defaultValue: DataTypes.NOW,
  field: 'actualizado'
},

  aprendiz_id: DataTypes.BIGINT,

},
  {
    sequelize,
    sequelize: sequelize,
    modelName: "RegistroEtapaProductiva",
    tableName: "registro_etapa_productiva",
    timestamps: true, 
    createdAt: 'creado',
  updatedAt: 'actualizado'
  }
);



module.exports = RegistroEtapaProductiva;