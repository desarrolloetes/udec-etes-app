import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import StandardListRow from './StandardListRow';
import UserTableHead from './StandardTableHead';
import StandardTableToolbar from './StandardTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import AddEditStandard from './AddEditStandard';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '@jumbo/utils/commonHelper';
import useStyles from './index.style';
import StandardDetailView from './StandardDetailView';
import NoRecordFound from './NoRecordFound';

import IntlMessages from '@jumbo/utils/IntlMessages';
import { enableDisableStandard, getAllStandardsByUserId, setCurrentStandard } from 'redux/actions/Standards';

import { getBusinessUnits } from 'redux/actions/BusinessUnits';
import { getPurchaseAreas } from 'redux/actions/PurchaseAreas';
import { getAllOrganizations } from 'redux/actions/Organizations';
import { getSchools } from 'redux/actions/Schools';
import { addNewCurrentStandarCourse } from 'redux/actions/StandardsCourse';

const StandardModule = () => {
  const classes = useStyles();
  const { standards } = useSelector(({ standardsReducer }) => standardsReducer);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openStandardDialog, setOpenStandardDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState({});
  const [standardsFetched, setStandardsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllStandardsByUserId(filterOptions, debouncedSearchTerm, '', () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setStandardsFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  useEffect(() => {
    dispatch(
      getAllOrganizations([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchOrgTerm);
        // setOrganizationsFetched(true);
      }),
    );
    /*     dispatch(
      getSchools([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
       // setSchoolsFetched(true);
      }),
    );  */
    dispatch(getPurchaseAreas());
    dispatch(getBusinessUnits());
  }, []);

  const handleCloseStandardDialog = () => {
    setOpenStandardDialog(false);
    dispatch(
      setCurrentStandard({
        id: null,
        stdcStdCode: null,
        stdcOrgCode: null,
        stdcOrgDescription: null,
        stdcBuCode: null,
        stdcBuName: null,
        stdcStdVersion: null,
        stdcCoursCode: null,
        stdcCoursDescription: null,
        stdcRlayCode: null,
        stdcRlayDescription: null,
        stdcPurcCode: null,
        stdcPurcName: null,
        stdcItemCode: null,
        stdcItemDescription: null,
        stdcItmcName: null,
        stdcItmcParent: null,
        stdcSchoCode: null,
        stdcSchoDescription: null,
        stdcPerformance: null,
        stdcRenewalCicle: null,
        stdcMaintenanceCicle: null,
        stdcDetail: null,
        stdcStatus: null,
      }),
    );

    dispatch(
      addNewCurrentStandarCourse({
        standardId: null,
        stdCode: null,
        stdOrgCode: null,
        stdOrgDescription: null,
        stdBuCode: null,
        stdPurcCode: null,
        stdPurcDescription: null,
        stdVersion: null,
        stdName: null,
        stdRegistrationDate: null,
        stdCaccCode: null,
        stdCaccDescription: null,
        stdSchoCode: null,
        stdSchoDescription: null,
        stdYear: null,
        stdAvailableForPurchase: null,
        relay: [],
      }),
    );

    dispatch(
      getAllStandardsByUserId(filterOptions, debouncedSearchTerm, '', () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setStandardsFetched(true);
      }),
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = standards.map(n => n.id);
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

  const handleStandardView = standard => {
    //console.log('handleUserView');
    dispatch(setCurrentStandard(standard));
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setCurrentStandard([]));
  };

  const handleStandardEdit = standard => {
    dispatch(setCurrentStandard(standard));
    setOpenStandardDialog(true);
  };

  const handleStandardDisable = standard => {
    setSelectedStandard(standard);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDisable = () => {
    setOpenConfirmDialog(false);
    const { stdCode, stdOrgCode, stdBuCode, stdPurcCode, stdVersion, stdStatus } = selectedStandard;
    dispatch(enableDisableStandard(stdCode, stdOrgCode, stdBuCode, stdPurcCode, stdVersion, stdStatus));
    //dispatch(
    //  getAllStandardsByUserId(() => {
    //    setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
    //    setStandardsFetched(true);
    //  }),
    //);
  };

  const handleCancelDisable = () => {
    setOpenConfirmDialog(false);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <StandardTableToolbar
          selected={selected}
          setSelected={setSelected}
          onStandardAdd={setOpenStandardDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <UserTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={standards.length}
            />
            <TableBody>
              {!!standards.length ? (
                stableSort(standards, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StandardListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onStandardEdit={handleStandardEdit}
                      onStandardDisable={handleStandardDisable}
                      onStandardView={handleStandardView}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>{<IntlMessages id="users.appModule.filterNoRecordsFound" />}</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {standardsFetched ? (
                          <IntlMessages id="standards.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="standards.appModule.loadingStandards" />
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
          count={standards.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          labelRowsPerPage={<IntlMessages id="table.pagination.rowsPerPage" />}
          labelDisplayedRows={({ from, to, count }) => (
            <span className={classes.paginationLabel}>
              {from}-{to} {<IntlMessages id="table.pagination.rowsOf" />} {count}
            </span>
          )}
        />
      </Paper>

      {openStandardDialog && <AddEditStandard open={openStandardDialog} onCloseDialog={handleCloseStandardDialog} />}
      {openViewDialog && <StandardDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="standards.appModule.disableConfirm" />}
        content={<IntlMessages id="standards.appModule.disableMessage" />}
        onClose={handleCancelDisable}
        onConfirm={handleConfirmDisable}
      />
    </div>
  );
};

export default StandardModule;
