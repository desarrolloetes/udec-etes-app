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

const getGapSourceStandardActions = user => {
  const actions = [
    {
      action: 'view',
      label: <IntlMessages id="procesess.appModule.viewProcess" />,
      icon: <Visibility />,
    },
  ];

  /*   actions.push({
    action: 'delete',
    label: <IntlMessages id="procesess.appModule.deleteProcess" />,
    icon: <Delete />,
  }); */
  return actions;
};

const GapSourceStandardListRow = ({ row, isSelected, onRowClick, onProcessEdit, onProcessDelete, onProcessView }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const onProcessMenuClick = menu => {
    if (menu.action === 'view') {
      onProcessView(row);
    } else if (menu.action === 'delete') {
      onProcessDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.procId}`;
  const isItemSelected = isSelected(row.procId);
  const procesessActions = getGapSourceStandardActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.procId)}
      businessunits="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.procId}
      selected={isItemSelected}>
      {/*   <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell> */}
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          {/*           <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.profile_pic} alt={row.procCode} />
          </Box> */}
          <Box mr={{ xs: 4, md: 5 }}></Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.procId}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.procPurcName}</TableCell>
      <TableCell>{row.procCode}</TableCell>
      <TableCell>{new Date(row.procCreationDate).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(row.procScheduledDate).toLocaleDateString()}</TableCell>
      <TableCell>{row.procMsg}</TableCell>
      <TableCell>{row.procEmailNotification}</TableCell>
      <TableCell>
        {/* {row.status === 'suspended' ? `Suspended by ${row.suspendedBy} (${timeFromNow(row.suspendedAt)})` : row.status} */}
        {row.procStatus === 'P' ? `Procesado` : 'No Procesado'}
      </TableCell>
      {/* <TableCell>{timeFromNow(row.lastLoginAt)}</TableCell> */}
      {/* <TableCell align="right">{row.emailUsage} GB</TableCell> */}
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={procesessActions} onItemClick={onProcessMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(GapSourceStandardListRow);
