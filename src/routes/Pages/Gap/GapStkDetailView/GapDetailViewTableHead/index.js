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
    id: 'gaprCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprCodeHeader" />,
  },
  {
    id: 'gaprAcademicYear',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprAcademicYearHeader" />,
  },
  {
    id: 'gaprAcademicPeriod',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprAcademicPeriodHeader" />,
  },
  {
    id: 'gaprCityCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprCityCodeHeader" />,
  },
  {
    id: 'gaprOrgCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprOrgCodeHeader" />,
  },
  {
    id: 'gaprCampCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprCampCodeHeader" />,
  },
  {
    id: 'gapdCampDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gapdCampDescriptionHeader" />,
  },
  {
    id: 'gaprSchoCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprSchoCodeHeader" />,
  },
  {
    id: 'gaprSchoDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprSchoDescriptionHeader" />,
  },
  {
    id: 'gaprCoursCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprCoursCodeHeader" />,
  },
  {
    id: 'gaprCoursDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprCoursDescriptionHeader" />,
  },
  {
    id: 'gaprItemCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprItemCodeHeader" />,
  },
  {
    id: 'gaprCityStockFi',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprCityStockFiHeader" />,
  },
  {
    id: 'gaprCityStockDr',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprCityStockDrHeader" />,
  },
  {
    id: 'gaprCityStockDi',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprCityStockDiHeader" />,
  },
  {
    id: 'gaprNationalStock',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprNationalStockHeader" />,
  },
  {
    id: 'gaprStudentQuantity',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprStudentQuantityHeader" />,
  },
  {
    id: 'gaprDemand',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprDemandHeader" />,
  },
  {
    id: 'gaprGap',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprGapHeader" />,
  },
  {
    id: 'gaprItemActive',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprItemActiveHeader" />,
  },
  {
    id: 'gaprTitle',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprTitleHeader" />,
  },
  {
    id: 'gaprAuthor',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprAuthorHeader" />,
  },
  {
    id: 'gaprPublisher',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprPublisherHeader" />,
  },
  {
    id: 'gaprVolumer',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprVolumerHeader" />,
  },
  {
    id: 'gaprObservation',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gaprGap.appModule.gaprObservationHeader" />,
  },
];

function GapDetailViewTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
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

GapDetailViewTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(GapDetailViewTableHead);
