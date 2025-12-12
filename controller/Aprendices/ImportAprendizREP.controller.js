const Aprendiz = require("../../models/Aprendiz/Aprendiz");
const estructuraApi = require("../../helpers/estructuraApi");
const RegitroEtapaProductiva = require("../../models/Aprendiz/RegistroEtapaProductiva");
const ProgramaFormacion = require("../../models/ProgramaFormacion");
var XLSX = require("xlsx");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const moment = require('moment-timezone');
const { format } = require("path");
const saltRounds = 4;
const bcrypt = require('bcrypt');
const User = require("../../models/municipios/municipios");
const { Pool } = require("pg");
const { pgConfig } = require("../../config/connection");
const { Op } = require('sequelize');
const { log } = require("console");
const sequelize = Aprendiz.sequelize;

const pool = new Pool(pgConfig);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "storage/excel_aprendiz_REP");
    },
    filename: function (req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 2000000,
    },
    fileFilter: function (req, file, cb) {
        const filetypes = '.xlsx';


        const extname = path.extname(file.originalname)
        if (filetypes == extname) {
            return cb(null, true)
        } else {
            return cb(null, false);

        }


    }
});
exports.upload = upload.single("ruta");


exports.createDocument = async (req, res) => {
    let EstructuraApi = new estructuraApi();
    
    if (req.file != undefined) {
        const documento = req.body.documento;
        const id_centro_formacion = req.body.id_centro_formacion;
        
        let file_path = req.file.path
        
        // Linux
        let file_split = file_path.split("/")
        let final_path = file_split[1] + "/" + file_split[2];
        
        const excel = XLSX.readFile(file_path)
        var nombreHoja = excel.SheetNames;
        let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
        
        // ... todo tu código de normalización de datos ...
        
        let Datos = datos.map((el) =>
            Object.fromEntries
                (Object.entries(el).map(([key, value]) => [key.replace(/\s+/g, ""), value])))
        let aMayus = Datos.map((el) =>
            Object.fromEntries(
                Object.entries(el).map(([key, value]) => [key.replace(/[ÁÂ]/g, 'A'), value])
            ))
        let aMenus = aMayus.map((el) =>
            Object.fromEntries(
                Object.entries(el).map(([key, value]) => [key.replace(/[áâ]/g, 'a'), value])
            ))
        let eMayus = aMenus.map((el) =>
            Object.fromEntries(
                Object.entries(el).map(([key, value]) => [key.replace(/[ÉÊ]/g, 'E'), value])
            ))
        let eMenus = eMayus.map((el) =>
            Object.fromEntries(
                Object.entries(el).map(([key, value]) => [key.replace(/[éê]/g, 'e'), value])
            ))
        let iMayus = eMenus.map((el) =>
            Object.fromEntries(
                Object.entries(el).map(([key, value]) => [key.replace(/[ÍÎ]/g, 'I'), value])
            ))
        let iMenus = iMayus.map((el) =>
            Object.fromEntries(
                Object.entries(el).map(([key, value]) => [key.replace(/[íî]/g, 'i'), value])
            ))
        let oMayus = iMenus.map((el) =>
            Object.fromEntries(
                Object.entries(el).map(([key, value]) => [key.replace(/[ÓÔ]/g, 'O'), value])
            ))
        let oMenus = oMayus.map((el) =>
            Object.fromEntries(
                Object.entries(el).map(([key, value]) => [key.replace(/[óô]/g, 'o'), value])
            ))
        let uMayus = oMenus.map((el) =>
            Object.fromEntries(
                Object.entries(el).map(([key, value]) => [key.replace(/[ÚÛ]/g, 'U'), value])
            ))
        let uMenus = uMayus.map((el) =>
            Object.fromEntries(
                Object.entries(el).map(([key, value]) => [key.replace(/[úû]/g, 'u'), value])
            ))
        
        const Registro = []
        uMenus.forEach(dato => {
            Registro.push({
                ...dato,
            })
        })
        
        // AQUÍ ESTÁ EL CAMBIO: pasar res e id_centro_formacion
        return await guardarDocumento(Registro, res, id_centro_formacion);
        
    } else {
        EstructuraApi.setEstado(407, "error", "Error: El Archivo debe ser de tipo xlsx")
        return res.json(EstructuraApi.toResponse())
    }
}
guardarDocumento = async (Registro, res, id_centro_formacion) => {
    try {
        let EstructuraApi = new estructuraApi();
        
        // Validar que Registro sea un array
        if (!Array.isArray(Registro)) {
            console.error('Registro no es un array:', typeof Registro);
            EstructuraApi.setEstado(400, "error", "Los datos no tienen el formato correcto");
            return res.json(EstructuraApi.toResponse());
        }

        if (Registro.length === 0) {
            EstructuraApi.setEstado(400, "error", "El archivo Excel está vacío");
            return res.json(EstructuraApi.toResponse());
        }
        
        // Validar que se recibió el id_centro_formacion
        if (!id_centro_formacion) {
            EstructuraApi.setEstado(400, "error", "No se recibió el ID del centro de formación");
            return res.json(EstructuraApi.toResponse());
        }

        // Verificar que el centro existe en la base de datos
        const centroExiste = await pool.query(
            `SELECT id_centro_formacion FROM centro_formacion WHERE id_centro_formacion = $1`,
            [id_centro_formacion]
        );

        if (!centroExiste.rows || centroExiste.rows.length === 0) {
            EstructuraApi.setEstado(400, "error", `El centro con ID ${id_centro_formacion} no existe en la base de datos`);
            return res.json(EstructuraApi.toResponse());
        }


        let registrosExitosos = 0;
        let registrosOmitidos = 0;
        let errores = [];

        for (let i = 0; i < Registro.length; i++) {
            try {
                
                let identificacionExcel = Registro[i].Numerodocumento + "";
                
                // Verificar si el aprendiz ya existe
                let aprendiz = await Aprendiz.findAll({ 
                    where: { identificacion: identificacionExcel } 
                });
                
                if (aprendiz.length > 0) {
                    console.log(`El aprendiz con identificacion ${Registro[i].Numerodocumento} ya existe en la base de datos.`);
                    registrosOmitidos++;
                    continue;
                }

                let programa = Registro[i].Especialidad;
                let municipio = (Registro[i].Municipio || '').toLowerCase();
                let departamento = (Registro[i].Departamento || '').toLowerCase();
                let ciudad_empresa = (Registro[i].Ciudadempresa || '').toLowerCase();
                let departamento_empresa = (Registro[i].Departamentoempresa || '').toLowerCase();
                let Programas = await ProgramaFormacion.findAll({ 
                    where: { programa_formacion: programa }
                });

                let departamento_apr = await pool.query(
                    `SELECT * FROM departamentos WHERE unaccent(LOWER(departamento)) LIKE unaccent(LOWER($1))`,
                    [`%${departamento}%`]
                );

                let departamento_emp = await pool.query(
                    `SELECT * FROM departamentos WHERE unaccent(LOWER(departamento)) LIKE unaccent(LOWER($1))`,
                    [`%${departamento_empresa}%`]
                );
                if (!departamento_apr.rows || departamento_apr.rows.length === 0) {
                    throw new Error(`Departamento del aprendiz no encontrado: ${departamento}`);
                }

                if (!departamento_emp.rows || departamento_emp.rows.length === 0) {
                    throw new Error(`Departamento de la empresa no encontrado: ${departamento_empresa}`);
                }

                // Buscar municipio del aprendiz
                let municipios = await User.findAll({
                    where: {
                        [Op.and]: [
                            sequelize.where(
                                sequelize.fn('unaccent', sequelize.fn('LOWER', sequelize.col('municipio'))),
                                sequelize.fn('unaccent', sequelize.fn('LOWER', municipio))
                            ),
                            { departamento_id: departamento_apr.rows[0]?.id_departamento }
                        ]
                    }
                });

                // Buscar ciudad de la empresa
                let ciudades = await User.findAll({
                    where: {
                        [Op.and]: [
                            sequelize.where(
                                sequelize.fn('unaccent', sequelize.fn('LOWER', sequelize.col('municipio'))),
                                sequelize.fn('unaccent', sequelize.fn('LOWER', ciudad_empresa))
                            ),
                            { departamento_id: departamento_emp.rows[0]?.id_departamento }
                        ]
                    }
                }); 


                let newAprendiz;
                let programaId;

                if (Programas.length === 0) {
                    const newProgram = {
                        tipo_programa: Registro[i].Especialidad,
                        programa_formacion: Registro[i].Especialidad
                    };
                    const NuevoPrograma = await ProgramaFormacion.create(newProgram);
                    programaId = NuevoPrograma.id_programa_formacion;
                } else {
                    programaId = Programas[0].id_programa_formacion;
                }

                let centroId = id_centro_formacion;

                const aprendizData = {
                    nombres: Registro[i].Nombres,
                    apellidos: Registro[i].Apellidos,
                    fecha_nacimiento: Registro[i].FechaNacimiento,
                    genero: Registro[i].Genero,
                    telefono: Registro[i].Telefono,
                    correo_alternativo: Registro[i].Correoelectonico,
                    municipio_id: municipios[0].dataValues.id_municipio,
                    programa_id: programaId,
                    centro: Registro[i].Centro,
                    id_centro_formacion: centroId, 
                    inicio_lectiva: Registro[i].Iniciolectiva,
                    incio_productiva: Registro[i].Inicioproductiva,
                    contrato_inicio: Registro[i].Contratoinicio,
                    contrato_fin: Registro[i].ContratoFin,
                    ficha: Registro[i].Ficha,
                    discapacidad: Registro[i].Discapacidad || 'Ninguna',
                    tipo_documento: Registro[i].Tipodocumento,
                    fin_lectiva: Registro[i].Finlectiva,
                    fin_productiva: Registro[i].Finproductiva,
                    regional: Registro[i].Regional,
                    fase_aprendiz: Registro[i].Fase,
                    identificacion: Registro[i].Numerodocumento,
                    correo_misena: Registro[i].CorreoMisena,
                    perfil_id: 2,
                    password: await bcrypt.hash(Registro[i].Numerodocumento.toString(), saltRounds)
                };

                // Crear el aprendiz
                newAprendiz = await Aprendiz.create(aprendizData);


                // Crear registro de etapa productiva
                await RegitroEtapaProductiva.create({
                    nit_empresa: Registro[i].NIT,
                    nombre_empresa: Registro[i].RazonSocial,
                    nit_arl: Registro[i].NitARL,
                    arl: Registro[i].ARL,
                    nit_eps: Registro[i].NitEPS,
                    eps: Registro[i].EPS,
                    razon_social: Registro[i].RazonSocial,
                    municipio_id: ciudades[0].id_municipio,
                    direccion: Registro[i].Direccion,
                    telefono: Registro[i].Telefonoempresa,
                    correo: Registro[i].Correoelectronico,
                    observacion: Registro[i].Observacion || 'Ninguna',
                    representante_legal: Registro[i].RepresentanteLegal || 'N/A',
                    identificacion_representante: Registro[i].IdentificacionRepresentanteLegal || 'N/A',
                    modalidad: Registro[i].Modalidad,
                    aprendiz_id: newAprendiz.id_aprendiz,
                });

                registrosExitosos++;

            } catch (errorRegistro) {
                console.error(`Error en registro ${i + 1}:`, errorRegistro.message);
                errores.push({
                    registro: i + 1,
                    identificacion: Registro[i]?.Numerodocumento || 'N/A',
                    error: errorRegistro.message
                });
            }
        }

        
        console.log(`Errores: ${errores.length}`);
        if (errores.length > 0) {
            console.log('Detalle de errores:', JSON.stringify(errores, null, 2));
        }
        
       EstructuraApi.setResultado('SUC-001', 'success', 'Archivo importado con éxito')
        
        return res.json({
            ...EstructuraApi.toResponse(),
            detalles: {
                total: Registro.length,
                exitosos: registrosExitosos,
                omitidos: registrosOmitidos,
                errores: errores
            }
        });

    } catch (error) {
        console.error('Error al guardar documento:', error);
        let EstructuraApi = new estructuraApi();
        EstructuraApi.setEstado(500, "error", "Error al importar archivo: " + error.message);
        return res.json(EstructuraApi.toResponse());
    }
}
