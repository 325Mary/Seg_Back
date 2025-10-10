const seendEmail = require('../../config/nodemailer')
const estructuraApi = require('../../helpers/estructuraApi')

/*send emails*/
exports.SendEmailNotifications = async (req, res) => {

  const api = new estructuraApi

  const { body } = req

  const {tittle , emailReseptores , subtitulo , text , html} = body

  const nullable = tittle != '' && emailReseptores != '' && subtitulo != '' ? true : false

  if (!nullable) {
    api.setEstado(204,'error' , 'no se envio el email por que es necesario tener todlos los datos para enviarlo ')
    return res.json(api.toResponse())
  }
  const nullable2 = text == '' && html == '' ? false : true

  if (!nullable2) {
    api.setEstado(204,'error' , 'no se envio el email por que no se encontro el cuerpo del email ')
    return res.json(api.toResponse())
  }

  await seendEmail.sendMail({
    from: `"${tittle}" < ${process.env.USEREMAIL}>`,
    to: emailReseptores,
    subject: subtitulo,
    text: text,
    html: html,
  }).then(succ=> {
      api.setResultado(succ)
  }).catch(err => {

  });
  
  api.setEstado('SUC-001', "success", "Se Envio los correos satisfactoriamente")
  return res.json(api.toResponse())

}
