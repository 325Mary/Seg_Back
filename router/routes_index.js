const router = require('express').Router();
const networksController = require('../controller/Redes/networksController')
const areasController = require('../controller/Redes/areaController')
const usersControllers = require('../controller/usuarios/UsersContoller')
const loginController = require('../controller/Auth.controller/loginController')
const AuntenticToken = require('../middleware/authenticationJWT')
const programaController = require('../controller/Redes/programaController')
const AprendizController = require('../controller/Aprendices/Aprendiz.controller')
const eProductivaController = require('../controller/Aprendices/RegistroEtapaProductiva.controller')
const documentosController = require('../controller/Documentos/documentosController')
const importExcel = require('../controller/Aprendices/ImportAprendizREP.controller')
const controllerUplodImg = require('../controller/Upload/imgController')
const seguimiento = require('../controller/Seguimiento/Seguimiento.controller')
const assignmentsController = require('../controller/Asignacion/asignacionControler')
const item_modules_controller = require('../controller/item-modulos/item-modulos-permisos.controller')
const item_modules_navBar_controller = require('../controller/item-modulos/item-modules-navbar.controller')
const multer = require('../libs/multer');
const loginControllerAprendiz = require('../controller/Auth.controller/loginAprendiz.controller')
const requisitos_cert_controller = require('../controller/Requisitos_Certificacion/Requisitos.controller')
const documentos_cert_controller = require('../controller/Documento_Certificacion/Documentos_Cert.controller')
const fasesController = require('../controller/EstadoFase/faseController')
const controllerItemMOdules = require('../controller/item-modulos/getphather')
const notificacionController = require('../controller/Notificaciones/notificacionController')
const bitacoraController = require('../controller/Bitacoras/bitacorasController')
const emailCOntroller = require('../controller/Emails/emails.controller')
const municipiosController = require('../controller/municpios.controller/municipios');
const { envioEmail } = require('../controller/Mensaje/mensaje.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');


// //mensaje
router.post('/mensaje',[
    check('asunto','El asunto es requerido').not().isEmpty(),
    check('mensaje','El mensaje es requerido').not().isEmpty(),
    check('email','El correo es requerido').not().isEmpty(),
    check('email','El correo no es valido').isEmail(),
    validateFields
], envioEmail)

//routes networks
router.get('/seenetworks', networksController.seeNetworks)
router.get('/seenetwork/:id_red_conocimiento', networksController.seeNetwork)

//routes areas

router.get('/seeareas', areasController.seeAreas)
router.get('/seearea/:id_area', areasController.seeArea)

//routes program
router.get('/programs', programaController.getProgramaFormacion)
router.get('/programs/:id', programaController.getByIdProgramaFormacion)
router.get('/red/:id/programs', programaController.getAreawithPrograms) //list of nets with programs

//route aprendiz
router.get('/aprendiz', AprendizController.getAprendices)
// router.post('/aprendiz', AprendizController.createAprendiz)
// router.delete('/aprendiz/:id', AprendizController.deleteAprendiz)
// router.put('/aprendiz/:id', AprendizController.updateAprendiz)
router.get('/getByIdAprendiz/:id', AprendizController.getByIdAprendiz)
router.post('/importRegistro', importExcel.upload, importExcel.createDocument)

//route aprendiz with REP
router.get('/aprendices', AprendizController.getRegistroCompleto)
router.post('/aprendiz_REP', AprendizController.createAprendizWithREP)
router.put('/aprendiz_REP/:id', AprendizController.updateAprendizWithREP)
router.delete('/aprendiz_REP/:id', AprendizController.deleteAprendizWithREP)
router.get('/Aprendiz/:id', AprendizController.getAprendizByIdNovedad)
router.get('/aprendiz_REP/:id', AprendizController.getByIdAprendizWithREP)
router.get('/aprendizById/:id', AprendizController.getAprendizById)

//usuarios
router.get('/AllFichas/:id_usuario', AprendizController.allFichasByIdUser)
router.post('/AllMysFichas/:id_usuario', AprendizController.misFichasAsignadas)

//route registro etapa productiva
router.get('/etapaProductiva', eProductivaController.getRegistrosEtapa)
router.post('/etapaProductiva/:id', eProductivaController.createRegistroEtapa)
router.delete('/etapaProductiva/:id', eProductivaController.deleteRegistroAprendiz)
//Seguimiento
router.get('/consultseguimientos/:id_asignacion', seguimiento.ConsultByIdSeguimiento);
router.get('/seguimiento', seguimiento.getSeguimiento);
router.post('/seguimiento', documentosController.upload, seguimiento.crearSegumientoBack)
router.delete('/seguimiento/:id', seguimiento.deleteSeguimiento)
router.put('/seguimiento/:id', seguimiento.updateSeguimiento)
router.get('/seguimiento/:id', seguimiento.getSeguiminetoById)
router.get('/verifyBitacoras/:id_asignacion', seguimiento.verifyBitacoras)
router.post('/verificoBitacorasTipo', seguimiento.verifyBitacoraTipo)

//estado del documento
router.post('/estadoDoc', seguimiento.EstadoDocumento)
router.post('/documentosSeguimiento', seguimiento.getDocumentos)

/*routes user */
router.get('/allusers', usersControllers.allUsers)
router.post('/createUser', usersControllers.CreateUser)
router.get('/viewUser/:id_usuario', usersControllers.viewUser)
router.put('/updateUser/:id_usuario', usersControllers.UpdateUser)
router.delete('/deleteUser/:id_usuario', usersControllers.DeleteUser)
router.post('/filtrarUsers', usersControllers.filtrar)
router.get('/perfilAdmins', usersControllers.allAdminUsers)
router.get('/users', usersControllers.Users)
/*end routes users*/

