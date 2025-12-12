const bcrypt = require('bcrypt');
const modelUser = require('../../models/Auth/login')
const jwt = require('../../controller/Auth.controller/token');
const estructuraApi = require('../../helpers/estructuraApi');
const saltRounds = 4

exports.LoginUser = async (request, response) => {
    const api = new estructuraApi()
    const { body } = request
    const { identificacion, password } = body
    //consult de user
    const user = await modelUser.findOne({ where: { identificacion: identificacion } })

    const passwortCorrect =//use ternarias
        user === null //condition
            ?
            false //si es true
            : await bcrypt.compare(password, user.contrasena) //si es false
    /*second validate pasword if pasword */

    if (!(identificacion && passwortCorrect)) {
        api.setEstado('401', 'info', 'contraseña o identificación invalida')
        response.json(api.toResponse())
    } else {
        let jsontoken = new jwt()
        let userForToken = {
            id: user.id_usuario,
            perfil_id: user.perfil_id,
            identificacion: user.identificacion,
            pasword: user.contrasena,
            id_centro_formacion: user.id_centro_formacion
        }
        let token = jsontoken.sing(userForToken, process.env.PASWORDTOKEN)
        let tokenobject = { token: token }
        const res = { ...userForToken, ...tokenobject }

        api.setResultado(res)
        response.status(200).json(api.toResponse())
    }
}

exports.updatePasswordUser = async (req, res) => {
    const api = new estructuraApi()
    const { body } = req
    const { id_usuario } = req.params

    const { oldpassword, password, confirmpassword } = body
    const user = await modelUser.findOne({ where: { id_usuario } })

    const verifyUser = user === null ? false : true

    if (!verifyUser) {
        api.setEstado(403, "error", "El Usuario que Inteto realizar la peticion no existe")
        return res.json(api.toResponse())
    }
    const comparePasswordOld = await bcrypt.compare(oldpassword, user.contrasena)

    if (!comparePasswordOld) {
        api.setEstado(403, "error", "la contraseña anterior no es correcta")
        return res.json(api.toResponse())
    }
    const newPasword = password == confirmpassword ? true : false

    if (!newPasword) {
        api.setEstado(403, "error", "las nuevas contraseñas no coinciden")
        return res.json(api.toResponse())
    }

    const verifyPasswordAndOldPasword = password == oldpassword ? false : true

    if (!verifyPasswordAndOldPasword) {
        api.setEstado(403, "error", "No estas Realizando Ningun Cambio Tu Contraseña nueva Es igual a la Anterior")
        return res.json(api.toResponse())
    }

    const contrasenaHashing = await bcrypt.hash(password, saltRounds)//encriptar paswort

    await modelUser.update(
        { contrasena: contrasenaHashing },
        { where: { id_usuario } })
        .then(succ => {
            api.setEstado('SUC-001', "success", "Cambio de Contraseña realizado con exito")
            api.setResultado({ contrasenaHashing })
        }).catch(err => {
            api.setEstado(err.parent || err, 'error', err.parent.detail || err)
        })

    return res.json(api.toResponse())

}