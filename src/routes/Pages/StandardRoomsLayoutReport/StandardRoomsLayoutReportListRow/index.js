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
// import { timeFromNow } from '../../../../@jumbo/utils/dateHelper';
// import { Block, CheckCircleOutline, Delete, Edit, Mail, MoreHoriz, Visibility } from '@material-ui/icons';
// import { useDispatch } from 'react-redux';
// import { sentMailToUser, updateUserStatus } from '../../../../redux/actions/Users';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const StandardRoomsLayoutReportListRow = ({
  row,
  //isSelected,
  onRowClick,
  onUserEdit,
  onUserDelete,
  onUserView,
  onUserRoles,
  onUserPurchaseAreas,
  onUserBusinessUnits,
}) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const labelId = `enhanced-table-checkbox-${row.userId}`;
  //const isItemSelected = isSelected(row.userId);
  //const userActions = getUserActions(row);

  return (
    <TableRow
      hover
      onClick={null}
      role="checkbox"
      //aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.userId}
      //selected={isItemSelected}
    >
      <TableCell />
      <TableCell>{row.rlayCode}</TableCell>
      <TableCell>{row.rlayDescription}</TableCell>
      <TableCell>{row.itemCode}</TableCell>
      <TableCell>{row.itemDescription}</TableCell>
      <TableCell>{row.coursCode}</TableCell>
      <TableCell>{row.coursDescription}</TableCell>
      <TableCell>{row.coursDuration}</TableCell>
      <TableCell>{row.stdcPerformance}</TableCell>
      <TableCell>{row.quantity}</TableCell>
      <TableCell>{row.stdcMaintenance}</TableCell>
      <TableCell>{row.stdcRenewalCicle}</TableCell>
    </TableRow>
  );
};

export default React.memo(StandardRoomsLayoutReportListRow);
