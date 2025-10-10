const { DataTypes,Model } = require("sequelize");
const db = require("../../config/connection");

class Seguimiento extends Model {}
Seguimiento.init({
    id_perfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    perfil : DataTypes.STRING , 
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
        db,
        sequelize: db,
        modelName: 'ModelPerfiles',
        tableName: 'perfiles'
    })
module.exports = Seguimiento;