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
    id: 'rlayCode',
    numeric: false,
    disablePadding: true,
    label: <IntlMessages id="standardRoomsLayoutReport.appModule.roomLayoutCodeHeader" />,
  },
  {
    id: 'rlayDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="standardRoomsLayoutReport.appModule.roomLayoutDescriptionHeader" />,
  },
  {
    id: 'itemCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="standardRoomsLayoutReport.appModule.itemCodeHeader" />,
  },
  {
    id: 'itemName',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="standardRoomsLayoutReport.appModule.itemNameHeader" />,
  },
  {
    id: 'coursCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="standardRoomsLayoutReport.appModule.coursCodeHeader" />,
  },
  {
    id: 'coursDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="standardRoomsLayoutReport.appModule.coursDescriptionHeader" />,
  },
  {
    id: 'coursDuration',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="standardRoomsLayoutReport.appModule.coursDuration" />,
  },
  {
    id: 'stdcPerformance',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="standardRoomsLayoutReport.appModule.stdcPerformanceHeader" />,
  },
  {
    id: 'quantity',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="standardRoomsLayoutReport.appModule.quantity" />,
  },
  {
    id: 'stdcMaintenanceCicle',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="standardRoomsLayoutReport.appModule.stdcMaintenanceCicleHeader" />,
  },
  {
    id: 'stdcRenewalCicle',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="standardRoomsLayoutReport.appModule.stdcRenewalCicleHeader" />,
  },
];

function StandardRoomsLayoutReportTableHead({
  classes,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) {
  const onSortOrderChange = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
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
                    <IntlMessages id="users.appModule.orderDesc" />
                  ) : (
                    <IntlMessages id="users.appModule.orderAsc" />
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

StandardRoomsLayoutReportTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(StandardRoomsLayoutReportTableHead);
