import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButtonGapsStockVsDemandReport = ({ data }) => {
  const headers = [
    { label: 'Proceso ID', key: 'gaprProcId' },
    { label: 'Proceso', key: 'gaprProcCode' },
    { label: 'Ano', key: 'gaprAcademicYear' },
    { label: 'Periodo', key: 'gaprAcademicPeriod' },
    { label: 'Ciudad', key: 'gaprCityCode' },
    { label: 'Institucion', key: 'gaprOrgCode' },
    { label: 'Cod.Sede', key: 'gaprSchoCode' },
    { label: 'Desc.Sede', key: 'gaprSchoDescription' },
    { label: 'Asg.Code', key: 'gaprCoursCode' },
    { label: 'Asg.Desc', key: 'gaprCoursDescription' },
    { label: 'sku', key: 'gaprItemCode' },
    { label: 'Cod.UAcad', key: 'gaprCampCode' },
    { label: 'Desc.UAcad', key: 'gaprCampDescription' },
    { label: 'Stock Fisico', key: 'gaprCityStockFi' },
    { label: 'Stock Dig. Restringido', key: 'gaprCityStockDr' },
    { label: 'Stock Dig. Ilimitado', key: 'gaprCityStockDi' },
    { label: 'Stock Nacional', key: 'gaprNationalStock' },
    { label: 'Num Alumnos', key: 'gaprStudentQuantity' },
    { label: 'Demanda', key: 'gaprDemand' },
    { label: 'Bracha', key: 'gaprGap' },
    { label: 'Sku Activo', key: 'gaprItemActive' },
    { label: 'Titulo', key: 'gaprTitle' },
    { label: 'Autor', key: 'gaprAuthor' },
    { label: 'Editorial', key: 'gaprPublisher' },
    { label: 'Volumen', key: 'gaprVolume' },
    { label: 'Observacion', key: 'gaprObservation' },
  ];

  return (
    <CSVLink
      data={data}
      headers={headers}
      className="btn btn-primary"
      separator={';'}
      filename={`reporte_stock_vs_demanda_${new Date().toLocaleDateString()}.csv`}>
      <i className="fa fa-file-download" />
      <span> Exportar</span>
    </CSVLink>
  );
};

export default ExportButtonGapsStockVsDemandReport;
