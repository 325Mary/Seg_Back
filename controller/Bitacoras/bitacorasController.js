const estructuraApi = require("../../helpers/estructuraApi");
const associations = require("../../models/asociations");
const Asignacion = require("../../models/Asignacion/Asignacion");
const Bitacora = require("../../models/Bitacora/Bitacora")
const returnPath = require("../../helpers/returnPath")
const Documentos = require("../../models/Documento/Documento");
var requestBitacora = require("../../models/DTO/BitacoraDTO");
const { Pool } = require("pg");
const {pgConfig } = require("../../config/connection");

const pool = new Pool(pgConfig );





exports.createBitacora = async (req, res) => {
    let api = new estructuraApi(); //instanciar
    if (req.file != null || undefined) {
        const id_asignacion = req.body.asignacion_id
        const documento = req.body.documento;
        const tipo = req.body.tipo_seguimiento_id
        const newDocument = {
            documento: documento,
            ruta: returnPath(req.file.path),
        };
        //reviso si la asignacion esta con una novedad activa
        const verifyNovedad = await Asignacion.findOne({ where: { id_asignacion } })
        if (verifyNovedad.novedad_id != 1) {
            api.setEstado(207, "error", "El aprendiz no podra comenzar su seguimiento ya que tiene una novedad")
            //si no tiene ninguna novedad
        } else {
            const bitacoras = await Bitacora.findAll({ where: { asignacion_id: id_asignacion } })
            //consulto si ya hay alguna bitacora creada
            if (bitacoras.length == 0) {
                const doc = await Documentos.create(newDocument)
                const newBitacora = await Bitacora.create({
                    estado_documento: "Por Aprobar",
                    documento_id: doc.dataValues.id_documento,
                    asignacion_id: id_asignacion,
                    tipo_seguimiento_id: tipo
                })
                api.setEstado('SUC-001', "success", "Primer bitacora registrada con exito")
                api.setResultado(newBitacora)
                //si no hay ninguna bitacora registrada
            } else {
                //condiciono para que si el tipo es mayor a 1 pregunte si el tipo anterior del seguimiento esta aprobado
                if (tipo > 1) {
                    console.log(tipo);
                    const tipoconsulta = tipo - 1
                    console.log(tipoconsulta);
                    // consulta si ya el seguimiento esta o no aprobado para hacer el registro
                    const verifySeguimiento = await pool.query(`
                select asignacion.id_asignacion
                from asignacion
                JOIN seguimiento on seguimiento.asignacion_id = asignacion.id_asignacion
                JOIN tipo_seguimiento on seguimiento.tipo_seguimiento_id = tipo_seguimiento.id_tipo_seguimiento
                JOIN documentos on seguimiento.documento_id = documentos.id_documento
                where id_asignacion = ${id_asignacion}
                and seguimiento.tipo_seguimiento_id = ${tipoconsulta}
                and seguimiento.estado_documento= 'Aprobado'`)
                    if (verifySeguimiento.rows.length > 0) {
                        const doc = await Documentos.create(newDocument)
                        const BitacoraNuevoTipo = await Bitacora.create({
                            estado_documento: "Por Aprobar",
                            documento_id: doc.dataValues.id_documento,
                            asignacion_id: id_asignacion,
                            tipo_seguimiento_id: tipo
                        })
                        api.setEstado('SUC-001', "success", "Bitacora registrada con exito")
                        api.setResultado(BitacoraNuevoTipo)
                    } else {
                        api.setEstado(404, "error", "Primero debes esperar a que el seguimiento del anterior fase este aprobado")
                    }
                } else {
                    const doc2 = await Documentos.create(newDocument)
                    const BitacoraMismoTipo = await Bitacora.create({
                        estado_documento: "Por Aprobar",
                        documento_id: doc2.dataValues.id_documento,
                        asignacion_id: id_asignacion,
                        tipo_seguimiento_id: tipo
                    })
                    api.setEstado('SUC-001', "success", "Bitacora registrada con exito")
                    api.setResultado(BitacoraMismoTipo)
                }

            }
        }
    }
    // }
    res.json(api.toResponse())
}
exports.getBitacoras = async (req, res) => {
    let EstructuraApi = new estructuraApi();
    const id_asignacion = req.body.asignacion_id
    const tipo = req.body.tipo_seguimiento_id
    const asignacion = await pool.query(`select asignacion.id_asignacion,
    aprendices.nombres,
    aprendices.apellidos,
    aprendices.genero,
    aprendices.telefono,
    aprendices.correo_alternativo,
    aprendices.centro,
    aprendices.ficha,
    aprendices.identificacion,
    aprendices.fecha_nacimiento,
    bitacoras.estado_documento,
    bitacoras.documento_id,
    bitacoras.tipo_seguimiento_id,
    bitacoras.id_bitacora,
    tipo_seguimiento.tipo_seguimiento,
    documentos.documento
    from asignacion
    JOIN aprendices on asignacion.aprendiz_id =aprendices.id_aprendiz
    JOIN bitacoras on bitacoras.asignacion_id = asignacion.id_asignacion
    JOIN tipo_seguimiento on bitacoras.tipo_seguimiento_id = tipo_seguimiento.id_tipo_seguimiento
    JOIN documentos on bitacoras.documento_id = documentos.id_documento
    where id_asignacion = ${id_asignacion}
    and bitacoras.tipo_seguimiento_id = ${tipo}`)
    await Asignacion.findAll({
        where: { id_asignacion: id_asignacion }
    })
    if (asignacion.rows.length > 0) {
        EstructuraApi.setResultado(asignacion.rows)
    } else {
        EstructuraApi.setEstado(404, "info", "No tiene bitacoras con este tipo")
    }
    res.json(EstructuraApi.toResponse())
}
exports.CambiarEstado = async (req, res) => {
    let EstructuraApi = new estructuraApi();
    const bitacora_id = req.body.id_bitacora
    const estado_documento = req.body.estado_documento
    const NewTipo = await Bitacora.findOne({ where: { id_bitacora: bitacora_id } })
    NewTipo.estado_documento = estado_documento
    await NewTipo.save()
    EstructuraApi.setEstado('SUC-001', 'success', 'Estado registrado con exito')
    EstructuraApi.setResultado(NewTipo)
    res.json(EstructuraApi.toResponse())
}

exports.ConsultAprendizAnd = async (req, res) => {
    const api = new estructuraApi();
    const { id_bitacora } = req.params
    const data = await pool.query(
        `select * 
        FROM bitacoras
        join asignacion on bitacoras.asignacion_id = id_asignacion 
        JOIN aprendices ON asignacion.aprendiz_id = aprendices.id_aprendiz 
        JOIN tipo_seguimiento ON tipo_seguimiento.id_tipo_seguimiento = bitacoras.tipo_seguimiento_id  
        where id_bitacora = ${id_bitacora}`
    )

    if (data.rows.length === 0) {
        api.setEstado(204, 'emty', 'no se encuantra ningun dato')
        return res.json(api.toResponse())
    }
    api.setResultado(data.rows)
    return res.json(api.toResponse())

}

