import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButtonGapsDemandVsStockReport = ({ data }) => {
  const headers = [
    { label: 'Proceso ID', key: 'gaprProcId' },
    { label: 'Proceso', key: 'gaprProcCode' },
    { label: 'Ano', key: 'gaprAcademicYear' },
    { label: 'Periodo', key: 'gaprAcademicPeriod' },
    { label: 'Ciudad', key: 'gaprCityCode' },
    { label: 'Institucion', key: 'gaprOrgCode' },
    { label: 'Cod.UAcad', key: 'gaprSchoCode' },
    { label: 'Desc.UAcad', key: 'gaprSchoDescription' },
    { label: 'Cod.Carrera', key: 'gaprCampCode' },
    { label: 'Desc.Carrera', key: 'gaprCampDescription' },
    { label: 'Asg.Code', key: 'gaprCoursCode' },
    { label: 'Asg.Desc', key: 'gaprCoursDescription' },
    { label: 'sku', key: 'gaprItemCode' },
    { label: 'Stock Fisico', key: 'gaprCityStockFi' },
    { label: 'Stock Dig. Restringido', key: 'gaprCityStockDr' },
    { label: 'Stock Dig. Ilimitado', key: 'gaprCityStockDi' },
    { label: 'Stock Nacional', key: 'gaprNationalStock' },
    { label: 'Num. Alumnos', key: 'gaprStudentQuantity' },
    { label: 'Demanda', key: 'gaprDemand' },
    { label: 'Brecha', key: 'gaprGap' },
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
      filename={`reporte_demand_vs_stock_${new Date().toLocaleDateString()}.csv`}>
      <i className="fa fa-file-download" />
      <span> Exportar</span>
    </CSVLink>
  );
};

export default ExportButtonGapsDemandVsStockReport;
