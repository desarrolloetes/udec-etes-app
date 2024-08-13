import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import StockListRow from './StockListRow';
import StockTableHead from './StockTableHead';
import StockTableToolbar from './StockTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '@jumbo/utils/commonHelper';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import IntlMessages from '@jumbo/utils/IntlMessages';
import Dialog from '@material-ui/core/Dialog';
import { Box, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import GridContainer from '@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchError } from 'redux/actions';
import { getAllGapSourceStock } from 'redux/actions/GapSourceStock';
import { getAllVolumeTypes } from 'redux/actions/VolumeTypes';
import { getAllFormatTypes } from 'redux/actions/FormatTypes';
import { getAllCities } from 'redux/actions/Cities';
import { getAllOrganizations } from 'redux/actions/Organizations';
import { getAllCampus } from 'redux/actions/Campus';
import { getAllItems } from 'redux/actions/Items';
import ExportButtonGapsSourceStockReport from 'components/ExportButtonGapsSourceStockReport';

const GapSourceStockDetailViewModule = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { gapsSourceStock } = useSelector(({ gapSourceStockReducer }) => gapSourceStockReducer);
  const { volumeTypes } = useSelector(({ volumeTypesReducer }) => volumeTypesReducer);
  const { formatTypes } = useSelector(({ formatTypesReducer }) => formatTypesReducer);
  const { currentProcess } = useSelector(({ procesessReducer }) => procesessReducer);
  const { organizations } = useSelector(({ organizationsReducer }) => organizationsReducer);
  const { campus } = useSelector(({ campusReducer }) => campusReducer);
  const { items } = useSelector(({ itemsReducer }) => itemsReducer);
  const { cities } = useSelector(({ citiesReducer }) => citiesReducer);
  const { purchaseArea } = useSelector(({ auth }) => auth);
  const [gapstOrgCode, setGapstOrgCode] = React.useState(null);
  const [gapstCampCode, setGapstCampCode] = React.useState(null);
  const [gapstCityCode, setGapstCityCode] = React.useState(null);
  const [gapstItemId, setGapstItemId] = React.useState(null);
  const [gapstLibraryId, setGapstLibraryId] = React.useState(null);
  const [gapstVolume, setGapstVolume] = React.useState(null);
  const [gapstFormatType, setGapstFormatType] = React.useState(null);
  const [gapstItemCode, setGapstItemCode] = React.useState(null);

  const [volumeTypeText, setVolumeTypeText] = React.useState('');
  const [selectedVolumeType, setSelectedVolumeType] = React.useState('');
  const [volumeTypeError, setVolumeTypeError] = React.useState('');

  const [formatTypeText, setFormatTypeText] = React.useState('');
  const [selectedFormatType, setSelectedFormatType] = React.useState('');
  const [formatTypeError, setFormatTypeError] = React.useState('');

  const [cityText, setCityText] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [cityError, setCityError] = React.useState('');

  const [organizationText, setOrganizationText] = React.useState('');
  const [selectedOrganization, setSelectedOrganization] = React.useState('');
  const [organizationError, setOrganizationError] = React.useState('');

  const [campusText, setCampusText] = React.useState('');
  const [selectedCampus, setSelectedCampus] = React.useState('');
  const [campusError, setCampusError] = React.useState('');

  const [itemText, setItemText] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState('');
  const [itemError, setItemError] = React.useState('');

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [gapsSourceStockFetched, setGapsSourceStockFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllVolumeTypes([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsSourceStockFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllCampus(filterOptions, debouncedSearchTerm, gapstOrgCode, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsSourceStockFetched(true);
      }),
    );
  }, [gapstOrgCode]);

  useEffect(() => {
    dispatch(
      getAllOrganizations([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsSourceStockFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllCities([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsSourceStockFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllFormatTypes([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsSourceStockFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllItems([], '', gapstOrgCode, purchaseArea, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsSourceStockFetched(true);
      }),
    );
  }, [gapstOrgCode]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = gapsSourceStock.map(n => n.procId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnSubmitClick = event => {
    let checkInputData = true;
    if (currentProcess.procId === null || currentProcess.procCode === null || purchaseArea === null) {
      dispatch(fetchError(<IntlMessages id="gapsSourceStock.gapsSourceStockDetailview.appModule.dataRequired" />));
      checkInputData = false;
    }
    if (checkInputData === true) {
      dispatch(
        getAllGapSourceStock(
          filterOptions,
          debouncedSearchTerm,
          purchaseArea,
          currentProcess.procId,
          currentProcess.procCode,
          gapstOrgCode,
          gapstCampCode,
          gapstCityCode,
          gapstItemId,
          gapstLibraryId,
          gapstVolume,
          gapstFormatType,
          gapstItemCode,
          () => {
            setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
            setGapsSourceStockFetched(true);
          },
        ),
      );
    }
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <Dialog maxWidth="xl" open={open} onClose={onCloseDialog} className={classes.dialogRoot} scroll="body">
      <DialogTitle className={classes.dialogTitleRoot}>
        <IntlMessages id="gapsSourceStock.edit.form.editTitle" />
      </DialogTitle>
      <DialogContent dividers>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Card className={classes.root}>
              <CardHeader
                className={classes.dialogTitleRoot}
                title={
                  <IntlMessages
                    id="gapsSourceStock.gapsSourceStockDetailview.labelProcCode.title"
                    values={{ code: currentProcess.procMsg }}
                  />
                }
              />
              <CardContent>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                  <GridContainer spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={<IntlMessages id="gapsSourceStock.gapsSourceStockDetailview.label.labelProcCode" />}
                        value={currentProcess.procCode}
                        editable="false"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={<IntlMessages id="gapsSourceStock.gapsSourceStockDetailview.label.labelGapstItemIdId" />}
                        value={gapstItemId}
                        onChange={event => {
                          setGapstItemId(event.target.value !== '' ? event.target.value : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={<IntlMessages id="gapsSourceStock.gapsSourceStockDetailview.label.labelGapstLibraryId" />}
                        value={gapstLibraryId}
                        onChange={event => {
                          setGapstLibraryId(event.target.value !== '' ? event.target.value : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="formats"
                        options={formatTypes}
                        value={formatTypeText}
                        getOptionLabel={option => option.fmtDescription}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gapsSourceStock.filters.label.labelGapstFormat" />}
                            variant="outlined"
                            helperText={formatTypeError}
                          />
                        )}
                        onChange={(event, value) => {
                          setFormatTypeText(value);
                          setFormatTypeError('');
                          setGapstFormatType(value ? value.fmtFormatType : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="volume"
                        options={volumeTypes}
                        value={volumeTypeText}
                        getOptionLabel={option => option.vlmDescription}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gapsSourceStock.filters.label.labelGapstVolume" />}
                            variant="outlined"
                            helperText={volumeTypeError}
                          />
                        )}
                        onChange={(event, value) => {
                          setVolumeTypeText(value);
                          setVolumeTypeError('');
                          setGapstVolume(value ? value.vlmCode : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="cities"
                        options={cities}
                        value={cityText}
                        getOptionLabel={option => option.cityCode}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gapsSourceStock.filters.label.labelGapstCities" />}
                            variant="outlined"
                            helperText={cityError}
                          />
                        )}
                        onChange={(event, value) => {
                          setCityText(value);
                          setCityError('');
                          setGapstCityCode(value ? value.cityCode : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="organizations"
                        options={organizations}
                        value={organizationText}
                        getOptionLabel={option => option.orgCode}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gapsSourceStock.filters.label.labelGapstOrganizations" />}
                            variant="outlined"
                            helperText={organizationError}
                          />
                        )}
                        onChange={(event, value) => {
                          setOrganizationText(value);
                          setOrganizationError('');
                          setGapstOrgCode(value ? value.orgCode : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="campus"
                        options={campus}
                        value={campusText}
                        getOptionLabel={option => option.campDescription}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gapsSourceStock.filters.label.labelGapstCampus" />}
                            variant="outlined"
                            helperText={campusError}
                          />
                        )}
                        onChange={(event, value) => {
                          setCampusText(value);
                          setCampusError('');
                          setGapstCampCode(value ? value.campCode : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="items"
                        options={items}
                        value={itemText}
                        getOptionLabel={option => option.itemOptionLabel}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gapsSourceStock.filters.label.labelGapstItems" />}
                            variant="outlined"
                            helperText={itemError}
                          />
                        )}
                        onChange={(event, value) => {
                          setItemText(value);
                          setItemError('');
                          setGapstItemCode(value ? value.itemCode : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" justifyContent="flex-end" mb={4}>
                        <Box ml={2}>
                          <Button variant="contained" color="primary" onClick={handleOnSubmitClick}>
                            Aplicar Filtros
                          </Button>
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent="flex-end" mb={4}>
                        <Box ml={2}>
                          {gapsSourceStock && gapsSourceStock.length > 0 && (
                            <ExportButtonGapsSourceStockReport data={gapsSourceStock} />
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  </GridContainer>
                </Box>
              </CardContent>
            </Card>
          </Paper>
          <Paper className={classes.paper}>
            {/*         <StockTableToolbar
          selected={selected}
          setSelected={setSelected}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        /> */}
            <TableContainer className={classes.container}>
              <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
                <StockTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={gapsSourceStock.length}
                />
                <TableBody>
                  {!!gapsSourceStock.length ? (
                    stableSort(gapsSourceStock, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <StockListRow key={index} row={row} onRowClick={handleRowClick} isSelected={isSelected} />
                      ))
                  ) : (
                    <TableRow style={{ height: 53 * 6 }}>
                      <TableCell colSpan={7} rowSpan={10}>
                        {isFilterApplied ? (
                          <NoRecordFound>
                            {<IntlMessages id="gapsSourceStock.appModule.filterNoRecordsFound" />}
                          </NoRecordFound>
                        ) : (
                          <NoRecordFound>
                            {gapsSourceStockFetched ? (
                              <IntlMessages id="gapsSourceStock.appModule.noRecordsFound" />
                            ) : (
                              <IntlMessages id="gapsSourceStock.appModule.loadingGapSourceStocks" />
                            )}
                          </NoRecordFound>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={gapsSourceStock.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Paper>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button onClick={onCloseDialog}>Cancel</Button>
          </Box>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GapSourceStockDetailViewModule;

GapSourceStockDetailViewModule.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
