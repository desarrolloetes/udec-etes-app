import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import StandardEquipmentByMajorReportListRow from './StandardEquipmentByMajorReportListRow';
import StandardEquipmentByMajorReportTableHead from './StandardEquipmentByMajorReportTableHead';
import StandardEquipmentByMajorReportTableToolbar from './StandardEquipmentByMajorReportTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import { getStandardEquipmentByMajor } from 'redux/actions/StandardReports';
import { getPurchaseAreas } from 'redux/actions/PurchaseAreas';
import { getMajors } from 'redux/actions/Majors';
//import { getAllStandardsByUserId } from '../../../redux/actions/Standards';
import { getAllPrograms } from 'redux/actions/Programs';

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
import ExportButtonEquipmentByMajorReport from 'components/ExportButtonEquipmentByMajorReport';

const StandardEquipmentByMajorReportModule = () => {
  const classes = useStyles();
  const { standardsEquipmentByMajor } = useSelector(
    ({ standardsEquipmentByMajorReducer }) => standardsEquipmentByMajorReducer,
  );
  //const currentUserPurchaseArea = useSelector(({ authReducer }) => authReducer);
  const { purchaseArea } = useSelector(({ auth }) => auth);
  const { purchaseAreas } = useSelector(({ purchaseAreasReducer }) => purchaseAreasReducer);
  const { majors } = useSelector(({ majorsReducer }) => majorsReducer);
  const { programs } = useSelector(({ programsReducer }) => programsReducer);

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);

  //const [selectedProgramAppliedToRoomLayout, setSelectedMajorAppliedToRoomLayout] = useState({ name: '' });
  const [standardAppliedToEquipmentByMajorsFetched, setStandardAppliedToRoomsLayoutsFetched] = useState(true);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [searchPurcTerm, setSearchPurcTerm] = useState('');
  const debouncedSearchPurcTerm = useDebounce(searchPurcTerm, 500);
  const [purchaseAreasFetched, setPurchaseAreasFetched] = useState(false);

  const [searchMajorTerm, setSearchOrgTerm] = useState('');
  const debouncedSearchMajorTerm = useDebounce(searchMajorTerm, 500);
  const [majorsFetched, setMajorsFetched] = useState(false);
  const [filterOptionsMajors, setFilterOptionsMajors] = React.useState([]);

  const [searchProgramTerm, setSearchStdTerm] = useState('');
  const debouncedSearchProgramTerm = useDebounce(searchProgramTerm, 500);
  const [programsFetched, setProgramsFetched] = useState(false);
  const [filterOptionsPrograms, setFilterOptionsPrograms] = React.useState([]);

  const dispatch = useDispatch();

  const [selectedPurchaseArea, setSelectedPurchaseArea] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const [majorText, setMajorText] = useState(null);
  const [purchaseAreaText, setPurchaseAreaText] = useState(null);
  const [programText, setProgramText] = useState(null);

  useEffect(() => {
    dispatch(
      getPurchaseAreas(filterOptions, purchaseArea, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchPurcTerm);
        //setPurchaseAreasFetched(true);
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
      getAllPrograms(filterOptions, debouncedSearchProgramTerm, filterOptionsPrograms, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchProgramTerm || filterOptionsPrograms);
        setProgramsFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchProgramTerm, filterOptionsPrograms]);

  useEffect(() => {
    if (selectedMajor != null && selectedPurchaseArea != null && selectedProgram != null) {
      dispatch(
        getStandardEquipmentByMajor(
          selectedPurchaseArea,
          selectedMajor,
          selectedProgram,
          filterOptions,
          debouncedSearchTerm,
          () => {
            //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm );
            //setProgramsFetched(true);
          },
        ),
      );
    }
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const handleOnSubmitClick = event => {
    let checkInputData = true;
    if (selectedMajor === null || selectedPurchaseArea === null || selectedProgram === null) {
      dispatch(fetchError(<IntlMessages id="appModule.dataRequired" />));
      checkInputData = false;
    }
    if (checkInputData === true) {
      dispatch(
        getStandardEquipmentByMajor(
          selectedPurchaseArea,
          selectedMajor,
          selectedProgram,
          filterOptions,
          debouncedSearchTerm,
          () => {
            //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm );
            //setProgramsFetched(true);
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
      const newSelected = standardsEquipmentByMajor.map(n => n.standardsEquipmentByMajorId);
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
          <CardHeader className={classes.dialogTitleRoot} title="Parametros Equipamiento por Carrera" />
          <CardContent>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
              <GridContainer spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="purchaseArea"
                    options={purchaseAreas}
                    //value={purchaseArea}
                    editable="false"
                    getOptionLabel={option => option.purcName}
                    style={{ width: '100%' }}
                    //defaultValue={purchaseArea}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="standardEquipmentByMajorReport.filters.label.purchaseArea" />}
                        variant="outlined"
                      />
                    )}
                    //onChange={(event, value) => console.log(value)}
                    onChange={(event, value) => {
                      setSelectedPurchaseArea(value.purcCode);
                      setFilterOptionsMajors(value.purcCode);
                      //setFilterOptionsRoomsLayouts(value.purcCode);
                      setPurchaseAreaText(value);
                      setMajorText(null);
                      setProgramText(null);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="majors"
                    options={majors}
                    value={majorText}
                    getOptionLabel={option =>
                      '[' + option.majorCode + '][' + option.majorOrgCode + ']  ' + option.majorDescription
                    }
                    style={{ width: '100%' }}
                    defaultValue={null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="standardEquipmentByMajorReport.filters.label.major" />}
                        variant="outlined"
                      />
                    )}
                    onChange={(event, value) => {
                      if (purchaseAreaText === null) {
                        setMajorText(null);
                        dispatch(
                          fetchError(<IntlMessages id="standardEquipmentByMajorReport.appModule.purchaseAreaRequired" />),
                        );
                      } else {
                        setSelectedMajor(value.majorCode);
                        //setFilterOptionsRoomsLayouts(value.orgCode);
                        setFilterOptionsPrograms(value.majorCode);
                        //setRoomLayoutText(null);
                        setMajorText(value);
                        //setSelectedRoomLayout(null);
                        //setSelectedMajor(null);
                        //setMajorText(value);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="programs"
                    value={programText}
                    options={programs}
                    getOptionLabel={option => '[' + option.progCode + '] ' + option.progMajorName}
                    style={{ width: '100%' }}
                    defaultValue={null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="standardEquipmentByMajorReport.filters.label.program" />}
                        variant="outlined"
                      />
                    )}
                    getOptionSelected={(option, value) => option.value === value.value}
                    onChange={(event, value) => {
                      if (majorText === null) {
                        setMajorText(null);
                        dispatch(fetchError(<IntlMessages id="standardEquipmentByMajorReport.appModule.majorRequired" />));
                      } else {
                        //setSelectedMajor(value.stdCode);
                        //setSelectedBuCode(value.stdBuCode);
                        setSelectedProgram(value.progCode);
                        //setFilterOptionsRoomsLayouts(value.stdCode);
                        setProgramText(value);
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
                    {standardsEquipmentByMajor && standardsEquipmentByMajor.length > 0 && (
                      <ExportButtonEquipmentByMajorReport data={standardsEquipmentByMajor} />
                    )}
                  </Box>
                </Box>
              </GridContainer>
            </Box>
          </CardContent>
        </Card>
      </Paper>
      <Paper className={classes.paper}>
        <StandardEquipmentByMajorReportTableToolbar
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
            <StandardEquipmentByMajorReportTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={null}
              onRequestSort={handleRequestSort}
              rowCount={standardsEquipmentByMajor.length}
            />
            <TableBody>
              {!!standardsEquipmentByMajor.length ? (
                stableSort(standardsEquipmentByMajor, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StandardEquipmentByMajorReportListRow
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
                        {<IntlMessages id="standardEquipmentByMajorReport.appModule.filterNoRecordsFound" />}
                      </NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {standardAppliedToEquipmentByMajorsFetched ? (
                          <IntlMessages id="standardEquipmentByMajorReport.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="standardEquipmentByMajorReport.appModule.loadingReport" />
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
          count={standardsEquipmentByMajor.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </div>
  );
};

export default StandardEquipmentByMajorReportModule;
