require('dotenv').config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: process.env.DB_PORT,
        define: {
            timestamps: false, 
            underscored: false 
        },
        logging: false  
    }
);


sequelize.authenticate()
    .then(() => {
        console.log(`Connected successfully to database: ${process.env.DB_NAME}`);
        // return sequelize.sync({ alter: true }); 
    })
    .catch(err => {
        console.log(`Connection failed:`, err.message);
    });

    const pgConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
};

module.exports = {sequelize, pgConfig};