const sendEmail = require('../../config/nodemailer') 
const estructuraApi = require('../../helpers/estructuraApi')

exports.SendEmailNotifications = async (req, res) => {
  const api = new estructuraApi()
  const { body } = req

  const { title, emailReceptores, subtitulo, text, html } = body

  if (!title || !emailReceptores || !subtitulo) {
    api.setEstado(400, 'error', 'Faltan campos requeridos: title, emailReceptores o subtitulo')
    return res.json(api.toResponse())
  }

  if (!emailReceptores.length) {
    api.setEstado(400, 'error', 'No hay destinatarios de correo')
    return res.json(api.toResponse())
  }

  if (!text && !html) {
    api.setEstado(400, 'error', 'Debe proporcionar al menos text o html para el cuerpo del correo')
    return res.json(api.toResponse())
  }

  try {
    
    const info = await sendEmail.sendMail({
      from: `"${title}" <${process.env.USEREMAIL}>`,
      to: emailReceptores,
      subject: subtitulo,
      text: text || '',
      html: html || '',
    })

    console.log('✅ Correo enviado exitosamente:', info.messageId)
    
    api.setResultado(info)
    api.setEstado('SUC-001', 'success', 'Se enviaron los correos satisfactoriamente')
    return res.json(api.toResponse())

  } catch (err) {
    console.error('❌ Error al enviar correo:', err)
    
    api.setEstado(500, 'error', `Error al enviar el correo: ${err.message}`)
    return res.json(api.toResponse())
  }
}