/*login*/
router.post('/login', loginController.LoginUser)
router.post('/loginAprendiz', loginControllerAprendiz.LoginAprendiz)
router.post('/updatedPasswordUser/:id_usuario', loginController.updatePasswordUser)
router.post('/updatedPasswordAprendiz/:id_aprendiz', loginControllerAprendiz.updatePasswordAprendiz)
/*end login */


//routes ducuments
router.get('/seedocs', documentosController.seeDocuments)
router.get('/seedoc/:id_documento', documentosController.seeDocument)
router.post('/uploadDocument', documentosController.upload, documentosController.createDocument)
router.delete('/deletedoc', documentosController.deleteDocument)

//route upload img
router.route('/photo').post(multer.single('file'), controllerUplodImg.UploadDocument)
router.delete('/deleteImage/:id_photo', controllerUplodImg.deletephoto)
router.post('/oneImage', controllerUplodImg.servicesOneImage)
//end upload img


//routes assignments
router.get('/seeassignments', assignmentsController.seeAssignments)
router.get('/seeassignment/:id_asignacion', assignmentsController.seeAssignment)
router.get('/seemyassignment/:id_user', assignmentsController.seeMyAssignments)
router.get('/createassignment', assignmentsController.dataForform)
router.post('/storeassignment', assignmentsController.createAssignment)
router.put('/updateassignment/:id_asignacion', assignmentsController.updateAssignment)
router.delete('/deleteassignment/:id_asignacion', assignmentsController.deleteAssignment)
router.get('/seeAprendiz/:id', assignmentsController.seeAprendizById)
// router.get('/seeAprendiz/:id', assignmentsController.seeAprendizById)
router.get('/verifyassignment/:aprendiz_id', assignmentsController.verifyAssignment)
router.get('/verifyAprendiz/:aprendiz_id', assignmentsController.verifyAprendiz)
router.post('/filtrarFecha', assignmentsController.filtrarFecha)
//Novedad
router.post('/novedad/:id', assignmentsController.createNovedad)
router.get('/novedad', assignmentsController.getNovedades)

/*Item modules*/
router.delete('/deleteModulePerfiles/:id_item_modulo_perfil', item_modules_controller.deleteItemModulePerfil)
router.get('/all_modules_perfiles', item_modules_controller.getAllModulePerfiles)
router.get('/modules-By-id/:id_item_modulo_perfil', item_modules_controller.getOneItemModulePerfil)
router.post('/createItemModules', item_modules_controller.createModulePerfil)

router.get('/allItemModeles', item_modules_controller.AsignarItems)
router.get('/itemModulesById/:id_item_modulo', item_modules_controller.ConsultItemModule)
router.get('/navModules/:id_user', item_modules_navBar_controller.searchChidren)
router.get('/itemModules/:id_perfil', controllerItemMOdules.getPhatherByID)
router.get('/allitemModules', controllerItemMOdules.getAllItemModule)
/*end Item modules*/

//Routes Requisitos Certificacion
router.get('/allRequisitos', requisitos_cert_controller.allRequisitos)

//Routes Documentos Certificacion
router.get('/allDocumentosCert', documentos_cert_controller.allDocumentosCertificaciones)
router.post('/createDocCertificacion', documentosController.upload, documentos_cert_controller.createDocumentosCertificaciones)
router.delete('/deleteDocumentosCert/:id_documentos_cert', documentos_cert_controller.deleteDocumentosCertificaciones)
router.post('/estadoDocumentosCert/:id_documentos_cert', documentos_cert_controller.cambiarEstado)
router.post('/allDocumentosByRequisitos', documentos_cert_controller.getDocumentosByRequisito)
router.get('/allAprendicesPorCertificar', documentos_cert_controller.getAprendicesPorCertificar)

//Routes Bitacora
router.get('/consultSendEmail/:id_bitacora', bitacoraController.ConsultAprendizAnd)
router.post('/bitacora', documentosController.upload, bitacoraController.createBitacora)
router.post('/listTipoBitacoras', bitacoraController.getBitacoras)
router.post('/cambiarEstado', bitacoraController.CambiarEstado)
//route Fases
router.get('/allFases', fasesController.AllFases)



//Routes Notificaciones
router.get('/notificaciones', notificacionController.allNotificaciones)
// router.get('/notificacion/id_notificacion', notificacionController.notificacionByID)
router.get('/misnotificaciones/:id_user', notificacionController.misNotificaciones)
router.post('/estadonotificacion', notificacionController.softdeleteNotificacion)
router.post('/createnotificacion', notificacionController.createNotification)
/*perfiles*/
router.get('/allPerfiles', item_modules_controller.allperfiles)
/*perfiles*/

router.get('/segAprobados/:id_asignacion', seguimiento.segAprobados)




router.post('/changeStatusSeg1', assignmentsController.estadosTipoSeguimiento1)
router.post('/changeStatusSeg2', assignmentsController.estadosTipoSeguimiento2)
router.post('/changeStatusSeg3', assignmentsController.estadosTipoSeguimiento3)

/*send emails */
router.post('/sendEmail/', emailCOntroller.SendEmailNotifications)

/*municipios*/
router.get('/municipios',municipiosController.GetAllMunicipios)

module.exports = router