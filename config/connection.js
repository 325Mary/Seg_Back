const {Sequelize} = require('sequelize');
const database = require('../env')

const sequelize = new Sequelize(
    database.database,
    database.user,
    database.password,
    {
        host:database.host,
        dialect:"postgres",
        port:database.port,
        difine:{
            timestamps :false
        },
    }
);
//conect database
sequelize.sync(/*{force:false}*/).then(()=>{  //  if force === true ::: == DROP DATABASE
    console.log(`conect successfully database : ${database.database}`);
}).catch(err =>{
    console.log(`conecct failed : [${err}]`);
})

module.exports = sequelize