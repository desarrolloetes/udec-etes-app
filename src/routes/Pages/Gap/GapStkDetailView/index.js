import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import GapDetailViewListRow from './GapDetailViewListRow';
import GapDetailViewTableHead from './GapDetailViewTableHead';
import GapDetailViewTableToolbar from './GapDetailViewTableToolbar';
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
import { getAllGapPeriodsStk, getAllGapStockVsDemand } from 'redux/actions/Gap';
import { getAllVolumeTypes } from 'redux/actions/VolumeTypes';
import { getAllItems } from 'redux/actions/Items';
import { getAllCities } from 'redux/actions/Cities';
import { getAllOrganizations } from 'redux/actions/Organizations';
import { getAllCampus } from 'redux/actions/Campus';
import { getSchools } from 'redux/actions/Schools';
import { getAllCoursesByOrgCodeAndSchoCode } from 'redux/actions/Courses';
import ExportButtonGapsStockVsDemandReport from 'components/ExportButtonGapsStockVsDemandReport';

const GapDdaDetailViewModule = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { gapsStk, gapsPeriodsStk } = useSelector(({ gapsReducer }) => gapsReducer);
  const { volumeTypes } = useSelector(({ volumeTypesReducer }) => volumeTypesReducer);
  const { items } = useSelector(({ itemsReducer }) => itemsReducer);
  const { schools } = useSelector(({ schoolsReducer }) => schoolsReducer);
  const { currentProcess } = useSelector(({ procesessReducer }) => procesessReducer);
  const { organizations } = useSelector(({ organizationsReducer }) => organizationsReducer);
  const { campus } = useSelector(({ campusReducer }) => campusReducer);
  const { cities } = useSelector(({ citiesReducer }) => citiesReducer);
  const { courses } = useSelector(({ coursesReducer }) => coursesReducer);

  const { purchaseArea } = useSelector(({ auth }) => auth);
  const [gapdOrgCode, setGapdOrgCode] = React.useState(null);
  const [gapdCampCode, setGapdCampCode] = React.useState(null);
  const [gapdCityCode, setGapdCityCode] = React.useState(null);
  const [gapdStdcAcademicYear, setGapdStdcAcademicYear] = React.useState(null);
  const [gapdStdcAcademicPeriod, setGapdStdcAcademicPeriod] = React.useState(null);
  const [gapdSchoCode, setGapdSchoCode] = React.useState(null);
  const [gapdCoursCode, setGapdCoursCode] = React.useState(null);
  const [gapdWktCode, setGapdWktCode] = React.useState(null);
  const [gapdActCode, setGapdActCode] = React.useState(null);

  const [periodText, setPeriodText] = React.useState('');
  const [periodError, setPeriodError] = React.useState('');

  const [volumeTypeText, setVolumeTypeText] = React.useState('');
  const [volumeTypeError, setVolumeTypeError] = React.useState('');

  const [cityText, setCityText] = React.useState('');
  const [cityError, setCityError] = React.useState('');

  const [organizationText, setOrganizationText] = React.useState('');
  const [organizationError, setOrganizationError] = React.useState('');

  const [campusText, setCampusText] = React.useState('');
  const [campusError, setCampusError] = React.useState('');

  const [itemText, setItemText] = React.useState('');
  const [itemError, setItemError] = React.useState('');

  const [schoolText, setSchoolText] = React.useState('');
  const [schoolError, setSchoolError] = React.useState('');

  const [courseText, setCourseText] = React.useState('');
  const [courseError, setCourseError] = React.useState('');

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [gapsFetched, setGapsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [gapstVolume, setGapstVolume] = React.useState(null);
  const [gapstItemCode, setGapstItemCode] = React.useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllCities([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsSourceStockFetched(true);
      }),
    );
  }, []);

  // Pendiente Periods

  useEffect(() => {
    dispatch(
      getAllGapPeriodsStk([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllOrganizations([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsFetched(true);
      }),
    );
  }, []);

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
      getAllCampus(filterOptions, debouncedSearchTerm, gapdOrgCode, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsFetched(true);
      }),
    );
  }, [gapdOrgCode]);

  useEffect(() => {
    dispatch(
      getAllItems([], '', gapdOrgCode, purchaseArea, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsSourceStockFetched(true);
      }),
    );
  }, [gapdOrgCode]);

  // Pendiente Origen

  useEffect(() => {
    dispatch(
      getSchools([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsSourceStockFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    if (gapdSchoCode && gapdOrgCode) {
      dispatch(
        getAllCoursesByOrgCodeAndSchoCode(gapdOrgCode, gapdSchoCode, [], '', () => {
          //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          //setGapsSourceStandardFetched(true);
        }),
      );
    }
  }, [gapdSchoCode, gapdOrgCode]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = gapsStk.map(n => n.procId);
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
      dispatch(fetchError(<IntlMessages id="gaps.gapsDetailview.appModule.dataRequired" />));
      checkInputData = false;
    }
    if (checkInputData === true) {
      dispatch(
        getAllGapStockVsDemand(
          filterOptions,
          debouncedSearchTerm,
          currentProcess.procId,
          currentProcess.procCode,
          gapdStdcAcademicYear,
          gapdStdcAcademicPeriod,
          gapdOrgCode,
          gapdCampCode,
          gapdSchoCode,
          gapdCoursCode,
          gapstItemCode,
          gapstVolume,
          gapdCityCode,
          () => {
            setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
            setGapsFetched(true);
          },
        ),
      );
    }
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <Dialog maxWidth="xl" open={open} onClose={onCloseDialog} className={classes.dialogRoot} scroll="body">
      <DialogTitle className={classes.dialogTitleRoot}>
        <IntlMessages id="gaps.edit.form.editTitle" />
      </DialogTitle>
      <DialogContent dividers>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Card className={classes.root}>
              <CardHeader
                className={classes.dialogTitleRoot}
                title={
                  <IntlMessages
                    id="gaps.gapsDetailview.labelProcStkCode.title"
                    values={{ code: currentProcess.gapstProcCode }}
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
                        label={<IntlMessages id="gaps.gapsDetailview.label.labelProcCode" />}
                        value={currentProcess.procCode}
                        editable="false"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="cities"
                        options={cities}
                        value={cityText}
                        getOptionLabel={option => (option.cityCode != undefined ? option.cityCode : '')}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gaps.filters.label.labelGapstCities" />}
                            variant="outlined"
                            helperText={cityError}
                          />
                        )}
                        onChange={(event, value) => {
                          setCityText(value);
                          setCityError('');
                          setGapdCityCode(value ? value.cityCode : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="periods"
                        options={gapsPeriodsStk}
                        value={periodText}
                        getOptionLabel={option =>
                          option.gaprAcademicPeriod != undefined
                            ? option.gaprAcademicYear + '-' + option.gaprAcademicPeriod
                            : ''
                        }
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gaps.filters.label.labelGapstYearPeriod" />}
                            variant="outlined"
                            helperText={periodError}
                          />
                        )}
                        onChange={(event, value) => {
                          setPeriodText(value);
                          setPeriodError('');
                          setGapdStdcAcademicPeriod(value ? value.gaprAcademicPeriod : null);
                          setGapdStdcAcademicYear(value ? value.gaprAcademicYear : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="organizations"
                        options={organizations}
                        value={organizationText}
                        getOptionLabel={option => (option.orgCode != undefined ? option.orgCode : '')}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gaps.filters.label.labelGapstOrganizations" />}
                            variant="outlined"
                            helperText={organizationError}
                          />
                        )}
                        onChange={(event, value) => {
                          setOrganizationText(value);
                          setOrganizationError('');
                          setGapdOrgCode(value ? value.orgCode : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="volume"
                        options={volumeTypes}
                        value={volumeTypeText}
                        getOptionLabel={option => (option.vlmDescription != undefined ? option.vlmDescription : '')}
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
                        id="campus"
                        options={campus}
                        value={campusText}
                        getOptionLabel={option => (option.campDescription != undefined ? option.campDescription : '')}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gaps.filters.label.labelGapstCampus" />}
                            variant="outlined"
                            helperText={campusError}
                          />
                        )}
                        onChange={(event, value) => {
                          setCampusText(value);
                          setCampusError('');
                          setGapdCampCode(value ? value.campCode : null);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="items"
                        options={items}
                        value={itemText}
                        getOptionLabel={option => (option.itemOptionLabel != undefined ? option.itemOptionLabel : '')}
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
                      <Autocomplete
                        id="schools"
                        options={schools}
                        value={schoolText}
                        getOptionLabel={option => (option.schoOptionLabel != undefined ? option.schoOptionLabel : '')}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gaps.filters.label.labelGapstSchool" />}
                            variant="outlined"
                            helperText={schoolError}
                          />
                        )}
                        onChange={(event, value) => {
                          setSchoolText(value);
                          setSchoolError('');
                          setGapdSchoCode(value ? value.schoCode : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="courses"
                        options={courses}
                        value={courseText}
                        getOptionLabel={option => (option.coursOptionLabel != undefined ? option.coursOptionLabel : '')}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gaps.filters.label.labelGapsCourses" />}
                            variant="outlined"
                            helperText={courseError}
                          />
                        )}
                        onChange={(event, value) => {
                          setCourseText(value);
                          setCourseError('');
                          setGapdCoursCode(value ? value.coursCode : null);
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
                          {gapsStk && gapsStk.length > 0 && <ExportButtonGapsStockVsDemandReport data={gapsStk} />}
                        </Box>
                      </Box>
                    </Grid>
                  </GridContainer>
                </Box>
              </CardContent>
            </Card>
          </Paper>
          <Paper className={classes.paper}>
            {/*         <GapDetailViewTableToolbar
          selected={selected}
          setSelected={setSelected}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        /> */}
            <TableContainer className={classes.container}>
              <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
                <GapDetailViewTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={gapsStk.length}
                />
                <TableBody>
                  {!!gapsStk.length ? (
                    stableSort(gapsStk, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <GapDetailViewListRow key={index} row={row} onRowClick={handleRowClick} isSelected={isSelected} />
                      ))
                  ) : (
                    <TableRow style={{ height: 53 * 6 }}>
                      <TableCell colSpan={7} rowSpan={10}>
                        {isFilterApplied ? (
                          <NoRecordFound>{<IntlMessages id="gaps.appModule.filterNoRecordsFound" />}</NoRecordFound>
                        ) : (
                          <NoRecordFound>
                            {gapsFetched ? (
                              <IntlMessages id="gaps.appModule.noRecordsFound" />
                            ) : (
                              <IntlMessages id="gaps.appModule.loadingGapSourceDemand" />
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
              count={gapsStk.length}
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

export default GapDdaDetailViewModule;

GapDdaDetailViewModule.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
