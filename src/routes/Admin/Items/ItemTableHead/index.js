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
    id: 'itemCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="items.appModule.itemNameHeader" />,
  },
  {
    id: 'itemPurcCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="items.appModule.itemPurchaseHeader" />,
  },
  {
    id: 'itemItmcFamCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="items.appModule.itemFamilyHeader" />,
  },
  {
    id: 'itemItmcSubFamCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="items.appModule.itemSubFamilyHeader" />,
  },
  {
    id: 'itemDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="items.appModule.itemDescriptionHeader" />,
  },
  {
    id: 'itemCreationDate',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="items.appModule.itemCreationDateHeader" />,
  },
  {
    id: 'itemStatus',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="items.appModule.itemStatusHeader" />,
  },
];

function ItemTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
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
                    <IntlMessages id="items.appModule.orderDesc" />
                  ) : (
                    <IntlMessages id="items.appModule.orderAsc" />
                  )}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">{<IntlMessages id="items.appModule.actions" />}</TableCell>
      </TableRow>
    </TableHead>
  );
}

ItemTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(ItemTableHead);
