import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButtonGapsSourceStockReport = ({ data }) => {
  const headers = [
    { label: 'Id', key: 'id' },
    { label: 'Organización', key: 'gapsStdcOrgDescription' },
    { label: 'Estandard-UACAD', key: 'gapsStdcStdCode' },
    { label: 'Estandar Version', key: 'gapsStdcStdVersion' },
    { label: 'Asignatura', key: 'gapsStdcCoursCode' },
    { label: 'Descripcion Asignatura', key: 'gapsStdcCoursDescription' },
    { label: 'Recinto', key: 'gapsStdcRlayCode' },
    { label: 'Area de Gestion', key: 'gapsStdcPurcCode' },
    { label: 'Sku', key: 'gapsStdcItemCode' },
    { label: 'Sku Descripcion', key: 'gapsStdcItemName' },
    { label: 'Rendimiento', key: 'gapsStdcPerformance' },
    /* { label: 'Ciclo Renovacion', key: 'gapsStdcRenewalCicle' },
    { label: 'Ciclo Mantencion', key: 'gapsStdcMaintenanceCicle' }, */
    { label: 'Observaciones', key: 'gapsStdcObservations' },
    { label: 'Estado', key: 'gapsStdcStatus' },
  ];

  return (
    <CSVLink
      data={data}
      headers={headers}
      className="btn btn-primary"
      separator={';'}
      filename={`reporte_subproceso_standard_${new Date().toLocaleDateString()}.csv`}>
      <i className="fa fa-file-download" />
      <span> Exportar</span>
    </CSVLink>
  );
};

export default ExportButtonGapsSourceStockReport;
