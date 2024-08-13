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
    id: 'orgCode',
    numeric: false,
    disablePadding: true,
    label: <IntlMessages id="coverageReport.appModule.orgCodeHeader" />,
  },
  {
    id: 'majorCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.majorCodeHeader" />,
  },
  {
    id: '.progCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.progCodeHeader" />,
  },
  {
    id: 'levelCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.levelCodeHeader" />,
  },
  {
    id: 'coursCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.coursCodeHeader" />,
  },
  {
    id: 'coursDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.coursDescriptionHeader" />,
  },
  {
    id: 'itemCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.itemCodeHeader" />,
  },
  {
    id: 'itemDescripcion',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.itemDescripcionHeader" />,
  },
  {
    id: 'stdPerformance',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.stdPerformanceHeader" />,
  },
  {
    id: 'studentQty',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.studentQtyHeader" />,
  },
  {
    id: 'stock',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.stockHeader" />,
  },
  {
    id: 'stockUnlimited',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.stockUnlimitedHeader" />,
  },
  {
    id: 'demand',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.demandHeader" />,
  },
  {
    id: 'coverageTit',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.coverageTitHeader" />,
  },
  {
    id: 'haveStockUnlimited',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.haveStockUnlimitedHeader" />,
  },
  {
    id: 'coveragePerformance',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.coverageTitHeader" />,
  },
  {
    id: 'coveragePerformanceAdjusted',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.coveragePerformanceAdjustedHeader" />,
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.cityHeader" />,
  },
  {
    id: 'obs',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="coverageReport.appModule.obsHeader" />,
  },
];

function BookCoverageReportTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
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
                    <IntlMessages id="coverageReport.appModule.orderDesc" />
                  ) : (
                    <IntlMessages id="coverageReport.appModule.orderAsc" />
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

BookCoverageReportTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(BookCoverageReportTableHead);
