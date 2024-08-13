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
// import { timeFromNow } from '@jumbo/utils/dateHelper';
// import { Block, CheckCircleOutline, Delete, Edit, Mail, MoreHoriz, Visibility } from '@material-ui/icons';
// import { useDispatch } from 'react-redux';
// import { sentMailToUser, updateUserStatus } from 'redux/actions/Users';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getRoleActions = user => {
  const actions = [
    {
      action: 'view',
      label: <IntlMessages id="roles.appModule.viewRole" />,
      icon: <Visibility />,
    },
    {
      action: 'edit',
      label: <IntlMessages id="roles.appModule.editRole" />,
      icon: <Edit />,
    },
  ];

  actions.push({
    action: 'delete',
    label: <IntlMessages id="roles.appModule.deleteRole" />,
    icon: <Delete />,
  });
  return actions;
};

const RoleListRow = ({ row, isSelected, onRowClick, onRoleEdit, onRoleDelete, onRoleView }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const onRoleMenuClick = menu => {
    if (menu.action === 'view') {
      onRoleView(row);
    } else if (menu.action === 'edit') {
      onRoleEdit(row);
    } else if (menu.action === 'delete') {
      onRoleDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.roleId}`;
  const isItemSelected = isSelected(row.roleId);
  const roleActions = getRoleActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.roleId)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.roleId}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.profile_pic} alt={row.roleName} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.roleDescription}
            </Typography>
          </div>
        </Box>
      </TableCell>
      {/* <TableCell>{row.roleName}</TableCell> */}
      <TableCell>{row.roleDescription}</TableCell>
      {/* <TableCell>{row.roleStatus}</TableCell> */}
      <TableCell>
        {/* {row.status === 'suspended' ? `Suspended by ${row.suspendedBy} (${timeFromNow(row.suspendedAt)})` : row.status} */}
        {row.roleStatus === 'S' ? `Activo` : 'Inactivo'}
      </TableCell>
      {/* <TableCell>{timeFromNow(row.lastLoginAt)}</TableCell> */}
      {/* <TableCell align="right">{row.emailUsage} GB</TableCell> */}
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={roleActions} onItemClick={onRoleMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(RoleListRow);
