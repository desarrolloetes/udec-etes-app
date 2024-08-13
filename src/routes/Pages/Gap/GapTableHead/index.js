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
    id: 'procId',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="procesess.appModule.procIdHeader" />,
  },
  {
    id: 'procPurcName',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="procesess.appModule.procPurcNameHeader" />,
  },
  {
    id: 'procCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="procesess.appModule.procGapHeader" />,
  },
  {
    id: 'procStock',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="procesess.appModule.procStockHeader" />,
  },
  {
    id: 'procDemand',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="procesess.appModule.procDemandHeader" />,
  },
  {
    id: 'procStandard',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="procesess.appModule.procStandardHeader" />,
  },
  {
    id: 'procCreationDate',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="procesess.appModule.procCreationDateHeader" />,
  },
  {
    id: 'procScheduledDate',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="procesess.appModule.procScheduledDateHeader" />,
  },
  {
    id: 'procEmailNotification',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="procesess.appModule.procEmailNotificationHeader" />,
  },
  {
    id: 'procStatus',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="procesess.appModule.procStatusHeader" />,
  },
  // {
  //   id: 'lastLoginAt',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Last Login',
  // },
  // { id: 'emailUsage', numeric: true, disablePadding: false, label: 'Email Usage' },
];

function GapTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
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
                    <IntlMessages id="procesess.appModule.orderDesc" />
                  ) : (
                    <IntlMessages id="procesess.appModule.orderAsc" />
                  )}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">{<IntlMessages id="procesess.appModule.actions" />}</TableCell>
      </TableRow>
    </TableHead>
  );
}

GapTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(GapTableHead);
