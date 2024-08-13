import React, { useEffect, useState } from 'react';
import {
  Paper,
  Card,
  CardHeader,
  CardContent,
  Box,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GridContainer from '@jumbo/components/GridContainer';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import ItemListRow from './ItemListRow';
import ItemTableHead from './ItemTableHead';
import ItemTableToolbar from './ItemTableToolbar';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import AddEditItem from './AddEditItem';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '@jumbo/utils/commonHelper';
import useStyles from './index.style';
import ItemDetailView from './ItemDetailView';
import NoRecordFound from './NoRecordFound';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { deleteItem, getItems, setCurrentItem } from 'redux/actions/Items';
import { getAllItemCategories, getAllItemSubCategories } from 'redux/actions/ItemCategories';
import { getPurchaseAreas } from 'redux/actions/PurchaseAreas';

const ItemsModule = () => {
  const classes = useStyles();
  //******************Start Reducers******************/
  const { items } = useSelector(({ itemsReducer }) => itemsReducer);
  const { purchaseAreas } = useSelector(({ purchaseAreasReducer }) => purchaseAreasReducer);
  const { itemCategories } = useSelector(({ itemCategoriesReducer }) => itemCategoriesReducer);
  const { itemSubCategories } = useSelector(({ itemCategoriesReducer }) => itemCategoriesReducer);
  const { authUser, purchaseArea, businessUnit } = useSelector(({ auth }) => auth);
  //const { selectedBusinessUnit, selectedPurchaseArea } = JSON.parse(localStorage.getItem('userDomain'))

  //******************End Reducers********************/
  //******************Start Data Management***********/
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  //const [selectedItem, setSelectedItem] = useState({ name: '' });
  const [itemsFetched, setItemsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [orgCodeSelected, setOrgCodeSelected] = useState(null);
  const [purcCodeSelected, setPurcCodeSelected] = useState(null);
  const [famCodeSelected, setFamCodeSelected] = useState(null);
  const [subFamCodeSelected, setSubFamCodeSelected] = useState(null);

  //Purchase Areas
  const [purchaseAreaText, setPurchaseAreaText] = useState('');
  const [selectedPurchaseAreaError, setSelectedPurchaseAreaError] = useState('');
  const [selectedPurchaseArea, setSelectedPurchaseArea] = useState(null);

  const [searchPurchaseAreaTerm, setSearchPurchaseAreaTerm] = useState('');
  const [purchaseAreasFetched, setPurchaseAreasFetched] = useState(true);
  const debouncedSearchPurchaseAreaTerm = useDebounce(searchPurchaseAreaTerm, 500);

  //Item Categories
  const [itemCategoryText, setItemCategoryText] = useState('');
  const [selectedItemCategoryError, setSelectedItemCategoryError] = useState('');
  const [selectedItemCategory, setSelectedItemCategory] = useState(null);

  const [searchItemCategoryTerm, setSearchItemCategoryTerm] = useState('');
  const [itemCategoriesFetched, setitemCategoriesFetched] = useState(true);
  const debouncedSearchItemCategoryTerm = useDebounce(searchItemCategoryTerm, 500);

  //Item SuCategories
  const [itemSubCategoryText, setItemSubCategoryText] = useState('');
  const [selectedItemSubCategoryError, setSelectedItemSubCategoryError] = useState('');
  const [selectedItemSubCategory, setSelectedItemSubCategory] = useState(null);

  const [searchItemSubCategoryTerm, setSearchItemSubCategoryTerm] = useState('');
  const [itemSubCategoriesFetched, setItemSubCategoriesFetched] = useState(true);
  const debouncedSearchItemSubCategoryTerm = useDebounce(searchItemSubCategoryTerm, 500);

  // Item Selected
  const [selectedItem, setSelectedItem] = useState('');
  //******************Start Use Efect*****************/
  const dispatch = useDispatch();

  // Purchase Areas
  useEffect(() => {
    dispatch(
      getPurchaseAreas([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setItemsFetched(true);
      }),
    );
  }, []);

  // Items
  useEffect(() => {
    //Set purchase area
    for (let i = 0; i < purchaseAreas.length; i++) {
      if (purchaseAreas[i].purcCode === purchaseArea) {
        setPurchaseAreaText(purchaseAreas[i]);
        setSelectedPurchaseArea(purchaseAreas[i].purcCode);
        break;
      }
    }

    //Items filtered by purchase area (Area de Gestion)
    dispatch(
      getItems(
        orgCodeSelected,
        //selectedPurchaseArea,
        purchaseArea,
        selectedItemCategory,
        selectedItemSubCategory,
        filterOptions,
        debouncedSearchTerm,
        () => {
          setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          setItemsFetched(true);
        },
      ),
      setPage(0),
    );
  }, [dispatch, purchaseAreas, selectedItemCategory, selectedItemSubCategory, filterOptions, debouncedSearchTerm]);

  //Categories
  useEffect(() => {
    dispatch(
      getAllItemCategories(purchaseArea, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setItemsFetched(true);
      }),
    );
  }, [dispatch, purchaseAreas, selectedPurchaseArea]);

  //Sub Categories
  useEffect(() => {
    dispatch(
      getAllItemSubCategories(selectedPurchaseArea, selectedItemCategory, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setItemsFetched(true);
      }),
    );
  }, [dispatch, selectedItemCategory]);

  //******************End Use Efect*****************/
  //******************Start Functions***************/

  const handleCloseUserDialog = () => {
    setOpenItemDialog(false);
    dispatch(setCurrentItem(null));
    //console.log('');
    dispatch(
      getItems(
        orgCodeSelected,
        purcCodeSelected,
        famCodeSelected,
        subFamCodeSelected,
        filterOptions,
        debouncedSearchTerm,
        () => {
          setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          setItemsFetched(true);
        },
      ),
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = items.map(n => n.itemCode);
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

  const handleItemView = item => {
    //console.log('handleItemView');
    dispatch(setCurrentItem(item));
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setCurrentItem(null));
  };

  const handleItemEdit = item => {
    //console.log('handleItemEdit');
    dispatch(setCurrentItem(item));
    setOpenItemDialog(true);
  };

  const handleItemDelete = item => {
    setSelectedItem(item);
    // console.log('handleItemDelete');
    // console.log({selectedItem});
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);

    dispatch(deleteItem(selectedItem.itemCode));
    dispatch(
      getItems(
        orgCodeSelected,
        purcCodeSelected,
        famCodeSelected,
        subFamCodeSelected,
        filterOptions,
        debouncedSearchTerm,
        () => {
          setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          setItemsFetched(true);
        },
      ),
    );
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  //******************End Functions****************/
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Card className={classes.root}>
          <CardHeader className={classes.dialogTitleRoot} title={<IntlMessages id="items.appModule.filterLabel.items" />} />
          <CardContent>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
              <GridContainer>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="purchaseAreas"
                    options={purchaseAreas}
                    value={purchaseAreaText}
                    getOptionLabel={option => option.purcName}
                    style={{ width: '100%' }}
                    //defaultValue={null}
                    disabled
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="items.appModule.filterLabel.purchaseArea" />}
                        variant="outlined"
                        helperText={selectedPurchaseAreaError}
                      />
                    )}
                    onChange={(event, value) => {
                      setSelectedPurchaseArea(value ? value.purcCode : null);
                      setPurchaseAreaText(value);
                      setSelectedPurchaseAreaError('');
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="itemCategories"
                    options={itemCategories}
                    value={itemCategoryText}
                    getOptionLabel={option => option.itmcName}
                    style={{ width: '100%' }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="items.appModule.filterLabel.itemCategory" />}
                        variant="outlined"
                        helperText={selectedItemCategoryError}
                      />
                    )}
                    onChange={(event, value) => {
                      setSelectedItemCategory(value ? value.itmcCode : null);
                      setItemCategoryText(value);
                      setSelectedItemCategoryError('');
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="itemSubCategories"
                    options={itemSubCategories}
                    value={itemSubCategoryText}
                    getOptionLabel={option => option.itmcName}
                    style={{ width: '100%' }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={<IntlMessages id="items.appModule.filterLabel.itemSubCategory" />}
                        variant="outlined"
                        helperText={selectedItemSubCategoryError}
                      />
                    )}
                    onChange={(event, value) => {
                      setSelectedItemSubCategory(value ? value.itmcCode : null);
                      setItemSubCategoryText(value);
                      setSelectedItemSubCategoryError('');
                    }}
                  />
                </Grid>
              </GridContainer>
            </Box>
          </CardContent>
        </Card>
      </Paper>
      <Paper className={classes.paper}>
        <ItemTableToolbar
          selected={selected}
          setSelected={setSelected}
          onMajorAdd={setOpenItemDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <ItemTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={items.length}
            />
            <TableBody>
              {!!items.length ? (
                stableSort(items, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <ItemListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onItemEdit={handleItemEdit}
                      onItemDelete={handleItemDelete}
                      onItemView={handleItemView}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>{<IntlMessages id="items.appModule.filterNoRecordsFound" />}</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {itemsFetched ? (
                          <IntlMessages id="items.appModule.noRecordsFound" />
                        ) : (
                          <IntlMessages id="items.appModule.loadingItems" />
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
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openItemDialog && <AddEditItem open={openItemDialog} onCloseDialog={handleCloseUserDialog} />}
      {openViewDialog && <ItemDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="items.appModule.deleteConfirm" />}
        content={<IntlMessages id="items.appModule.deleteMessage" values={{ code: selectedItem.itemCode }} />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ItemsModule;
