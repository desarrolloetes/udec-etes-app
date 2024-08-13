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
    id: 'SchoolDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="schools.appModule.descriptionHeader" />,
  },
  /*   {
    id: 'SchoolCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="schools.appModule.codeHeader" />,
  }, */
  {
    id: 'SchoolOrgCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="schools.appModule.organizationHeader" />,
  },
  {
    id: 'SchoolCaccCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="schools.appModule.chargeAccountHeader" />,
  },
  {
    id: 'SchoolBuCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="schools.appModule.businessUnitHeader" />,
  },
  {
    id: 'SchoolStatus',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="schools.appModule.statusHeader" />,
  },
  // {
  //   id: 'lastLoginAt',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Last Login',
  // },
  // { id: 'emailUsage', numeric: true, disablePadding: false, label: 'Email Usage' },
];

function SchoolTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const onSortOrderChange = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
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
                    <IntlMessages id="schools.appModule.orderDesc" />
                  ) : (
                    <IntlMessages id="schools.appModule.orderAsc" />
                  )}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">{<IntlMessages id="schools.appModule.actions" />}</TableCell>
      </TableRow>
    </TableHead>
  );
}

SchoolTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(SchoolTableHead);
