const estructuraApi = require("../../helpers/estructuraApi");
const associations = require("../../models/asociations");
const Asignacion = require("../../models/Asignacion/Asignacion");
const Bitacora = require("../../models/Bitacora/Bitacora");
const Documentos = require("../../models/Documento/Documento");
var requestBitacora = require("../../models/DTO/BitacoraDTO");
const { Pool } = require("pg");
const { pgConfig } = require("../../config/connection");

const pool = new Pool(pgConfig);

exports.createBitacora = async (req, res) => {
    let api = new estructuraApi();
    
    
    try {
        if (!req.file) {
            console.log('❌ ERROR: req.file es undefined o null');
            api.setEstado("204", "error", "No seleccionaste ningún archivo");
            return res.json(api.toResponse());
        }
        const id_asignacion = req.body.asignacion_id;
        const documento = req.body.documento;
        const tipo = req.body.tipo_seguimiento_id;

        if (!id_asignacion || !documento || !tipo) {
            api.setEstado("400", "error", "Faltan datos requeridos");
            return res.json(api.toResponse());
        }

        let file_path = req.file.path;
        let file_split = file_path.split("/");
        
        if (file_split.length === 1) {
            file_split = file_path.split("\\");
        }


        let final_path;
        if (file_split.length >= 3) {
            final_path = file_split[1] + "/" + file_split[2];
        } else if (file_split.length === 2) {
            final_path = file_split[0] + "/" + file_split[1];
        } else {
            final_path = file_path;
        }
        

        const newDocument = {
            documento: documento,
            ruta: final_path,
        };

        const verifyNovedad = await Asignacion.findOne({ 
            where: { id_asignacion } 
        });

        if (!verifyNovedad) {
            api.setEstado("404", "error", "La asignación no existe");
            return res.json(api.toResponse());
        }

        if (verifyNovedad.novedad_id != 1) {
            api.setEstado(207, "error", "El aprendiz no podrá comenzar su seguimiento ya que tiene una novedad");
            return res.json(api.toResponse());
        }

        const bitacoras = await Bitacora.findAll({ 
            where: { asignacion_id: id_asignacion } 
        });

        if (bitacoras.length === 0) {
            const doc = await Documentos.create(newDocument);
            const newBitacora = await Bitacora.create({
                estado_documento: "Por Aprobar",
                documento_id: doc.dataValues.id_documento,
                asignacion_id: id_asignacion,
                tipo_seguimiento_id: tipo
            });
            api.setEstado('SUC-001', "success", "Primer bitácora registrada con éxito");
            api.setResultado(newBitacora);
            return res.json(api.toResponse());
        }

        if (parseInt(tipo) > 1) {
            const tipoconsulta = parseInt(tipo) - 1;
            
            const verifySeguimiento = await pool.query(`
                SELECT asignacion.id_asignacion
                FROM asignacion
                JOIN seguimiento ON seguimiento.asignacion_id = asignacion.id_asignacion
                JOIN tipo_seguimiento ON seguimiento.tipo_seguimiento_id = tipo_seguimiento.id_tipo_seguimiento
                JOIN documentos ON seguimiento.documento_id = documentos.id_documento
                WHERE id_asignacion = $1
                AND seguimiento.tipo_seguimiento_id = $2
                AND seguimiento.estado_documento = 'Aprobado'`,
                [id_asignacion, tipoconsulta]
            );

            if (verifySeguimiento.rows.length > 0) {
                const doc = await Documentos.create(newDocument);
                const BitacoraNuevoTipo = await Bitacora.create({
                    estado_documento: "Por Aprobar",
                    documento_id: doc.dataValues.id_documento,
                    asignacion_id: id_asignacion,
                    tipo_seguimiento_id: tipo
                });
                api.setEstado('SUC-001', "success", "Bitácora registrada con éxito");
                api.setResultado(BitacoraNuevoTipo);
                return res.json(api.toResponse());
            } else {
                api.setEstado(404, "error", "Primero debes esperar a que el seguimiento de la fase anterior esté aprobado");
                return res.json(api.toResponse());
            }
        } else {
            const doc2 = await Documentos.create(newDocument);
            const BitacoraMismoTipo = await Bitacora.create({
                estado_documento: "Por Aprobar",
                documento_id: doc2.dataValues.id_documento,
                asignacion_id: id_asignacion,
                tipo_seguimiento_id: tipo
            });
            api.setEstado('SUC-001', "success", "Bitácora registrada con éxito");
            api.setResultado(BitacoraMismoTipo);
            return res.json(api.toResponse());
        }

    } catch (error) {
        console.error('Error en createBitacora:', error);
        api.setEstado("500", "error", "Error interno del servidor: " + error.message);
        return res.json(api.toResponse());
    }
};

