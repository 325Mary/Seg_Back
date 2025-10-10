const consultasSql = require('./ConsultSql')


exports.searchChidren = async (req ,res ) => {

    const {id_user} = req.params

    const userData = await this.obtenDataUserAndPerfil(id_user)

    const idds =  await this.GetModulesOfuser(userData.perfil_id)
    
    const allItemModulos = await consultasSql.getItemModeules()
    
    const parents = await this.findParent(idds , allItemModulos )

    const object = await this.getChildres(parents , allItemModulos)

    res.json(object)
}

exports.getChildres = async (parents , allitemModules ) => {
    let array = []
    let childrens = []
    parents.map(function(data , interator){
        console.log(data.name);
        for (let datos of allitemModules) {
            if ( datos.item_modulo_id == data.id_item_modulo) {
                    // array.push(datos)
                    console.log(array);
                    continue
            }
        } 
    })
    childrens = [...array]
    return childrens
}   



exports.buildjson = async (req , res ) => {

}

exports.obtenDataUserAndPerfil = async ( id_user ) => {

    const dataUser = await consultasSql.obtenIdUserAndModules(id_user)

    return dataUser
}

exports.GetModulesOfuser = async ( id_perfiles ) => { // get id modules 

   const perfiles = await consultasSql.obtenModulesByPerfilUuser(id_perfiles)

    return perfiles
}

exports.findParent = async (idds , allitemModules  ) => {
    
    let parentsidd = []
    let array = []

    allitemModules.map(data => {

        if (data.item_modulo_id === null) {
            array.push({id_item_modulo : data.id_item_modulo,name :  data.item_modulo})
        }
    })
    array.map(function (data , iterator ) {

        for (let iddata of idds) {
            if (iddata.item_modulo_id == data.id_item_modulo) {
                parentsidd.push(data)
                    break
            }
        } 
    })

    return parentsidd
}

