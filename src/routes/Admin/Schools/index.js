import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import SchoolListRow from './SchoolListRow';
import SchoolTableHead from './SchoolTableHead';
import SchoolTableToolbar from './SchoolTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSchool, getSchools, setCurrentSchool } from 'redux/actions/Schools';
import AddEditSchool from './AddEditSchool';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '@jumbo/utils/commonHelper';
import useStyles from './index.style';
import SchoolDetailView from './SchoolDetailView';
import NoRecordFound from './NoRecordFound';
import IntlMessages from '@jumbo/utils/IntlMessages';

const SchoolsModule = () => {
  const classes = useStyles();
  const { schools } = useSelector(({ schoolsReducer }) => schoolsReducer);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openSchoolDialog, setOpenSchoolDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState({
    name: '',
  });
  const [schoolsFetched, setSchoolsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSchools(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setSchoolsFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const handleCloseUserDialog = () => {
    setOpenSchoolDialog(false);
    dispatch(setCurrentSchool(null));
    //console.log('');
    dispatch(
      getSchools(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setSchoolsFetched(true);
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
      const newSelected = schools.map(n => n.schoCode);
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

  const handleSchoolView = school => {
    //console.log('handleSchoolView');
    dispatch(setCurrentSchool(school));
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setCurrentSchool(null));
  };

  const handleSchoolEdit = school => {
    //console.log('handleSchoolEdit');
    dispatch(setCurrentSchool(school));
    setOpenSchoolDialog(true);
  };

  const handleSchoolDelete = school => {
    setSelectedSchool(school);
    // console.log('handleSchoolDelete');
    // console.log({selectedSchool});
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);

    dispatch(deleteSchool(selectedSchool.schoCode));
    dispatch(
      getSchools(filterOptions, debouncedSearchTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setSchoolsFetched(true);
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
        <SchoolTableToolbar
          selected={selected}
          setSelected={setSelected}
          onSchoolAdd={setOpenSchoolDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <SchoolTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={schools.length}
            />
            <TableBody>
              {!!schools.length ? (
                stableSort(schools, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <SchoolListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onSchoolEdit={handleSchoolEdit}
                      onSchoolDelete={handleSchoolDelete}
                      onSchoolView={handleSchoolView}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>{<IntlMessages id="schools.appModule.filterNoRecordsFound" />}</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {schoolsFetched ? (
                          <IntlMessages id="schools.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="schools.appModule.loadingSchools" />
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
          count={schools.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openSchoolDialog && <AddEditSchool open={openSchoolDialog} onCloseDialog={handleCloseUserDialog} />}
      {openViewDialog && <SchoolDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="schools.appModule.deleteConfirm" />}
        content={<IntlMessages id="schools.appModule.deleteMessage" />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default SchoolsModule;
