import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import CmtDropdownMenu from '@coremat/CmtDropdownMenu';
import CmtAvatar from '@coremat/CmtAvatar';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import { TextField } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { alpha } from '@material-ui/core/styles';
import AppSelectBox from '@jumbo/components/Common/formElements/AppSelectBox';
//import { useSelector } from 'react-redux';

//******************Start Reducers******************/
//const { itemAttributes } = useSelector(({ itemAttributesReducer }) => itemAttributesReducer);
//const [itemAttributes, setItemAttributes] = React.useState([]);

//******************End Reducers********************/

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const AddEditItemAttributesListRow = ({
  row,
  itemAttributes,
  defaultItemAtributeCode,
  defaultItemAtributeValue,
  isSelected,
  onRowChange,
}) => {
  const classes = useStyles();

  const labelId = `enhanced-table-checkbox-${row.code}`;
  const isItemSelected = isSelected(row.code);

  if (defaultItemAtributeCode) {
    onRowChange(defaultItemAtributeCode, row.code, 'itemAtributeCode');
  }

  if (defaultItemAtributeValue) {
    onRowChange(defaultItemAtributeValue, row.code, 'itemAtributeValue');
  }

  return (
    <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.code} selected={isItemSelected}>
      <TableCell>
        <AppSelectBox
          fullWidth
          data={itemAttributes}
          valueKey="itmaCode"
          variant="outlined"
          labelKey="itmaCode"
          defaultValue={defaultItemAtributeCode}
          //value={defaultItemAtributeCode}
          onChange={e => {
            onRowChange(e.target.value, row.code, 'itemAtributeCode');
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          defaultValue={defaultItemAtributeValue}
          editable="true"
          //inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
          //type="number"
          onChange={e => {
            onRowChange(e.target.value, row.code, 'itemAtributeValue');
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(AddEditItemAttributesListRow);
