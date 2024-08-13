import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import GapListRow from './GapListRow';
import GapTableHead from './GapTableHead';
import GapTableToolbar from './GapTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '@jumbo/utils/commonHelper';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { deleteProcess, getAllProcesses, setCurrentProcess } from 'redux/actions/Processes';
import AddEditGap from './AddEditGap';
import GapDdaDetailView from './GapDdaDetailView';
import GapStkDetailView from './GapStkDetailView';
import GapSourceDemandDetailView from './GapSourceDemandDetailView';
import GapSourceStandardDetailView from './GapSourceStandardDetailView';
import GapSourceStockDetailView from './GapSourceStockDetailView';
import GapPurchasesDetailView from './GapPurchasesDetailView';

const GapModule = () => {
  const proctId = process.env.REACT_APP_SOURCE_BRECHA;
  const classes = useStyles();
  const { procesess } = useSelector(({ procesessReducer }) => procesessReducer);
  const { purchaseArea } = useSelector(({ auth }) => auth);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openGapDemandVsStockViewDialog, setOpenGapDemandVsStockViewDialog] = useState(false);
  const [openGapStockVsDemandViewDialog, setOpenGapStockVsDemandViewDialog] = useState(false);
  const [openStockViewDialog, setOpenStockViewDialog] = useState(false);
  const [openDemandViewDialog, setOpenDemandViewDialog] = useState(false);
  const [openStandardViewDialog, setOpenStandardViewDialog] = useState(false);
  const [openGapPurchasesViewDialog, setOpenGapPurchasesViewDialog] = useState(false);
  const [openGapDialog, setopenGapDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState({
    name: '',
  });
  const [procesessFetched, setProcesessFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllProcesses(filterOptions, debouncedSearchTerm, proctId, purchaseArea, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setProcesessFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const handleCloseUserDialog = () => {
    setopenGapDialog(false);
    dispatch(setCurrentProcess(null));
    //console.log('');
    dispatch(
      getAllProcesses(filterOptions, debouncedSearchTerm, proctId, purchaseArea, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setProcesessFetched(true);
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
      const newSelected = procesess.map(n => n.procId);
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

  const handleGapStockVsDemand = proc => {
    dispatch(setCurrentProcess(proc));
    setOpenGapStockVsDemandViewDialog(true);
  };

  const handleGapDemandVsStock = proc => {
    dispatch(setCurrentProcess(proc));
    setOpenGapDemandVsStockViewDialog(true);
  };

  const handleGapStock = proc => {
    dispatch(setCurrentProcess(proc));
    setOpenStockViewDialog(true);
  };

  const handleGapDemand = proc => {
    dispatch(setCurrentProcess(proc));
    setOpenDemandViewDialog(true);
  };

  const handleGapStandard = proc => {
    dispatch(setCurrentProcess(proc));
    setOpenStandardViewDialog(true);
  };

  const handleGapPurchases = proc => {
    dispatch(setCurrentProcess(proc));
    setOpenGapPurchasesViewDialog(true);
  };

  const handleCloseGapDemandVsStockViewDialog = () => {
    setOpenGapDemandVsStockViewDialog(false);
    dispatch(setCurrentProcess(null));
  };

  const handleCloseGapStockVsDemandViewDialog = () => {
    setOpenGapStockVsDemandViewDialog(false);
    dispatch(setCurrentProcess(null));
  };

  const handleCloseStockViewDialog = () => {
    setOpenStockViewDialog(false);
    dispatch(setCurrentProcess(null));
  };

  const handleCloseDemandViewDialog = () => {
    setOpenDemandViewDialog(false);
    dispatch(setCurrentProcess(null));
  };

  const handleCloseStandardViewDialog = () => {
    setOpenStandardViewDialog(false);
    dispatch(setCurrentProcess(null));
  };

  const handleCloseGapPurchasesViewDialog = () => {
    setOpenGapPurchasesViewDialog(false);
    dispatch(setCurrentProcess(null));
  };

  const handleGapLog = proc => {
    setSelectedProcess(proc);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);

    dispatch(deleteProcess(selectedProcess.procId));
    dispatch(
      getAllProcesses(filterOptions, debouncedSearchTerm, proctId, purchaseArea, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setProcesessFetched(true);
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
        <GapTableToolbar
          selected={selected}
          setSelected={setSelected}
          onProcessAdd={setopenGapDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <GapTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={procesess.length}
            />
            <TableBody>
              {!!procesess.length ? (
                stableSort(procesess, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <GapListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onProcessStockVsDemand={handleGapStockVsDemand}
                      onProcessDemandVsStock={handleGapDemandVsStock}
                      onProcessStock={handleGapStock}
                      onProcessDemand={handleGapDemand}
                      onProcessStandard={handleGapStandard}
                      onProcessGapPurchases={handleGapPurchases}
                      onProcessLog={handleGapLog}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>{<IntlMessages id="procesess.appModule.filterNoRecordsFound" />}</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {procesessFetched ? (
                          <IntlMessages id="procesess.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="procesess.appModule.loadingGapSourceStocks" />
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
          count={procesess.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openGapDialog && <AddEditGap open={openGapDialog} onCloseDialog={handleCloseUserDialog} />}
      {openGapDemandVsStockViewDialog && (
        <GapDdaDetailView open={openGapDemandVsStockViewDialog} onCloseDialog={handleCloseGapDemandVsStockViewDialog} />
      )}
      {openGapStockVsDemandViewDialog && (
        <GapStkDetailView open={openGapStockVsDemandViewDialog} onCloseDialog={handleCloseGapStockVsDemandViewDialog} />
      )}
      {openStockViewDialog && (
        <GapSourceStockDetailView open={openStockViewDialog} onCloseDialog={handleCloseStockViewDialog} />
      )}
      {openStandardViewDialog && (
        <GapSourceStandardDetailView open={openStandardViewDialog} onCloseDialog={handleCloseStandardViewDialog} />
      )}
      {openDemandViewDialog && (
        <GapSourceDemandDetailView open={openDemandViewDialog} onCloseDialog={handleCloseDemandViewDialog} />
      )}
      {openGapPurchasesViewDialog && (
        <GapPurchasesDetailView open={openGapPurchasesViewDialog} onCloseDialog={handleCloseGapPurchasesViewDialog} />
      )}

      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="procesess.appModule.deleteConfirm" />}
        content={<IntlMessages id="procesess.appModule.deleteMessage" />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default GapModule;
