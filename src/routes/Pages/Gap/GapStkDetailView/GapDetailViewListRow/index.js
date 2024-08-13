import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import CmtDropdownMenu from '@coremat/CmtDropdownMenu';
import CmtAvatar from '@coremat/CmtAvatar';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const GapDetailViewListRow = ({ row, isSelected, onRowClick, onProcessEdit, onProcessDelete, onProcessView }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const onProcessMenuClick = menu => {
    if (menu.action === 'view') {
      onProcessView(row);
    } else if (menu.action === 'delete') {
      onProcessDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.gaprProcCode}`;
  const isItemSelected = isSelected(row.gaprProcCode);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.gaprProcCode)}
      businessunits="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.gaprProcCode}
      selected={isItemSelected}>
      {/*   <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell> */}
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}></Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.gaprProcCode}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.gaprAcademicYear}</TableCell>
      <TableCell>{row.gaprAcademicPeriod}</TableCell>
      <TableCell>{row.gaprCityCode}</TableCell>
      <TableCell>{row.gaprOrgCode}</TableCell>
      <TableCell>{row.gaprCampCode}</TableCell>
      <TableCell>{row.gaprCampDescription}</TableCell>
      <TableCell>{row.gaprSchoCode}</TableCell>
      <TableCell>{row.gaprSchoDescription}</TableCell>
      <TableCell>{row.gaprCoursCode}</TableCell>
      <TableCell>{row.gaprCoursDescription}</TableCell>
      <TableCell>{row.gaprItemCode}</TableCell>
      <TableCell>{row.gaprCityStockFi}</TableCell>
      <TableCell>{row.gaprCityStockDr}</TableCell>
      <TableCell>{row.gaprCityStockDi}</TableCell>
      <TableCell>{row.gaprNationalStock}</TableCell>
      <TableCell>{row.gaprStudentQuantity}</TableCell>
      <TableCell>{row.gaprDemand}</TableCell>
      <TableCell>{row.gaprGap}</TableCell>
      <TableCell>{row.gaprItemActive}</TableCell>
      <TableCell>{row.gaprTitle}</TableCell>
      <TableCell>{row.gaprAuthor}</TableCell>
      <TableCell>{row.gaprPublisher}</TableCell>
      <TableCell>{row.gaprVolume}</TableCell>
      <TableCell>{row.gaprObservation}</TableCell>
    </TableRow>
  );
};

export default React.memo(GapDetailViewListRow);
