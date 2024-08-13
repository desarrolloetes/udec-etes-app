import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import BusinessUnitListRow from './BusinessUnitListRow';
import BusinessUnitTableHead from './BusinessUnitTableHead';
import BusinessUnitTableToolbar from './BusinessUnitTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBusinessUnit, getBusinessUnits, setCurrentBusinessUnit } from 'redux/actions/BusinessUnits';
import AddEditBusinessUnit from './AddEditBusinessUnit';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '@jumbo/utils/commonHelper';
import useStyles from './index.style';
import BusinessUnitDetailView from './BusinessUnitDetailView';
import NoRecordFound from './NoRecordFound';
import IntlMessages from '@jumbo/utils/IntlMessages';

const BusinessUnitsModule = () => {
  const classes = useStyles();
  const { businessUnits } = useSelector(({ businessUnitsReducer }) => businessUnitsReducer);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openBusinessUnitDialog, setOpenBusinessUnitDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState({
    name: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [businessUnitsFetched, setBusinessUnitsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getBusinessUnits(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setBusinessUnitsFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const handleCloseUserDialog = () => {
    setOpenBusinessUnitDialog(false);
    dispatch(setCurrentBusinessUnit(null));
    //console.log('');
    dispatch(
      getBusinessUnits(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setBusinessUnitsFetched(true);
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
      const newSelected = businessUnits.map(n => n.buCode);
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

  const handleBusinessUnitView = businessUnit => {
    //console.log('handleBusinessUnitView');
    dispatch(setCurrentBusinessUnit(businessUnit));
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setCurrentBusinessUnit(null));
  };

  const handleBusinessUnitEdit = businessUnit => {
    //console.log('handleBusinessUnitEdit');
    dispatch(setCurrentBusinessUnit(businessUnit));
    setOpenBusinessUnitDialog(true);
  };

  const handleBusinessUnitDelete = businessUnit => {
    setSelectedBusinessUnit(businessUnit);
    // console.log('handleBusinessUnitDelete');
    // console.log({selectedBusinessUnit});
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);

    dispatch(deleteBusinessUnit(selectedBusinessUnit.buCode));
    dispatch(
      getBusinessUnits(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setBusinessUnitsFetched(true);
      }),
    );
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <BusinessUnitTableToolbar
          selected={selected}
          setSelected={setSelected}
          onBusinessUnitAdd={setOpenBusinessUnitDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <BusinessUnitTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={businessUnits.length}
            />
            <TableBody>
              {!!businessUnits.length ? (
                stableSort(businessUnits, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <BusinessUnitListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onBusinessUnitEdit={handleBusinessUnitEdit}
                      onBusinessUnitDelete={handleBusinessUnitDelete}
                      onBusinessUnitView={handleBusinessUnitView}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>{<IntlMessages id="businessUnits.appModule.filterNoRecordsFound" />}</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {businessUnitsFetched ? (
                          <IntlMessages id="businessUnits.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="businessUnits.appModule.loadingBusinessUnits" />
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
          count={businessUnits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openBusinessUnitDialog && <AddEditBusinessUnit open={openBusinessUnitDialog} onCloseDialog={handleCloseUserDialog} />}
      {openViewDialog && <BusinessUnitDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="businessUnits.appModule.deleteConfirm" />}
        content={<IntlMessages id="businessUnits.appModule.deleteMessage" />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default BusinessUnitsModule;
