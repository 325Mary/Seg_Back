--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Debian 13.1-1.pgdg100+1)
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE devel_gsa;
--
-- Name: devel_gsa; Type: DATABASE; Schema: -; Owner: dfp
--

CREATE DATABASE devel_gsa WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'es_CO.UTF-8';


ALTER DATABASE devel_gsa OWNER TO dfp;

\connect devel_gsa

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aprendices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aprendices (
    id_aprendiz bigint NOT NULL,
    nombres character varying,
    apellidos character varying,
    genero character varying,
    discapacidad character varying,
    telefono character varying,
    correo_misena character varying,
    correo_alternativo character varying,
    municipio_nacimiento character varying,
    centro character varying,
    programa_id bigint,
    ficha character varying,
    creado timestamp with time zone,
    actualizado timestamp with time zone,
    identificacion character varying,
    fecha_nacimiento character varying,
    inicio_lectiva character varying,
    incio_productiva character varying,
    contrato_inicio character varying,
    contrato_fin character varying,
    password character varying,
    perfil_id bigint
);


ALTER TABLE public.aprendices OWNER TO postgres;

--
-- Name: aprendices_id_aprendiz_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aprendices_id_aprendiz_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.aprendices_id_aprendiz_seq OWNER TO postgres;

--
-- Name: aprendices_id_aprendiz_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.aprendices_id_aprendiz_seq OWNED BY public.aprendices.id_aprendiz;


--
-- Name: areas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.areas (
    id_area bigint NOT NULL,
    area character varying,
    red_conocimiento_id bigint,
    componentes character varying,
    creado timestamp without time zone,
    actualizado timestamp without time zone
);


ALTER TABLE public.areas OWNER TO postgres;

--
-- Name: areas_id_area_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.areas_id_area_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.areas_id_area_seq OWNER TO postgres;

--
-- Name: areas_id_area_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.areas_id_area_seq OWNED BY public.areas.id_area;


--
-- Name: asignacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asignacion (
    id_asignacion bigint NOT NULL,
    aprendiz_id bigint,
    fecha_seguimiento_inicial date,
    fecha_seguimiento_parcial date,
    fecha_seguimiento_final date,
    fecha_evaluacion_final date,
    estado_fase_id bigint,
    usuario_responsable_id bigint,
    creado timestamp with time zone,
    actualizado timestamp with time zone,
    novedad_id bigint
);


ALTER TABLE public.asignacion OWNER TO postgres;

--
-- Name: asignacion_id_asignacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asignacion_id_asignacion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asignacion_id_asignacion_seq OWNER TO postgres;

--
-- Name: asignacion_id_asignacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asignacion_id_asignacion_seq OWNED BY public.asignacion.id_asignacion;


--
-- Name: bitacoras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bitacoras (
    id_bitacora bigint NOT NULL,
    observacion character varying,
    estado_documento character varying,
    documento_id bigint,
    asignacion_id bigint,
    tipo_seguimiento_id bigint,
    creado timestamp without time zone,
    actualizado timestamp without time zone
);


ALTER TABLE public.bitacoras OWNER TO postgres;

--
-- Name: bitacoras_id_bitacora_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bitacoras_id_bitacora_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bitacoras_id_bitacora_seq OWNER TO postgres;

--
-- Name: bitacoras_id_bitacora_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bitacoras_id_bitacora_seq OWNED BY public.bitacoras.id_bitacora;


--
-- Name: documentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documentos (
    id_documento bigint NOT NULL,
    documento character varying,
    ruta character varying,
    creado timestamp without time zone,
    actualizado timestamp without time zone
);


ALTER TABLE public.documentos OWNER TO postgres;

--
-- Name: documentos_certificacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documentos_certificacion (
    id_documentos_cert integer NOT NULL,
    asignacion_id bigint,
    documento_id bigint,
    observacion character varying,
    estado character varying,
    creado timestamp without time zone,
    actualizado timestamp without time zone,
    requisito_id bigint
);


ALTER TABLE public.documentos_certificacion OWNER TO postgres;

--
-- Name: documentos_certificacion_id_documentos_cert_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.documentos_certificacion_id_documentos_cert_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.documentos_certificacion_id_documentos_cert_seq OWNER TO postgres;

--
-- Name: documentos_certificacion_id_documentos_cert_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.documentos_certificacion_id_documentos_cert_seq OWNED BY public.documentos_certificacion.id_documentos_cert;


--
-- Name: documentos_id_documento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.documentos_id_documento_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.documentos_id_documento_seq OWNER TO postgres;

--
-- Name: documentos_id_documento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.documentos_id_documento_seq OWNED BY public.documentos.id_documento;


--
-- Name: estado_fase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estado_fase (
    id_estado_fase bigint NOT NULL,
    estado_fase character varying,
    creado timestamp without time zone,
    actualizado timestamp without time zone
);


ALTER TABLE public.estado_fase OWNER TO postgres;

--
-- Name: estado_fase_estado_fase_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estado_fase_estado_fase_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.estado_fase_estado_fase_id_seq OWNER TO postgres;

--
-- Name: estado_fase_estado_fase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estado_fase_estado_fase_id_seq OWNED BY public.estado_fase.id_estado_fase;


--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id_photo bigint NOT NULL,
    path character varying NOT NULL,
    descripcion character varying,
    creado time with time zone,
    actualizado time with time zone,
    user_id bigint,
    aprendiz_id bigint
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: img_photo_id_photo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.img_photo_id_photo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.img_photo_id_photo_seq OWNER TO postgres;

--
-- Name: img_photo_id_photo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.img_photo_id_photo_seq OWNED BY public.images.id_photo;


--
-- Name: item_modulo_perfil; Type: TABLE; Schema: public; Owner: dfp
--

CREATE TABLE public.item_modulo_perfil (
    id_item_modulo_perfil bigint NOT NULL,
    item_modulo_id bigint,
    perfil_id bigint,
    creado timestamp without time zone,
    actualizado timestamp without time zone
);


ALTER TABLE public.item_modulo_perfil OWNER TO dfp;

--
-- Name: item_modulo_perfil_id_item_modulo_perfil_seq; Type: SEQUENCE; Schema: public; Owner: dfp
--

CREATE SEQUENCE public.item_modulo_perfil_id_item_modulo_perfil_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_modulo_perfil_id_item_modulo_perfil_seq OWNER TO dfp;

--
-- Name: item_modulo_perfil_id_item_modulo_perfil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dfp
--

ALTER SEQUENCE public.item_modulo_perfil_id_item_modulo_perfil_seq OWNED BY public.item_modulo_perfil.id_item_modulo_perfil;


--
-- Name: item_modulos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_modulos (
    id_item_modulo bigint NOT NULL,
    modulo_id bigint NOT NULL,
    item_modulo_id bigint,
    item_modulo character varying,
    descripcion_modulo character varying,
    url_item_modulo character varying,
    icono_item_modulo character varying,
    creado timestamp with time zone,
    actualizado timestamp without time zone
);


ALTER TABLE public.item_modulos OWNER TO postgres;

--
-- Name: item_modulos_id_item_modulo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_modulos_id_item_modulo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_modulos_id_item_modulo_seq OWNER TO postgres;

--
-- Name: item_modulos_id_item_modulo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_modulos_id_item_modulo_seq OWNED BY public.item_modulos.id_item_modulo;


--
-- Name: item_modulos_perfiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_modulos_perfiles (
    id_item_modulo bigint NOT NULL,
    perfil_id bigint NOT NULL,
    actualizado timestamp without time zone,
    creado timestamp without time zone
);


ALTER TABLE public.item_modulos_perfiles OWNER TO postgres;

--
-- Name: item_modulos_perfiles_item_modulo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_modulos_perfiles_item_modulo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_modulos_perfiles_item_modulo_id_seq OWNER TO postgres;

--
-- Name: item_modulos_perfiles_item_modulo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_modulos_perfiles_item_modulo_id_seq OWNED BY public.item_modulos_perfiles.id_item_modulo;


--
-- Name: modulo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modulo (
    id_modulo bigint NOT NULL,
    modulo character varying,
    descripcion_modulo character varying,
    creado timestamp without time zone,
    actualizado timestamp without time zone
);


ALTER TABLE public.modulo OWNER TO postgres;

--
-- Name: modulo_id_modulo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modulo_id_modulo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modulo_id_modulo_seq OWNER TO postgres;

--
-- Name: modulo_id_modulo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modulo_id_modulo_seq OWNED BY public.modulo.id_modulo;


--
-- Name: notificaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notificaciones (
    id_notificacion integer NOT NULL,
    usuario_id bigint,
    estado character varying,
    notificacion character varying,
    creado timestamp without time zone,
    actualizado timestamp without time zone,
    ruta character varying
);


