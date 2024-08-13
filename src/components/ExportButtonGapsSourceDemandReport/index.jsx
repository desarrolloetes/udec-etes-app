import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButtonGapsSourceDemandReport = ({ data }) => {
  const headers = [
    { label: 'Id', key: 'gapdId' },
    { label: 'Año Academnico', key: 'gapdStdcAcademicYear' },
    { label: 'Periodo Academico', key: 'gapdStdcAcademicPeriod' },
    { label: 'Organización', key: 'gapdOrgDescription' },
    { label: 'Sede', key: 'gapdStdcCampCode' },
    { label: 'Sede Desc.', key: 'gapdCampDescription' },
    { label: 'Unidad Academica', key: 'gapdStdcSchoCode' },
    { label: 'Unidad Academica Desc.', key: 'gapdschoDescription' },
    { label: 'Asignatura', key: 'gapdStdcCoursCode' },
    { label: 'Asignatura Desc.', key: 'gapdCoursDescription' },
    { label: 'Jornada', key: 'gapdStdcWktCode' },
    { label: 'Actividad', key: 'gapdStdcActCode' },
    { label: 'NUmero Alumnos', key: 'gapdStdcStudentsQty' },
    { label: 'Ciudad', key: 'gapdStdcCity' },
  ];

  return (
    <CSVLink
      data={data}
      headers={headers}
      className="btn btn-primary"
      separator={';'}
      filename={`reporte_subproceso_demanda_${new Date().toLocaleDateString()}.csv`}>
      <i className="fa fa-file-download" />
      <span> Exportar</span>
    </CSVLink>
  );
};

export default ExportButtonGapsSourceDemandReport;
