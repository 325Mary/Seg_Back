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
const saltRounds = 4
const bcrypt = require('bcrypt');
const User = require("../../models/municipios/municipios");
const sequelize = require("../../config/connection");
const { Op } = require('sequelize');

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
        let file_path = req.file.path
        // WIN
        // let file_split = file_path.split("\\")
        // let final_path = file_split[1] + "/" + file_split[2];

        // Linux
        let file_split = file_path.split("/")
        let final_path = file_split[1] + "/" + file_split[2];
        
        const excel = XLSX.readFile(file_path)
        var nombreHoja = excel.SheetNames;
        let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
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
        guardarDocumento(Registro)
    } else {
        EstructuraApi.setEstado(407, "error", "Error: El Archivo debe ser de tipo xlsx")

    }
    return res.json(EstructuraApi.toResponse())

}
guardarDocumento = async (req, res) => {
    let EstructuraApi = new estructuraApi();
    const Registro = req
    for (i = 0; i < Registro.length; i++) {
        let identificacionExcel = Registro[i].Numerodocumento + ""
        let aprendiz = await Aprendiz.findAll({ where: { identificacion: identificacionExcel } })
        if (aprendiz.length > 0) {

        } else {
            //programa de formacion del aprendiz
            let programa = Registro[i].Especialidad

            // municipio y departamento del aprendiz, excel
            let municipio = Registro[i].MunicipioAprendiz.toLowerCase()
            let departamento = Registro[i].DepartamentoAprendiz.toLowerCase()

            //ciuadad y departamento de la empresa, excel
            let ciudad_empresa = Registro[i].CiudadEmpresa.toLowerCase()
            let departamento_empresa = Registro[i].DepartamentoEmpresa.toLowerCase()

            let Programas = await ProgramaFormacion.findAll({ where: { programa_formacion: programa}})

            // obtener departamento del aprendiz, db
            let departamento_apr = await sequelize.query(`SELECT * FROM departamentos WHERE unaccent(LOWER(departamento)) LIKE unaccent(LOWER(?));`,
                {
                    replacements: [`%${departamento}%`],
                    type: sequelize.QueryTypes.SELECT
                }
            );

            // obtener departamento de la empresa, db
            let departamento_emp = await sequelize.query(`SELECT * FROM departamentos WHERE unaccent(LOWER(departamento)) LIKE unaccent(LOWER(?));`,
              {
                replacements: [`%${departamento_empresa}%`],
                type: sequelize.QueryTypes.SELECT
              }
            );

            //compraracion entre los valores db y excel para municipio del aprendiz
            let municipios = await User.findAll({
                where: {
                    [Op.and]: [
                        sequelize.where(
                        sequelize.fn('unaccent', sequelize.fn('LOWER', sequelize.col('municipio'))),
                        sequelize.fn('unaccent', sequelize.fn('LOWER', municipio))
                        ),
                        { departamento_id: departamento_apr[0]?.id_departamento }
                    ]
                }
            });


            //compraracion entre los valores db y excel para ciudad de la empresa
            let ciudades = await User.findAll({
                where: {
                    [Op.and]: [
                        sequelize.where(
                        sequelize.fn('unaccent', sequelize.fn('LOWER', sequelize.col('municipio'))),
                        sequelize.fn('unaccent', sequelize.fn('LOWER', ciudad_empresa))
                        ),
                        { departamento_id: departamento_emp[0]?.id_departamento }
                    ]
                }
            });


            if (Programas.length > 0) {
                const newAprendiz = await Aprendiz.create({
                    nombres: Registro[i].Nombres,
                    apellidos: Registro[i].Apellidos,
                    fecha_nacimiento: Registro[i].FechaNacimiento,
                    genero: Registro[i].Genero,
                    telefono: Registro[i].Telefono,
                    correo_alternativo: Registro[i].CorreoElectronico,
                    municipio_id: municipios[0].id_municipio,
                    programa_id: Programas[0].id_programa_formacion,
                    centro: Registro[i].Centro || 'CENTRO INDUSTRIAL -POPAYAN-',
                    inicio_lectiva: Registro[i].InicioLectiva,
                    incio_productiva: Registro[i].InicioProductiva,
                    contrato_inicio: Registro[i].ContratoInicio,
                    contrato_fin: Registro[i].ContratoFin,
                    ficha: Registro[i].Ficha,
                    discapacidad: Registro[i].Discapacidad || 'Ninguna',
                    tipo_documento: Registro[i].TipoDocumento,
                    fin_lectiva: Registro[i].FinLectiva,
                    fin_productiva: Registro[i].FinProductiva,
                    regional: Registro[i].Regional,
                    fase_aprendiz: Registro[i].FaseAprendiz,
                    identificacion: Registro[i].Numerodocumento,
                    correo_misena: Registro[i].CorreoMisena,
                    perfil_id: 2,
                    password: await bcrypt.hash(Registro[i].Numerodocumento.toString(), saltRounds)
                })
                const newRegistroEtapa = RegitroEtapaProductiva.create({
                    nit_empresa: Registro[i].NIT,
                    nombre_empresa: Registro[i].Empresa,
                    nit_arl: Registro[i].NitArl,
                    arl: Registro[i].ARL,
                    nit_eps: Registro[i].NitEps,
                    eps: Registro[i].Eps,
                    razon_social: Registro[i].RazonSocial,
                    ciudad_id: ciudades[0].id_municipio,
                    direccion: Registro[i].DireccionEmpresa,
                    telefono: Registro[i].TelefonoEmpresa,
                    correo: Registro[i].CorreoEmpresa,
                    observacion: Registro[i].Observacion || 'Ninguna',
                    representante_legal:Registro[i].RepresentanteLegal,
                    identificacion_representante:Registro[i].IdentificacionRepresentanteLegal,
                    modalidad:Registro[i].Modalidad,
                    aprendiz_id: newAprendiz.id_aprendiz,
                })
            } else {
                const newProgram ={
                    tipo_programa:Registro[i].Especialidad,
                    programa_formacion:Registro[i].Especialidad
                }
                const NuevoPrograma = await ProgramaFormacion.create(newProgram);
                const newAprendiz = await Aprendiz.create({
                    nombres: Registro[i].Nombres,
                    apellidos: Registro[i].Apellidos,
                    fecha_nacimiento: Registro[i].FechaNacimiento,
                    genero: Registro[i].Genero,
                    telefono: Registro[i].Telefono,
                    correo_alternativo: Registro[i].CorreoElectronico,
                    municipio_id: municipios[0].id_municipio,
                    programa_id: NuevoPrograma.id_programa_formacion,
                    centro: Registro[i].Centro || 'CENTRO INDUSTRIAL -POPAYAN-',
                    inicio_lectiva: Registro[i].InicioLectiva,
                    incio_productiva: Registro[i].InicioProductiva,
                    contrato_inicio: Registro[i].ContratoInicio,
                    contrato_fin: Registro[i].ContratoFin,
                    ficha: Registro[i].Ficha,
                    discapacidad: Registro[i].Discapacidad || 'Ninguna',
                    tipo_documento: Registro[i].TipoDocumento,
                    fin_lectiva: Registro[i].FinLectiva,
                    fin_productiva: Registro[i].FinProductiva,
                    regional: Registro[i].Regional,
                    fase_aprendiz: Registro[i].FaseAprendiz,
                    identificacion: Registro[i].Numerodocumento,
                    correo_misena: Registro[i].CorreoMisena,
                    perfil_id: 2,
                    password: await bcrypt.hash(Registro[i].Numerodocumento.toString(), saltRounds)
                })
                const newRegistroEtapa = RegitroEtapaProductiva.create({
                    nit_empresa: Registro[i].NIT,
                    nombre_empresa: Registro[i].Empresa,
                    nit_arl: Registro[i].NitArl,
                    arl: Registro[i].ARL,
                    nit_eps: Registro[i].NitEps,
                    eps: Registro[i].Eps,
                    razon_social: Registro[i].RazonSocial,
                    ciudad_id: ciudades[0].id_municipio,
                    direccion: Registro[i].DireccionEmpresa,
                    telefono: Registro[i].TelefonoEmpresa,
                    correo: Registro[i].CorreoEmpresa,
                    observacion: Registro[i].Observacion || 'Ninguna',
                    representante_legal:Registro[i].RepresentanteLegal,
                    identificacion_representante:Registro[i].IdentificacionRepresentanteLegal,
                    modalidad:Registro[i].Modalidad,
                    aprendiz_id: newAprendiz.id_aprendiz,
                })
            }
        }
    }
    EstructuraApi.setResultado('SUC-001', 'success', 'Arhivo importado con exito')

}

