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

const DemandListRow = ({ row, isSelected, onRowClick, onProcessEdit, onProcessDelete, onProcessView }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const onProcessMenuClick = menu => {
    if (menu.action === 'view') {
      onProcessView(row);
    } else if (menu.action === 'delete') {
      onProcessDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.gapdId}`;
  const isItemSelected = isSelected(row.gapdId);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.gapdId)}
      businessunits="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.gapdId}
      selected={isItemSelected}>
      {/*   <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell> */}
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}></Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.gapdId}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.gapdStdcAcademicYear}</TableCell>
      <TableCell>{row.gapdStdcAcademicPeriod}</TableCell>
      <TableCell>{row.gapdOrgDescription}</TableCell>
      <TableCell>{row.gapdStdcCampCode}</TableCell>
      <TableCell>{row.gapdCampDescription}</TableCell>
      <TableCell>{row.gapdStdcSchoCode}</TableCell>
      <TableCell>{row.gapdschoDescription}</TableCell>
      <TableCell>{row.gapdStdcCoursCode}</TableCell>
      <TableCell>{row.gapdCoursDescription}</TableCell>
      <TableCell>{row.gapdStdcWktCode}</TableCell>
      <TableCell>{row.gapdStdcActCode}</TableCell>
      <TableCell>{row.gapdStdcStudentsQty}</TableCell>
      <TableCell>{row.gapdStdcCity}</TableCell>
    </TableRow>
  );
};

export default React.memo(DemandListRow);
