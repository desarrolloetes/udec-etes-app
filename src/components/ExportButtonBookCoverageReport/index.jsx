import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButtonBookCoverageReport = ({ data }) => {
  const headers = [
    { label: 'Institución', key: 'orgCode' },
    { label: 'Carrera', key: 'majorCode' },
    { label: 'Plan', key: 'progCode' },
    { label: 'Nivel', key: 'levelCode' },
    { label: 'Cód. Asig.', key: 'coursCode' },
    { label: 'Asg. Desc', key: 'coursDescription' },
    { label: 'Cód. SKU', key: 'itemCode' },
    { label: 'Descrip. SKU', key: 'itemDescripcion' },
    { label: 'Rendimiento', key: 'stdPerformance' },
    { label: 'N° Alum. Inscritos', key: 'studentQty' },
    { label: 'Stock', key: 'stock' },
    { label: 'Stock IL', key: 'stockUnlimited' },
    { label: 'Demanda', key: 'demand' },
    // { label: 'Tiene Stock IL', key: 'haveStockUnlimited' },
    // { label: 'Cumplimiento', key: 'coveragePerformance' },
    { label: 'Cump. Ejemplares', key: 'coveragePerformanceAdjusted' },
    { label: 'Cobertura Tít.', key: 'coverageTit' },
    { label: 'Ciudad', key: 'city' },
    { label: 'Observacion', key: 'obs' },
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
      filename={`reporte_cobertuba_bibliografias_${new Date().toLocaleDateString()}.csv`}>
      <i className="fa fa-file-download" />
      <span> Exportar</span>
    </CSVLink>
  );
};

export default ExportButtonBookCoverageReport;
