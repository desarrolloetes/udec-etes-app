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

const StockListRow = ({ row, isSelected, onRowClick, onProcessEdit, onProcessDelete, onProcessView }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const onProcessMenuClick = menu => {
    if (menu.action === 'view') {
      onProcessView(row);
    } else if (menu.action === 'delete') {
      onProcessDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.gapstId}`;
  const isItemSelected = isSelected(row.gapstId);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.gapstId)}
      businessunits="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.gapstId}
      selected={isItemSelected}>
      {/*   <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell> */}
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}></Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.gapstId}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.gapstOrgDescription}</TableCell>
      <TableCell>{row.gapstCampDescription}</TableCell>
      <TableCell>{row.gapstCampLibrary}</TableCell>
      <TableCell>{row.gapstCampSubLibrary}</TableCell>
      <TableCell>{row.gapstCity}</TableCell>
      <TableCell>{row.gapstItemCode}</TableCell>
      <TableCell>{row.gapstItemDescription}</TableCell>
      <TableCell>{row.gapstItemTitulo}</TableCell>
      <TableCell>{row.gapstItemAutor}</TableCell>
      <TableCell>{row.gapstItemEditorial}</TableCell>
      <TableCell>{row.gapstLibraryId}</TableCell>
      <TableCell>{row.gapstItemId}</TableCell>
      <TableCell>{row.gapstFormat}</TableCell>
      <TableCell>{row.gapstFormatType}</TableCell>
      <TableCell>{row.gapstVolumen}</TableCell>
    </TableRow>
  );
};

export default React.memo(StockListRow);
