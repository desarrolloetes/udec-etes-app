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

const getBusinessUnitActions = user => {
  const actions = [
    {
      action: 'view',
      label: <IntlMessages id="businessUnits.appModule.viewBusinessUnit" />,
      icon: <Visibility />,
    },
    {
      action: 'edit',
      label: <IntlMessages id="businessUnits.appModule.editBusinessUnit" />,
      icon: <Edit />,
    },
  ];

  actions.push({
    action: 'delete',
    label: <IntlMessages id="businessUnits.appModule.deleteBusinessUnit" />,
    icon: <Delete />,
  });
  return actions;
};

const BusinessUnitListRow = ({
  row,
  isSelected,
  onRowClick,
  onBusinessUnitEdit,
  onBusinessUnitDelete,
  onBusinessUnitView,
}) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const onBusinessUnitMenuClick = menu => {
    if (menu.action === 'view') {
      onBusinessUnitView(row);
    } else if (menu.action === 'edit') {
      onBusinessUnitEdit(row);
    } else if (menu.action === 'delete') {
      onBusinessUnitDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.buCode}`;
  const isItemSelected = isSelected(row.buCode);
  const businessUnitsActions = getBusinessUnitActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.buCode)}
      businessunits="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.buCode}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.profile_pic} alt={row.buName} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.buName}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.buCode}</TableCell>
      <TableCell>
        {/* {row.status === 'suspended' ? `Suspended by ${row.suspendedBy} (${timeFromNow(row.suspendedAt)})` : row.status} */}
        {row.buStatus === 'S' ? `Activo` : 'Inactivo'}
      </TableCell>
      {/* <TableCell>{timeFromNow(row.lastLoginAt)}</TableCell> */}
      {/* <TableCell align="right">{row.emailUsage} GB</TableCell> */}
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu
          items={businessUnitsActions}
          onItemClick={onBusinessUnitMenuClick}
          TriggerComponent={<MoreHoriz />}
        />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(BusinessUnitListRow);
