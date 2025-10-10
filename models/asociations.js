const Redes = require('./Redes/Red')
const Seguimiento = require('./Segumiento/Seguimiento')
const Areas = require("./Redes/Area");
const User = require("./Auth/login");
const ProgramaFormacion = require("./ProgramaFormacion");
const Aprendiz = require("./Aprendiz/Aprendiz");
const RegistroEtapaProductiva = require("./Aprendiz/RegistroEtapaProductiva");
const Fase = require("./Fase/Estado.fase");
const Asignacion = require("./Asignacion/Asignacion");
const Novedad = require("./Asignacion/Novedad/Novedad")
const Bitacora = require("./Bitacora/Bitacora");
const Documento = require("./Documento/Documento");
const TipoSeguimiento = require("./Segumiento/TipoSeguimiento");
const Requisitos_Certificacion = require("./Requisitos Certificacion/Requisitos")
const Documentos_Certificacion = require("./Requisitos Certificacion/Requisitos")
const Notificacion = require("./Notificacion/Notificacion");
const ModelItemModulePerfil = require("./itemModulosPerfiles.model/item_modulos_perfiles");
const ModelPerfiles = require("./perfiles.model/perfilModeel");
const ModelItemModulos = require("./ItemModulos.model/item_modulos");

ProgramaFormacion.belongsTo(Redes, { foreignKey: "red_id" });
Redes.hasMany(ProgramaFormacion, { foreignKey: "red_id" });

Areas.belongsTo(Redes, { foreignKey: "red_conocimiento_id" });
Redes.hasMany(Areas, { foreignKey: "red_conocimiento_id" });

Aprendiz.belongsTo(ProgramaFormacion, { foreignKey: "programa_id" });
ProgramaFormacion.hasMany(Aprendiz, { foreignKey: "programa_id" });

Aprendiz.hasOne(RegistroEtapaProductiva, { foreignKey: "aprendiz_id" });
RegistroEtapaProductiva.belongsTo(Aprendiz, { foreignKey: "aprendiz_id" });

User.belongsTo(Areas, { foreignKey: "area_id" });
Areas.hasMany(User, { foreignKey: "area_id" });

////////////////////////ASIGNACION///////////////////////////////////
Asignacion.belongsTo(Fase, { foreignKey: "estado_fase_id" });
Fase.hasMany(Asignacion, { foreignKey: "estado_fase_id" });

Asignacion.belongsTo(User, { foreignKey: "usuario_responsable_id" });
User.hasMany(Asignacion, { foreignKey: "usuario_responsable_id" });

// module.exports = { Areas, Redes, User, Seguimiento }

User.belongsTo(ModelPerfiles, { foreignKey: "perfil_id" });
ModelPerfiles.hasMany(User, { foreignKey: "perfil_id" });

Aprendiz.belongsTo(ModelPerfiles, { foreignKey: "perfil_id" });
ModelPerfiles.hasMany(Aprendiz, { foreignKey: "perfil_id" });

Asignacion.belongsTo(Aprendiz, { foreignKey: "aprendiz_id" });
Aprendiz.hasMany(Asignacion, { foreignKey: "aprendiz_id" });

Asignacion.belongsTo(Novedad, { foreignKey: "novedad_id" });
Novedad.hasMany(Asignacion, { foreignKey: "novedad_id" });

////////////////////////BITACORA///////////////////////////////////
Bitacora.belongsTo(Asignacion, { foreignKey: "asignacion_id" });
Asignacion.hasMany(Bitacora, { foreignKey: "asignacion_id" });

Bitacora.belongsTo(Documento, { foreignKey: "documento_id" });
Documento.hasMany(Bitacora, { foreignKey: "documento_id" });

Bitacora.belongsTo(TipoSeguimiento, { foreignKey: "tipo_seguimiento_id" });
TipoSeguimiento.hasMany(Bitacora, { foreignKey: "tipo_seguimiento_id" });

Notificacion.belongsTo(User, { foreignKey: "usuario_id" });
User.hasMany(Notificacion, { foreignKey: "usuario_id" });

Notificacion.belongsTo(User, { foreignKey: "usuario_id" });
User.hasMany(Notificacion, { foreignKey: "usuario_id" });

Seguimiento.belongsTo(Asignacion, { foreignKey: "asignacion_id" });
Asignacion.hasMany(Seguimiento, { foreignKey: "asignacion_id" });


ModelItemModulePerfil.belongsTo(ModelPerfiles, { foreignKey: "perfil_id" });
ModelPerfiles.hasMany(ModelItemModulePerfil, { foreignKey: "perfil_id" });


ModelItemModulePerfil.belongsTo(ModelItemModulos, { foreignKey: "item_modulo_id" });
ModelItemModulos.hasMany(ModelItemModulePerfil, { foreignKey: "item_modulo_id" });

module.exports = {
  Areas,
  Redes,
  User,
  Aprendiz,
  ProgramaFormacion,
  RegistroEtapaProductiva,
  Asignacion,
  Fase,
  Novedad,
  Bitacora,
  Documento,
  TipoSeguimiento,
  ModelItemModulePerfil,
  ModelItemModulos,
  ModelPerfiles
};
