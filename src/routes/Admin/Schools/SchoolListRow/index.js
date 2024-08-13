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

const getSchoolActions = user => {
  const actions = [
    {
      action: 'view',
      label: <IntlMessages id="schools.appModule.viewSchool" />,
      icon: <Visibility />,
    },
    {
      action: 'edit',
      label: <IntlMessages id="schools.appModule.editSchool" />,
      icon: <Edit />,
    },
  ];

  actions.push({
    action: 'delete',
    label: <IntlMessages id="schools.appModule.deleteSchool" />,
    icon: <Delete />,
  });
  return actions;
};

const SchoolListRow = ({ row, isSelected, onRowClick, onSchoolEdit, onSchoolDelete, onSchoolView }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const onSchoolMenuClick = menu => {
    if (menu.action === 'view') {
      onSchoolView(row);
    } else if (menu.action === 'edit') {
      onSchoolEdit(row);
    } else if (menu.action === 'delete') {
      onSchoolDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.schoCode}`;
  const isItemSelected = isSelected(row.schoCode);
  const schoolsActions = getSchoolActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.schoCode)}
      businessunits="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.schoCode}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.profile_pic} alt={row.schoDescription} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {'[' + row.schoCode + '] ' + row.schoDescription}
            </Typography>
          </div>
        </Box>
      </TableCell>
      {/*  <TableCell>{row.schoCode}</TableCell> */}
      <TableCell>{'[' + row.schoOrgCode + '] ' + row.schoOrgDescription}</TableCell>
      <TableCell>{'[' + row.schoCaccCode + '] ' + row.schoCaccDescription}</TableCell>
      <TableCell>{row.schoBuName}</TableCell>
      <TableCell>
        {/* {row.status === 'suspended' ? `Suspended by ${row.suspendedBy} (${timeFromNow(row.suspendedAt)})` : row.status} */}
        {row.buStatus === 'S' ? `Activo` : 'Inactivo'}
      </TableCell>
      {/* <TableCell>{timeFromNow(row.lastLoginAt)}</TableCell> */}
      {/* <TableCell align="right">{row.emailUsage} GB</TableCell> */}
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={schoolsActions} onItemClick={onSchoolMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(SchoolListRow);
