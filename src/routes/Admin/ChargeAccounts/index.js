import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import ChargeAccountListRow from './ChargeAccountListRow';
import ChargeAccountTableHead from './ChargeAccountTableHead';
import ChargeAccountTableToolbar from './ChargeAccountTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChargeAccount, getChargeAccounts, setCurrentChargeAccount } from 'redux/actions/ChargeAccounts';
import AddEditChargeAccount from './AddEditChargeAccount';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '@jumbo/utils/commonHelper';
import useStyles from './index.style';
import ChargeAccountDetailView from './ChargeAccountDetailView';
import NoRecordFound from './NoRecordFound';
import IntlMessages from '@jumbo/utils/IntlMessages';

const ChargeAccountsModule = () => {
  const classes = useStyles();
  const { chargeAccounts } = useSelector(({ chargeAccountsReducer }) => chargeAccountsReducer);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openChargeAccountDialog, setOpenChargeAccountDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedChargeAccount, setSelectedChargeAccount] = useState({
    name: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [chargeAccountsFetched, setChargeAccountsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getChargeAccounts(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setChargeAccountsFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const handleCloseUserDialog = () => {
    setOpenChargeAccountDialog(false);
    dispatch(setCurrentChargeAccount(null));
    //console.log('');
    dispatch(
      getChargeAccounts(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setChargeAccountsFetched(true);
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
      const newSelected = chargeAccounts.map(n => n.buCode);
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

  const handleChargeAccountView = chargeAccounts => {
    //console.log('handleChargeAccountView');
    dispatch(setCurrentChargeAccount(chargeAccounts));
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setCurrentChargeAccount(null));
  };

  const handleChargeAccountEdit = chargeAccounts => {
    //console.log('handleChargeAccountEdit');
    dispatch(setCurrentChargeAccount(chargeAccounts));
    setOpenChargeAccountDialog(true);
  };

  const handleChargeAccountDelete = chargeAccounts => {
    setSelectedChargeAccount(chargeAccounts);
    // console.log('handleChargeAccountDelete');
    // console.log({selectedChargeAccount});
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    dispatch(deleteChargeAccount(selectedChargeAccount.caccCode, selectedChargeAccount.caccOrgCode));
    dispatch(
      getChargeAccounts(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setChargeAccountsFetched(true);
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
        <ChargeAccountTableToolbar
          selected={selected}
          setSelected={setSelected}
          onChargeAccountAdd={setOpenChargeAccountDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <ChargeAccountTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={chargeAccounts.length}
            />
            <TableBody>
              {!!chargeAccounts.length ? (
                stableSort(chargeAccounts, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <ChargeAccountListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onChargeAccountEdit={handleChargeAccountEdit}
                      onChargeAccountDelete={handleChargeAccountDelete}
                      onChargeAccountView={handleChargeAccountView}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>{<IntlMessages id="chargeAccounts.appModule.filterNoRecordsFound" />}</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {chargeAccountsFetched ? (
                          <IntlMessages id="chargeAccounts.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="chargeAccounts.appModule.loadingChargeAccounts" />
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
          count={chargeAccounts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openChargeAccountDialog && (
        <AddEditChargeAccount open={openChargeAccountDialog} onCloseDialog={handleCloseUserDialog} />
      )}
      {openViewDialog && <ChargeAccountDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="chargeAccounts.appModule.deleteConfirm" />}
        content={<IntlMessages id="chargeAccounts.appModule.deleteMessage" />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ChargeAccountsModule;
