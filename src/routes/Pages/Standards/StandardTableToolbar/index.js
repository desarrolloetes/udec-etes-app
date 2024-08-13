import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DisableIcon from '@material-ui/icons/Block';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import { Button, Chip, Menu, MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import CmtSearch from '@coremat/CmtSearch';
import useStyles from './index.style';
import Checkbox from '@material-ui/core/Checkbox';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { deleteBulkStandards, disableBulkStandards } from 'redux/actions/Standards';

const filterOptionsList = [
  { label: <IntlMessages id="users.appModule.filterActive" />, value: 'S' },
  { label: <IntlMessages id="users.appModule.filterInactive" />, value: 'N' },
];

const StandardTableToolbar = ({
  selected,
  setSelected,
  onStandardAdd,
  filterOptions,
  setFilterOptions,
  searchTerm,
  setSearchTerm,
}) => {
  const classes = useStyles();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //const onDeleteCLick = () => {
  //  setOpenConfirmDialog(true);
  //};

  const onDisableCLick = () => {
    setOpenConfirmDialog(true);
  };

  //const handleConfirmDelete = () => {
  //  setOpenConfirmDialog(false);
  //  dispatch(deleteBulkStandards(selected, () => setSelected([])));
  //};

  const handleConfirmDisable = () => {
    setOpenConfirmDialog(false);
    dispatch(disableBulkStandards(selected, () => setSelected([])));
  };

  //const handleCancelDelete = () => {
  //  setOpenConfirmDialog(false);
  //};

  const handleCancelDisable = () => {
    setOpenConfirmDialog(false);
  };

  const onFilterOptionClick = option => {
    setFilterOptions(prevState => {
      if (prevState.includes(option.value)) {
        return prevState.filter(item => item !== option.value);
      } else {
        return [...prevState, option.value];
      }
    });
  };

  const onChipDelete = option => {
    setFilterOptions(filterOptions.filter(item => item !== option.value));
  };

  const onSearchChipDelete = () => setSearchTerm('');

  const numSelected = selected.length;

  return (
    <React.Fragment>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}>
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected}{' '}
            {numSelected > 1 ? (
              <IntlMessages id="standards.appModule.selectedStandards" />
            ) : (
              <IntlMessages id="standards.appModule.selectedStandard" />
            )}
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
            {<IntlMessages id="standards.appModule.standards" />}{' '}
            <Button color="primary" onClick={() => onStandardAdd(true)}>
              {<IntlMessages id="standards.appModule.addNewStandard" />}
            </Button>
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title={<IntlMessages id="standards.appModule.disableStandard" />}>
            <IconButton aria-label="disable" onClick={onDisableCLick}>
              <DisableIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <React.Fragment>
            <CmtSearch onChange={e => setSearchTerm(e.target.value)} value={searchTerm} border={false} onlyIcon />
            <div className={classes.chipsRoot}>
              {searchTerm && <Chip label={searchTerm} onDelete={onSearchChipDelete} />}
              {filterOptionsList.map(
                (option, index) =>
                  filterOptions.includes(option.value) && (
                    <Chip key={index} label={option.label} onDelete={() => onChipDelete(option)} />
                  ),
              )}
            </div>
            <Tooltip title={<IntlMessages id="standards.appModule.filterList" />}>
              <IconButton aria-label="filter list" onClick={handleClick}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Menu
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              {filterOptionsList.map((option, index) => (
                <MenuItem key={index} onClick={() => onFilterOptionClick(option)}>
                  <Checkbox
                    checked={filterOptions.includes(option.value)}
                    inputProps={{ 'aria-labelledby': option.label }}
                  />
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        )}
      </Toolbar>

      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="standards.appModule.confirmDisable" />}
        content={<IntlMessages id="standards.appModule.confirmDisableContent" />}
        onClose={handleCancelDisable}
        onConfirm={handleConfirmDisable}
      />
    </React.Fragment>
  );
};

StandardTableToolbar.propTypes = {
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  filterOptions: PropTypes.array,
  setFilterOptions: PropTypes.func,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  onStandardAdd: PropTypes.func,
};

export default React.memo(StandardTableToolbar);