const EstructuraApi = require("../../helpers/estructuraApi");
const associations = require("../../models/asociations")
const Requisitos_Certificacion = require("../../models/Requisitos Certificacion/Requisitos")
const Documentos_Certificacion = require("../../models/Documentos Certificacion/Documentos_Certificacion")
const Asignacion = require("../../models/Asignacion/Asignacion")
const Documentos = require("../../models/Documento/Documento");
const { Pool } = require("pg");
const db = require("../../env");
const returnPath = require("../../helpers/returnPath")

const pool = new Pool(db);

exports.allDocumentosCertificaciones = async (req, res) => {
    const estructuraApi = new EstructuraApi()
    const documentosCert = await Documentos_Certificacion.findAll()
    if (documentosCert.length > 0) {
        estructuraApi.setResultado(documentosCert)
    } else {
        estructuraApi.setEstado(404, "error", "No hay ningun registro")
    }
    res.json(estructuraApi.toResponse())
}
exports.createDocumentosCertificaciones = async (req, res) => {
    const estructuraApi = new EstructuraApi()

    if (req.file != null || undefined) {
        const documento = req.body.documento;
        const { requisito_id } = req.body
        const { asignacion_id } = req.body
        const newDocument = {
            documento: documento,
            ruta: returnPath(req.file.path),
        };
        const doc = await Documentos.create(newDocument)
        const newRegistro = await Documentos_Certificacion.create({
            asignacion_id,
            documento_id: doc.dataValues.id_documento,
            estado: "Por Aprobar",
            requisito_id
        })
        estructuraApi.setEstado('SUC-001', "success", "Documento certificado con exito")
        estructuraApi.setResultado(newRegistro)
    }
    res.json(estructuraApi.toResponse())
}
exports.deleteDocumentosCertificaciones = async (req, res) => {
    const estructuraApi = new EstructuraApi()
    const { id_documentos_cert } = req.params

    const verifyEstado = await pool.query(`
    select documentos_certificacion.id_documentos_cert,
    documentos_certificacion.estado
    from  documentos_certificacion
    where documentos_certificacion.id_documentos_cert = ${id_documentos_cert}
    and documentos_certificacion.estado = 'Por Aprobar'`)
    if (verifyEstado.rows.length > 0) {
        const DocumentosCert = await Documentos_Certificacion.destroy({ where: { id_documentos_cert } })
        estructuraApi.setEstado('SUC-001', "success", "Documento eliminado con exito")
        estructuraApi.setResultado(DocumentosCert)
    } else {
        estructuraApi.setEstado(207, "error", "Este documento no podra ser eliminado")

    }
    res.json(estructuraApi.toResponse())
}
exports.cambiarEstado = async (req, res) => {
    const estructuraApi = new EstructuraApi()
    const { id_documentos_cert } = req.params
    const requisito = req.body.requisito_id
    const { estado } = req.body
    const { asignacion_id } = req.body


    // --------------------------
    const VerifyAprobaddo = await pool.query(`select documentos_certificacion.id_documentos_cert,
    documentos_certificacion.estado
    from  documentos_certificacion
    where documentos_certificacion.id_documentos_cert = ${id_documentos_cert}
    and  documentos_certificacion.requisito_id = ${requisito}
    and documentos_certificacion.estado = 'Aprobado'`)
    if (VerifyAprobaddo.rows.length == 1) {
        estructuraApi.setEstado(207, "error", "Ya se aprobo la cantidad maxima de documentos para esta fase")
    } else {
        const DocumentosCert = await Documentos_Certificacion.findOne({ where: { id_documentos_cert } })
        DocumentosCert.estado = estado
        DocumentosCert.save()
        estructuraApi.setEstado('SUC-001', "success", "Estado registrado con exito")
        if (estado == 'Aprobado') {
            finalizar(asignacion_id)
        }
    }
    res.json(estructuraApi.toResponse())
}
exports.getDocumentosByRequisito = async (req, res) => {
    const estructuraApi = new EstructuraApi()
    const { asignacion_id } = req.body
    const { requisito_id } = req.body
    const DocumentosCertificaciones = await pool.query(`select documentos_certificacion.id_documentos_cert,
    documentos_certificacion.asignacion_id,
    documentos_certificacion.requisito_id,
    documentos_certificacion.documento_id,
    documentos_certificacion.estado,
    requisitos_certificacion.nombre
    from  documentos_certificacion
    JOIN requisitos_certificacion  on  documentos_certificacion.requisito_id = requisitos_certificacion.id_requisito_cert 
    where documentos_certificacion.asignacion_id = ${asignacion_id} 
    and documentos_certificacion.requisito_id = ${requisito_id}`)
    if (DocumentosCertificaciones.rows.length > 0) {
        estructuraApi.setResultado(DocumentosCertificaciones.rows)
    } else {
        estructuraApi.setEstado(404, "error", " No existen documentos de esta fase")
    }
    res.json(estructuraApi.toResponse())
}
exports.getAprendicesPorCertificar = async (req, res) => {
    const estructuraApi = new EstructuraApi()
    const Lista = await pool.query(`select  asignacion.id_asignacion,
    asignacion.aprendiz_id,
    asignacion.usuario_responsable_id,
    to_char(asignacion.fecha_seguimiento_inicial,'YYYY/MM/DD') as fecha_seguimiento_inicial,
    to_char(asignacion.fecha_seguimiento_parcial,'YYYY/MM/DD') as fecha_seguimiento_parcial,
    to_char(asignacion.fecha_seguimiento_final,'YYYY/MM/DD') as fecha_seguimiento_final,
    novedades.tipo_novedad,
    aprendices.nombres as nombre_aprendiz,
    aprendices.apellidos as apellido_aprendiz,
    aprendices.identificacion,
    usuario.nombres as nombre_usuario,
    usuario.apellidos as apellido_usuario,
    estado_fase.estado_fase
    FROM asignacion
     JOIN aprendices 
    ON aprendices.id_aprendiz = asignacion.aprendiz_id
     JOIN usuario 
    ON usuario.id_usuario = asignacion.usuario_responsable_id
     JOIN estado_fase 
    ON estado_fase.id_estado_fase = asignacion.estado_fase_id
    LEFT JOIN novedades
    ON novedades.id_novedad = asignacion.novedad_id
    where asignacion.estado_fase_id= 3`)
    if (Lista.rows.length > 0) {
        estructuraApi.setResultado(Lista.rows)
    } else {
        estructuraApi.setEstado(404, "error", " No existen aprendices en esta fase")
    }
    res.json(estructuraApi.toResponse())
}
finalizar = async (req, res) => {
    const estructuraApi = new EstructuraApi()
    const asignacion_id = req
    var numero = 0
    // condicional para saber si ya cumplio con todos los documentos aprobados
    const Documentos = await pool.query(`select documentos_certificacion.id_documentos_cert,
    documentos_certificacion.asignacion_id,
    documentos_certificacion.requisito_id,
    documentos_certificacion.estado,
    requisitos_certificacion.nombre
    from  documentos_certificacion
    JOIN requisitos_certificacion  on  documentos_certificacion.requisito_id = requisitos_certificacion.id_requisito_cert
    where documentos_certificacion.asignacion_id= ${asignacion_id}`)
    for (let i = 0; i < Documentos.rows.length; i++) {
        const element = Documentos.rows[i];
        if (element.estado == 'Aprobado') {
            numero++
            if (numero == 3) {
                const cambiarEstado = await Asignacion.findOne({ where: { id_asignacion: asignacion_id } })
                cambiarEstado.estado_fase_id = 4
                await cambiarEstado.save()
                estructuraApi.setEstado('SUC-001', "success", "Proceso de Certificacion terminada con exito!")
            }
        }
    }
}