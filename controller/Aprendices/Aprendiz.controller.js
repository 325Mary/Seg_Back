const Aprendiz = require("../../models/Aprendiz/Aprendiz");
const ModelPerfil = require("../../models/perfiles.model/perfilModeel");
const associations = require("../../models/asociations")
const Asignacion = require("../../models/Asignacion/Asignacion");
const EstructuraApi = require("../../helpers/estructuraApi");
const RegitroEtapaProductiva = require("../../models/Aprendiz/RegistroEtapaProductiva");
const { Pool } = require("pg");
const {pgConfig } = require("../../config/connection");
const saltRounds = 4
const bcrypt = require('bcrypt')
const moment = require('moment-timezone');
const CentroFormacion = require('../../models/CentroFormacion/centroFormacion')




const pool = new Pool(pgConfig );

exports.getAprendices = async (req, res) => {
    let estructuraApi = new EstructuraApi();

    const aprendices = await Aprendiz.findAll();

    if (aprendices.rows.length > 0) {
        estructuraApi.setResultado(aprendices.rows)
    } else {
        estructuraApi.setEstado(404, "error", "apprentice list not found")
    }
    res.json(estructuraApi.toResponse())
}

class AprendizBTO {
    nombres = "";
    apellidos = "";
    fecha_nacimiento = "";
    genero = "";
    discapacidad = "";
    telefono = "";
    correo_misena = "";
    correo_alternativo = "";
    municipio_id = "";
    centro = "";
    programa_id = "";
    inicio_lectiva = "";
    incio_productiva = "";
    contrato_inicio = "";
    contrato_fin = "";
    ficha = "";
    identificacion = ""
    password = ""
    perfil_id = ""
}
exports.createAprendiz = async (req, res) => {
    let estructuraApi = new EstructuraApi();
    aprendizObj = new AprendizBTO
    aprendizObj = req.body;

    let passwort = await bcrypt.hash(request.body.contrasena, saltRounds)//encriptar paswort

    aprendizObj.password = passwort

    const newAprendiz = await Aprendiz.create(aprendizObj)

    estructuraApi.setResultado(newAprendiz)

    estructuraApi.setEstado("Aprendiz Registrado con exito")

    res.json(estructuraApi.toResponse())
}
exports.deleteAprendiz = async (req, res) => {
    let estructuraApi = new EstructuraApi();
    const { id } = req.params;
    const aprendiz = await Aprendiz.destroy({ where: { id_aprendiz: id } })

    estructuraApi.setResultado(aprendiz)

    estructuraApi.setEstado("Aprendiz Eliminado con exito")

    res.json(estructuraApi.toResponse())

}
exports.updateAprendiz = async (req, res) => {
    const { id } = req.params
    aprendizObj = new AprendizBTO
    aprendizObj = req.body

    const respuesta = await Aprendiz.findOne({ where: { id_aprendiz: id } })
    respuesta.nombres = aprendizObj.nombres;
    respuesta.apellidos = aprendizObj.apellidos;
    respuesta.fecha_nacimiento = aprendizObj.fecha_nacimiento;
    respuesta.genero = aprendizObj.genero
    respuesta.discapacidad = aprendizObj.discapacidad
    respuesta.telefono = aprendizObj.telefono
    respuesta.correo_misena = aprendizObj.correo_misena
    respuesta.correo_alternativo = aprendizObj.correo_alternativo
    respuesta.municipio_id = aprendizObj.municipio_id
    respuesta.centro = aprendizObj.centro
    respuesta.programa_id = aprendizObj.programa_id
    respuesta.inicio_lectiva = aprendizObj.inicio_lectiva
    respuesta.incio_productiva = aprendizObj.incio_productiva
    respuesta.contrato_inicio = aprendizObj.contrato_inicio
    respuesta.contrato_fin = aprendizObj.contrato_fin
    respuesta.ficha = aprendizObj.ficha
    respuesta.identificacion = aprendizObj.identificacion
    await respuesta.save()
    res.json('Aprendiz actualizado con exito');
    try {

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}
exports.getByIdAprendiz = async (req, res) => {

    const api = new EstructuraApi
    const { id } = req.params
    try {
        const respuesta = await Aprendiz.findOne({
            where: { id_aprendiz: id },
            include: [ModelPerfil, CentroFormacion],
            
        })
        if (!respuesta) {
            api.setEstado(404, "empty", 'No existe este registro de aprendiz')
            return res.json(api.toResponse())
        }
        api.setResultado(respuesta)
        return res.json(api.toResponse());
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

//APRENDIZ WITH REP

class AprendizREP {
    nombres = "";
    apellidos = "";
    fecha_nacimiento = "";
    genero = "";
    discapacidad = "";
    telefono = "";
    correo_misena = "";
    correo_alternativo = "";
    municipio_id = "";
    centro = "";
    programa_id = "";
    inicio_lectiva = "";
    incio_productiva = "";
    contrato_inicio = "";
    contrato_fin = "";
    ficha = "";
    identificacion = "";
    tipo_documento = "";
    //departamento = "";
    fin_lectiva = "";
    fin_productiva = "";
    regional = "";
    fase_aprendiz = "";
    nit_eps = "";
    eps = "";
    nit_arl = "";
    nombre_empresa = "";
    nit_empresa = "";
    municipio_id = "";
    direccion = "";
    telefono_empresa = "";
    correo = "";
    modalidad = "";
    observacion = "";
    representante_legal = "";
    identificacion_representante = "";
    arl = "";
    //departamento_empresa = "";
    razon_social = "";
    id_centro_formacion = "";
}
exports.getRegistroCompleto = async (req, res) => {
    let estructuraApi = new EstructuraApi();
    const { id_centro, id_perfil } = req.query;

    try {
        if (!id_centro || !id_perfil) {
            estructuraApi.setEstado(400, "error", "Missing id_centro or id_perfil");
            return res.json(estructuraApi.toResponse());
        }

        let whereCondition = '';

        if (id_perfil !== '4') {
            whereCondition = `WHERE aprendices.id_centro_formacion = $1`;
        }

        const query = `
            SELECT
                registro_etapa_productiva.nit_eps,
                registro_etapa_productiva.eps,
                registro_etapa_productiva.nit_arl,
                registro_etapa_productiva.nombre_empresa,
                registro_etapa_productiva.direccion,
                registro_etapa_productiva.telefono,
                registro_etapa_productiva.correo,
                registro_etapa_productiva.modalidad,
                registro_etapa_productiva.observacion,
                registro_etapa_productiva.representante_legal,
                registro_etapa_productiva.razon_social,
                dpt_emp.departamento AS departamento_empresa,
                mun_emp.municipio AS ciudad_empresa,
                registro_etapa_productiva.arl,
                aprendices.id_aprendiz,
                aprendices.nombres,
                aprendices.apellidos,
                aprendices.genero,
                aprendices.telefono,
                aprendices.correo_alternativo,
                aprendices.centro,
                aprendices.ficha,
                aprendices.identificacion,
                aprendices.tipo_documento,
                aprendices.fin_lectiva,
                aprendices.fin_productiva,
                aprendices.regional,
                mun_apr.municipio,
                dpt_apr.departamento,
                aprendices.fase_aprendiz,
                aprendices.fecha_nacimiento,
                programa_formacion.programa_formacion,
                programa_formacion.red_id,
                programa_formacion.tipo_programa,
                programa_formacion.codigo_programa,
                registro_etapa_productiva.identificacion_representante,
                asignacion.id_asignacion,
                centro_formacion.id_centro_formacion AS id_centro_formacion,
                centro_formacion.nombre AS nombre_centro
            FROM registro_etapa_productiva
            JOIN aprendices ON registro_etapa_productiva.aprendiz_id = aprendices.id_aprendiz
            JOIN programa_formacion ON aprendices.programa_id = programa_formacion.id_programa_formacion
            LEFT JOIN asignacion ON asignacion.aprendiz_id = aprendices.id_aprendiz
            LEFT JOIN municipios AS mun_apr ON mun_apr.id_municipio = aprendices.municipio_id
            LEFT JOIN departamentos AS dpt_apr ON dpt_apr.id_departamento = mun_apr.departamento_id
            LEFT JOIN municipios AS mun_emp ON mun_emp.id_municipio = registro_etapa_productiva.municipio_id
            LEFT JOIN departamentos AS dpt_emp ON dpt_emp.id_departamento = mun_emp.departamento_id
            LEFT JOIN centro_formacion ON centro_formacion.id_centro_formacion = aprendices.id_centro_formacion
            ${whereCondition}
        `;

        const registro = id_perfil !== '4'
            ? await pool.query(query, [id_centro])
            : await pool.query(query);

        if (registro.rows.length > 0) {
            estructuraApi.setResultado(registro.rows);
        } else {
            estructuraApi.setEstado(404, 'error', 'No tienes registros');
        }

        res.json(estructuraApi.toResponse());
    } catch (err) {
        console.error("Unexpected error:", err);
        estructuraApi.setEstado(500, 'error', err.message || 'An unexpected error occurred');
        res.json(estructuraApi.toResponse());
    }
};

exports.getByIdAprendizWithREP = async (req, res) => {
    let estructuraApi = new EstructuraApi();
    const { id } = req.params
    const registroEtapa = await RegitroEtapaProductiva.findAll({ where: { aprendiz_id: id } })
    const aprendiz = await Aprendiz.findOne({ where: { id_aprendiz: id } })
    let registro = { ...registroEtapa, ...aprendiz }
    res.json(registro);
}
exports.createAprendizWithREP = async (req, res) => {
    let estructuraApi = new EstructuraApi();
    aprendizREP_Obj = new AprendizREP
    aprendizREP_Obj = req.body;
    let identificacion = aprendizREP_Obj.identificacion + ''
    let aprendiz = await Aprendiz.findAll({ where: { identificacion: identificacion } })
    if (aprendiz.length > 0) {
        // estructuraApi.setEstado('El aprendiz ya esta registrado')
        estructuraApi.setEstado(207, "error", 'El aprendiz ya esta registrado')
    } else {
        estructuraApi.setEstado('El aprendiz es diferente')
        const newAprendiz = await Aprendiz.create({
            nombres: aprendizREP_Obj.nombres,
            apellidos: aprendizREP_Obj.apellidos,
            fecha_nacimiento: aprendizREP_Obj.fecha_nacimiento,
            genero: aprendizREP_Obj.genero,
            discapacidad: aprendizREP_Obj.discapacidad,
            telefono: aprendizREP_Obj.telefono,
            correo_misena: aprendizREP_Obj.correo_misena,
            correo_alternativo: aprendizREP_Obj.correo_alternativo,
            municipio_id: aprendizREP_Obj.municipio_id,
            id_centro_formacion: aprendizREP_Obj.id_centro_formacion,
            centro: aprendizREP_Obj.centro,
            programa_id: aprendizREP_Obj.programa_id,
            inicio_lectiva: aprendizREP_Obj.inicio_lectiva,
            incio_productiva: aprendizREP_Obj.incio_productiva,
            contrato_inicio: aprendizREP_Obj.contrato_inicio,
            contrato_fin: aprendizREP_Obj.contrato_fin,
            ficha: aprendizREP_Obj.ficha,
            identificacion: aprendizREP_Obj.identificacion,
            tipo_documento: aprendizREP_Obj.tipo_documento,
            //departamento: aprendizREP_Obj.departamento,
            fin_lectiva: aprendizREP_Obj.fin_lectiva,
            fin_productiva: aprendizREP_Obj.fin_productiva,
            regional: aprendizREP_Obj.regional,
            fase_aprendiz: aprendizREP_Obj.fase_aprendiz,
            perfil_id: 2,
            password: await bcrypt.hash(aprendizREP_Obj.identificacion.toString(), saltRounds),
        })
        
        const newRegistroEtapa = RegitroEtapaProductiva.create({
            nit_eps: aprendizREP_Obj.nit_eps,
            eps: aprendizREP_Obj.eps,
            nit_arl: aprendizREP_Obj.nit_arl,
            nombre_empresa: aprendizREP_Obj.nombre_empresa,
            nit_empresa: aprendizREP_Obj.nit_empresa,
            municipio_id: aprendizREP_Obj.municipio_id,
            direccion: aprendizREP_Obj.direccion,
            telefono: aprendizREP_Obj.telefono_empresa,
            correo: aprendizREP_Obj.correo,
            modalidad: aprendizREP_Obj.modalidad,
            observacion: aprendizREP_Obj.observacion,
            representante_legal: aprendizREP_Obj.representante_legal,
            aprendiz_id: newAprendiz.id_aprendiz,
            arl: aprendizREP_Obj.arl,
            razon_social: aprendizREP_Obj.razon_social,
            //departamento_empresa: aprendizREP_Obj.departamento_empresa,
        })
        estructuraApi.setEstado('SUC-001', 'success', "Aprendiz Registrado con exito")
        let obj2 = { ...newAprendiz, ...newRegistroEtapa };
        estructuraApi.setResultado(obj2)
    }

    return res.json(estructuraApi.toResponse())
}
exports.updateAprendizWithREP = async (req, res) => {
    let estructuraApi = new EstructuraApi();

    const { id } = req.params
    aprendizREP_Obj = new AprendizREP
    aprendizREP_Obj = req.body
    //console.log(aprendizREP_Obj);
    const aprendiz = await Aprendiz.findOne({ where: { id_aprendiz: id } })
    aprendiz.nombres = aprendizREP_Obj.nombres;
    aprendiz.apellidos = aprendizREP_Obj.apellidos;
    aprendiz.fecha_nacimiento = aprendizREP_Obj.fecha_nacimiento;
    aprendiz.genero = aprendizREP_Obj.genero
    aprendiz.discapacidad = aprendizREP_Obj.discapacidad
    aprendiz.telefono = aprendizREP_Obj.telefono
    aprendiz.correo_misena = aprendizREP_Obj.correo_misena
    aprendiz.correo_alternativo = aprendizREP_Obj.correo_alternativo
    aprendiz.municipio_id = aprendizREP_Obj.municipio_id
    aprendiz.centro = aprendizREP_Obj.centro
    aprendiz.programa_id = aprendizREP_Obj.programa_id
    aprendiz.inicio_lectiva = aprendizREP_Obj.inicio_lectiva
    aprendiz.incio_productiva = aprendizREP_Obj.incio_productiva
    aprendiz.contrato_inicio = aprendizREP_Obj.contrato_inicio
    aprendiz.contrato_fin = aprendizREP_Obj.contrato_fin
    aprendiz.ficha = aprendizREP_Obj.ficha
    aprendiz.identificacion = aprendizREP_Obj.identificacion
    aprendiz.tipo_documento = aprendizREP_Obj.tipo_documento
    //aprendiz.departamento = aprendizREP_Obj.departamento
    aprendiz.fin_lectiva = aprendizREP_Obj.fin_lectiva
    aprendiz.fin_productiva = aprendizREP_Obj.fin_productiva
    aprendiz.regional = aprendizREP_Obj.regional
    aprendiz.fase_aprendiz = aprendizREP_Obj.fase_aprendiz
    aprendiz.modalidad = aprendizREP_Obj.modalidad
    await aprendiz.save()

    const registroEP = await RegitroEtapaProductiva.findOne({ where: { aprendiz_id: id } })
        registroEP.nit_eps = aprendizREP_Obj.nit_eps,
        registroEP.eps = aprendizREP_Obj.eps,
        registroEP.nombre_empresa = aprendizREP_Obj.nombre_empresa,
        registroEP.nit_empresa = aprendizREP_Obj.nit_empresa,
        registroEP.nit_arl = aprendizREP_Obj.nit_arl,
        registroEP.municipio_id = aprendizREP_Obj.municipio_id,
        registroEP.direccion = aprendizREP_Obj.direccion,
        registroEP.telefono = aprendizREP_Obj.telefono,
        registroEP.correo = aprendizREP_Obj.correo,
        registroEP.modalidad = aprendizREP_Obj.modalidad,
        registroEP.observacion = aprendizREP_Obj.observacion,
        registroEP.representante_legal = aprendizREP_Obj.representante_legal,
        registroEP.identificacion_representante = aprendizREP_Obj.identificacion_representante,
        registroEP.arl = aprendizREP_Obj.arl,
        registroEP.razon_social = aprendizREP_Obj.razon_social,
        //registroEP.departamento_empresa = aprendizREP_Obj.departamento_empresa
    await registroEP.save()
    estructuraApi.setEstado('SUC-001', 'success', 'Registro Actualizado con exito')
    let registro = { ...aprendiz, ...registroEP }
    estructuraApi.setResultado(registro)
    return res.json(estructuraApi.toResponse())
}
exports.deleteAprendizWithREP = async (req, res) => {
    let estructuraApi = new EstructuraApi();

    const { id } = req.params
    const asignacion = await Asignacion.findOne({ where: { aprendiz_id: id } })
    if (asignacion !== null) {
        estructuraApi.setEstado(500, "error", 'El aprendiz esta en su proceso de asignación')
    } else {
        const estapaProductiva = await RegitroEtapaProductiva.destroy({
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
        let AprendizREP = { ...estapaProductiva, ...aprendiz }
        estructuraApi.setEstado('SUC-001', "success", 'Reporte eliminado con exito')
        estructuraApi.setResultado(AprendizREP)
    }

    res.json(estructuraApi.toResponse())
}
exports.getAprendizByIdNovedad = async (req, res) => {
    const { id } = req.params
    let estructuraApi = new EstructuraApi();
    const Registro = await pool.query(`
    select aprendices.id_aprendiz,
    aprendices.nombres,
    aprendices.apellidos,
    aprendices.genero,
    aprendices.telefono,
    aprendices.correo_alternativo,
    aprendices.centro,
    aprendices.ficha,
    aprendices.identificacion,
    aprendices.fecha_nacimiento,
    aprendices.discapacidad,
    aprendices.correo_misena,
    aprendices.correo_alternativo,
    aprendices.inicio_lectiva,
    aprendices.incio_productiva,
    aprendices.contrato_inicio,
    aprendices.contrato_fin,
    programa_formacion.programa_formacion,
    programa_formacion.red_id,
    programa_formacion.tipo_programa,
    programa_formacion.codigo_programa,
    registro_etapa_productiva.nit_eps,
    registro_etapa_productiva.eps,
    registro_etapa_productiva.nit_arl,
    registro_etapa_productiva.nombre_empresa,
    registro_etapa_productiva.direccion,
    registro_etapa_productiva.correo,
    registro_etapa_productiva.modalidad,
    registro_etapa_productiva.observacion,
    registro_etapa_productiva.representante_legal,
    registro_etapa_productiva.identificacion_representante,
    asignacion.id_asignacion,
    asignacion.novedad_id,
    mun_emp.municipio as ciudad,
    dep_emp.departamento as departamento_empresa,
    municipios.municipio,
    departamentos.departamento
    from aprendices 
    JOIN programa_formacion
    ON aprendices.programa_id = programa_formacion.id_programa_formacion
    JOIN registro_etapa_productiva
    ON registro_etapa_productiva.aprendiz_id = aprendices.id_aprendiz
    JOIN asignacion
    ON asignacion.aprendiz_id = aprendices.id_aprendiz
    JOIN municipios
    ON municipios.id_municipio = aprendices.municipio_id
    JOIN departamentos
    ON departamentos.id_departamento = municipios.departamento_id
    JOIN municipios mun_emp 
    ON mun_emp.id_municipio = registro_etapa_productiva.municipio_id
    JOIN departamentos dep_emp
    ON dep_emp.id_departamento = mun_emp.departamento_id

    where aprendices.id_aprendiz = ${id}
    `)
    if (Registro.rows) {
        estructuraApi.setResultado(Registro.rows)
    } else {
        estructuraApi.setEstado(404, "info", "No se encuentra el aprendiz ")
    }
    res.json(estructuraApi.toResponse())
}
exports.getAprendizById = async (req, res) => {
    const { id } = req.params
    let estructuraApi = new EstructuraApi();
    const Registro = await Aprendiz.findOne({
        where: { id_aprendiz: id }
    })

    if (Registro) {
        estructuraApi.setResultado(Registro)
    } else {
        estructuraApi.setEstado(404, "info", "No se encuentra el aprendiz ")
    }
    res.json(estructuraApi.toResponse())
}
//fichas del aprendiz
exports.allFichasByIdUser = async (req, res) => {
    console.log('entro');
    let estructuraApi = new EstructuraApi();
    const { id_usuario } = req.params
    const registro = await pool.query(`SELECT distinct
    aprendices.ficha
    FROM asignacion
    JOIN aprendices 
    ON aprendices.id_aprendiz = asignacion.aprendiz_id
    WHERE asignacion.usuario_responsable_id = ${id_usuario}`)
    if (registro.rows.length > 0) {
        estructuraApi.setResultado(registro.rows);
    } else {
        estructuraApi.setEstado(404, "info", "No tienes Asignaciones");
    }
    res.json(estructuraApi.toResponse());
}

exports.misFichasAsignadas = async (req, res) => {
    let estructuraApi = new EstructuraApi();
    const { id_usuario } = req.params
    const { ficha } = req.body
    var horas = 0
    const registro = await pool.query(`
    SELECT 
    asignacion.seg_1,
    asignacion.seg_2,
    asignacion.seg_3,
    asignacion.usuario_responsable_id,
    to_char(asignacion.fecha_seguimiento_inicial,'YYYY/MM/DD') as fecha_seguimiento_inicial,
    to_char(asignacion.fecha_seguimiento_parcial,'YYYY/MM/DD') as fecha_seguimiento_parcial,
    to_char(asignacion.fecha_seguimiento_final,'YYYY/MM/DD') as fecha_seguimiento_final,
    aprendices.nombres as nombre_aprendiz,
    aprendices.apellidos as apellido_aprendiz,
    aprendices.identificacion,
    aprendices.telefono,
    aprendices.correo_misena,
    aprendices.correo_alternativo,
    aprendices.ficha,
    usuario.nombres as nombre_usuario,
    usuario.apellidos as apellido_usuario
    FROM asignacion
    JOIN aprendices 
    ON aprendices.id_aprendiz = asignacion.aprendiz_id
    JOIN usuario 
    ON usuario.id_usuario = asignacion.usuario_responsable_id
    WHERE asignacion.usuario_responsable_id = ${id_usuario}
    AND aprendices.ficha = '${ficha}'
    `)
    if (registro.rows.length > 0) {
        for (let i = 0; i < registro.rows.length; i++) {
            const element = registro.rows[i];
            const seg_1 = element.seg_1
            const seg_2 = element.seg_2
            const seg_3 = element.seg_3
            if (seg_1 == 'Aprobado') {
                horas = horas + 2
            }
            if (seg_2 == 'Aprobado') {
                horas = horas + 2
            }
            if (seg_3 == 'Aprobado') {
                horas = horas + 2
            }
        }
        estructuraApi.setEstado(horas, 'success', horas)
        estructuraApi.setResultado(registro.rows);
    } else {
        estructuraApi.setEstado(404, "info", "No tienes Asignaciones");
    }
    res.json(estructuraApi.toResponse());
}
exports.getAprendizByIdInclude = async (req, res) => {
    const { id } = req.params
    let estructuraApi = new EstructuraApi();
    const Registro = await Aprendiz.findOne({
        where: { id_aprendiz: id },
        include: []
    })

    if (Registro) {
        estructuraApi.setResultado(Registro)
    } else {
        estructuraApi.setEstado(404, "info", "No se encuentra el aprendiz ")
    }
    res.json(estructuraApi.toResponse())
}


