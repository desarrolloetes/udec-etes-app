import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

const headCells = [
  {
    id: 'gapdId',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdIdHeader" />,
  },
  {
    id: 'gapdStdcAcademicYear',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdStdcAcademicYearHeader" />,
  },
  {
    id: 'gapdStdcAcademicPeriod',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdStdcAcademicPeriodHeader" />,
  },
  {
    id: 'gapdOrgDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdOrgDescriptionHeader" />,
  },
  {
    id: 'gapdStdcCampCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdStdcCampCodeHeader" />,
  },
  {
    id: 'gapdCampDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdCampDescriptionHeader" />,
  },
  {
    id: 'gapdStdcSchoCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdStdcSchoCodeHeader" />,
  },
  {
    id: 'gapdSchoDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdschoDescriptionHeader" />,
  },
  {
    id: 'gapdStdcCoursCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdStdcCoursCodeHeader" />,
  },
  {
    id: 'gapdCoursDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdCoursDescriptionHeader" />,
  },
  {
    id: 'gapdStdcWktCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdStdcWktCodeHeader" />,
  },
  {
    id: 'gapdStdcActCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdStdcActCodeHeader" />,
  },
  {
    id: 'gapdStdcStudentsQty',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdStdcStudentsQtyHeader" />,
  },
  {
    id: 'gapdStdcCity',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceDemand.appModule.gapdStdcCityHeader" />,
  },
];

function DemandTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const onSortOrderChange = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/*     <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> */}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={onSortOrderChange(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? (
                    <IntlMessages id="gapsSourceDemand.appModule.orderDesc" />
                  ) : (
                    <IntlMessages id="gapsSourceDemand.appModule.orderAsc" />
                  )}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

DemandTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(DemandTableHead);