ALTER TABLE public.notificaciones OWNER TO postgres;

--
-- Name: notificaciones_id_notificacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notificaciones_id_notificacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notificaciones_id_notificacion_seq OWNER TO postgres;

--
-- Name: notificaciones_id_notificacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notificaciones_id_notificacion_seq OWNED BY public.notificaciones.id_notificacion;


--
-- Name: novedades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.novedades (
    id_novedad bigint NOT NULL,
    tipo_novedad character varying,
    observacion character varying,
    fecha_novedad date,
    creado timestamp without time zone,
    actualizado timestamp without time zone
);


ALTER TABLE public.novedades OWNER TO postgres;

--
-- Name: novedades_id_novedad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.novedades_id_novedad_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.novedades_id_novedad_seq OWNER TO postgres;

--
-- Name: novedades_id_novedad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.novedades_id_novedad_seq OWNED BY public.novedades.id_novedad;


--
-- Name: perfiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfiles (
    id_perfil bigint NOT NULL,
    perfil character varying,
    creado timestamp without time zone,
    actulizado timestamp without time zone
);


ALTER TABLE public.perfiles OWNER TO postgres;

--
-- Name: perfiles_id_perfil_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfiles_id_perfil_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.perfiles_id_perfil_seq OWNER TO postgres;

--
-- Name: perfiles_id_perfil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfiles_id_perfil_seq OWNED BY public.perfiles.id_perfil;


--
-- Name: programa_formacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.programa_formacion (
    id_programa_formacion bigint NOT NULL,
    codigo_programa character varying,
    tipo_programa character varying,
    programa_formacion character varying,
    red_id bigint,
    creado timestamp with time zone,
    actualizado timestamp with time zone
);


ALTER TABLE public.programa_formacion OWNER TO postgres;

--
-- Name: programa_formacion_id_programa_formacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.programa_formacion_id_programa_formacion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.programa_formacion_id_programa_formacion_seq OWNER TO postgres;

--
-- Name: programa_formacion_id_programa_formacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.programa_formacion_id_programa_formacion_seq OWNED BY public.programa_formacion.id_programa_formacion;


--
-- Name: redes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.redes (
    id_red_conocimiento bigint NOT NULL,
    red_conocimiento character varying,
    observacion_red_conocimiento character varying,
    activa character(2),
    creado timestamp without time zone,
    actualizado timestamp without time zone
);


ALTER TABLE public.redes OWNER TO postgres;

--
-- Name: redes_id_red_conocimiento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.redes_id_red_conocimiento_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.redes_id_red_conocimiento_seq OWNER TO postgres;

--
-- Name: redes_id_red_conocimiento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.redes_id_red_conocimiento_seq OWNED BY public.redes.id_red_conocimiento;


--
-- Name: registro_etapa_productiva; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registro_etapa_productiva (
    id_empresa bigint NOT NULL,
    nit_eps character varying,
    eps character varying,
    nit_arl character varying,
    nombre_empresa character varying,
    nit_empresa character varying,
    ciudad character varying,
    direccion character varying,
    telefono character varying,
    correo character varying,
    modalidad character varying,
    observacion character varying,
    representante_legal character varying,
    identificacion_representante character varying,
    creado timestamp without time zone,
    actualizado timestamp without time zone,
    aprendiz_id bigint
);


ALTER TABLE public.registro_etapa_productiva OWNER TO postgres;

--
-- Name: registro_etapa_productiva_id_empresa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registro_etapa_productiva_id_empresa_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registro_etapa_productiva_id_empresa_seq OWNER TO postgres;

--
-- Name: registro_etapa_productiva_id_empresa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.registro_etapa_productiva_id_empresa_seq OWNED BY public.registro_etapa_productiva.id_empresa;


--
-- Name: requisitos_certificacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requisitos_certificacion (
    id_requisito_cert integer NOT NULL,
    nombre character varying,
    estado character varying,
    creado timestamp without time zone,
    actualizado timestamp without time zone,
    observacion character varying
);


ALTER TABLE public.requisitos_certificacion OWNER TO postgres;

--
-- Name: requisitos_certificacion_id_requisito_cert_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requisitos_certificacion_id_requisito_cert_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.requisitos_certificacion_id_requisito_cert_seq OWNER TO postgres;

--
-- Name: requisitos_certificacion_id_requisito_cert_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requisitos_certificacion_id_requisito_cert_seq OWNED BY public.requisitos_certificacion.id_requisito_cert;


--
-- Name: seguimiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seguimiento (
    id_seguimiento bigint NOT NULL,
    tipo_seguimiento_id bigint,
    observacion character varying,
    observacion_finalizacion character varying,
    estado_documento character varying,
    documento_id bigint,
    creado timestamp with time zone,
    actualizado timestamp with time zone,
    asignacion_id bigint
);


ALTER TABLE public.seguimiento OWNER TO postgres;

--
-- Name: seguimiento_id_seguimiento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seguimiento_id_seguimiento_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seguimiento_id_seguimiento_seq OWNER TO postgres;

--
-- Name: seguimiento_id_seguimiento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.seguimiento_id_seguimiento_seq OWNED BY public.seguimiento.id_seguimiento;


--
-- Name: tipo_seguimiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_seguimiento (
    id_tipo_seguimiento bigint NOT NULL,
    tipo_seguimiento character varying,
    estado_seguimiento character varying,
    creado timestamp without time zone,
    actualizado timestamp without time zone
);


ALTER TABLE public.tipo_seguimiento OWNER TO postgres;

--
-- Name: tipo_seguimiento_tipo_seguimiento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_seguimiento_tipo_seguimiento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipo_seguimiento_tipo_seguimiento_id_seq OWNER TO postgres;

--
-- Name: tipo_seguimiento_tipo_seguimiento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_seguimiento_tipo_seguimiento_id_seq OWNED BY public.tipo_seguimiento.id_tipo_seguimiento;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario bigint NOT NULL,
    perfil_id bigint,
    centro character varying,
    nombres character varying,
    apellidos character varying,
    correo_institucional character varying,
    correo_alternativo character varying,
    identificacion character varying,
    genero character varying,
    ciudad_residencia character varying,
    area_id bigint,
    creado timestamp with time zone,
    actualizado timestamp with time zone,
    contrasena character varying
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_id_usuario_seq OWNER TO postgres;

--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- Name: aprendices id_aprendiz; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aprendices ALTER COLUMN id_aprendiz SET DEFAULT nextval('public.aprendices_id_aprendiz_seq'::regclass);


--
-- Name: areas id_area; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.areas ALTER COLUMN id_area SET DEFAULT nextval('public.areas_id_area_seq'::regclass);


--
-- Name: asignacion id_asignacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignacion ALTER COLUMN id_asignacion SET DEFAULT nextval('public.asignacion_id_asignacion_seq'::regclass);


--
-- Name: bitacoras id_bitacora; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bitacoras ALTER COLUMN id_bitacora SET DEFAULT nextval('public.bitacoras_id_bitacora_seq'::regclass);


--
-- Name: documentos id_documento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos ALTER COLUMN id_documento SET DEFAULT nextval('public.documentos_id_documento_seq'::regclass);


--
-- Name: documentos_certificacion id_documentos_cert; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos_certificacion ALTER COLUMN id_documentos_cert SET DEFAULT nextval('public.documentos_certificacion_id_documentos_cert_seq'::regclass);


--
-- Name: estado_fase id_estado_fase; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_fase ALTER COLUMN id_estado_fase SET DEFAULT nextval('public.estado_fase_estado_fase_id_seq'::regclass);


--
-- Name: images id_photo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN id_photo SET DEFAULT nextval('public.img_photo_id_photo_seq'::regclass);


--
-- Name: item_modulo_perfil id_item_modulo_perfil; Type: DEFAULT; Schema: public; Owner: dfp
--

ALTER TABLE ONLY public.item_modulo_perfil ALTER COLUMN id_item_modulo_perfil SET DEFAULT nextval('public.item_modulo_perfil_id_item_modulo_perfil_seq'::regclass);


--
-- Name: item_modulos id_item_modulo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_modulos ALTER COLUMN id_item_modulo SET DEFAULT nextval('public.item_modulos_id_item_modulo_seq'::regclass);


--
-- Name: item_modulos_perfiles id_item_modulo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_modulos_perfiles ALTER COLUMN id_item_modulo SET DEFAULT nextval('public.item_modulos_perfiles_item_modulo_id_seq'::regclass);


--
-- Name: modulo id_modulo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulo ALTER COLUMN id_modulo SET DEFAULT nextval('public.modulo_id_modulo_seq'::regclass);


