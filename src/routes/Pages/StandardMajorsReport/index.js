import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import StandardMajorReportListRow from './StandardMajorReportListRow';
import StandardMajorReportTableHead from './StandardMajorReportTableHead';
import StandardMajorReportTableToolbar from './StandardMajorReportTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import { getStandardAppliedToMajor } from 'redux/actions/StandardReports';
import { getPurchaseAreas } from 'redux/actions/PurchaseAreas';
import { getAllOrganizations } from 'redux/actions/Organizations';
import { getAllStandardsByUserId } from 'redux/actions/Standards';
import { getMajors } from 'redux/actions/Majors';
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
import ExportButton from 'components/ExportButton';

const StandardMayorsReportModule = () => {
  const classes = useStyles();
  const { standardAppliedToMajor } = useSelector(({ standardAppliedToMajorReducer }) => standardAppliedToMajorReducer);
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
  const { standards } = useSelector(({ standardsReducer }) => standardsReducer);

  const dispatch = useDispatch();

  const [purchaseAreasFetched, setPurchaseAreasFetched] = useState(false);
  const [organizationsFetched, setOrganizationsFetched] = useState(false);
  const [majorsFetched, setMajorsFetched] = useState(false);
  const [standadrsFetched, setStandardsFetched] = useState(false);

  const [selectedPurchaseArea, setSelectedPurchaseArea] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [majorText, setMajorText] = useState(null);
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [standardText, setStandardText] = useState(null);

  const [selectedBuCode, setSelectedBuCode] = useState(null);
  const [selectedStdVersion, setSelectedStdVersion] = useState(null);

  const [filterOptionsMajors, setFilterOptionsMajors] = React.useState([]);
  const [filterOptionsStandards, setFilterOptionsStandards] = React.useState([]);

  const [purchaseAreaText, setPurchaseAreaText] = useState(null);
  const [organizationText, setOrganizationText] = useState(null);

  useEffect(() => {
    dispatch(
      getPurchaseAreas(filterOptions, purchaseArea, () => {
        // setFilterApplied(!!filterOptions.length || !!debouncedSearchPurcTerm);
        // setPurchaseAreasFetched(true);
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
    dispatch(
      getMajors([], debouncedSearchMajorTerm, '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchMajorTerm);
        // setMajorsFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllStandardsByUserId(filterOptions, debouncedSearchStdTerm, filterOptionsStandards, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchStdTerm || filterOptionsStandards);
        setStandardsFetched(true);
      }),
    );
  }, [dispatch, organizationText]);

  useEffect(() => {
    if (selectedOrganization != null && selectedPurchaseArea != null && selectedMajor != null && selectedStandard != null) {
      dispatch(
        getStandardAppliedToMajor(
          selectedPurchaseArea,
          selectedBuCode,
          selectedMajor,
          selectedStandard,
          selectedStdVersion,
          filterOptions,
          debouncedSearchTerm,
          () => {
            //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm );
            //setStandardsFetched(true);
          },
        ),
      );
    }
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const handleOnSubmitClick = event => {
    let checkInputData = true;
    if (
      selectedOrganization === null ||
      selectedPurchaseArea === null ||
      selectedMajor === null ||
      selectedStandard === null
    ) {
      dispatch(fetchError(<IntlMessages id="appModule.dataRequired" />));
      checkInputData = false;
    }
    if (checkInputData === true) {
      dispatch(
        getStandardAppliedToMajor(
          selectedPurchaseArea,
          selectedBuCode,
          selectedMajor,
          selectedStandard,
          selectedStdVersion,
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
      const newSelected = standardAppliedToMajor.map(n => n.standardAppliedToMajorId);
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
          <CardHeader className={classes.dialogTitleRoot} title="Parametros Estandard Aplicado a Carrera" />
          <CardContent>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
              <GridContainer>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="purchaseArea"
                    options={purchaseAreas}
                    //value={selectedPurchaseArea}
                    getOptionLabel={option => option.purcName}
                    style={{ width: '100%' }}
                    defaultValue={null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="standardMajorReport.filters.label.purchaseArea" />}
                        variant="outlined"
                      />
                    )}
                    //onChange={(event, value) => console.log(value)}
                    onChange={(event, value) => {
                      setSelectedPurchaseArea(value.purcCode);
                      setFilterOptionsStandards(value.purcCode);
                      setPurchaseAreaText(value);
                    }}
                  />
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
                        label={<IntlMessages id="standardMajorReport.filters.label.organization" />}
                        variant="outlined"
                      />
                    )}
                    onChange={(event, value) => {
                      if (purchaseAreaText === null) {
                        setOrganizationText(null);
                        dispatch(fetchError(<IntlMessages id="standardRoomsLayoutReport.appModule.purchaseAreaRequired" />));
                      } else {
                        setSelectedOrganization(value.orgCode);
                        setFilterOptionsMajors(value.orgCode);
                        setFilterOptionsStandards(value.orgCode);
                        setMajorText(null);
                        setStandardText(null);
                        setSelectedMajor(null);
                        setSelectedStandard(null);
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
                        label={<IntlMessages id="standardMajorReport.filters.label.major" />}
                        variant="outlined"
                      />
                    )}
                    getOptionSelected={(option, value) => option.value === value.value}
                    onChange={(event, value) => {
                      setSelectedMajor(value.majorCode);
                      setSelectedStandard(null);
                      setFilterOptionsStandards(value.majorCode);
                      setStandardText(null);
                      setMajorText(value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="standard"
                    value={standardText}
                    options={standards}
                    getOptionLabel={option => option.stdOrgCode + ' ' + option.stdName}
                    style={{ width: '100%' }}
                    defaultValue={null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="standardMajorReport.filters.label.standard" />}
                        variant="outlined"
                      />
                    )}
                    getOptionSelected={(option, value) => option.value === value.value}
                    onChange={(event, value) => {
                      if (majorText === null) {
                        setStandardText(null);
                        dispatch(fetchError(<IntlMessages id="standardMajorReport.appModule.majorRequired" />));
                      } else {
                        setSelectedStandard(value.stdCode);
                        setSelectedBuCode(value.stdBuCode);
                        setSelectedStdVersion(value.stdVersion);
                        setStandardText(value);
                      }
                    }}
                  />
                </Grid>
                <Box display="flex" justifyContent="flex-end" mb={4}>
                  <Box ml={2}>
                    <Button variant="contained" color="primary" onClick={handleOnSubmitClick}>
                      Aplicar
                    </Button>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end" mb={4}>
                  <Box ml={2}>
                    {standardAppliedToMajor && standardAppliedToMajor.length > 0 && (
                      <ExportButton data={standardAppliedToMajor} />
                    )}
                  </Box>
                </Box>
              </GridContainer>
            </Box>
          </CardContent>
        </Card>
      </Paper>
      <Paper className={classes.paper}>
        <StandardMajorReportTableToolbar
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
            <StandardMajorReportTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={null}
              onRequestSort={handleRequestSort}
              rowCount={standardAppliedToMajor.length}
            />
            <TableBody>
              {!!standardAppliedToMajor.length ? (
                stableSort(standardAppliedToMajor, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StandardMajorReportListRow
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
                      <NoRecordFound>
                        {<IntlMessages id="standardMajorReport.appModule.filterNoRecordsFound" />}
                      </NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {standardAppliedToMajorFetched ? (
                          <IntlMessages id="standardMajorReport.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="standardMajorReport.appModule.loadingReport" />
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
          count={standardAppliedToMajor.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </div>
  );
};

export default StandardMayorsReportModule;
