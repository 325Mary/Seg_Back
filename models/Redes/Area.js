const  { Model,DataTypes } = require('sequelize')
const {sequelize} = require('../../config/connection')
const moment = require('moment-timezone');


class Areas extends Model{}

Areas.init({
    
    id_area: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    area: DataTypes.STRING,
    componentes: DataTypes.STRING,
    red_conocimiento_id: {
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

},
{
    sequelize,
    sequelize: sequelize,
    modelName: 'Areas',
    tableName: 'areas'
});

module.exports = Areas;