const { Resend } = require('resend');
const resend = new Resend('re_hJvaVrLR_C9k2SMa88HtfPnySjY7G6iHz');
const EstructuraApi = require("../../helpers/estructuraApi");

const envioEmail = async (req, res) => {
    let estructuraApi = new EstructuraApi();
    const {asunto,mensaje,email} = req.body
try {
    const envio = resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'aobando@sena.edu.co',
        subject: asunto,
        html: `<p>${mensaje}</p> <hr/>
        <p>Mi correo es el siguiente '<strong>${email}</strong></p>
        `,
      })
    const {id} = await envio
    if(id === undefined){
        estructuraApi.setEstado(404, "error", "No se pudo enviar el mensaje")
        return res.json(estructuraApi.toResponse()) 
    }else{
        estructuraApi.setEstado(200, "success", "Mensaje enviado correctamente")
    }
    res.json(estructuraApi.toResponse())
  } catch (error) {
    estructuraApi.setEstado(404, "error", error)
    return res.json(estructuraApi.toResponse()) 
  }
}

module.exports = {
    envioEmail
}
