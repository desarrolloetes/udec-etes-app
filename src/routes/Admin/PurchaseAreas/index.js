import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import PurchaseAreaListRow from './PurchaseAreaListRow';
import PurchaseAreaTableHead from './PurchaseAreaTableHead';
import PurchaseAreaTableToolbar from './PurchaseAreaTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import { deletePurchaseArea, getPurchaseAreas, setCurrentPurchaseArea } from 'redux/actions/PurchaseAreas';
import AddEditPurchaseArea from './AddEditPurchaseArea';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '@jumbo/utils/commonHelper';
import useStyles from './index.style';
import PurchaseAreaDetailView from './PurchaseAreaDetailView';
import NoRecordFound from './NoRecordFound';
import IntlMessages from '@jumbo/utils/IntlMessages';

const PurchaseAreasModule = () => {
  const classes = useStyles();
  const { purchaseAreas } = useSelector(({ purchaseAreasReducer }) => purchaseAreasReducer);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openPurchaseAreaDialog, setOpenPurchaseAreaDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedPurchaseArea, setselectedPurchaseArea] = useState({
    name: '',
  });
  const [purchaseAreasFetched, setpurchaseAreasFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPurchaseAreas(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setpurchaseAreasFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const handleCloseUserDialog = () => {
    setOpenPurchaseAreaDialog(false);
    dispatch(setCurrentPurchaseArea(null));
    //console.log('');
    dispatch(
      getPurchaseAreas(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setpurchaseAreasFetched(true);
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
      const newSelected = purchaseAreas.map(n => n.purcCode);
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

  const handlePurchaseAreaView = purchaseArea => {
    //console.log('handlePurchaseAreaView');
    dispatch(setCurrentPurchaseArea(purchaseArea));
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setCurrentPurchaseArea(null));
  };

  const handlePurchaseAreaEdit = purchaseArea => {
    //console.log('handlePurchaseAreaEdit');
    //console.log(purchaseArea);
    dispatch(setCurrentPurchaseArea(purchaseArea));
    setOpenPurchaseAreaDialog(true);
  };

  const handlePurchaseAreaDelete = purchaseArea => {
    setselectedPurchaseArea(purchaseArea);
    // console.log('handlePurchaseAreaDelete');
    // console.log({selectedPurchaseArea});
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);

    dispatch(deletePurchaseArea(selectedPurchaseArea.purcCode));
    dispatch(
      getPurchaseAreas(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setpurchaseAreasFetched(true);
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
        <PurchaseAreaTableToolbar
          selected={selected}
          setSelected={setSelected}
          onPurchaseAreaAdd={setOpenPurchaseAreaDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <PurchaseAreaTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={purchaseAreas.length}
            />
            <TableBody>
              {!!purchaseAreas.length ? (
                stableSort(purchaseAreas, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <PurchaseAreaListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onPurchaseAreaEdit={handlePurchaseAreaEdit}
                      onPurchaseAreaDelete={handlePurchaseAreaDelete}
                      onPurchaseAreaView={handlePurchaseAreaView}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>{<IntlMessages id="purchaseAreas.appModule.filterNoRecordsFound" />}</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {purchaseAreasFetched ? (
                          <IntlMessages id="purchaseAreas.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="purchaseAreas.appModule.loadingPurchaseAreas" />
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
          count={purchaseAreas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openPurchaseAreaDialog && <AddEditPurchaseArea open={openPurchaseAreaDialog} onCloseDialog={handleCloseUserDialog} />}
      {openViewDialog && <PurchaseAreaDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="purchaseAreas.appModule.deleteConfirm" />}
        content={<IntlMessages id="purchaseAreas.appModule.deleteMessage" />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default PurchaseAreasModule;
