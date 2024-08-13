import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { Delete, Edit, MoreHoriz /*, Visibility */ } from '@material-ui/icons';
import DisableIcon from '@material-ui/icons/Block';
import EnableIcon from '@material-ui/icons/CheckCircleOutline';
import CmtDropdownMenu from '@coremat/CmtDropdownMenu';
import { makeStyles } from '@material-ui/core/styles';

import IntlMessages from '@jumbo/utils/IntlMessages';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getStandardActions = standard => {
  const actions = [
    // {
    //   action: 'view',
    //   label: <IntlMessages id="standards.appModule.viewStandard" />,
    //   icon: <Visibility />,
    // },
    {
      action: 'edit',
      label: <IntlMessages id="standards.appModule.editStandard" />,
      icon: <Edit />,
    },
  ];
  if (standard.stdStatus === 'S') {
    actions.push({
      action: 'disable',
      label: <IntlMessages id="standards.appModule.disableStandard" />,
      icon: <DisableIcon />,
    });
  } else {
    actions.push({
      action: 'enable',
      label: <IntlMessages id="standards.appModule.enableStandard" />,
      icon: <EnableIcon />,
    });
  }

  return actions;
};

const StandardListRow = ({ row, isSelected, onRowClick, onStandardEdit, onStandardDisable, onStandardView }) => {
  const classes = useStyles();

  const onUserMenuClick = menu => {
    if (menu.action === 'view') {
      onStandardView(row);
    } else if (menu.action === 'edit') {
      onStandardEdit(row);
    } else if (menu.action === 'disable') {
      onStandardDisable(row);
    } else if (menu.action === 'enable') {
      onStandardDisable(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const standardActions = getStandardActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.stdCode}
      </TableCell>
      <TableCell>
        <Typography className={classes.titleRoot}>{row.stdName}</Typography>
      </TableCell>
      <TableCell>{row.stdBuName}</TableCell>
      <TableCell>{row.stdOrgDescription}</TableCell>
      <TableCell>{'[' + row.stdPurcCode + '] ' + row.stdPurcDescription}</TableCell>
      <TableCell align="right">{row.stdYear}</TableCell>
      <TableCell align="right">{row.stdVersion}</TableCell>
      <TableCell>
        {row.stdStatus === 'S' ? (
          <IntlMessages id="standards.appModule.filterActive" />
        ) : (
          <IntlMessages id="standards.appModule.filterInactive" />
        )}
      </TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={standardActions} onItemClick={onUserMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(StandardListRow);
