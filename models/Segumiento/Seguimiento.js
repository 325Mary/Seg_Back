const { DataTypes,Model } = require("sequelize");
const {sequelize} = require("../../config/connection");

class Seguimiento extends Model {}
Seguimiento.init({
    id_seguimiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_seguimiento_id: DataTypes.BIGINT,
    observacion: DataTypes.STRING,
    observacion_finalizacion: DataTypes.STRING,
    estado_documento: DataTypes.STRING,
    documento_id: DataTypes.BIGINT,
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
    asignacion_id: DataTypes.BIGINT
},
    {
        sequelize,
        sequelize: sequelize,
        modelName: 'Seguimiento',
        tableName: 'seguimiento'
    })
module.exports = Seguimiento;