--
-- Name: notificaciones id_notificacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones ALTER COLUMN id_notificacion SET DEFAULT nextval('public.notificaciones_id_notificacion_seq'::regclass);


--
-- Name: novedades id_novedad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.novedades ALTER COLUMN id_novedad SET DEFAULT nextval('public.novedades_id_novedad_seq'::regclass);


--
-- Name: perfiles id_perfil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles ALTER COLUMN id_perfil SET DEFAULT nextval('public.perfiles_id_perfil_seq'::regclass);


--
-- Name: programa_formacion id_programa_formacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programa_formacion ALTER COLUMN id_programa_formacion SET DEFAULT nextval('public.programa_formacion_id_programa_formacion_seq'::regclass);


--
-- Name: redes id_red_conocimiento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.redes ALTER COLUMN id_red_conocimiento SET DEFAULT nextval('public.redes_id_red_conocimiento_seq'::regclass);


--
-- Name: registro_etapa_productiva id_empresa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registro_etapa_productiva ALTER COLUMN id_empresa SET DEFAULT nextval('public.registro_etapa_productiva_id_empresa_seq'::regclass);


--
-- Name: requisitos_certificacion id_requisito_cert; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitos_certificacion ALTER COLUMN id_requisito_cert SET DEFAULT nextval('public.requisitos_certificacion_id_requisito_cert_seq'::regclass);


--
-- Name: seguimiento id_seguimiento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimiento ALTER COLUMN id_seguimiento SET DEFAULT nextval('public.seguimiento_id_seguimiento_seq'::regclass);


--
-- Name: tipo_seguimiento id_tipo_seguimiento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_seguimiento ALTER COLUMN id_tipo_seguimiento SET DEFAULT nextval('public.tipo_seguimiento_tipo_seguimiento_id_seq'::regclass);


--
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- Data for Name: aprendices; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.aprendices (id_aprendiz, nombres, apellidos, genero, discapacidad, telefono, correo_misena, correo_alternativo, municipio_nacimiento, centro, programa_id, ficha, creado, actualizado, identificacion, fecha_nacimiento, inicio_lectiva, incio_productiva, contrato_inicio, contrato_fin, password, perfil_id) VALUES (1073, 'DIEGO', 'SOLANO RUIZ', 'M', 'Sin registrar', '3128159145- 3104649854', 'Sin registrar', 'diegosolanoruiz46@gmail.com', 'SUCRE', 'CENTRO INDUSTRIAL -POPAYAN-', 1, '2071206', '2022-12-12 09:29:33.696-05', '2022-12-12 09:29:33.696-05', '10293035', '2004-10-03', '2020-11-02', '2018-03-02', '2018-03-01', '2020-08-01', '$2b$04$ZTqora0Kz0H0aPoXmsQ/aeUJp55lUy/xuHCRe/K8XFtyZq13JUdcm', 2);
INSERT INTO public.aprendices (id_aprendiz, nombres, apellidos, genero, discapacidad, telefono, correo_misena, correo_alternativo, municipio_nacimiento, centro, programa_id, ficha, creado, actualizado, identificacion, fecha_nacimiento, inicio_lectiva, incio_productiva, contrato_inicio, contrato_fin, password, perfil_id) VALUES (1075, 'MIGUEL ANTONIO', 'PALECHOR CUASTUMAL', 'M', 'Sin registrar', '3225309916', 'Sin registrar', 'miguel.palechor@gmail.com', 'POPAYAN', 'CENTRO INDUSTRIAL -POPAYAN-', 2, '2027479', '2022-12-12 09:29:34.224-05', '2022-12-12 09:29:34.224-05', '1061791479', '2004-10-03', '2020-11-02', '2018-03-02', '2018-03-01', '2020-08-01', '$2b$04$QzkM1e90JwWpndS6rKwfZOyJWqXmhZxSrdziUgZg4DhjY0lxqL25K', 2);
INSERT INTO public.aprendices (id_aprendiz, nombres, apellidos, genero, discapacidad, telefono, correo_misena, correo_alternativo, municipio_nacimiento, centro, programa_id, ficha, creado, actualizado, identificacion, fecha_nacimiento, inicio_lectiva, incio_productiva, contrato_inicio, contrato_fin, password, perfil_id) VALUES (1076, 'JUAN CAMILO', 'SANCHEZ CORTES', 'M', 'Sin registrar', '3215280209', 'Sin registrar', 'jkcortes99@gmail.com', 'EL TAMBO', 'CENTRO INDUSTRIAL -POPAYAN-', 5, '2066571', '2022-12-12 09:29:34.394-05', '2022-12-12 09:29:34.394-05', '1002871148', '2004-10-03', '2020-11-02', '2018-03-02', '2018-03-01', '2020-08-01', '$2b$04$Ow8o2C9VozgEERvIVYY3Mu/3FH8DO9/64YMV1dKj9M/zQaYvPFNQ.', 2);
INSERT INTO public.aprendices (id_aprendiz, nombres, apellidos, genero, discapacidad, telefono, correo_misena, correo_alternativo, municipio_nacimiento, centro, programa_id, ficha, creado, actualizado, identificacion, fecha_nacimiento, inicio_lectiva, incio_productiva, contrato_inicio, contrato_fin, password, perfil_id) VALUES (1077, 'LINDA LUCERO', 'GOMEZ PALTA', 'F', 'Sin registrar', '3226407789', 'Sin registrar', 'Luceropalta.99108@gmail.com', 'CALI', 'CENTRO INDUSTRIAL -POPAYAN-', 1, '1696118', '2022-12-12 09:29:34.537-05', '2022-12-12 09:29:34.537-05', '1061820944', '2004-10-03', '2020-11-02', '2018-03-02', '2018-03-01', '2020-08-01', '$2b$04$yAZxzZ8XTxYEsdxCvlc4Ne6cmA9ZssL2sNfn8xJ4rQ0zkBg2izG6.', 2);
INSERT INTO public.aprendices (id_aprendiz, nombres, apellidos, genero, discapacidad, telefono, correo_misena, correo_alternativo, municipio_nacimiento, centro, programa_id, ficha, creado, actualizado, identificacion, fecha_nacimiento, inicio_lectiva, incio_productiva, contrato_inicio, contrato_fin, password, perfil_id) VALUES (1078, 'ALEXANDRA', 'GOLONDRINO COTACIO', 'F', 'Sin registrar', '3116820866', 'Sin registrar', 'COTACIOALEXANDRA4@GMAIL.COM', 'POPAYAN', 'CENTRO INDUSTRIAL -POPAYAN-', 1, '2065933', '2022-12-12 09:29:34.771-05', '2022-12-12 09:29:34.771-05', '1002938351', '2004-10-03', '2020-11-02', '2018-03-02', '2018-03-01', '2020-08-01', '$2b$04$.Hv2fpAET2YnfH5xnx2Yx.z9xeYaE.7Wramv0zctn9VqY1.UqOEHu', 2);
INSERT INTO public.aprendices (id_aprendiz, nombres, apellidos, genero, discapacidad, telefono, correo_misena, correo_alternativo, municipio_nacimiento, centro, programa_id, ficha, creado, actualizado, identificacion, fecha_nacimiento, inicio_lectiva, incio_productiva, contrato_inicio, contrato_fin, password, perfil_id) VALUES (1079, 'JUAN MANUEL', 'RUIZ MUÑOZ', 'M', 'Sin registrar', '3127827916', 'Sin registrar', 'jruizmunoz593@gmail.com', 'POPAYAN', 'CENTRO INDUSTRIAL -POPAYAN-', 2, '2067960', '2022-12-12 09:29:34.92-05', '2022-12-12 09:29:34.92-05', '1002965827', '2004-10-03', '2020-11-02', '2018-03-02', '2018-03-01', '2020-08-01', '$2b$04$Vo6Rj/CR1CAnaL8qXC4fZu5xALdEq0Ij.X8D/vfDWOOnAzBStx5gy', 2);
INSERT INTO public.aprendices (id_aprendiz, nombres, apellidos, genero, discapacidad, telefono, correo_misena, correo_alternativo, municipio_nacimiento, centro, programa_id, ficha, creado, actualizado, identificacion, fecha_nacimiento, inicio_lectiva, incio_productiva, contrato_inicio, contrato_fin, password, perfil_id) VALUES (1080, 'JHON NILSON', 'GAVIRIA QUINAYAS', 'M', 'Sin registrar', '3117715023-3113007875', 'Sin registrar', 'jhonquinayas02042002@gmail.com', 'LA VEGA', 'CENTRO INDUSTRIAL -POPAYAN-', 1, '2024581', '2022-12-12 09:29:35.074-05', '2022-12-12 09:29:35.074-05', '1002926088', '2004-10-03', '2020-11-02', '2018-03-02', '2018-03-01', '2020-08-01', '$2b$04$IqhrHqzL4l.bM1.njQJNw.UVRKchXPJgKrv3RHVOzNSUZ7.oYkl32', 2);
INSERT INTO public.aprendices (id_aprendiz, nombres, apellidos, genero, discapacidad, telefono, correo_misena, correo_alternativo, municipio_nacimiento, centro, programa_id, ficha, creado, actualizado, identificacion, fecha_nacimiento, inicio_lectiva, incio_productiva, contrato_inicio, contrato_fin, password, perfil_id) VALUES (1074, 'JUAN PABLO', 'MAMIAN CAMPO', 'M', 'No', '573245876974', 'pablo@misena.edu.co', 'jpmamian1@misena.edu.co', 'POPAYAN', 'CENTRO INDUSTRIAL -POPAYAN-', 1, '2067984', '2022-12-12 09:29:34.054-05', '2022-12-12 09:30:12.54-05', '1060992071', '2004-10-03', '2020-11-02', '2018-03-02', '2018-03-01', '2020-08-01', '$2b$04$iPMPQ8Yg1KGNLYQaocGXn.IJ./PPQYXTHbNb.OS4taUw.AVkNu7Ey', 2);


