const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.PASSWORDEMAIL,
  },
})

transporter.verify().then(() => { 
  console.log("✅ Conexión SMTP exitosa - Listo para enviar emails")
}).catch(err => {
  console.error("❌ Error de autenticación SMTP:", err.message)
  console.error("Verifica tus credenciales en el archivo .env")
})

module.exports = transporter