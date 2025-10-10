const bcrypt = require('bcrypt');
const modelAprendiz = require('../../models/Aprendiz/Aprendiz')
const jwt = require('./token');
const estructuraApi = require('../../helpers/estructuraApi');
const modelAsignacion = require('../../models/Asignacion/Asignacion');
const saltRounds = 4 

exports.LoginAprendiz = async (req, res) => {
    const api = new estructuraApi()
    const { body } = req

    const { identificacion, password } = body
    //consult de user
    const aprendiz = await modelAprendiz.findOne({
        where: { identificacion: identificacion }, 
        include : [modelAsignacion ]
    })
    // return res.json(aprendiz)

    const passwortCorrect = //use ternarias
        aprendiz === null //condition
            ?
            false //si es true
            : await bcrypt.compare(password, aprendiz.password) //si es false
    // : aprendiz.password == password ? true : false //si es false

    /*second validate pasword if pasword */
    if (!(identificacion && passwortCorrect)) {
        api.setEstado('401', 'info', 'contraseña o identificación incorrectos')
        return res.json(api.toResponse())
    } else {
        let jsontoken = new jwt()
        const id_asignacion = aprendiz.Asignacions < 1 ? null : aprendiz.Asignacions[0].id_asignacion
        let userForToken = {
            id: aprendiz.id_aprendiz,
            perfil_id: aprendiz.perfil_id,
            identificacion: aprendiz.identificacion,
            pasword: aprendiz.password,
            id_asignacion :id_asignacion,
        }
        let token = jsontoken.sing(userForToken)
        let tokenobject = { token: token }
        const res = { ...userForToken, ...tokenobject }

        api.setResultado(res)

    }
    return res.status(200).json(api.toResponse())
}

exports.updatePasswordAprendiz = async (req, res) => {
    const api = new estructuraApi()
    const { body } = req
    const { id_aprendiz } = req.params

    const { oldpassword, password, confirmpassword } = body

    const aprendiz = await modelAprendiz.findOne({ where: { id_aprendiz } })

    const verifyUser = aprendiz === null ? false : true

    if (!verifyUser) {
        api.setEstado(403, "error", "El Aprendiz que Intento realizar la peticion no existe")
        return res.json(api.toResponse())
    }
    const comparePasswordOld = await bcrypt.compare(oldpassword, aprendiz.password)

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

    await modelAprendiz.update(
        { password: contrasenaHashing },
        { where: { id_aprendiz } })
        .then(succ => {
            api.setEstado('SUC-001', "success", "Cambio de Contraseña realizado con exito")
            api.setResultado({ contrasenaHashing })
        }).catch(err => {
            api.setEstado(err.parent || err, 'error', err.parent.detail || err)
        })

    return res.json(api.toResponse())

}