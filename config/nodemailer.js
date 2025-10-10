const nodemailer = require('nodemailer')
require('dotenv').config();//import listen .env variables globlas


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.USEREMAIL, // generated ethereal user
        pass: process.env.PASSWORDEMAIL, // generated ethereal password
    },
});

transporter.verify().then(data  =>{ 

    if (data) {
        console.log("Nos Conectamos Satisfactoria mente (!Ya puedes enviar emails !)");
    }else{
        console.log("Tenemos un error de Auntenticacion ");
    }
}).catch(err => {
    console.log(`ERROR => ${err}`);
    
})

module.exports = transporter