--
-- Data for Name: areas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (1, 'INFRAESTRUCTURA', 13, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (2, 'SOFTWARE', 13, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (3, 'CONTENIDOS DIGITALES', 13, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (4, 'AUTOMATIZACIÓN INDUSTRIAL', 10, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (5, 'INSTRUMENTACIÓN Y CONTROL DE PROCESOS', 10, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (6, 'MANTENIMIENTO DE EQUIPO BIOMEDICO', 10, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (7, 'MECATRÓNICA', 10, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (8, 'REFRIGERACIÓN, VENTILACIÓN Y CLIMATIZACIÓN', 10, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (9, 'ELECTRÓNICA', 10, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (10, 'ACTIVIDAD FÍSICA', 28, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (11, 'DEPORTE', 28, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (12, 'GESTIÓN DEPORTE', 28, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (13, 'RECREACIÓN', 28, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (14, 'AGROECOLOGÍA', 6, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (15, 'BIODIVERSIDAD', 6, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (16, 'FORESTAL', 6, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (17, 'GESTIÓN AMBIENTAL SECTORIAL Y URBANA', 6, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (18, 'GESTIÓN DEL RECURSO HÍDRICO', 6, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (19, 'DISEÑO GRÁFICO', 3, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (20, 'ENCUADERNACIÓN DE DOCUMENTOS IMPRESOS', 3, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (21, 'PREPRENSA', 3, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (22, 'PRODUCCIÓN GRÁFICA', 3, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (23, 'CERÁMICA', 2, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (24, 'JOYERÍA', 2, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (25, 'MADERABLES Y NO MADERABLES', 2, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (26, 'TEXTIL ATESANAL', 2, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (27, 'MANTENIMIENTO ELECTROMECÁNICO DE EQUIPO PESADO', 14, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (28, 'MECATRÓNICA AUTOMOTRIZ', 14, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (29, 'MOTOCICLETAS', 14, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (30, 'ARQUITECTURA Y DECORACIÓN', 22, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (31, 'CONSTRUCCIÓN', 22, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (32, 'GAS', 22, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (33, 'HIDRÁULICA', 22, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (34, 'CUERO', 17, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (35, 'FABRICACIÓN DE CALZADO', 17, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (36, 'FABRICACIÓN MARROQUINERÍA', 17, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (37, 'MODELAJE DE CALZADO', 17, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (38, 'GESTIÓN DE LA FABRICACIÓN EN CALZADO Y LA MARROQUINERÍA', 17, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (39, 'MODELAJE DE MARROQUINERÍA', 17, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (40, 'DISEÑO', 17, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (41, 'ACUICULTURA', 25, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (42, 'PESCA', 25, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (43, 'MANTENIMIENTO EN LÍNEA DE AVIONES', 15, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (44, 'MANTENIMIENTO EN LÍNEA DE HELICÓTEROS', 15, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (45, 'MANTENIMIENTO ESPECIALIZADO EN SISTEMAS ELÉCTRICOS, ELECTRÓNICOS E INSTRUMENTOS DE AERONAVES', 15, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (46, 'AGRICULTURA', 23, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (47, 'AGRICULTURA DE PRECISIÓN', 23, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (48, 'AGROINDUSTRIAL - CONTROL DE CALIDAD E INOCUIDAD', 23, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (49, 'MECANIZACIÓN AGRÍCOLA', 23, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (50, 'PROCESAMIENTO DE ALIMENTOS: CÁRNICOS Y DERIVADOS', 23, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (51, 'PROCESAMIENTO DE ALIMENTOS: CHOCOLATERÍA Y CONFITERÍA', 23, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (52, 'PROCESAMIENTO DE ALIMENTOS: FRUTAS Y VERDURAS', 23, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (53, 'PROCESAMIENTO DE ALIMENTOS: LÁCTEOS Y DERIVADOS', 23, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (54, 'PROCESAMIENTO DE ALIMENTOS: PANADERÍA Y REPOSTERÍA', 23, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (55, 'PROCESAMIENTO DE ALIMENTOS: PESCADOS Y MARISCOS', 23, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (56, 'RIEGO Y DRENAJES AGRÍCOLAS', 23, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (57, 'INDUSTRIAL', 15, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (58, 'VEGETAL', 15, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (59, 'CONTACT CENTER Y BUSINESS PROCESS OUTSOURCING BPO', 5, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (60, 'GESTIÓN DE MERCADOS', 5, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (61, 'NEGOCIACIÓN INTERNACIONAL', 5, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (62, 'VENTAS', 5, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (63, 'ARTES ESCÉNICAS - TEATRO', 1, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (64, 'ARTES ESCÉNICAS - DANZA', 1, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (65, 'MÚSICA', 1, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (66, 'MÚSICA PRODUCCIÓN AUDIO DIGITAL', 1, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (67, 'DISTRIBUCIÓN DE LA ENERGÍA ELÉCTRICA', 9, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (68, 'GENERACIÓN DE LA ENERGÍA ELÉCTRICA', 9, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (69, 'TRANSMISIÓN DE LA ENERGÍA ELÉCTRICA', 9, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (70, 'USO FINAL DE LA ENERGÍA ELÉCTRICA', 9, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (71, 'BIBLIOTECAS', 4, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (72, 'CONTABILIDAD', 4, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (73, 'FINANZAS', 4, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (74, 'GESTIÓN ADMINISTRATIVA', 4, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (75, 'GESTIÓN DOCUMENTAL', 4, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (76, 'SERVICIOS FINANCIEROS', 4, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (77, 'TALENTO HUMANO', 4, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (78, 'MANTENIMIENTO DE POZOS', 20, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (79, 'PERFORACIÓN', 20, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (80, 'PRODUCCIÓN SUPERFICIE', 20, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (81, 'BARISMO', 27, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (82, 'COCINA', 27, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (83, 'EVENTOS', 27, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (84, 'GUIANZA TURÍSTICA', 27, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (85, 'MESA Y BAR', 27, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (86, 'SERVICIOS DE AGENCIAS DE VIAJES', 27, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (87, 'SERVICIO DE ALOJAMIENTO', 27, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (88, 'TURISMO', 27, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (89, 'OBRAS CIVILES', 22, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (90, 'OPERACIÓN DE MAQUINARIA PESADA PARA EXCAVACIÓN Y MOVIMIENTO DE TIERRA', 22, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (91, 'TOPOGRAFÍA', 22, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (92, 'GESTIÓN LOGÍSTICA', 21, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (93, 'PRODUCCIÓN INDUSTRIAL', 21, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (94, 'SEGURIDAD Y SALUD EN EL TRABAJO', 21, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (95, 'SEGURIDAD Y SALUD EN EL TRABAJO', 21, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (96, 'DISEÑO DE PRODUCTOS', 18, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (97, 'MADERA', 18, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (98, 'MATERIALES COMPUESTO POLIMÉRICOS', 18, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (99, 'PLÁSTICO', 18, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (100, 'DISEÑO MECÁNICO', 8, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (101, 'MANTENIMIENTO MECÁNICO INDUSTRIAL', 8, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (102, 'METROLOGÍA', 8, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (103, 'MECANIZADO', 8, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (104, 'SOLDADURA', 8, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (105, 'MINERÍA', 19, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (106, 'PRODUCCIÓN ESPECIES MENORES', 24, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (107, 'PRODUCCIÓN ESPECIES MAYORES', 24, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (108, 'ANÁLISIS QUÍMICO', 12, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (109, 'PROCESOS QUÍMICOS INDUSTRIALES', 12, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (110, 'APOYO AL DIAGNOSTICO', 26, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (111, 'APOYO TERAPÉUTICO Y REAHABILITACIÓN', 26, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (112, 'DISPOSITIVOS MÉDICOS - BIOMÉDICOS', 26, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (113, 'SALUD PÚBLICA', 26, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (114, 'SERVICIOS FARMACEÚTICOS', 26, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (115, 'BELLEZA', 30, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (116, 'ADMINSITRACIÓN DE PROYECTOS', 11, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (117, 'CONVERGENCIA DE REDES Y SERVICIOS', 11, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (118, 'ELECTRICIDAD Y ELECTRÓNICA', 11, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (119, 'REDES CABLEADAS PARA TELECOMUNICACIONES', 11, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (120, 'SISTEMAS DE TELECOMUNICACIONES', 11, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (121, 'CONFECCIÓN INDUSTRIAL', 16, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (122, 'DISEÑO', 16, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (123, 'GESTIÓN DE LA PRODUCCIÓN', 16, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (124, 'HILANDERÍA', 16, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (125, 'MANTENIMIENTO MAQUINARIA DE CONFECCIÓN', 16, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (126, 'NO TEJIDOS', 16, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (127, 'PATRONAJE', 16, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (128, 'TEJIDO DE PUNTO', 16, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (129, 'TRAZO Y CORTE EN CONFECCIÓN INDUSTRIAL', 16, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (130, 'TEJIDO PLANO', 16, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (131, 'TINTORERÍA Y ACABADOS', 16, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (132, 'TRANSPORTE FERREO', 29, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (133, 'FLUVIAL', 29, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (134, 'MARITIMO', 29, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (135, 'TRANPORTE POR CARRETERA', 29, NULL, NULL, NULL);
INSERT INTO public.areas (id_area, area, red_conocimiento_id, componentes, creado, actualizado) VALUES (0, 'TODAS', 0, NULL, NULL, NULL);


--
-- Data for Name: asignacion; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: bitacoras; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: documentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.documentos (id_documento, documento, ruta, creado, actualizado) VALUES (11, 'doc1', 'docs/69c60910-9db0-454d-a50c-02484f86d948.pdf', '2022-12-06 18:25:22', '2022-12-06 18:25:22');
INSERT INTO public.documentos (id_documento, documento, ruta, creado, actualizado) VALUES (12, 'Documentos Certificacion', 'docs/95b5a0dd-3b16-4b1f-889f-79214cc7ffab.pdf', '2022-12-07 13:38:39', '2022-12-07 13:38:39');


--
-- Data for Name: documentos_certificacion; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: estado_fase; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.estado_fase (id_estado_fase, estado_fase, creado, actualizado) VALUES (2, 'Asignado', NULL, NULL);
INSERT INTO public.estado_fase (id_estado_fase, estado_fase, creado, actualizado) VALUES (1, 'Reasignado', NULL, NULL);
INSERT INTO public.estado_fase (id_estado_fase, estado_fase, creado, actualizado) VALUES (3, 'Por certificar', NULL, NULL);
INSERT INTO public.estado_fase (id_estado_fase, estado_fase, creado, actualizado) VALUES (4, 'Certificado', NULL, NULL);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: item_modulo_perfil; Type: TABLE DATA; Schema: public; Owner: dfp
--

INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (1, 1, 3, NULL, NULL);
INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (2, 2, 1, NULL, NULL);
INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (3, 3, 3, NULL, NULL);
INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (4, 4, 3, NULL, NULL);
INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (5, 5, 1, NULL, NULL);
INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (6, 6, 3, NULL, NULL);
INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (7, 7, 1, NULL, NULL);
INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (8, 8, 3, NULL, NULL);
INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (9, 9, 2, NULL, NULL);
INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (10, 10, 1, NULL, NULL);
INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (11, 11, 2, NULL, NULL);
INSERT INTO public.item_modulo_perfil (id_item_modulo_perfil, item_modulo_id, perfil_id, creado, actualizado) VALUES (12, 12, 3, NULL, NULL);


--
-- Data for Name: item_modulos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (1, 1, NULL, 'Aprendices', 'gestión de aprendices', 'list-aprendices', 'wc', NULL, NULL);
INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (2, 1, 1, 'Mis asignaciones', NULL, 'list-my-assignments', 'fact_check', NULL, NULL);
INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (3, 1, 1, 'Asignaciones', NULL, 'list-assignments', 'fact_check', NULL, NULL);
INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (4, 1, 1, 'Usuarios', NULL, 'vistausuarios', 'person', NULL, NULL);
INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (5, 1, 1, 'Aprendices por certificar', NULL, 'aprobar-certificacion', 'rule_folder', NULL, NULL);
INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (6, 1, 1, 'Novedades', NULL, '/register-novedad/', 'wc', NULL, NULL);
INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (7, 1, 1, 'Seguimientos', NULL, '/register-seguimiento/', 'wc', NULL, NULL);
INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (8, 1, 1, 'Retroalimentación Seguimiento', NULL, '/retroalimentacion/', 'wc', NULL, NULL);
INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (9, 1, 1, 'Subir bitácoras', NULL, '/create-bitacora/', 'wc', NULL, NULL);
INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (10, 1, 1, 'Aprobar bitácora', NULL, '/retroalimentacion-bitacoras/', 'wc', NULL, NULL);
INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (11, 1, 1, 'Subir documentos certificación', NULL, '/create-certificacion/', 'wc', NULL, NULL);
INSERT INTO public.item_modulos (id_item_modulo, modulo_id, item_modulo_id, item_modulo, descripcion_modulo, url_item_modulo, icono_item_modulo, creado, actualizado) VALUES (12, 1, 1, 'Reportes Aprendiz', NULL, 'reporte-aprendices', 'bar_chart', NULL, NULL);


--
-- Data for Name: item_modulos_perfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.item_modulos_perfiles (id_item_modulo, perfil_id, actualizado, creado) VALUES (1, 1, NULL, '2010-10-10 00:00:00');
INSERT INTO public.item_modulos_perfiles (id_item_modulo, perfil_id, actualizado, creado) VALUES (2, 1, NULL, '2010-10-10 00:00:00');
INSERT INTO public.item_modulos_perfiles (id_item_modulo, perfil_id, actualizado, creado) VALUES (2, 2, NULL, '2010-10-10 00:00:00');


--
-- Data for Name: modulo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.modulo (id_modulo, modulo, descripcion_modulo, creado, actualizado) VALUES (1, 'Seguimiento', NULL, NULL, NULL);


--
-- Data for Name: notificaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.notificaciones (id_notificacion, usuario_id, estado, notificacion, creado, actualizado, ruta) VALUES (1, 5, 'Activo', 'noti', NULL, NULL, 'list-my-assignments');


--
-- Data for Name: novedades; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.novedades (id_novedad, tipo_novedad, observacion, fecha_novedad, creado, actualizado) VALUES (1, 'Activo', NULL, '2022-07-20', NULL, NULL);
INSERT INTO public.novedades (id_novedad, tipo_novedad, observacion, fecha_novedad, creado, actualizado) VALUES (2, 'Suspendido', NULL, NULL, NULL, NULL);
INSERT INTO public.novedades (id_novedad, tipo_novedad, observacion, fecha_novedad, creado, actualizado) VALUES (3, 'Cancelado', NULL, NULL, NULL, NULL);


--
-- Data for Name: perfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.perfiles (id_perfil, perfil, creado, actulizado) VALUES (2, 'Aprendiz', NULL, NULL);
INSERT INTO public.perfiles (id_perfil, perfil, creado, actulizado) VALUES (3, 'Administrador', NULL, NULL);
INSERT INTO public.perfiles (id_perfil, perfil, creado, actulizado) VALUES (1, 'Instructor', NULL, NULL);


--
-- Data for Name: programa_formacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.programa_formacion (id_programa_formacion, codigo_programa, tipo_programa, programa_formacion, red_id, creado, actualizado) VALUES (1, '2772', 'ejemplo1', 'programa1', 1, NULL, NULL);
INSERT INTO public.programa_formacion (id_programa_formacion, codigo_programa, tipo_programa, programa_formacion, red_id, creado, actualizado) VALUES (4, '373u28', 'ejemplo3', 'programa3', 4, NULL, NULL);
INSERT INTO public.programa_formacion (id_programa_formacion, codigo_programa, tipo_programa, programa_formacion, red_id, creado, actualizado) VALUES (2, '73736', 'ejemplo2', 'programa2', 5, NULL, NULL);
INSERT INTO public.programa_formacion (id_programa_formacion, codigo_programa, tipo_programa, programa_formacion, red_id, creado, actualizado) VALUES (5, '999393', 'ejemplo4', 'programa4', 5, NULL, NULL);
INSERT INTO public.programa_formacion (id_programa_formacion, codigo_programa, tipo_programa, programa_formacion, red_id, creado, actualizado) VALUES (-1, '000', 'Sin programa', 'Sin programa', NULL, NULL, NULL);


--
-- Data for Name: redes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (1, 'Red de conocimiento en cultura', 'Red de conocimiento en cultura', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (2, 'Red de conocimiento en artesanÍas ', 'Red de conocimiento en artesanÍas ', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (3, 'Red de conocimiento en artes gráficas', 'Red de conocimiento en artes gráficas', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (4, 'Red de conocimiento en gestión administrativa, y financiera', 'Red de conocimiento en gestión administrativa, y financiera', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (5, 'Red de conocimiento en comercio y ventas', 'Red de conocimiento en comercio y ventas', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (6, 'Red de conocimiento ambiental', 'Red de conocimiento ambiental', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (7, 'Red de conocimiento en biotecnología', 'Red de conocimiento en biotecnología', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (8, 'Red de conocimiento en mecánica industrial', 'Red de conocimiento en mecánica industrial', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (9, 'Red de conocimiento en energía eléctrica', 'Red de conocimiento en energía eléctrica', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (10, 'Red de conocimiento en electrónica y automatización', 'Red de conocimiento en electrónica y automatización', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (11, 'Red de conocimiento en telecomunicaciones', 'Red de conocimiento en telecomunicaciones', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (12, 'Red de conocimiento en química aplicada ', 'Red de conocimiento en química aplicada ', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (13, 'Red de conocimiento en informática, diseño y desarrollo de software', 'Red de conocimiento en informática, diseño y desarrollo de software', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (14, 'Red de conocimiento automotor', 'Red de conocimiento automotor', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (15, 'Red de conocimiento aeroespacial', 'Red de conocimiento aeroespacial', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (16, 'Red de conocimiento textil, confección, diseño y moda', 'Red de conocimiento textil, confección, diseño y moda', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (17, 'Red de conocimiento en cuero, calzado, y marroquinería', 'Red de conocimiento en cuero, calzado, y marroquinería', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (18, 'Red de conocimiento en materiales para la industria', 'Red de conocimiento en materiales para la industria', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (19, 'Red de conocimiento en minería', 'Red de conocimiento en minería', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (20, 'Red de conocimiento en hidrocarburos', 'Red de conocimiento en hidrocarburos', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (21, 'Red de conocimiento en logística y gestión de la producción', 'Red de conocimiento en logística y gestión de la producción', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (22, 'Red de conocimiento en construcción e infraestructura', 'Red de conocimiento en construcción e infraestructura', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (23, 'Red de conocimiento agrícola', 'Red de conocimiento agrícola', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (24, 'Red de conocimiento pecuaria', 'Red de conocimiento pecuaria', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (25, 'Red de conocimiento acuícola y de pesca', 'Red de conocimiento acuícola y de pesca', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (26, 'Red de conocimiento en salud', 'Red de conocimiento en salud', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (27, 'Red de conocimiento en hotelería y turismo', 'Red de conocimiento en hotelería y turismo', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (28, 'Red de conocimiento en actividad física, recreación y deporte', 'Red de conocimiento en actividad física, recreación y deporte', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (29, 'Red de conocimiento en transporte', 'Red de conocimiento en transporte', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (30, 'Red de conocimiento en servicios personales', 'Red de conocimiento en servicios personales', 'SI', NULL, NULL);
INSERT INTO public.redes (id_red_conocimiento, red_conocimiento, observacion_red_conocimiento, activa, creado, actualizado) VALUES (0, 'Todas', NULL, 'SI', NULL, NULL);


--
-- Data for Name: registro_etapa_productiva; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.registro_etapa_productiva (id_empresa, nit_eps, eps, nit_arl, nombre_empresa, nit_empresa, ciudad, direccion, telefono, correo, modalidad, observacion, representante_legal, identificacion_representante, creado, actualizado, aprendiz_id) VALUES (1074, '901037916', 'ADRES EPS', '830025999', 'OM PROYECTOS ELECTRICOS Y CONSTRUCCION SAS', '901053514', 'CALI', 'cr 98a 45 51', '3148427213', 'JARCILA76@MISENA.EDU.CO', 'Sin registrar', 'Sin registrar', 'Sin registrar', 'Sin registrar', '2022-12-12 09:29:33.802', '2022-12-12 09:29:33.802', 1073);
INSERT INTO public.registro_etapa_productiva (id_empresa, nit_eps, eps, nit_arl, nombre_empresa, nit_empresa, ciudad, direccion, telefono, correo, modalidad, observacion, representante_legal, identificacion_representante, creado, actualizado, aprendiz_id) VALUES (1076, '900156264', 'NUEVA EPS', '860013816', 'SERVICIO NACIONAL DE APRENDIZAJE, SENA', '899999034', 'BOGOTA D.C.', 'km 6 autopista floridablanca #50-33', '3115696128', 'etovarq@sena.edu.co', 'Sin registrar', 'Sin registrar', 'Sin registrar', 'Sin registrar', '2022-12-12 09:29:34.284', '2022-12-12 09:29:34.284', 1075);
INSERT INTO public.registro_etapa_productiva (id_empresa, nit_eps, eps, nit_arl, nombre_empresa, nit_empresa, ciudad, direccion, telefono, correo, modalidad, observacion, representante_legal, identificacion_representante, creado, actualizado, aprendiz_id) VALUES (1077, '817000248', 'E.P.S. ASMET SALUD', '860013816', 'SERVICIO NACIONAL DE APRENDIZAJE, SENA', '899999034', 'BOGOTA D.C.', 'km 6 autopista floridablanca #50-33', '3115696128', 'etovarq@sena.edu.co', 'Sin registrar', 'Sin registrar', 'Sin registrar', 'Sin registrar', '2022-12-12 09:29:34.44', '2022-12-12 09:29:34.44', 1076);
INSERT INTO public.registro_etapa_productiva (id_empresa, nit_eps, eps, nit_arl, nombre_empresa, nit_empresa, ciudad, direccion, telefono, correo, modalidad, observacion, representante_legal, identificacion_representante, creado, actualizado, aprendiz_id) VALUES (1078, '817000248', 'E.P.S. ASMET SALUD', '800256161', 'PAULO EMILIO BRAVO CONSULTORES S.A.S.', '891500627', 'CALI', 'calle 22 norte No. 6 an 24 of. 608', '3176418256', 'gh@peb-sa.com', 'Sin registrar', 'Sin registrar', 'Sin registrar', 'Sin registrar', '2022-12-12 09:29:34.6', '2022-12-12 09:29:34.6', 1077);
INSERT INTO public.registro_etapa_productiva (id_empresa, nit_eps, eps, nit_arl, nombre_empresa, nit_empresa, ciudad, direccion, telefono, correo, modalidad, observacion, representante_legal, identificacion_representante, creado, actualizado, aprendiz_id) VALUES (1079, '817001773', 'ASOCIACION INDIGENA DEL CAUCA', '860013816', 'SERVICIO NACIONAL DE APRENDIZAJE, SENA', '899999034', 'BOGOTA D.C.', 'km 6 autopista floridablanca #50-33', '3115696128', 'etovarq@sena.edu.co', 'Sin registrar', 'Sin registrar', 'Sin registrar', 'Sin registrar', '2022-12-12 09:29:34.822', '2022-12-12 09:29:34.822', 1078);
INSERT INTO public.registro_etapa_productiva (id_empresa, nit_eps, eps, nit_arl, nombre_empresa, nit_empresa, ciudad, direccion, telefono, correo, modalidad, observacion, representante_legal, identificacion_representante, creado, actualizado, aprendiz_id) VALUES (1080, '800251440', 'E.P.S.  SANITAS  S.A.', '860013816', 'ACUEDUCTO Y ALCANTARILLADO DE POPAYAN S.A. E.S.P.', '891500117', 'POPAYAN', 'calle 3 # 4-21', '8321000 ext. 181 - 108', 'mbucheli@aapsa.com.co;mmosquera@aapsa.com.co', 'Sin registrar', 'Sin registrar', 'Sin registrar', 'Sin registrar', '2022-12-12 09:29:34.981', '2022-12-12 09:29:34.981', 1079);
INSERT INTO public.registro_etapa_productiva (id_empresa, nit_eps, eps, nit_arl, nombre_empresa, nit_empresa, ciudad, direccion, telefono, correo, modalidad, observacion, representante_legal, identificacion_representante, creado, actualizado, aprendiz_id) VALUES (1081, '800251440', 'E.P.S.  SANITAS  S.A.', '800256161', 'CELSIA COLOMBIA S.A.  E.S.P.', '800249860', 'YUMBO', 'CALI', '3210000', 'jmaya@summa-sci.com;acastrillonj@summa-sci.com;javilaavi@argos.com.co;notificacionesjudicialesepsa@celsia.com', 'Sin registrar', 'Sin registrar', 'Sin registrar', 'Sin registrar', '2022-12-12 09:29:35.146', '2022-12-12 09:29:35.146', 1080);
INSERT INTO public.registro_etapa_productiva (id_empresa, nit_eps, eps, nit_arl, nombre_empresa, nit_empresa, ciudad, direccion, telefono, correo, modalidad, observacion, representante_legal, identificacion_representante, creado, actualizado, aprendiz_id) VALUES (1075, '800251440', 'E.P.S.  SANITAS  S.A.', '860013816', 'GIRALDO QUINTERO JUAN CARLOS - AUTOSERVICIO QUESERA LOS PAISAS', '76305531', 'POPAYAN', 'cr 18 630', '573245876974', 'harold1360@hotmail.com', 'Sin registrar', 'Sin registrar', 'Sin registrar', 'Sin registrar', '2022-12-12 09:29:34.121', '2022-12-12 09:30:00.867', 1074);


--
-- Data for Name: requisitos_certificacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.requisitos_certificacion (id_requisito_cert, nombre, estado, creado, actualizado, observacion) VALUES (1, 'Evidencia carnet destruido', 'Activo', NULL, NULL, NULL);
INSERT INTO public.requisitos_certificacion (id_requisito_cert, nombre, estado, creado, actualizado, observacion) VALUES (2, 'Pruebas TyT', 'Activo', NULL, NULL, NULL);
INSERT INTO public.requisitos_certificacion (id_requisito_cert, nombre, estado, creado, actualizado, observacion) VALUES (3, 'Documento de Identidad', 'Activo', NULL, NULL, NULL);
INSERT INTO public.requisitos_certificacion (id_requisito_cert, nombre, estado, creado, actualizado, observacion) VALUES (4, 'Certificacion etapa productiva firmada', 'Activo', NULL, NULL, NULL);


--
-- Data for Name: seguimiento; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tipo_seguimiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tipo_seguimiento (id_tipo_seguimiento, tipo_seguimiento, estado_seguimiento, creado, actualizado) VALUES (1, 'Inicial', 'Activo', NULL, NULL);
INSERT INTO public.tipo_seguimiento (id_tipo_seguimiento, tipo_seguimiento, estado_seguimiento, creado, actualizado) VALUES (2, 'Parcial', 'Activo', NULL, NULL);
INSERT INTO public.tipo_seguimiento (id_tipo_seguimiento, tipo_seguimiento, estado_seguimiento, creado, actualizado) VALUES (3, 'Final', 'Activo', NULL, NULL);


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuario (id_usuario, perfil_id, centro, nombres, apellidos, correo_institucional, correo_alternativo, identificacion, genero, ciudad_residencia, area_id, creado, actualizado, contrasena) VALUES (5, 3, 'CTPI', 'Edison Andres', 'Ordoñez Sanchez', 'eaordoez57@misena.edu.co', 'ordonezandres202@gmail.com', '1002964275', 'M', 'Popayan', 5, NULL, '2022-12-07 08:38:39-05', '$2a$04$zZMI/rSYWXtZUPLA7Oqp8..IhvUUS4un/r7tinLDJbopQd9Ncipre');
INSERT INTO public.usuario (id_usuario, perfil_id, centro, nombres, apellidos, correo_institucional, correo_alternativo, identificacion, genero, ciudad_residencia, area_id, creado, actualizado, contrasena) VALUES (14, 2, 'popayan cauca', 'juan pablo', 'ceron fernadez', 'juan@misena.edu.co', 'juanpababloce@gmail.com', '1234', 'M', 'popayan', 5, '2022-12-13 09:39:56-05', '2022-12-13 09:39:56-05', '$2b$04$Jpoafgs6kRQIsa1RRjtAAut7/sRWjGO0MIU/BQYCDGx.JnRa4T752');
INSERT INTO public.usuario (id_usuario, perfil_id, centro, nombres, apellidos, correo_institucional, correo_alternativo, identificacion, genero, ciudad_residencia, area_id, creado, actualizado, contrasena) VALUES (6, 3, 'CTPI', 'Juan Pablo', 'Ceron', 'juan@misena.edu.co', 'juan@gmail.com', '123456789', 'M', 'popayan', 1, '2022-12-05 14:14:33-05', '2022-12-13 09:39:56-05', '$2b$04$JCioOBN4DK2bfHC7PClSsOre7ykrN7sZrC5DeDq8CI4lb6lP//dnK');


--
-- Name: aprendices_id_aprendiz_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aprendices_id_aprendiz_seq', 1080, true);


--
-- Name: areas_id_area_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.areas_id_area_seq', 5, true);


--
-- Name: asignacion_id_asignacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asignacion_id_asignacion_seq', 66, true);


--
-- Name: bitacoras_id_bitacora_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bitacoras_id_bitacora_seq', 1, false);


--
-- Name: documentos_certificacion_id_documentos_cert_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.documentos_certificacion_id_documentos_cert_seq', 1, false);


--
-- Name: documentos_id_documento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.documentos_id_documento_seq', 12, true);


--
-- Name: estado_fase_estado_fase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estado_fase_estado_fase_id_seq', 2, true);


--
-- Name: img_photo_id_photo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.img_photo_id_photo_seq', 119, true);


--
-- Name: item_modulo_perfil_id_item_modulo_perfil_seq; Type: SEQUENCE SET; Schema: public; Owner: dfp
--

SELECT pg_catalog.setval('public.item_modulo_perfil_id_item_modulo_perfil_seq', 1, false);


--
-- Name: item_modulos_id_item_modulo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_modulos_id_item_modulo_seq', 1, false);


--
-- Name: item_modulos_perfiles_item_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_modulos_perfiles_item_modulo_id_seq', 1, false);


--
-- Name: modulo_id_modulo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modulo_id_modulo_seq', 1, true);


--
-- Name: notificaciones_id_notificacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notificaciones_id_notificacion_seq', 1, false);


--
-- Name: novedades_id_novedad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.novedades_id_novedad_seq', 1, true);


--
-- Name: perfiles_id_perfil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfiles_id_perfil_seq', 3, true);


--
-- Name: programa_formacion_id_programa_formacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.programa_formacion_id_programa_formacion_seq', 5, true);


--
-- Name: redes_id_red_conocimiento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.redes_id_red_conocimiento_seq', 6, true);


--
-- Name: registro_etapa_productiva_id_empresa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registro_etapa_productiva_id_empresa_seq', 1081, true);


--
-- Name: requisitos_certificacion_id_requisito_cert_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requisitos_certificacion_id_requisito_cert_seq', 6, true);


--
-- Name: seguimiento_id_seguimiento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seguimiento_id_seguimiento_seq', 23, true);


--
-- Name: tipo_seguimiento_tipo_seguimiento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_seguimiento_tipo_seguimiento_id_seq', 4, true);


--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 14, true);


--
-- Name: aprendices aprendices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aprendices
    ADD CONSTRAINT aprendices_pkey PRIMARY KEY (id_aprendiz);


--
-- Name: areas areas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT areas_pkey PRIMARY KEY (id_area);


--
-- Name: asignacion asignacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignacion
    ADD CONSTRAINT asignacion_pkey PRIMARY KEY (id_asignacion);


--
-- Name: bitacoras bitacoras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bitacoras
    ADD CONSTRAINT bitacoras_pkey PRIMARY KEY (id_bitacora);


--
-- Name: documentos_certificacion documentos_certificacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos_certificacion
    ADD CONSTRAINT documentos_certificacion_pkey PRIMARY KEY (id_documentos_cert);


--
-- Name: documentos documentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_pkey PRIMARY KEY (id_documento);


--
-- Name: estado_fase estado_fase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_fase
    ADD CONSTRAINT estado_fase_pkey PRIMARY KEY (id_estado_fase);


--
-- Name: usuario identificacion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT identificacion UNIQUE (identificacion);


--
-- Name: images img_photo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT img_photo_pkey PRIMARY KEY (id_photo);


--
-- Name: item_modulo_perfil item_modulo_perfil_pkey; Type: CONSTRAINT; Schema: public; Owner: dfp
--

ALTER TABLE ONLY public.item_modulo_perfil
    ADD CONSTRAINT item_modulo_perfil_pkey PRIMARY KEY (id_item_modulo_perfil);


--
-- Name: item_modulos item_modulos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_modulos
    ADD CONSTRAINT item_modulos_pkey PRIMARY KEY (id_item_modulo);


--
-- Name: modulo modulo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulo
    ADD CONSTRAINT modulo_pkey PRIMARY KEY (id_modulo);


--
-- Name: notificaciones notificaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT notificaciones_pkey PRIMARY KEY (id_notificacion);


--
-- Name: novedades novedades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.novedades
    ADD CONSTRAINT novedades_pkey PRIMARY KEY (id_novedad);


--
-- Name: perfiles perfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles
    ADD CONSTRAINT perfiles_pkey PRIMARY KEY (id_perfil);


--
-- Name: programa_formacion programa_formacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programa_formacion
    ADD CONSTRAINT programa_formacion_pkey PRIMARY KEY (id_programa_formacion);


--
-- Name: redes redes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.redes
    ADD CONSTRAINT redes_pkey PRIMARY KEY (id_red_conocimiento);


--
-- Name: registro_etapa_productiva registro_etapa_productiva_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registro_etapa_productiva
    ADD CONSTRAINT registro_etapa_productiva_pkey PRIMARY KEY (id_empresa);


--
-- Name: requisitos_certificacion requisitos_certificacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitos_certificacion
    ADD CONSTRAINT requisitos_certificacion_pkey PRIMARY KEY (id_requisito_cert);


--
-- Name: seguimiento seguimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimiento
    ADD CONSTRAINT seguimiento_pkey PRIMARY KEY (id_seguimiento);


--
-- Name: tipo_seguimiento tipo_seguimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_seguimiento
    ADD CONSTRAINT tipo_seguimiento_pkey PRIMARY KEY (id_tipo_seguimiento);


--
-- Name: images user_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT user_unique UNIQUE (user_id);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- Name: asignacion fk_aprendiz; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignacion
    ADD CONSTRAINT fk_aprendiz FOREIGN KEY (aprendiz_id) REFERENCES public.aprendices(id_aprendiz);


--
-- Name: images fk_aprendiz; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT fk_aprendiz FOREIGN KEY (aprendiz_id) REFERENCES public.aprendices(id_aprendiz) NOT VALID;


--
-- Name: registro_etapa_productiva fk_aprendiz_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registro_etapa_productiva
    ADD CONSTRAINT fk_aprendiz_id FOREIGN KEY (aprendiz_id) REFERENCES public.aprendices(id_aprendiz) NOT VALID;


--
-- Name: usuario fk_area; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_area FOREIGN KEY (area_id) REFERENCES public.areas(id_area);


--
-- Name: areas fk_areas_rel_red_tecno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT fk_areas_rel_red_tecno FOREIGN KEY (red_conocimiento_id) REFERENCES public.redes(id_red_conocimiento);


--
-- Name: seguimiento fk_asignacion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimiento
    ADD CONSTRAINT fk_asignacion FOREIGN KEY (asignacion_id) REFERENCES public.asignacion(id_asignacion);


--
-- Name: bitacoras fk_asignacion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bitacoras
    ADD CONSTRAINT fk_asignacion FOREIGN KEY (asignacion_id) REFERENCES public.asignacion(id_asignacion);


--
-- Name: documentos_certificacion fk_asignacion_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos_certificacion
    ADD CONSTRAINT fk_asignacion_id FOREIGN KEY (asignacion_id) REFERENCES public.asignacion(id_asignacion);


--
-- Name: seguimiento fk_documento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimiento
    ADD CONSTRAINT fk_documento FOREIGN KEY (documento_id) REFERENCES public.documentos(id_documento);


--
-- Name: bitacoras fk_documento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bitacoras
    ADD CONSTRAINT fk_documento FOREIGN KEY (documento_id) REFERENCES public.documentos(id_documento);


--
-- Name: documentos_certificacion fk_documento_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos_certificacion
    ADD CONSTRAINT fk_documento_id FOREIGN KEY (documento_id) REFERENCES public.documentos(id_documento);


--
-- Name: asignacion fk_estado_fase; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignacion
    ADD CONSTRAINT fk_estado_fase FOREIGN KEY (estado_fase_id) REFERENCES public.estado_fase(id_estado_fase);


--
-- Name: item_modulos_perfiles fk_item_mod_rel_item_item_modulo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_modulos_perfiles
    ADD CONSTRAINT fk_item_mod_rel_item_item_modulo FOREIGN KEY (id_item_modulo) REFERENCES public.item_modulos(id_item_modulo) NOT VALID;


--
-- Name: item_modulos fk_item_mod_rel_item_item_modulo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_modulos
    ADD CONSTRAINT fk_item_mod_rel_item_item_modulo FOREIGN KEY (modulo_id) REFERENCES public.item_modulos(id_item_modulo) NOT VALID;


--
-- Name: item_modulos fk_item_mod_rel_item_modulos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_modulos
    ADD CONSTRAINT fk_item_mod_rel_item_modulos FOREIGN KEY (modulo_id) REFERENCES public.modulo(id_modulo);


--
-- Name: item_modulos_perfiles fk_item_mod_rel_perfil_perfiles; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_modulos_perfiles
    ADD CONSTRAINT fk_item_mod_rel_perfil_perfiles FOREIGN KEY (perfil_id) REFERENCES public.perfiles(id_perfil);


--
-- Name: item_modulo_perfil fk_item_modulo_item_modulo_perfiles; Type: FK CONSTRAINT; Schema: public; Owner: dfp
--

ALTER TABLE ONLY public.item_modulo_perfil
    ADD CONSTRAINT fk_item_modulo_item_modulo_perfiles FOREIGN KEY (item_modulo_id) REFERENCES public.item_modulos(id_item_modulo) NOT VALID;


--
-- Name: asignacion fk_novedades_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignacion
    ADD CONSTRAINT fk_novedades_id FOREIGN KEY (novedad_id) REFERENCES public.novedades(id_novedad) NOT VALID;


--
-- Name: usuario fk_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_perfil FOREIGN KEY (perfil_id) REFERENCES public.perfiles(id_perfil);


--
-- Name: aprendices fk_perfil_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aprendices
    ADD CONSTRAINT fk_perfil_id FOREIGN KEY (perfil_id) REFERENCES public.perfiles(id_perfil) NOT VALID;


--
-- Name: item_modulo_perfil fk_perfil_item_modulo_perfil; Type: FK CONSTRAINT; Schema: public; Owner: dfp
--

ALTER TABLE ONLY public.item_modulo_perfil
    ADD CONSTRAINT fk_perfil_item_modulo_perfil FOREIGN KEY (perfil_id) REFERENCES public.perfiles(id_perfil) NOT VALID;


--
-- Name: aprendices fk_programa_formacion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aprendices
    ADD CONSTRAINT fk_programa_formacion FOREIGN KEY (programa_id) REFERENCES public.programa_formacion(id_programa_formacion);


--
-- Name: programa_formacion fk_red; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programa_formacion
    ADD CONSTRAINT fk_red FOREIGN KEY (red_id) REFERENCES public.redes(id_red_conocimiento);


--
-- Name: documentos_certificacion fk_requisito; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos_certificacion
    ADD CONSTRAINT fk_requisito FOREIGN KEY (requisito_id) REFERENCES public.requisitos_certificacion(id_requisito_cert) NOT VALID;


--
-- Name: seguimiento fk_tipo_seguimiento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimiento
    ADD CONSTRAINT fk_tipo_seguimiento FOREIGN KEY (tipo_seguimiento_id) REFERENCES public.tipo_seguimiento(id_tipo_seguimiento);


--
-- Name: bitacoras fk_tipo_seguimiento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bitacoras
    ADD CONSTRAINT fk_tipo_seguimiento FOREIGN KEY (tipo_seguimiento_id) REFERENCES public.tipo_seguimiento(id_tipo_seguimiento);


--
-- Name: images fk_usario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT fk_usario FOREIGN KEY (user_id) REFERENCES public.usuario(id_usuario) NOT VALID;


--
-- Name: notificaciones fk_usuario_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT fk_usuario_id FOREIGN KEY (usuario_id) REFERENCES public.usuario(id_usuario);


--
-- Name: asignacion fk_usuario_responsable; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignacion
    ADD CONSTRAINT fk_usuario_responsable FOREIGN KEY (usuario_responsable_id) REFERENCES public.usuario(id_usuario);


--
-- PostgreSQL database dump complete
--

