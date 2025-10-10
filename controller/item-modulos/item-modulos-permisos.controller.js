const consultasSql = require('./ConsultSql')
const estructuraApi = require('../../helpers/estructuraApi')
const modelItemModulePerfil = require('../../models/itemModulosPerfiles.model/item_modulos_perfiles')
const modelItemModule = require('../../models/ItemModulos.model/item_modulos')
const modelPerdil = require('../../models/perfiles.model/perfilModeel')
var requestModulePerfil = require('../../models/DTO/modulosperfiles')

require('../../models/asociations')
let contador = true
let list = []
let item_formodule

exports.AsignarItems = async (req, res) => {

    const api = new estructuraApi

    const itemModule = await consultasSql.getItemModeules()

    if (!itemModule) {
        api.setEstado(204, "empty", "no se encuentra ningun item Modulo ")
        return res.json(api.toResponse())
    }
    api.setResultado(itemModule)
    return res.json(api.toResponse())
}

exports.ConsultItemModule = async (req, res) => {

    const api = new estructuraApi()


    const idd = await req.params.id_item_modulo

    let listaItem_modules = await consultasSql.getItemModeleByID(idd)

    let allList = await consultasSql.getItemModeules()

    await this.FilterItemModules(res, listaItem_modules[0].item_modulo_id, allList, listaItem_modules[0])

}

exports.FilterItemModules = async (res, item_modulo_id, array, listaItem_modules) => {

    if (item_modulo_id === null) {
        await this.SearchChildres(res, item_modulo_id, array, listaItem_modules)
    } else {
        await this.SearchPhater(res, item_modulo_id, array, listaItem_modules)
    }

}

exports.SearchChildres = async (res, item_modulo_id, array, listaItem_modules) => {
    let val
    // if (contador) {
    item_formodule = await array.filter(data => data.modulo_id === listaItem_modules.modulo_id)

    val = await item_formodule.filter(data => data.item_modulo_id === listaItem_modules.id_item_modulo)

    if (val == "" || val.length == 0 || val == null) {
        res.json(`el Modulo padre "${listaItem_modules.item_modulo}" no tiene hijos`)
    } else {
        res.json(val)
    }

}
//metho search phather retur json 
exports.SearchPhater = async (res, item_modulo_id, array, listaItem_modules) => {
    let id_now
    if (contador) {
        id_now = array.filter(data => data.id_item_modulo == item_modulo_id)
        list.push(id_now[0])
        contador = false
        await this.SearchPhater(res, id_now[0].item_modulo_id, array, listaItem_modules)

    } else {
        id_now = array.filter(data => data.id_item_modulo == item_modulo_id)
        list.push(id_now[0])

        if (id_now[0].item_modulo_id == null) {
            await list.push({ childrens: listaItem_modules })
            res.json(list)
        } else {
            await this.SearchPhater(res, id_now[0].item_modulo_id, array, listaItem_modules)
        }

    }
}

exports.allperfiles = async (req, res) => {

    const api = new estructuraApi
    const perfiles = await consultasSql.getAllPerfiles()


    perfiles == null || perfiles.length == 0 ?
        api.setEstado(204, "empety", "no se encuentran perfiles")
        : api.setResultado(perfiles)

    return res.json(api.toResponse())
}

exports.getAllModulePerfiles = async (req, res) => {
    const api = new estructuraApi

    const modules = await modelItemModulePerfil.findAll({ include: [modelPerdil, modelItemModule] })

    if (!modules) {
        api.setEstado(204, "empty", "no se encuentra ningun modulo")
        return res.json(api.toResponse())
    }
    api.setResultado(modules)
    return res.json(api.toResponse())
}

exports.createModulePerfil = async (req, res) => {
    const api = new estructuraApi
    requestModulePerfil = req.body
    let modules = []

    if (requestModulePerfil.perfil_id.length > 1) {
        for (const perfil of requestModulePerfil.perfil_id) {
            await modelItemModulePerfil.create({
                item_modulo_id: requestModulePerfil.item_modulo_id,
                perfil_id: perfil
            })
                .then(res => {
                    modules.push(res)
                    api.setResultado(modules)
                })
                .catch(error => {
                    api.setEstado(500, 'error', error.original.detail || error) 
                })
        }
    } else {
        await modelItemModulePerfil.create(requestModulePerfil)
            .then(res => {
                // modules = []
                modules.push(res)
                api.setResultado(res)
            })
            .catch(error => {
                api.setEstado(500, 'error', error.original.detail || error)
            })
    }
    return res.json(api.toResponse())
}


exports.getOneItemModulePerfil = async (req, res) => {
    const api = new estructuraApi
    const { id_item_modulo_perfil } = req.params

    const modules = await modelItemModulePerfil.findOne(
        { where: { id_item_modulo_perfil } },
        { include: [modelPerdil, modelItemModule] }
    )

    if (!modules) {
        api.setEstado(204, "empty", "no se encuentra ningun modulo")
        return res.json(api.toResponse())
    }
    api.setResultado(modules)
    return res.json(api.toResponse())
}

exports.getAllItemModulo = async () => {
        const api = new estructuraApi
    
        const modules = await consultasSql.getItemModeules()
    
        if (!modules) {
            api.setEstado(204, "empty", "no se encuentra ningun modulo")
            return res.json(api.toResponse())
        }
        api.setResultado(modules)
        return res.json(api.toResponse())
}

exports.deleteItemModulePerfil = async(req , res ) => {
    const api = new estructuraApi()
    const {id_item_modulo_perfil} = req.params
    await modelItemModulePerfil.destroy({where:{id_item_modulo_perfil}})
    .then(succ =>{
        if (succ != 0) {
            api.setEstado('SUCC','success',`id_item_modulo_perfil{${id_item_modulo_perfil}}:eliminado exitosamente`)
        }else{
            api.setEstado('INFO','info',`id_item_modulo_perfil {${id_item_modulo_perfil}}:!NO ENCONTRADO!`)
        }
    })
    .catch(err =>{
        api.setEstado(err.parent.code, "error",err.parent.detail)
    })
    res.json(api.toResponse())
}

