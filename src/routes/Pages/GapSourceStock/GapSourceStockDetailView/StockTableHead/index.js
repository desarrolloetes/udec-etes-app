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
    id: 'gapstId',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstIdHeader" />,
  },
  {
    id: 'gapstOrgDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstOrgDescriptionHeader" />,
  },
  {
    id: 'gapstCampDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstCampDescriptionHeader" />,
  },
  {
    id: 'gapstCampLibrary',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstCampLibraryHeader" />,
  },
  {
    id: 'gapstCampSubLibrary',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModulegapstCampSubLibraryDateHeader" />,
  },
  {
    id: 'gapstCity',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstCityHeader" />,
  },
  {
    id: 'gapstItemCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstItemCodeHeader" />,
  },
  {
    id: 'gapstItemDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstItemDescriptionHeader" />,
  },
  {
    id: 'gapstItemTitulo',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstItemTituloHeader" />,
  },
  {
    id: 'gapstItemAutor',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstItemAutorHeader" />,
  },
  {
    id: 'gapstItemEditorial',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstItemEditorialHeader" />,
  },
  {
    id: 'gapstLibraryId',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstLibraryIdHeader" />,
  },
  {
    id: 'gapstItemId',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstItemIdHeader" />,
  },
  {
    id: 'gapstFormat',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstFormatHeader" />,
  },
  {
    id: 'gapstFormatType',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstFormatTypeHeader" />,
  },
  {
    id: 'gapstVolumen',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapsSourceStock.appModule.gapstVolumenHeader" />,
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
                    <IntlMessages id="gapsSourceStock.appModule.orderDesc" />
                  ) : (
                    <IntlMessages id="gapsSourceStock.appModule.orderAsc" />
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
