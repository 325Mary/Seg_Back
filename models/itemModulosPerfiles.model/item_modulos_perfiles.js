const { DataTypes, Model } = require("sequelize");
const {sequelize} = require("../../config/connection");

class Seguimiento extends Model { }
Seguimiento.init({
    id_item_modulo_perfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    item_modulo_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
    },
    perfil_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
    },
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
        modelName: 'itemModulePerfilModel',
        tableName: 'item_modulo_perfil'
    })
module.exports = Seguimiento;