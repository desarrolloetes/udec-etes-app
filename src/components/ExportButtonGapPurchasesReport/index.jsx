import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButtonGapPurchasesReport = ({ data }) => {
  const headers = [
    { label: 'Proceso', key: 'gappdProcId' },
    { label: 'Tipo Stock', key: 'gappdStockType' },
    { label: 'Año', key: 'gappdYear' },
    { label: 'Ciudad', key: 'gappdCityCode' },
    { label: 'Institucion', key: 'gappdOrgCode' },
    { label: 'UG Codigo', key: 'gappdSchoCode' },
    { label: 'UG Desc.', key: 'gappdSchoDescription' },
    { label: 'Asg Codigo', key: 'gappdCoursCode' },
    { label: 'Asg Desc.', key: 'gappdCourseDescription' },
    { label: 'Item Code', key: 'gappdItemCode' },
    { label: 'Item Desc', key: 'gappdItemDescription' },
    { label: 'Sede Cod.', key: 'gappdCampCode' },
    { label: 'Sede Desc.', key: 'gappdCampDescription' },
    { label: 'Brecha Inicial', key: 'gappdInitialGap' },
    { label: 'Valor Unitario', key: 'gappdUnitValue' },
    { label: 'Num. Lista', key: 'gappdListNumber' },
    { label: 'NUm. Requerimiento', key: 'gappdRequestNumber' },
    { label: 'Centro de Costo', key: 'gappdCaccCode' },
    { label: 'Obs.', key: 'gappdObservation' },
    { label: 'Desc.', key: 'gappdDescription' },
    { label: 'Total Requerimiento', key: 'gappdTotalRequired' },
    { label: 'Volumenes', key: 'gappdVolumes' },
    { label: 'Item Status', key: 'gappdItemStatus' },
    { label: 'Brecha Optimizada', key: 'gappdOptimizedGap' },
  ];

  return (
    <CSVLink
      data={data}
      headers={headers}
      className="btn btn-primary"
      separator={';'}
      filename={`reporte_brecha_compras_${new Date().toLocaleDateString()}.csv`}>
      <i className="fa fa-file-download" />
      <span> Exportar</span>
    </CSVLink>
  );
};

export default ExportButtonGapPurchasesReport;