exports.getBitacoras = async (req, res) => {
    let EstructuraApi = new estructuraApi();
    
    try {
        const id_asignacion = req.body.asignacion_id;
        const tipo = req.body.tipo_seguimiento_id;

        const asignacion = await pool.query(`
            SELECT asignacion.id_asignacion,
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
            FROM asignacion
            JOIN aprendices ON asignacion.aprendiz_id = aprendices.id_aprendiz
            JOIN bitacoras ON bitacoras.asignacion_id = asignacion.id_asignacion
            JOIN tipo_seguimiento ON bitacoras.tipo_seguimiento_id = tipo_seguimiento.id_tipo_seguimiento
            JOIN documentos ON bitacoras.documento_id = documentos.id_documento
            WHERE id_asignacion = $1
            AND bitacoras.tipo_seguimiento_id = $2`,
            [id_asignacion, tipo]
        );

        if (asignacion.rows.length > 0) {
            EstructuraApi.setResultado(asignacion.rows);
        } else {
            EstructuraApi.setEstado(404, "info", "No tiene bitácoras con este tipo");
        }
        
        res.json(EstructuraApi.toResponse());
    } catch (error) {
        console.error('Error en getBitacoras:', error);
        EstructuraApi.setEstado("500", "error", "Error interno del servidor");
        res.json(EstructuraApi.toResponse());
    }
};

exports.CambiarEstado = async (req, res) => {
    let EstructuraApi = new estructuraApi();
    
    try {
        const bitacora_id = req.body.id_bitacora;
        const estado_documento = req.body.estado_documento;

        const NewTipo = await Bitacora.findOne({ 
            where: { id_bitacora: bitacora_id } 
        });

        if (!NewTipo) {
            EstructuraApi.setEstado(404, "error", "Bitácora no encontrada");
            return res.json(EstructuraApi.toResponse());
        }

        NewTipo.estado_documento = estado_documento;
        await NewTipo.save();

        EstructuraApi.setEstado('SUC-001', 'success', 'Estado registrado con éxito');
        EstructuraApi.setResultado(NewTipo);
        res.json(EstructuraApi.toResponse());
    } catch (error) {
        console.error('Error en CambiarEstado:', error);
        EstructuraApi.setEstado("500", "error", "Error interno del servidor");
        res.json(EstructuraApi.toResponse());
    }
};

exports.ConsultAprendizAnd = async (req, res) => {
    const api = new estructuraApi();
    
    try {
        const { id_bitacora } = req.params;

        const data = await pool.query(`
            SELECT * 
            FROM bitacoras
            JOIN asignacion ON bitacoras.asignacion_id = id_asignacion 
            JOIN aprendices ON asignacion.aprendiz_id = aprendices.id_aprendiz 
            JOIN tipo_seguimiento ON tipo_seguimiento.id_tipo_seguimiento = bitacoras.tipo_seguimiento_id  
            WHERE id_bitacora = $1`,
            [id_bitacora]
        );

        if (data.rows.length === 0) {
            api.setEstado(204, 'empty', 'No se encuentra ningún dato');
            return res.json(api.toResponse());
        }

        api.setResultado(data.rows);
        return res.json(api.toResponse());
    } catch (error) {
        console.error('Error en ConsultAprendizAnd:', error);
        api.setEstado("500", "error", "Error interno del servidor");
        return res.json(api.toResponse());
    }
};