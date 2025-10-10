const RegistroEtapa = require("../../models/Aprendiz/RegistroEtapaProductiva");
const associations = require("../../models/asociations")
const EstructuraApi = require("../../helpers/estructuraApi");
const Aprendiz = require("../../models/Aprendiz/Aprendiz");

exports.getRegistrosEtapa = async (req, res) => {
    let estructuraApi = new EstructuraApi();
    const registros = await RegistroEtapa.findAll();

    if (registros.length > 0) {
        estructuraApi.setResultado(registros)
    } else {
        estructuraApi.setEstado(404, "error", "record list not found")
    }
    res.json(estructuraApi.toResponse())
};

class RegistroEtapaBTO {
    nit_eps = "";
    eps = "";
    nit_arl = "";
    nombre_empresa = "";
    nit_empresa = "";
    ciudad = "";
    direccion = "";
    telefono = "";
    correo = "";
    modalidad = "";
    observacion = "";
    representante_legal = "";
    identificacion_representante = "";

}

exports.createRegistroEtapa = async (req, res) => {
    let estructuraApi = new EstructuraApi();
    const id = req.params.id
    repObj = new RegistroEtapaBTO
    repObj = req.body

    const newRegistro = RegistroEtapa.create({
        nit_eps: repObj.nit_eps,
        eps: repObj.eps,
        nit_arl: repObj.nit_arl,
        nombre_empresa: repObj.nombre_empresa,
        nit_empresa: repObj.nit_empresa,
        ciudad: repObj.ciudad,
        direccion: repObj.direccion,
        telefono: repObj.telefono,
        correo: repObj.correo,
        modalidad: repObj.modalidad,
        observacion: repObj.observacion,
        representante_legal: repObj.representante_legal,
        identificacion_representante: repObj.identificacion_representante,
        aprendiz_id: id
    })

    estructuraApi.setResultado(newRegistro)
    res.json(estructuraApi.toResponse())
}
exports.deleteRegistroEtapa = async (req, res) => {
    const { id } = req.params;
    await RegistroEtapa.destroy({
        where: {
            id_empresa: id
        }
    })
    res.json({
        message: 'successful deletion of the report'
    })
    try {

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}
exports.updateRegistroEtapa = async (req, res) => {
    const { id } = req.params;
    repObj = new RegistroEtapaBTO
    repObj = req.body
    try {
        const respuesta = await RegistroEtapa.findOne({ where: { id_empresa: id } })
            respuesta.nit_eps = repObj.nit_eps,
            respuesta.eps = repObj.eps,
            respuesta.nombre_empresa = repObj.nombre_empresa,
            respuesta.nit_empresa = repObj.nit_empresa,
            respuesta.ciudad = repObj.ciudad,
            respuesta.direccion = repObj.direccion,
            respuesta.telefono = repObj.telefono,
            respuesta.correo = repObj.correo,
            respuesta.modalidad = repObj.modalidad,
            respuesta.observacion = repObj.observacion,
            respuesta.representante_legal = repObj.representante_legal,
            respuesta.identificacion_representante = repObj.identificacion_representante
        await respuesta.save()
        res.json('Register updating succesfully');
        console.log(respuesta);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}
exports.getByIdRegistroEtapa = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await RegistroEtapa.findOne({
            where: {
                id_empresa: id
            }
        })
        if (!respuesta) return res.status(404).json('this stage record does not exist')
        res.json(respuesta);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}
exports.deleteRegistroAprendiz = async (req, res) => {
    let estructuraApi = new EstructuraApi();
    const { id } = req.params
    const registro = await RegistroEtapa.destroy({
        where: {
            aprendiz_id: id
        }
    })
    estructuraApi.setEstado('Aprendiz eliminado con exito')
    const aprendiz = await Aprendiz.destroy({
        where: {
            id_aprendiz: id
        }

    })
    let AprendizREP = {...registro,...aprendiz}
    estructuraApi.setEstado('Reporte eliminado con exito')
    estructuraApi.setResultado(AprendizREP)
    res.json(estructuraApi.toResponse())
}
