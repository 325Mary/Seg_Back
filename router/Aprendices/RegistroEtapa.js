const { getRegistrosEtapa } = require('../controller/Aprendices/RegitroEtapaProductiva.controller.js');

//routes Registro Etapa Productiva
router.post('/RegistroEtapaProductica',getRegistrosEtapa);
router.put('/RegistroEtapaProductica');
router.delete('/RegistroEtapaProductica');

