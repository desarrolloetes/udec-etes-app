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

const getItemActions = item => {
  const actions = [
    // {
    //   action: 'view',
    //   label: <IntlMessages id="items.appModule.viewItem" />,
    //   icon: <Visibility />,
    // },
    {
      action: 'edit',
      label: <IntlMessages id="items.appModule.editItem" />,
      icon: <Edit />,
    },
  ];

  actions.push({
    action: 'delete',
    label: <IntlMessages id="items.appModule.deleteItem" />,
    icon: <Delete />,
  });
  return actions;
};

const ItemListRow = ({ row, isSelected, onRowClick, onItemEdit, onItemDelete, onItemView }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const onItemMenuClick = menu => {
    //if (menu.action === 'view') {
    //  onItemView(row);
    //} else
    if (menu.action === 'edit') {
      onItemEdit(row);
    } else if (menu.action === 'delete') {
      onItemDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.itemCode}`;
  const isItemSelected = isSelected(row.itemCode);
  const itemsActions = getItemActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.itemCode)}
      businessunits="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.itemCode}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.profile_pic} alt={row.itemDescription} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {'[' + row.itemCode + '] ' + row.itemName}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{'[' + row.itemPurcCode + '] ' + row.itemPurcName}</TableCell>
      <TableCell>{'[' + row.itemItmcFamCode + '] ' + row.itemItmcFamName}</TableCell>
      <TableCell>{'[' + row.itemItmcSubFamCode + '] ' + row.itemItmcSubFamName}</TableCell>
      <TableCell>{row.itemDescription}</TableCell>
      <TableCell>{new Date(row.itemCreationDate).toLocaleDateString()}</TableCell>
      <TableCell>{row.itemStatus === 'S' ? `Activo` : 'Inactivo'}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={itemsActions} onItemClick={onItemMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(ItemListRow);
