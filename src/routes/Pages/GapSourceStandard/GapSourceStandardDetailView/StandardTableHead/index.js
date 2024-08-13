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
    id: 'gapsStdcId',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcIdHeader" />,
  },
  {
    id: 'gapsStdcOrgDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcOrgDescriptionHeader" />,
  },
  {
    id: 'gapsStdcStdCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcStdCodeHeader" />,
  },
  {
    id: 'gapsStdcStdVersion',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcStdVersionHeader" />,
  },
  {
    id: 'gapsStdcCoursCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcCoursCodeHeader" />,
  },
  {
    id: 'gapsStdcCoursDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcCoursDescriptionHeader" />,
  },
  {
    id: 'gapsStdcRlayCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcRlayCodeHeader" />,
  },
  {
    id: 'gapsStdcPurcCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcPurcCodeHeader" />,
  },
  {
    id: 'gapsStdcItemCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcItemCodeHeader" />,
  },
  {
    id: 'gapsStdcItemName',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcItemNameHeader" />,
  },
  {
    id: 'gapsStdcPerformance',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcPerformanceHeader" />,
  },
  /*   {
    id: 'gapsStdcRenewalCicle',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcRenewalCicleHeader" />,
  },
  {
    id: 'gapsStdcMaintenanceCicle',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcMaintenanceCicleHeader" />,
  }, */
  {
    id: 'gapsStdcObservations',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcObservationsHeader" />,
  },
  {
    id: 'gapsStdcStatus',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStandard.appModule.gapsStdcStatusHeader" />,
  },
];

function StockTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
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
                    <IntlMessages id="gapsSourceStandard.appModule.orderDesc" />
                  ) : (
                    <IntlMessages id="gapsSourceStandard.appModule.orderAsc" />
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

StockTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(StockTableHead);
