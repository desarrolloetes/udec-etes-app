import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButtonStandardByRoomLayoutReport = ({ data }) => {
  const headers = [
    { label: 'Código Recinto', key: 'rlayCode' },
    { label: 'Recinto', key: 'rlayDescription' },
    { label: 'Código Clase', key: 'itemCode' },
    { label: 'Clase', key: 'itemDescription' },
    { label: 'Código Asignatura', key: 'coursCode' },
    { label: 'Asignatura', key: 'coursDescription' },
    { label: 'Régimen', key: 'coursDuration' },
    { label: 'Rendimiento', key: 'stdcPerformance' },
    { label: 'Cantidad', key: 'quantity' },
    { label: 'Ciclo Mantención', key: 'stdcMaintenance' },
    { label: 'Ciclo de Renvación', key: 'stdcRenewalCicle' },
  ];

  return (
    // <div className={styles}>
    //     <button className='btn btn-primary'>
    //         <i className='fa fa-file-download'></i>
    //         <span> Exportar</span>
    //     </button>
    // </div>
    <CSVLink
      data={data}
      headers={headers}
      className="btn btn-primary"
      separator={';'}
      filename={`reporte_standard_por_recinto_${new Date().toLocaleDateString()}.csv`}>
      <i className="fa fa-file-download" />
      <span> Exportar</span>
    </CSVLink>
  );
};

export default ExportButtonStandardByRoomLayoutReport;
