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

const getChargeAccountActions = user => {
  const actions = [
    {
      action: 'view',
      label: <IntlMessages id="chargeAccounts.appModule.viewChargeAccount" />,
      icon: <Visibility />,
    },
    {
      action: 'edit',
      label: <IntlMessages id="chargeAccounts.appModule.editChargeAccount" />,
      icon: <Edit />,
    },
  ];

  actions.push({
    action: 'delete',
    label: <IntlMessages id="chargeAccounts.appModule.deleteChargeAccount" />,
    icon: <Delete />,
  });
  return actions;
};

const ChargeAccountListRow = ({
  row,
  isSelected,
  onRowClick,
  onChargeAccountEdit,
  onChargeAccountDelete,
  onChargeAccountView,
}) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const onChargeAccountMenuClick = menu => {
    if (menu.action === 'view') {
      onChargeAccountView(row);
    } else if (menu.action === 'edit') {
      onChargeAccountEdit(row);
    } else if (menu.action === 'delete') {
      onChargeAccountDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.caccCode}`;
  const isItemSelected = isSelected(row.caccCode);
  const chargeAccountsActions = getChargeAccountActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.caccCode)}
      businessunits="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.caccCode}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.profile_pic} alt={row.caccDescription} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {'[' + row.caccCode + '] ' + row.caccDescription}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.caccOrgCode}</TableCell>
      <TableCell>
        {/* {row.status === 'suspended' ? `Suspended by ${row.suspendedBy} (${timeFromNow(row.suspendedAt)})` : row.status} */}
        {row.caccStatus === 'S' ? `Activo` : 'Inactivo'}
      </TableCell>
      {/* <TableCell>{timeFromNow(row.lastLoginAt)}</TableCell> */}
      {/* <TableCell align="right">{row.emailUsage} GB</TableCell> */}
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu
          items={chargeAccountsActions}
          onItemClick={onChargeAccountMenuClick}
          TriggerComponent={<MoreHoriz />}
        />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(ChargeAccountListRow);
