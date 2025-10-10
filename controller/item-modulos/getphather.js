const consultasSql = require('./ConsultSql')
const estructorApi = require('../../helpers/estructuraApi')


exports.getPhatherByID = async (req, res) => {

    const api = new estructorApi

    const { id_perfil } = req.params

    const Fahther = await consultasSql.getNameItemModule(id_perfil)

    if (Fahther == null || Fahther == '') {
        api.setEstado(204, 'empty', 'No tienes permisos con tu rol actual solicita permisos al administrador')
        return res.json(api.toResponse())
    }
    api.setResultado(Fahther)
    return res.json(api.toResponse())

}

exports.getAllItemModule = async (req, res) => {
    const api = new estructorApi
    let array = []

    const allitemModules = await consultasSql.getAllItemModule()

    if (allitemModules.length < 0) {
        api.setEstado(204, "empty", "No se encontraron permisos")
        return res.json(api.toResponse())
    }

    for (const item of allitemModules) {
        const filter = allitemModules.filter(data => data.item_modulo == item.item_modulo)

        const resultado = valor => valor.url_item_modulo == item.url_item_modulo

        const result = array.some(resultado)

        if (result) {
            continue
        }

        let perfiles = []

        for (const fil of filter) {
            perfiles.push(fil.perfil_id)
        }

        const obj = {
            url_item_modulo: filter[0].url_item_modulo,
            item_modulo: filter[0].item_modulo,
            perfiles
        }

        array.push(obj)
    }

    api.setResultado(array)
    return res.json(api.toResponse())

}
