const express = require('express') //import express con ESM
const app = express()//import expresss
const path = require('path'); 
const cors = require('cors')//enable cors conecttion angular
const morgan = require('morgan')
require('./config/connection') //import the running database connection
require('dotenv').config();//import listen .env variables globlas



app.use(cors())
//code convert a json
app.use(express.json())
//listenig routres
app.use('/api',require('./router/routes_index'))
//testing full desarollo
app.use(morgan('dev'))
//this folder for this application will used to store public files 

app.use(express.static(path.join(__dirname, 'storage')))
//configuracion para publicar un carpeta del proyecto

//create port
const PORT = process.env.PORT|| 3003 // cambio PORT 3000 a 3003
//running port
app.listen(PORT ,(err)=>{
    if(err){
        console.log(`error serve:${err}`);
    }else{
        console.log(`serve running succefull in port: ${PORT}`);
    }
})