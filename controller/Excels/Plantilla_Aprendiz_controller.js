




const ExcelJS = require('exceljs');
const { Pool } = require("pg");
const { pgConfig } = require("../../config/connection");
const pool = new Pool(pgConfig);

const generarPlantillaExcel = async (req, res) => {
  try {
    
    
    
    const nitsEpsResult = await pool.query(
      'SELECT DISTINCT nit_eps FROM registro_etapa_productiva WHERE nit_eps IS NOT NULL ORDER BY nit_eps'
    );
    const nitsEps = nitsEpsResult.rows;
    
    const nombresEpsResult = await pool.query(
      'SELECT DISTINCT eps FROM registro_etapa_productiva WHERE eps IS NOT NULL ORDER BY eps'
    );
    const nombresEps = nombresEpsResult.rows;
    
    const nitsArlResult = await pool.query(
      'SELECT DISTINCT nit_arl FROM registro_etapa_productiva WHERE nit_arl IS NOT NULL ORDER BY nit_arl'
    );
    const nitsArl = nitsArlResult.rows;
    
    const nombresArlResult = await pool.query(
      'SELECT DISTINCT arl FROM registro_etapa_productiva WHERE arl IS NOT NULL ORDER BY arl'
    );
    const nombresArl = nombresArlResult.rows;
    
    const empresasResult = await pool.query(
      'SELECT DISTINCT nombre_empresa FROM registro_etapa_productiva WHERE nombre_empresa IS NOT NULL ORDER BY nombre_empresa'
    );
    const empresas = empresasResult.rows;

    console.log('Datos obtenidos:', {
      nitsEps: nitsEps.length,
      nombresEps: nombresEps.length,
      nitsArl: nitsArl.length,
      nombresArl: nombresArl.length,
      empresas: empresas.length
    });

    
    
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Registro Aprendizes');
    const dataSheet = workbook.addWorksheet('Datos');

    
    
    
    worksheet.columns = [
      { header: 'NIT', key: 'nit', width: 15 },
      { header: 'Razon Social', key: 'razon_social', width: 30 },
      { header: 'Departamento empresa', key: 'depto_empresa', width: 22 },
      { header: 'Ciudad empresa', key: 'ciudad_empresa', width: 20 },
      { header: 'Dirección', key: 'direccion_empresa', width: 35 },
      { header: 'Teléfono empresa', key: 'telefono_empresa', width: 18 },
      { header: 'Correo electrónico', key: 'correo_empresa', width: 30 },
      { header: 'Tipo documento', key: 'tipo_documento', width: 18 },
      { header: 'Numero documento', key: 'numero_documento', width: 18 },
      { header: 'Apellidos', key: 'apellidos', width: 25 },
      { header: 'Nombres', key: 'nombres', width: 25 },
      { header: 'Fecha Nacimiento', key: 'fecha_nacimiento', width: 18 },
      { header: 'Género', key: 'genero', width: 12 },
      { header: 'Discapacidad', key: 'discapacidad', width: 15 },
      { header: 'Teléfono', key: 'telefono', width: 15 },
      { header: 'Correo electónico', key: 'correo_electronico', width: 30 },
      { header: 'Departamento código', key: 'depto_codigo', width: 22 },
      { header: 'Departamento', key: 'depto_aprendiz', width: 20 },
      { header: 'Municipio código', key: 'municipio_codigo', width: 20 },
      { header: 'Municipio', key: 'municipio_aprendiz', width: 20 },
      { header: 'Especialidad', key: 'especialidad', width: 35 },
      { header: 'Ficha', key: 'ficha', width: 15 },
      { header: 'Inicio lectiva', key: 'inicio_lectiva', width: 16 },
      { header: 'Fin lectiva', key: 'fin_lectiva', width: 16 },
      { header: 'Inicio productiva', key: 'inicio_productiva', width: 18 },
      { header: 'Fin productiva', key: 'fin_productiva', width: 18 },
      { header: 'Contrato inicio', key: 'contrato_inicio', width: 18 },
      { header: 'Contrato Fin', key: 'contrato_fin', width: 18 },
      { header: 'Regional', key: 'regional', width: 20 },
      { header: 'Fase', key: 'fase_aprendiz', width: 20 },
      { header: 'Nit EPS', key: 'nit_eps', width: 15 },
      { header: 'EPS', key: 'eps', width: 30 },
      { header: 'Nit ARL', key: 'nit_arl', width: 15 },
      { header: 'ARL', key: 'arl', width: 30 },
      { header: 'Fecha registro', key: 'fecha_registro', width: 18 },
      { header: 'Modalidad', key: 'modalidad', width: 20 }
    ];

    
    
    
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0070C0' }
    };
    worksheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle' };

    
    
    
    dataSheet.addRow(['Nit EPS']);
    nitsEps.forEach(item => dataSheet.addRow([item.nit_eps]));
    
    const startEps = dataSheet.rowCount + 2;
    dataSheet.addRow(['EPS']);
    nombresEps.forEach(item => dataSheet.addRow([item.eps]));
    
    const startArlNit = dataSheet.rowCount + 2;
    dataSheet.addRow(['Nit ARL']);
    nitsArl.forEach(item => dataSheet.addRow([item.nit_arl]));
    
    const startArl = dataSheet.rowCount + 2;
    dataSheet.addRow(['ARL']);
    nombresArl.forEach(item => dataSheet.addRow([item.arl]));
    
    const startEmpresa = dataSheet.rowCount + 2;
    dataSheet.addRow(['Razon Social']);
    empresas.forEach(item => dataSheet.addRow([item.nombre_empresa]));

    
    dataSheet.state = 'hidden';

    
    
    
    for (let i = 2; i <= 100; i++) {
      worksheet.addRow({});
    }

    
    
    
    
    
    const nitEpsCount = nitsEps.length;
    if (nitEpsCount > 0) {
      worksheet.dataValidations.add('AE2:AE1000', {
        type: 'list',
        allowBlank: true,
        formulae: [`Datos!$A$2:$A$${nitEpsCount + 1}`],
        showErrorMessage: true,
        errorStyle: 'information',
        errorTitle: 'Valor personalizado',
        error: 'Puede seleccionar de la lista o escribir un valor personalizado'
      });
    }

    
    const epsCount = nombresEps.length;
    if (epsCount > 0) {
      worksheet.dataValidations.add('AF2:AF1000', {
        type: 'list',
        allowBlank: true,
        formulae: [`Datos!$A$${startEps}:$A$${startEps + epsCount - 1}`],
        showErrorMessage: true,
        errorStyle: 'information',
        errorTitle: 'Valor personalizado',
        error: 'Puede seleccionar de la lista o escribir un valor personalizado'
      });
    }

    
    const arlNitCount = nitsArl.length;
    if (arlNitCount > 0) {
      worksheet.dataValidations.add('AG2:AG1000', {
        type: 'list',
        allowBlank: true,
        formulae: [`Datos!$A$${startArlNit}:$A$${startArlNit + arlNitCount - 1}`],
        showErrorMessage: true,
        errorStyle: 'information',
        errorTitle: 'Valor personalizado',
        error: 'Puede seleccionar de la lista o escribir un valor personalizado'
      });
    }

    
    const arlCount = nombresArl.length;
    if (arlCount > 0) {
      worksheet.dataValidations.add('AH2:AH1000', {
        type: 'list',
        allowBlank: true,
        formulae: [`Datos!$A$${startArl}:$A$${startArl + arlCount - 1}`],
        showErrorMessage: true,
        errorStyle: 'information',
        errorTitle: 'Valor personalizado',
        error: 'Puede seleccionar de la lista o escribir un valor personalizado'
      });
    }

    
    const empresaCount = empresas.length;
    if (empresaCount > 0) {
      worksheet.dataValidations.add('B2:B1000', {
        type: 'list',
        allowBlank: true,
        formulae: [`Datos!$A$${startEmpresa}:$A$${startEmpresa + empresaCount - 1}`],
        showErrorMessage: true,
        errorStyle: 'information',
        errorTitle: 'Valor personalizado',
        error: 'Puede seleccionar de la lista o escribir un valor personalizado'
      });
    }

    
    
    
    const dateColumns = [
      { col: 'L', name: 'Fecha Nacimiento' },      
      { col: 'W', name: 'Inicio lectiva' },        
      { col: 'X', name: 'Fin lectiva' },           
      { col: 'Y', name: 'Inicio productiva' },     
      { col: 'Z', name: 'Fin productiva' },        
      { col: 'AA', name: 'Contrato inicio' },      
      { col: 'AB', name: 'Contrato Fin' },         
      { col: 'AI', name: 'Fecha registro' }        
    ];

    dateColumns.forEach(dateCol => {
      
      worksheet.getColumn(dateCol.col).numFmt = 'dd/mm/yyyy';
      
      
      worksheet.dataValidations.add(`${dateCol.col}2:${dateCol.col}1000`, {
        type: 'date',
        operator: 'between',
        showErrorMessage: true,
        allowBlank: true,
        formulae: [new Date(1900, 0, 1), new Date(2100, 11, 31)],
        errorStyle: 'stop',
        errorTitle: '❌ Fecha inválida',
        error: 'Solo se permiten fechas válidas en formato DD/MM/AAAA\n\nEjemplo correcto: 15/03/2024\n\nNo se permiten textos como "fhgh"',
        promptTitle: '📅 Ingrese una fecha',
        prompt: 'Formato requerido: DD/MM/AAAA\nEjemplo: 01/02/2025'
      });
    });

    
    
    
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=plantilla_etapa_productiva.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();

    console.log('Plantilla Excel generada exitosamente');

  } catch (error) {
    console.error('Error generando plantilla Excel:', error);
    res.status(500).json({ 
      error: 'Error al generar la plantilla Excel',
      details: error.message 
    });
  }
};

module.exports = {
  generarPlantillaExcel
};