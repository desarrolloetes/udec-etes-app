import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import UserListRow from './UserListRow';
import UserTableHead from './UserTableHead';
import UserTableToolbar from './UserTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getUsers,
  setCurrentUser,
  setCurrentUserRoles,
  setCurrentUserPurchaseAreas,
  setCurrentUserBusinessUnits,
} from 'redux/actions/Users';
import AddEditUser from './AddEditUser';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '@jumbo/utils/commonHelper';
import useStyles from './index.style';
import UserDetailView from './UserDetailView';
import NoRecordFound from './NoRecordFound';
import IntlMessages from '@jumbo/utils/IntlMessages';
import UserRoles from './UserRoles';
import UserPurchaseAreas from './UserPurchaseAreas';
import UserBusinessUnits from './UserBusinessUnits';

const UsersModule = () => {
  const classes = useStyles();
  const { users } = useSelector(({ usersReducer }) => usersReducer);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ name: '' });
  const [usersFetched, setUsersFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [openUserRolesDialog, setOpenUserRolesDialog] = useState(false);
  const [openUserPurchaseAreasDialog, setOpenUserPurchaseAreasDialog] = useState(false);
  const [openUserBusinessUnitsDialog, setOpenUserBusinessUnitsDialog] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUsers(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setUsersFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
    dispatch(setCurrentUser(null));
    dispatch(setCurrentUserRoles([]));
    dispatch(setCurrentUserPurchaseAreas([]));
    dispatch(setCurrentUserBusinessUnits([]));
    //console.log('');
    dispatch(
      getUsers(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setUsersFetched(true);
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
      const newSelected = users.map(n => n.userId);
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

  const handleUserView = user => {
    //console.log('handleUserView');
    dispatch(setCurrentUser(user));
    setOpenViewDialog(true);
  };

  const handleUserRolesView = user => {
    //console.log('handleUserRolesView');
    dispatch(setCurrentUser(user));
    setOpenUserRolesDialog(true);
  };

  const handleUserPurchaseAreasView = user => {
    //console.log('handleUserRolesView');
    dispatch(setCurrentUser(user));
    setOpenUserPurchaseAreasDialog(true);
  };

  const handleUserBusinessUnitsView = user => {
    //console.log('handleUserRolesView');
    dispatch(setCurrentUser(user));
    setOpenUserBusinessUnitsDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setCurrentUser(null));
    dispatch(setCurrentUserRoles(null));
  };

  const handleCloseUserRolesDialog = () => {
    setOpenUserRolesDialog(false);
    dispatch(setCurrentUser(null));
    dispatch(setCurrentUserRoles([]));
  };

  const handleCloseUserPurchaseAreasDialog = () => {
    setOpenUserPurchaseAreasDialog(false);
    dispatch(setCurrentUser(null));
    dispatch(setCurrentUserPurchaseAreas([]));
  };

  const handleCloseUserBusinessUnitsDialog = () => {
    setOpenUserBusinessUnitsDialog(false);
    dispatch(setCurrentUser(null));
    dispatch(setCurrentUserBusinessUnits([]));
  };

  const handleUserEdit = user => {
    //console.log('handleUserEdit');
    dispatch(setCurrentUser(user));
    setOpenUserDialog(true);
  };

  const handleUserDelete = user => {
    // console.log('handleUserDelete');
    setSelectedUser(user);
    // console.log('handleUserDelete');
    // console.log({selectedUser});
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    dispatch(deleteUser(selectedUser.userId));
    dispatch(
      getUsers(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setUsersFetched(true);
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
        <UserTableToolbar
          selected={selected}
          setSelected={setSelected}
          onUserAdd={setOpenUserDialog}
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
              rowCount={users.length}
            />
            <TableBody>
              {!!users.length ? (
                stableSort(users, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onUserEdit={handleUserEdit}
                      onUserDelete={handleUserDelete}
                      onUserView={handleUserView}
                      onUserRoles={handleUserRolesView}
                      onUserPurchaseAreas={handleUserPurchaseAreasView}
                      onUserBusinessUnits={handleUserBusinessUnitsView}
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
                        {usersFetched ? (
                          <IntlMessages id="users.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="users.appModule.loadingUsers" />
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openUserDialog && <AddEditUser open={openUserDialog} onCloseDialog={handleCloseUserDialog} />}
      {openViewDialog && <UserDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}
      {openUserRolesDialog && <UserRoles open={openUserRolesDialog} onCloseDialog={handleCloseUserRolesDialog} />}
      {openUserPurchaseAreasDialog && (
        <UserPurchaseAreas open={openUserPurchaseAreasDialog} onCloseDialog={handleCloseUserPurchaseAreasDialog} />
      )}
      {openUserBusinessUnitsDialog && (
        <UserBusinessUnits open={openUserBusinessUnitsDialog} onCloseDialog={handleCloseUserBusinessUnitsDialog} />
      )}

      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="users.appModule.deleteConfirm" />}
        content={<IntlMessages id="users.appModule.deleteMessage" />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UsersModule;
