const modelUser = require('../../models/Auth/login')
const modelPerfiles = require('../../models/perfiles.model/perfilModeel')
const estructuraApi = require('../../helpers/estructuraApi')
var requestUsers = require('../../models/DTO/ClasUsersRequest')
const bcrypt = require('bcrypt')
const saltRounds = 4
const controller = require('../Upload/imgController')
const { Pool } = require("pg");
const {pgConfig} = require("../../config/connection");
const moment = require('moment-timezone');
const CentroFormacion = require('../../models/CentroFormacion/centroFormacion')
const pool = new Pool(pgConfig);

exports.allUsers = async (request, response) => {
  
  const { id_centro, id_perfil } = request.query;

  let obj1 = new estructuraApi();

  try {
    
    if (!id_centro || !id_perfil) {
      obj1.setEstado(400, "error", "Missing id_centro or id_perfil");
      return response.json(obj1.toResponse());
    }

    
    const queryConditions = {};

    if ( id_perfil !== '4') {
      
      queryConditions.where = { id_centro_formacion: id_centro };
    }

    
    await modelUser.findAll({
      ...queryConditions,
      include: [CentroFormacion],
    })
    .then(succ => {
      if (succ.length > 0) {
        obj1.setResultado(succ);
      } else {
        const message = id_perfil === '3' || id_perfil === '4' ? "No users found" : "No users found in the specified center";
        obj1.setEstado(404, "not found", message);
      }
    })
    .catch(err => {
      console.error("Database error:", err); 
      obj1.setEstado(500, "error", err.message || "An unexpected error occurred");
    });

    response.json(obj1.toResponse());
  } catch (err) {
    console.error("Unexpected error:", err); 
    obj1.setEstado(500, "error", err.message || "An unexpected error occurred");
    response.json(obj1.toResponse());
  }
};


//search user by :id
exports.viewUser = async (request, response) => {
    let obj1 = new estructuraApi()
    const id = request.params.id_usuario
    await modelUser.findOne({
        where: { id_usuario: id },
        include: [modelPerfiles, CentroFormacion]
    })
        .then(succ => {
            if (succ !== null) {
                obj1.setResultado(succ)
            } else {
                obj1.setEstado('204', 'Empty', "consult success but Empty")
            }
        })
        .catch(err => {
            obj1.setEstado(err, 'Empty', err)
        })
    response.json(obj1.toResponse())
}

//update One users
exports.UpdateUser = async (request, response) => {
    const api = new estructuraApi()
    const idParams = request.params.id_usuario
    requestUsers = request.body
    // let passwort =  await bcrypt.hash(request.body.contrasena, saltRounds) //encriptar paswort 
    // requestUsers.contrasena = passwort  // set pasword in request 
    await modelUser.update(
        requestUsers
        , {
            where: {
                id_usuario: idParams
            }
        }
    ).then(succ => {
        if (succ[0] > 0) {
            api.setResultado(requestUsers)
        } else {
            api.setEstado(204, 'Empty', "consult success but Empty")
        }
    }).catch(err => {
        api.setEstado(err.parent || err, 'error', err.parent.detail || err)
    })
    response.json(api.toResponse())
}

//create user
exports.CreateUser = async (request, response) => {
    let api = new estructuraApi()//instanciar
    requestUsers = request.body // igualo el body a mi class
    let passwort = await bcrypt.hash(request.body.contrasena, saltRounds)//encriptar paswort
    requestUsers.contrasena = passwort
    await modelUser.create(
        requestUsers
    ).then(succ => {
        api.setResultado(succ)
    }).catch(err => {
        api.setEstado(err.parent.code || err, 'error', err.parent.detail || err)
    })
    response.json(api.toResponse())
}

//Delete user
exports.DeleteUser = async (request, response) => {
    let api = new estructuraApi()
    let id_usuario = request.params.id_usuario
    await controller.destroimage(id_usuario)
    await modelUser.destroy({ where: { id_usuario: id_usuario } })
        .then(succ => {
            if (succ != 0) {
                api.setEstado('SUCC', 'success', `id_usuaio{${id_usuario}}:delete successfully`)
            } else {
                api.setEstado('INFO', 'info', `id_usuaio{${id_usuario}}:!NO ENCONTRADO!`)
            }
        })
        .catch(err => {
            api.setEstado(err.parent.code, "error", err.parent.detail)
        })
    response.json(api.toResponse())
}

exports.filtrar = async (req, res) => {
    const { fecha_inicial, fecha_final } = req.body
    const fechaI = moment(fecha_inicial).format('YYYY-MM-DD')
    const fechaF = moment(fecha_final).format('YYYY-MM-DD')
    let api = new estructuraApi()
    const usuariosfiltrados = await pool.query(`select * from usuario
    where usuario.creado BETWEEN '${fechaI}' AND '${fechaF}'
    `)
    if (usuariosfiltrados.rows.length > 0) {
        api.setResultado(usuariosfiltrados.rows);
    } else {
        api.setEstado(404, "info", "No tienes usuarios");
    }
    res.json(api.toResponse());
}

exports.allAdminUsers = async (req, res) => {
    let api = new estructuraApi()
    const verifyAdmins = await pool.query(`select * from usuario where usuario.perfil_id = ${3}`)
    if (verifyAdmins.rows.length > 0) {
        api.setResultado(verifyAdmins.rows);
    } else {
        api.setEstado(404, "info", "No tienes pedfiles administrativos");
    }
    res.json(api.toResponse());
}
exports.Users = async (req, res) => {
    let api = new estructuraApi()
    const usuarios = await pool.query(`select
    usuario.identificacion,
    usuario.nombres,
    usuario.apellidos,
    usuario.correo_institucional,
    usuario.correo_institucional,
    usuario.genero,
    usuario.ciudad_residencia,
    usuario.centro,
    usuario.numero_telefono,
    usuario.id_usuario
    from usuario`)
    if (usuarios.rows.length > 0) {
        api.setResultado(usuarios.rows);
    } else {
        api.setEstado(404, "info", "No tienes usuarios");
    }
    res.json(api.toResponse());
}
