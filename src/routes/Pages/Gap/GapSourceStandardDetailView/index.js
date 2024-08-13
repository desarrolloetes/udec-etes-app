import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import StockListRow from './StandardListRow';
import StockTableHead from './StandardTableHead';
import StockTableToolbar from './StandardTableToolbar';
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
import { getAllGapSourceStandard } from 'redux/actions/GapSourceStandard';
import { getAllOrganizations } from 'redux/actions/Organizations';
import { getAllItems } from 'redux/actions/Items';
import { getAllCoursesByOrgCodeAndSchoCode } from 'redux/actions/Courses';
import { getAllStandards } from 'redux/actions/Standards';

import ExportButtonGapsSourceStandardReport from 'components/ExportButtonGapsSourceStandardReport';

const GapSourceStockDetailViewModule = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { gapsSourceStandard } = useSelector(({ gapSourceStandardReducer }) => gapSourceStandardReducer);
  const { courses } = useSelector(({ coursesReducer }) => coursesReducer);
  const { standards } = useSelector(({ standardsReducer }) => standardsReducer);
  const { currentProcess } = useSelector(({ procesessReducer }) => procesessReducer);
  const { organizations } = useSelector(({ organizationsReducer }) => organizationsReducer);
  const { items } = useSelector(({ itemsReducer }) => itemsReducer);
  const { purchaseArea } = useSelector(({ auth }) => auth);
  const { businessUnit } = useSelector(({ auth }) => auth);

  const [gapsBuCode, setGapsBuCode] = React.useState(null);
  const [gapsOrgCode, setGapsOrgCode] = React.useState(null);
  const [gapsStdCode, setGapsStdCode] = React.useState(null);
  const [gapsStdVersion, setGapsStdVersion] = React.useState(null);
  const [gapsCoursCode, setGapsCoursCode] = React.useState(null);
  const [gapsRlayCode, setGapsRlayCode] = React.useState(null);
  const [gapsItemCode, setGapsItemCode] = React.useState(null);
  const [stdCode, setStdCode] = React.useState(null);
  const [stdYear, setStdYear] = React.useState(null);
  const [stdVersion, setStdVersion] = React.useState(null);
  const [stdUserId, setStdUserId] = React.useState(null);
  const [stdPurchase, setStdPurchase] = React.useState(null);
  const [stdSchoCode, setStdSchoCode] = React.useState(null);

  const [courseText, setCourseText] = React.useState('');
  const [courseError, setCourseError] = React.useState('');

  const [standardText, setStandardText] = React.useState('');
  const [standardError, setStandardError] = React.useState('');

  const [organizationText, setOrganizationText] = React.useState('');
  const [organizationError, setOrganizationError] = React.useState('');

  const [itemText, setItemText] = React.useState('');
  const [itemError, setItemError] = React.useState('');

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [gapsSourceStandardFetched, setGapsSourceStandardFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllOrganizations([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setGapsSourceStandardFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    if (gapsOrgCode) {
      dispatch(
        getAllItems([], '', gapsOrgCode, purchaseArea, () => {
          //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          //setGapsSourceStandardFetched(true);
        }),
      );
    }
  }, [gapsOrgCode]);

  useEffect(() => {
    if (gapsOrgCode) {
      dispatch(
        getAllStandards(
          filterOptions,
          debouncedSearchTerm,
          stdCode,
          gapsOrgCode,
          businessUnit,
          purchaseArea,
          stdYear,
          stdVersion,
          stdUserId,
          stdPurchase,
          () => {
            //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
            //setGapsSourceStandardFetched(true);
          },
        ),
      );
    }
  }, [gapsOrgCode]);

  useEffect(() => {
    if (stdSchoCode && gapsOrgCode) {
      dispatch(
        getAllCoursesByOrgCodeAndSchoCode(gapsOrgCode, stdSchoCode, [], '', () => {
          //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          //setGapsSourceStandardFetched(true);
        }),
      );
    }
  }, [stdSchoCode, gapsOrgCode]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = gapsSourceStandard.map(n => n.gapsStdcProcId);
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
    if (currentProcess.procStandardId === null || currentProcess.procStandard === null || purchaseArea === null) {
      dispatch(fetchError(<IntlMessages id="gapsSourceStandard.gapsSourceStandardDetailview.appModule.dataRequired" />));
      checkInputData = false;
    }
    if (checkInputData === true) {
      dispatch(
        getAllGapSourceStandard(
          filterOptions,
          debouncedSearchTerm,
          currentProcess.procStandardId,
          currentProcess.procStandard,
          businessUnit,
          gapsOrgCode,
          gapsStdCode,
          gapsStdVersion,
          gapsCoursCode,
          gapsRlayCode,
          purchaseArea,
          gapsItemCode,
          () => {
            setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
            setGapsSourceStandardFetched(true);
          },
        ),
      );
    }
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <Dialog maxWidth="xl" open={open} onClose={onCloseDialog} className={classes.dialogRoot} scroll="body">
      <DialogTitle className={classes.dialogTitleRoot}>
        <IntlMessages id="gapsSourceStandard.edit.form.editTitle" />
      </DialogTitle>
      <DialogContent dividers>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Card className={classes.root}>
              <CardHeader
                className={classes.dialogTitleRoot}
                title={
                  <IntlMessages
                    id="gapsSourceStandard.gapsSourceStandardDetailview.labelProcCode.title"
                    values={{ code: currentProcess.procStandard }}
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
                        label={<IntlMessages id="gapsSourceStandard.gapsSourceStandardDetailview.label.labelProcCode" />}
                        value={currentProcess.procStandard}
                        editable="false"
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
                            label={<IntlMessages id="gapsSourceStandard.filters.label.labelGapstOrganizations" />}
                            variant="outlined"
                            helperText={organizationError}
                          />
                        )}
                        onChange={(event, value) => {
                          setOrganizationText(value);
                          setOrganizationError('');
                          setGapsOrgCode(value ? value.orgCode : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="standard"
                        options={standards}
                        value={standardText}
                        getOptionLabel={option => option.stdOptionLabel}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gapsSourceStandard.filters.label.labelGapstStandard" />}
                            variant="outlined"
                            helperText={standardError}
                          />
                        )}
                        onChange={(event, value) => {
                          setStandardText(value);
                          setStandardError('');
                          setGapsStdCode(value ? value.stdCode : null);
                          setStdSchoCode(value ? value.stdSchoCode : null);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="courses"
                        options={courses}
                        value={courseText}
                        getOptionLabel={option => option.coursOptionLabel}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="gapsSourceStandard.filters.label.labelGapsCourses" />}
                            variant="outlined"
                            helperText={courseError}
                          />
                        )}
                        onChange={(event, value) => {
                          setCourseText(value);
                          setCourseError('');
                          setGapsCoursCode(value ? value.coursCode : null);
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
                            label={<IntlMessages id="gapsSourceStandard.filters.label.labelGapstItems" />}
                            variant="outlined"
                            helperText={itemError}
                          />
                        )}
                        onChange={(event, value) => {
                          setItemText(value);
                          setItemError('');
                          setGapsItemCode(value ? value.itemCode : null);
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
                          {gapsSourceStandard && gapsSourceStandard.length > 0 && (
                            <ExportButtonGapsSourceStandardReport data={gapsSourceStandard} />
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
                  rowCount={gapsSourceStandard.length}
                />
                <TableBody>
                  {!!gapsSourceStandard.length ? (
                    stableSort(gapsSourceStandard, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <StockListRow key={index} row={row} onRowClick={handleRowClick} isSelected={isSelected} />
                      ))
                  ) : (
                    <TableRow style={{ height: 53 * 6 }}>
                      <TableCell colSpan={7} rowSpan={10}>
                        {isFilterApplied ? (
                          <NoRecordFound>
                            {<IntlMessages id="gapsSourceStandard.appModule.filterNoRecordsFound" />}
                          </NoRecordFound>
                        ) : (
                          <NoRecordFound>
                            {gapsSourceStandardFetched ? (
                              <IntlMessages id="gapsSourceStandard.appModule.noRecordsFound" />
                            ) : (
                              <IntlMessages id="gapsSourceStandard.appModule.loadingGapSourceStandard" />
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
              count={gapsSourceStandard.length}
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
