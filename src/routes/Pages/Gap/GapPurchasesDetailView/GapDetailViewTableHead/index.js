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
    id: 'gappdProcId',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdProcIdHeader" />,
  },
  {
    id: 'gappdStockType',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdStockTypeHeader" />,
  },
  {
    id: 'gappdYear',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdYearHeader" />,
  },
  {
    id: 'gappdCityCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdCityCodeHeader" />,
  },
  {
    id: 'gappdOrgCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdOrgCodeHeader" />,
  },
  {
    id: 'gappdSchoCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdSchoCodeHeader" />,
  },
  {
    id: 'gappdSchoDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdSchoDescriptionHeader" />,
  },
  {
    id: 'gappdCoursCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdCoursCodeHeader" />,
  },
  {
    id: 'gappdCourseDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdCourseDescriptionHeader" />,
  },
  {
    id: 'gappdItemCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdItemCodeHeader" />,
  },
  {
    id: 'gappdItemDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdItemDescriptionHeader" />,
  },
  {
    id: 'gappdCampCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdCampCodeHeader" />,
  },
  {
    id: 'gappdCampDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdCampDescriptionHeader" />,
  },
  {
    id: 'gappdInitialGap',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdInitialGapHeader" />,
  },
  {
    id: 'gappdUnitValue',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdUnitValueHeader" />,
  },
  {
    id: 'gappdListNumber',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdListNumberHeader" />,
  },
  {
    id: 'gappdRequestNumber',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdRequestNumberHeader" />,
  },
  {
    id: 'gappdCaccCode',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdCaccCodeHeader" />,
  },
  /*   {
    id: 'gappdSupplierId',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdSupplierIdHeader" />,
  }, */
  {
    id: 'gappdObservation',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdObservationHeader" />,
  },
  {
    id: 'gappdDescription',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdDescriptionHeader" />,
  },
  {
    id: 'gappdTotalRequired',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdTotalRequiredHeader" />,
  },
  {
    id: 'gappdVolumes',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdVolumesHeader" />,
  },
  {
    id: 'gappdItemStatus',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdItemStatusHeader" />,
  },
  {
    id: 'gappdOptimizedGap',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdOptimizedGapHeader" />,
  },
  /*   {
    id: 'gappdStockDifference',
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="gapPurchases.appModule.gappdStockDifferenceHeader" />,
  }, */
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
