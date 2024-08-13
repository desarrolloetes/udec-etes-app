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

  const labelId = `enhanced-table-checkbox-${row.gappdProcId}`;
  const isItemSelected = isSelected(row.gappdProcId);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.gappdProcId)}
      businessunits="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.gappdProcId}
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
      <TableCell>{row.gappdStockType}</TableCell>
      <TableCell>{row.gappdYear}</TableCell>
      <TableCell>{row.gappdCityCode}</TableCell>
      <TableCell>{row.gappdOrgCode}</TableCell>
      <TableCell>{row.gappdSchoCode}</TableCell>
      <TableCell>{row.gappdSchoDescription}</TableCell>
      <TableCell>{row.gappdCoursCode}</TableCell>
      <TableCell>{row.gappdCourseDescription}</TableCell>
      <TableCell>{row.gappdItemCode}</TableCell>
      <TableCell>{row.gappdItemDescription}</TableCell>
      <TableCell>{row.gappdCampCode}</TableCell>
      <TableCell>{row.gappdCampDescription}</TableCell>
      <TableCell>{row.gappdInitialGap}</TableCell>
      <TableCell>{row.gappdUnitValue}</TableCell>
      <TableCell>{row.gappdListNumber}</TableCell>
      <TableCell>{row.gappdRequestNumber}</TableCell>
      <TableCell>{row.gappdCaccCode}</TableCell>
      <TableCell>{row.gappdObservation}</TableCell>
      <TableCell>{row.gappdDescription}</TableCell>
      <TableCell>{row.gappdTotalRequired}</TableCell>
      <TableCell>{row.gappdVolumes}</TableCell>
      <TableCell>{row.gappdItemStatus}</TableCell>
      <TableCell>{row.gappdOptimizedGap}</TableCell>
    </TableRow>
  );
};

export default React.memo(GapDetailViewListRow);
