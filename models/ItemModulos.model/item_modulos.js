const { DataTypes, Model } = require("sequelize");
const {sequelize} = require("../../config/connection");

class Seguimiento extends Model { }
Seguimiento.init({
    id_item_modulo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modulo_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
    },
    item_modulo_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
    },
    item_modulo: DataTypes.STRING,
    descripcion_modulo: DataTypes.STRING,
    url_item_modulo: DataTypes.STRING,
    icono_item_modulo: DataTypes.STRING,
    estado: DataTypes.STRING,
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
},
    {
        sequelize,
        sequelize: sequelize,
        modelName: 'ItemModulosModel',
        tableName: 'item_modulos'
    })
module.exports = Seguimiento;