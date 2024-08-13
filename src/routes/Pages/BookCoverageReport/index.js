import React, { useEffect, useState, Suspense } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import BookCoverageReportListRow from './BookCoverageReportListRow';
import BookCoverageReportTableHead from './BookCoverageReportTableHead';
import BookCoverageReportTableToolbar from './BookCoverageReportTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import { getBookCoverage } from 'redux/actions/StandardReports'; //
import { getPurchaseAreas } from 'redux/actions/PurchaseAreas';
import { getAllOrganizations } from 'redux/actions/Organizations';
import { getAllPrograms } from 'redux/actions/Programs';
import { getMajors } from 'redux/actions/Majors';
import { getAllCitiesBibliographicCenter } from 'redux/actions/Cities';
import { getAllStockProcesses, getAllDemandProcesses, getAllStandardProcesses } from 'redux/actions/Processes';
import { useDebounce } from '@jumbo/utils/commonHelper';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import IntlMessages from '@jumbo/utils/IntlMessages';
import GridContainer from '@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import { Box, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchError } from 'redux/actions';
import ExportButton from 'components/ExportButtonBookCoverageReport';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';

const BookCoverageReportModule = () => {
  const classes = useStyles();
  const { booksCoverage } = useSelector(({ booksCoverageReducer }) => booksCoverageReducer);
  const { purchaseArea } = useSelector(({ auth }) => auth);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [selectedStandardAppliedToMajor, setSelectedStandardAppliedToMajor] = useState({ name: '' });
  const [standardAppliedToMajorFetched, setStandardAppliedToMajorFetched] = useState(true);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityCode, setCityCode] = React.useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [searchPurcTerm, setSearchPurcTerm] = useState('');
  const debouncedSearchPurcTerm = useDebounce(searchPurcTerm, 500);

  const [searchOrgTerm, setSearchOrgTerm] = useState('');
  const debouncedSearchOrgTerm = useDebounce(searchOrgTerm, 500);

  const [searchMajorTerm, setSearchMajorTerm] = useState('');
  const debouncedSearchMajorTerm = useDebounce(searchMajorTerm, 500);

  const [searchStdTerm, setSearchStdTerm] = useState('');
  const debouncedSearchStdTerm = useDebounce(searchStdTerm, 500);

  const currentUserPurchaseArea = useSelector(({ authReducer }) => authReducer);
  const { purchaseAreas } = useSelector(({ purchaseAreasReducer }) => purchaseAreasReducer);
  const { organizations } = useSelector(({ organizationsReducer }) => organizationsReducer);
  const { majors } = useSelector(({ majorsReducer }) => majorsReducer);
  const { programs } = useSelector(({ programsReducer }) => programsReducer);
  const { citiesBibliographicCenter } = useSelector(({ citiesReducer }) => citiesReducer);

  const dispatch = useDispatch();

  const [purchaseAreasFetched, setPurchaseAreasFetched] = useState(false);
  const [organizationsFetched, setOrganizationsFetched] = useState(false);
  const [majorsFetched, setMajorsFetched] = useState(false);
  const [programsFetched, setProgramsFetched] = useState(false);

  const [selectedPurchaseArea, setSelectedPurchaseArea] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [majorText, setMajorText] = useState(null);
  const [programText, setProgramText] = useState(null);

  const [selectedBuCode, setSelectedBuCode] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const [filterOptionsMajors, setFilterOptionsMajors] = React.useState([]);
  const [filterOptionsStandards, setFilterOptionsStandards] = React.useState([]);
  const [majorError, setMajorError] = React.useState('');

  const [purchaseAreaText, setPurchaseAreaText] = useState(null);
  const [purchaseAreaError, setPurchaseAreaError] = React.useState('');
  const [organizationText, setOrganizationText] = useState(null);
  const [organizationError, setOrganizationError] = React.useState('');

  const [searchProgramTerm, setSearchProgramTerm] = useState('');
  const debouncedSearchProgramTerm = useDebounce(searchProgramTerm, 500);
  const [filterOptionsPrograms, setFilterOptionsPrograms] = React.useState([]);
  const [programError, setProgramError] = React.useState('');

  const [searchCityTerm, setSearchCityTerm] = useState('');
  const debouncedSearchCityTerm = useDebounce(searchCityTerm, 500);
  const [filterOptionsCities, setFilterOptionsCities] = React.useState([]);

  const [cityText, setCityText] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [cityError, setCityError] = React.useState('');

  //fuentes de datos
  const proctStockId = process.env.REACT_APP_SOURCE_STOCK;
  const proctDemandId = process.env.REACT_APP_SOURCE_DEMAND;
  const proctStandardId = process.env.REACT_APP_SOURCE_STANDARD;
  const { procesess_stock } = useSelector(({ procesessReducer }) => procesessReducer);
  const { procesess_demand } = useSelector(({ procesessReducer }) => procesessReducer);
  const { procesess_standard } = useSelector(({ procesessReducer }) => procesessReducer);

  const [stockText, setStockText] = React.useState('');
  const [stockError, setStockError] = React.useState('');
  const [stockCode, setStockCode] = React.useState('');

  const [demandText, setDemandText] = React.useState('');
  const [demandError, setDemandError] = React.useState('');
  const [demandCode, setDemandCode] = React.useState('');

  const [standardText, setStandardText] = React.useState('');
  const [standardError, setStandardError] = React.useState('');
  const [standardCode, setStandardCode] = React.useState('');

  useEffect(() => {
    dispatch(
      getPurchaseAreas(filterOptions, purchaseArea, () => {
        // setFilterApplied(!!filterOptions.length || !!debouncedSearchPurcTerm);
        // setPurchaseAreasFetched(true);
        //setSelectedPurchaseArea(purchaseArea);
        setPurchaseAreaText('Biblioteca');
        for (let i = 0; i < purchaseAreas.length; i++) {
          if (purchaseAreas[i].purcCode === purchaseArea) {
            setPurchaseAreaText(purchaseAreas[i].purcName);
          }
        }
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllOrganizations(filterOptions, debouncedSearchOrgTerm, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchOrgTerm);
        //setOrganizationsFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    if (selectedOrganization !== null || selectedOrganization !== undefined || selectedOrganization !== '') {
      dispatch(
        getAllCitiesBibliographicCenter(selectedOrganization, filterOptionsCities, debouncedSearchCityTerm, () => {
          //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          //setGapsSourceStockFetched(true);
        }),
      );
    }
  }, [selectedOrganization, filterOptionsCities, debouncedSearchCityTerm]);

  useEffect(() => {
    dispatch(
      getMajors([], debouncedSearchMajorTerm, selectedOrganization, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchMajorTerm);
        // setMajorsFetched(true);
      }),
    );
  }, [selectedOrganization, debouncedSearchMajorTerm]);

  useEffect(() => {
    dispatch(
      getAllPrograms([], debouncedSearchProgramTerm, selectedMajor, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchProgramTerm || filterOptionsPrograms);
        //setProgramsFetched(true);
      }),
    );
  }, [selectedMajor, debouncedSearchProgramTerm]);

  useEffect(() => {
    dispatch(
      getAllStockProcesses([], '', proctStockId, purchaseArea, () => {
        // setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        // setProcesessFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllDemandProcesses([], '', proctDemandId, purchaseArea, () => {
        // setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        // setProcesessFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllStandardProcesses([], '', proctStandardId, purchaseArea, () => {
        // setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        // setProcesessFetched(true);
      }),
    );
  }, []);

  /*  useEffect(() => {
    if (
      (selectedOrganization != null && selectedPurchaseArea != null && selectedMajor != null && selectedCity != null) ||
      standardText != null ||
      demandText != null ||
      stockText != null
    ) {
      dispatch(
        getBookCoverage(
          selectedOrganization,
          selectedMajor,
          selectedProgram,
          selectedCity,
          standardCode,
          demandCode,
          stockCode,
          filterOptions,
          debouncedSearchTerm,
          () => {
            //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm );
            //setStandardsFetched(true);
          },
        ),
      );
    }
  }, [dispatch, filterOptions, debouncedSearchTerm]);*/

  const handleOnSubmitClick = event => {
    let checkInputData = true;
    // Valida purchase area
    //if (!selectedPurchaseArea) {
    //  checkInputData = false;
    //  setPurchaseAreaError(<IntlMessages id="procesess.appModule.dataRequired" />);
    //  //dispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired" />));
    //}
    // Valida institucion
    if (!selectedOrganization) {
      checkInputData = false;
      setOrganizationError(<IntlMessages id="procesess.appModule.dataRequired" />);
      //dispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired" />));
    }
    // Valida ciudad
    if (!selectedCity) {
      checkInputData = false;
      setCityError(<IntlMessages id="procesess.appModule.dataRequired" />);
      //dispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired" />));
    }
    // Valida carrera
    //if (!selectedMajor || selectedMajor === 'none') {
    //  checkInputData = false;
    //  setMajorError(<IntlMessages id="procesess.appModule.dataRequired" />);
    //  //ispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired" />));
    //}
    // Valida selectedProgram
    //if (!selectedProgram || selectedProgram === 'none') {
    //  checkInputData = false;
    //  setProgramError(<IntlMessages id="procesess.appModule.dataRequired" />);
    //  //dispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired" />));
    //}
    // Valida json stock
    if (!stockText) {
      checkInputData = false;
      setStockError(<IntlMessages id="procesess.appModule.dataRequired" />);
      //dispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired" />));
    }
    if (!demandText) {
      checkInputData = false;
      setDemandError(<IntlMessages id="procesess.appModule.dataRequired" />);
      //dispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired" />));
    }

    if (!standardText) {
      checkInputData = false;
      setStandardError(<IntlMessages id="procesess.appModule.dataRequired" />);
      //dispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired" />));
    }

    if (checkInputData === true) {
      dispatch(
        getBookCoverage(
          selectedOrganization,
          selectedMajor,
          selectedProgram,
          selectedCity,
          standardCode,
          demandCode,
          stockCode,
          filterOptions,
          debouncedSearchTerm,
          () => {
            //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm );
            //setStandardsFetched(true);
          },
        ),
      );
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = booksCoverage.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Card className={classes.root}>
          <CardHeader className={classes.dialogTitleRoot} title="Reporte de Cumplimiento de Bibliografías" />
          <CardContent>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
              <GridContainer>
                <Grid item xs={12} sm={6}>
                  <AppTextInput
                    //fullWidth
                    // style={{ marginTop: 8 }}
                    variant="outlined"
                    label={purchaseAreaText}
                    value={purchaseAreaText}
                    disabled
                    // onChange={e => setCompany(e.target.value)}
                  />
                  {/*                   <Autocomplete
                    id="purchaseArea"
                    options={purchaseAreas}
                    value={purchaseAreaText}
                    getOptionLabel={option => option.purcName}
                    style={{ width: '100%' }}
                    //defaultValue={purchaseArea}
                    disabled
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="coverageReport.filters.label.purchaseArea" />}
                        variant="outlined"
                        helperText={purchaseAreaError}
                        defaultValue = {purchaseAreaText}
                      />
                    )}
                    //onChange={(event, value) => console.log(value)}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setSelectedPurchaseArea(value.purcCode);
                        //setFilterOptionsStandards(value.purcCode);
                        setPurchaseAreaText(value);
                      } else {
                        setSelectedPurchaseArea(null);
                      }
                    }}
                  /> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="organization"
                    options={organizations}
                    getOptionLabel={option => option.orgDescription}
                    style={{ width: '100%' }}
                    defaultValue={null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="coverageReport.filters.label.organization" />}
                        variant="outlined"
                        helperText={organizationError}
                      />
                    )}
                    onChange={(event, value) => {
                      if (value !== null) {
                        if (purchaseAreaText === null) {
                          setOrganizationText(null);
                          //dispatch(fetchError(<IntlMessages id="coverageReport.appModule.purchaseAreaRequired" />));
                        } else {
                          setSelectedOrganization(value.orgCode);
                          //setFilterOptionsMajors(value.orgCode);
                          //setFilterOptionsCities(value.orgCode);
                          setMajorText(null);
                          setProgramText(null);
                          setCityText(null);
                          setSelectedMajor('none');
                          //setSelectedStandard(null);
                        }
                      } else {
                        setSelectedOrganization('none');
                        setCityCode(null);
                        setSelectedMajor('none');
                        //setSelectedOrganization([]);
                        //setFilterOptionsMajors([]);
                        //setFilterOptionsCities([]);
                        setMajorText(null);
                        setProgramText(null);
                        setCityText(null);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="cities"
                    options={citiesBibliographicCenter}
                    value={cityText}
                    getOptionLabel={option => option.cityCode}
                    style={{ width: '100%' }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="coverageReport.filters.label.labelGapstCities" />}
                        variant="outlined"
                        helperText={cityError}
                      />
                    )}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setCityText(value);
                        setCityError('');
                        setCityCode(value ? value.cityCode : null);
                        setSelectedCity(value ? value.cityCode : null);
                      } else {
                        setCityCode(null);
                        //setFilterOptionsCities([]);
                        setCityText('');
                        setSelectedCity(null);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="major"
                    value={majorText}
                    options={majors}
                    getOptionLabel={option => option.majorOrgCode + ' ' + option.majorDescription}
                    style={{ width: '100%' }}
                    defaultValue={null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="coverageReport.filters.label.major" />}
                        variant="outlined"
                        helperText={majorError}
                      />
                    )}
                    getOptionSelected={(option, value) => option.value === value.value}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setSelectedMajor(value.majorCode);
                        //setSelectedStandard(null);
                        setFilterOptionsPrograms(value.majorCode);
                        setProgramText(null);
                        setMajorText(value);
                      } else {
                        setSelectedMajor('none');
                        //setSelectedStandard(null);
                        //setFilterOptionsPrograms([]);
                        setProgramText(null);
                        setMajorText(null);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="programs"
                    value={programText}
                    options={programs}
                    getOptionLabel={option =>
                      '[' + (option.progCode !== undefined ? option.progCode + '] ' + option.progMajorName : '')
                    }
                    style={{ width: '100%' }}
                    defaultValue={null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="coverageReport.filters.label.program" />}
                        variant="outlined"
                        helperText={programError}
                      />
                    )}
                    getOptionSelected={(option, value) => option.value === value.value}
                    onChange={(event, value) => {
                      if (value !== null) {
                        if (majorText === null) {
                          setMajorText(null);
                          dispatch(fetchError(<IntlMessages id="coverageReport.appModule.majorRequired" />));
                        } else {
                          //setSelectedMajor(value.stdCode);
                          //setSelectedBuCode(value.stdBuCode);
                          setSelectedProgram(value.progCode);
                          //setFilterOptionsRoomsLayouts(value.stdCode);
                          setProgramText(value);
                        }
                      } else {
                        //setSelectedProgram(null);
                        setProgramText('');
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="stocks"
                    options={procesess_stock}
                    value={stockText}
                    getOptionLabel={option => (option.procCode !== undefined ? option.procCode : '')}
                    style={{ width: '100%' }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="coverageReport.filters.label.labelGapStock" />}
                        variant="outlined"
                        helperText={stockError}
                      />
                    )}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setStockText(value);
                        setStockError('');
                        setStockCode(value ? value.procId : null);
                      } else {
                        setStockText('');
                        setStockError('');
                        setStockCode(null);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="demand"
                    options={procesess_demand}
                    value={demandText}
                    getOptionLabel={option => (option.procCode !== undefined ? option.procCode : '')}
                    style={{ width: '100%' }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="coverageReport.filters.label.labelGapDemand" />}
                        variant="outlined"
                        helperText={demandError}
                      />
                    )}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setDemandText(value);
                        setDemandError('');
                        setDemandCode(value ? value.procId : null);
                      } else {
                        setDemandText('');
                        setDemandError('');
                        setDemandCode(null);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="standard"
                    options={procesess_standard}
                    value={standardText}
                    getOptionLabel={option => (option.procCode !== undefined ? option.procCode : '')}
                    style={{ width: '100%' }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="coverageReport.filters.label.labelGapStandard" />}
                        variant="outlined"
                        helperText={standardError}
                      />
                    )}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setStandardText(value);
                        setStandardError('');
                        setStandardCode(value ? value.procId : null);
                      } else {
                        setStandardText('');
                        setStandardError('');
                        setStandardCode(null);
                      }
                    }}
                  />
                </Grid>

                <Box display="flex" justifyContent="flex-end" mb={4}>
                  <Box ml={2}>
                    <Button variant="contained" color="primary" onClick={handleOnSubmitClick}>
                      Generar
                    </Button>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end" mb={4}>
                  <Box ml={2}>{booksCoverage && booksCoverage.length > 0 && <ExportButton data={booksCoverage} />}</Box>
                </Box>
              </GridContainer>
            </Box>
          </CardContent>
        </Card>
      </Paper>
      <Paper className={classes.paper}>
        <BookCoverageReportTableToolbar
          selected={selected}
          setSelected={setSelected}
          //onUserAdd={setOpenUserDialog}
          //filterOptions={filterOptions}
          //setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <BookCoverageReportTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={null}
              onRequestSort={handleRequestSort}
              rowCount={booksCoverage.length}
            />
            <TableBody>
              {!!booksCoverage.length ? (
                stableSort(booksCoverage, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <BookCoverageReportListRow
                      key={index}
                      row={row}
                      onRowClick={null}
                      /*                       onUserEdit={handleUserEdit}
                      onUserDelete={handleUserDelete}
                      onUserView={handleUserView}
                      onUserRoles={handleUserRolesView}
                      onUserPurchaseAreas={handleUserPurchaseAreasView}
                      onUserBusinessUnits={handleUserBusinessUnitsView} */
                      isSelected={null}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={14} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>{<IntlMessages id="coverageReport.appModule.filterNoRecordsFound" />}</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {standardAppliedToMajorFetched ? (
                          <IntlMessages id="coverageReport.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="coverageReport.appModule.loadingReport" />
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
          count={booksCoverage.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </div>
  );
};

export default BookCoverageReportModule;
