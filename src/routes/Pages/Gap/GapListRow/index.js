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

const getGapActions = row => {
  const actions = [
    {
      action: 'stock_vs_demand',
      label: <IntlMessages id="procesess.appModule.viewGapStockVsDemand" />,
      icon: <Visibility />,
    },
    {
      action: 'demand_vs_stock',
      label: <IntlMessages id="procesess.appModule.viewGapDemandVsStock" />,
      icon: <Visibility />,
    },
    {
      action: 'stock',
      label: <IntlMessages id="procesess.appModule.viewStock" values={{ code: row.procStock }} />,
      icon: <Visibility />,
    },
    {
      action: 'demand',
      label: <IntlMessages id="procesess.appModule.viewDemand" values={{ code: row.procDemand }} />,
      icon: <Visibility />,
    },
    {
      action: 'standard',
      label: <IntlMessages id="procesess.appModule.viewStandard" values={{ code: row.procStandard }} />,
      icon: <Visibility />,
    },
    {
      action: 'purchases',
      label: <IntlMessages id="procesess.appModule.viewPurchases" values={{ code: row.procId }} />,
      icon: <Visibility />,
    },
  ];
  return actions;
};

const GapListRow = ({
  row,
  isSelected,
  onRowClick,
  onProcessStockVsDemand,
  onProcessDemandVsStock,
  onProcessStock,
  onProcessDemand,
  onProcessStandard,
  onProcessGapPurchases,
  onProcessLog,
}) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const onProcessMenuClick = menu => {
    if (menu.action === 'stock_vs_demand') {
      onProcessStockVsDemand(row);
    }
    if (menu.action === 'demand_vs_stock') {
      onProcessDemandVsStock(row);
    }
    if (menu.action === 'stock') {
      onProcessStock(row);
    }
    if (menu.action === 'demand') {
      onProcessDemand(row);
    }
    if (menu.action === 'standard') {
      onProcessStandard(row);
    }

    if (menu.action === 'purchases') {
      onProcessGapPurchases(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.procId}`;
  const isItemSelected = isSelected(row.procId);
  const procesessActions = getGapActions(row);

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
      <TableCell>{row.procStock + ' ' + row.procStockMsg}</TableCell>
      <TableCell>{row.procDemand + ' ' + row.procDemandMsg}</TableCell>
      <TableCell>{row.procStandard + ' ' + row.procStandardMsg}</TableCell>
      <TableCell>{new Date(row.procCreationDate).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(row.procScheduledDate).toLocaleDateString()}</TableCell>
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

export default React.memo(GapListRow);
