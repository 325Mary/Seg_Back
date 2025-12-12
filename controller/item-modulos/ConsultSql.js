const { Pool } = require('pg')
const {pgConfig} = require('../../config/connection')

const pool = new Pool(pgConfig)

exports.getItemModeules = async() => {
    const itemModules =  await pool.query('select * from item_modulos')
    return itemModules.rows    
}

exports.getItemModeleByID = async (id) => {
    const itemModeleByID = await pool.query(`SELECT * FROM item_modulos WHERE id_item_modulo = ${id}`) 
    return itemModeleByID.rows
}

exports.itemModulesByModuleId = async (id) => { 
    const itemByModule = await pool.query(`select * from item_modulos where modulo_id = ${id}`) 
    return itemByModule.rows
}
exports.itemsConst = async (id_item_modulo) => {
    const idd = await pool.query(`select modulo_id from item_modulos where id_item_modulo = ${id_item_modulo}`)
    return idd.rows
}
exports.obtenIdUserAndModules = async (id_user) => { 
    const dataUser = await pool.query(
    `select 
    usuario.id_usuario ,
    usuario.perfil_id ,
    usuario.nombres,
    usuario.apellidos ,
    usuario.identificacion ,
    perfiles.perfil
    from usuario 
    join perfiles  on usuario.perfil_id = perfiles.id_perfil

    where id_usuario = ${id_user}`) 

    return dataUser.rows[0]
}

exports.obtenModulesByPerfilUuser = async ( id_perfiles ) => {
    const data  = await pool.query(
        `select 
        item_modulos_perfiles.item_modulo_id 
        from item_modulos_perfiles 
        join perfiles on  item_modulos_perfiles.perfil_id = ${id_perfiles}`)

        return data.rows
}



exports.getNameItemModule = async ( id_perfil ) => {
    const data  = await pool.query(
        `select *
        from item_modulo_perfil
        join perfiles on  item_modulo_perfil.perfil_id = perfiles.id_perfil
        join item_modulos on  item_modulo_perfil.item_modulo_id = item_modulos.id_item_modulo
        where item_modulo_perfil.perfil_id = ${id_perfil}`
        )

        return data.rows
}

exports.getAllPerfiles = async() => {
    const allperfiles = await pool.query('select * from perfiles')

    return allperfiles.rows
}

exports.getAllItemModule = async () => {
    const itemModule = await pool.query(
        `select 
        item_modulo_perfil.perfil_id,
        item_modulos.url_item_modulo,
        item_modulos.item_modulo
        from item_modulo_perfil
        join perfiles on  item_modulo_perfil.perfil_id = perfiles.id_perfil
        join item_modulos on  item_modulo_perfil.item_modulo_id = item_modulos.id_item_modulo`
        )
    return itemModule.rows
}

