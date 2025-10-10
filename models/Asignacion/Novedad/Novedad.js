const { DataTypes,Model } = require("sequelize");
const db = require("../../../config/connection");

class Novedades extends Model{}
Novedades.init({
    id_novedad:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_novedad: DataTypes.STRING,
    observacion: DataTypes.STRING,
    fecha_novedad: DataTypes.DATE,
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
    modelName:'Novedades',
    tableName: 'novedades'
})
module.exports = Novedades;