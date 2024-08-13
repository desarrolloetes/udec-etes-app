import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButtonGapsSourceStockReport = ({ data }) => {
  const headers = [
    { label: 'Id', key: 'gapstId' },
    { label: 'Organización', key: 'gapstOrgDescription' },
    { label: 'Sede', key: 'gapstCampDescription' },
    { label: 'Biblioteca', key: 'gapstCampLibrary' },
    { label: 'Sub-Biblioteca', key: 'gapstCampSubLibrary' },
    { label: 'Ciudad', key: 'gapstCity' },
    { label: 'Sku', key: 'gapstItemCode' },
    { label: 'Sku-Descripcion', key: 'gapstItemDescription' },
    { label: 'Titulo', key: 'gapstItemTitulo' },
    { label: 'Autor', key: 'gapstItemAutor' },
    { label: 'Editorial', key: 'gapstItemEditorial' },
    { label: 'Bibliogáfico', key: 'gapstLibraryId' },
    { label: 'Cod. Barra', key: 'gapstItemId' },
    { label: 'Formato', key: 'gapstFormat' },
    { label: 'Tipo Formato', key: 'gapstFormatType' },
    { label: 'Volumen', key: 'gapstVolumen' },
  ];

  return (
    <CSVLink
      data={data}
      headers={headers}
      className="btn btn-primary"
      separator={';'}
      filename={`reporte_subproceso_stock_${new Date().toLocaleDateString()}.csv`}>
      <i className="fa fa-file-download" />
      <span> Exportar</span>
    </CSVLink>
  );
};

export default ExportButtonGapsSourceStockReport;
