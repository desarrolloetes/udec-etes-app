import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import MajorListRow from './MajorListRow';
import MajorTableHead from './MajorTableHead';
import MajorTableToolbar from './MajorTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMajor, getMajors, setCurrentMajor } from 'redux/actions/Majors';
import AddEditMajor from './AddEditMajor';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '@jumbo/utils/commonHelper';
import useStyles from './index.style';
import MajorDetailView from './MajorDetailView';
import NoRecordFound from './NoRecordFound';
import IntlMessages from '@jumbo/utils/IntlMessages';

const MajorsModule = () => {
  const classes = useStyles();
  const { majors } = useSelector(({ majorsReducer }) => majorsReducer);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openMajorDialog, setOpenMajorDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState({
    name: '',
  });
  const [majorsFetched, setMajorsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMajors(filterOptions, debouncedSearchTerm, null, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setMajorsFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const handleCloseUserDialog = () => {
    setOpenMajorDialog(false);
    dispatch(setCurrentMajor(null));
    //console.log('');
    dispatch(
      getMajors(filterOptions, debouncedSearchTerm, null, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setMajorsFetched(true);
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
      const newSelected = majors.map(n => n.majorCode);
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

  const handleMajorView = major => {
    //console.log('handleMajorView');
    dispatch(setCurrentMajor(major));
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setCurrentMajor(null));
  };

  const handleMajorEdit = major => {
    //console.log('handleMajorEdit');
    dispatch(setCurrentMajor(major));
    setOpenMajorDialog(true);
  };

  const handleMajorDelete = major => {
    setSelectedMajor(major);
    // console.log('handleMajorDelete');
    // console.log({selectedMajor});
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);

    dispatch(deleteMajor(selectedMajor.majorCode));
    dispatch(
      getMajors(filterOptions, debouncedSearchTerm, null, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setMajorsFetched(true);
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
        <MajorTableToolbar
          selected={selected}
          setSelected={setSelected}
          onMajorAdd={setOpenMajorDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <MajorTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={majors.length}
            />
            <TableBody>
              {!!majors.length ? (
                stableSort(majors, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <MajorListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onMajorEdit={handleMajorEdit}
                      onMajorDelete={handleMajorDelete}
                      onMajorView={handleMajorView}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>{<IntlMessages id="majors.appModule.filterNoRecordsFound" />}</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {majorsFetched ? (
                          <IntlMessages id="majors.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="majors.appModule.loadingMajors" />
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
          count={majors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openMajorDialog && <AddEditMajor open={openMajorDialog} onCloseDialog={handleCloseUserDialog} />}
      {openViewDialog && <MajorDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="majors.appModule.deleteConfirm" />}
        content={<IntlMessages id="majors.appModule.deleteMessage" />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default MajorsModule;
