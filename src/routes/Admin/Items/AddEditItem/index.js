import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import GridContainer from '@jumbo/components/GridContainer';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import AppSelectBox from '@jumbo/components/Common/formElements/AppSelectBox';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { addNewItem, updateItem } from 'redux/actions/Items';
import { useDebounce } from '@jumbo/utils/commonHelper';
import AddEditItemAttributesListRow from './AddEditItemAttributesListRow';
import AddEditItemAttributesTableHead from './AddEditItemAttributesTableHead';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import CmtAvatar from '@coremat/CmtAvatar';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
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
import { deleteItem, getItems, setCurrentItem } from '../../../../redux/actions/Items';
import { getAllItemCategories, getAllItemSubCategories } from '../../../../redux/actions/ItemCategories';
import { getPurchaseAreas } from '../../../../redux/actions/PurchaseAreas';
import { getAllItemAttributesByPurcCode } from '../../../../redux/actions/ItemsAttributes';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 16,
      color: theme.palette.common.dark,
    },
  },
}));

const statusLabels = [
  { title: 'Activo', slug: 'S' },
  { title: 'Inactivo', slug: 'N' },
];

const attributes = [
  { title: 'itemAttribute01', code: '1' },
  { title: 'itemAttribute02', code: '2' },
  { title: 'itemAttribute03', code: '3' },
  { title: 'itemAttribute04', code: '4' },
  { title: 'itemAttribute05', code: '5' },
  { title: 'itemAttribute06', code: '6' },
  { title: 'itemAttribute07', code: '7' },
];

const itemCurrencyCodes = [
  { itmcName: 'USD', itmcCode: 'USD' },
  { itmcName: 'Peso', itmcCode: 'CLP' },
];

const attributesValues = [
  { itmaCode: null, itmaValue: null },
  { itmaCode: null, itmaValue: null },
  { itmaCode: null, itmaValue: null },
  { itmaCode: null, itmaValue: null },
  { itmaCode: null, itmaValue: null },
  { itmaCode: null, itmaValue: null },
  { itmaCode: null, itmaValue: null },
];

const itemStatus = [
  { statusName: 'Activo', statusCode: 'S' },
  { statusName: 'Inactivo', statusCode: 'N' },
];

const AddEditItem = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  //******************Start Reducers******************/
  const currentItem = useSelector(({ itemsReducer }) => itemsReducer.currentItem);
  const { purchaseAreas } = useSelector(({ purchaseAreasReducer }) => purchaseAreasReducer);
  const { itemCategories } = useSelector(({ itemCategoriesReducer }) => itemCategoriesReducer);
  const { itemSubCategories } = useSelector(({ itemCategoriesReducer }) => itemCategoriesReducer);
  const { itemAttributes } = useSelector(({ itemsAttributesReducer }) => itemsAttributesReducer);

  //******************End Reducers********************/
  //******************Start Data Management***********/
  const [profile_pic, setProfile_pic] = useState('');
  const [selectedItem, setSelectedItem] = useState({ name: '' });
  const [itemsFetched, setItemsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  //ItemName
  const [itemName, setItemName] = useState('');
  const [itemNameError, setItemNameError] = useState('');

  //Item Description
  const [itemDescription, setItemDescription] = useState('');
  const [itemDescriptionError, setItemDescriptionError] = useState('');

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

  //Item Renewal Cicle
  const [itemRenewalCicle, setItemRenewalCicle] = useState('');
  const [itemRenewalCicleError, setItemRenewalCicleError] = useState('');

  //Item Maintenenace Cicle
  const [itemMaintenanceCicle, setItemMaintenanceCicle] = useState('');
  const [itemMaintenanceCicleError, setItemMaintenanceCicleError] = useState('');

  //item Currency Code
  const [selectedItemCurrencyCode, setSelectedItemCurrencyCode] = useState('');
  const [selectedItemCurrencyCodeError, setSelectedItemCurrencyCodeError] = useState('');
  const [itemCurrencyCodeText, setItemCurrencyCodeText] = useState('');
  const [itemCurrencyCodeError, setItemCurrencyCodeError] = useState('');
  //const [itemCurrencyCodes, setItemCurrencyCodes] = useState([]);

  //Item Unit Value
  const [itemUnitValue, setItemUnitValue] = useState('');
  const [itemUnitValueError, setItemUnitValueError] = useState('');

  //Item Isbn
  const [itemIsbn, setItemIsbn] = useState('');
  const [itemIsbnError, setItemIsbnError] = useState('');

  //item Status
  const [selectedItemStatus, setSelectedItemStatus] = useState('');
  const [selectedItemStatusError, setSelectedItemStatusError] = useState('');
  const [itemStatusText, setItemStatusText] = useState('');
  const [itemStatusError, setItemStatusError] = useState('');
  //const [itemCurrencyCodes, setItemCurrencyCodes] = useState([]);

  //Tabla de Item Atributes
  //const [itemsAttributes, setItemsAttributes] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  //const [isFilterApplied, setFilterApplied] = useState(false);
  //const [filterOptions, setFilterOptions] = React.useState([]);
  //const [searchTerm, setSearchTerm] = useState('');
  //const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [attributesFetched, setAttributesFetched] = useState(true);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      //setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  //confirm dialog
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  //******************* Start UseEffect ****************/
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentItem) {
      setItemName(currentItem.itemName);
      setItemDescription(currentItem.itemDescription);
      setSelectedPurchaseArea(currentItem.itemPurcCode);
      setSelectedItemCategory(currentItem.itemItmcFamCode);
      setSelectedItemSubCategory(currentItem.itemItmcSubFamCode);
      setItemRenewalCicle(currentItem.itemRenewalCycle);
      setItemMaintenanceCicle(currentItem.itemMaintenanceCycle);
      setSelectedItemCurrencyCode(currentItem.itemCurrencyCode);
      setItemUnitValue(currentItem.itemUnitValue);
    }
  }, [currentItem]);

  // Purchase Areas
  useEffect(() => {
    dispatch(
      getPurchaseAreas([], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setItemsFetched(true);
      }),
    );
  }, []);

  //Categories
  useEffect(() => {
    dispatch(
      getAllItemCategories(selectedPurchaseArea, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setItemsFetched(true);
      }),
    );
  }, [dispatch, selectedPurchaseArea]);

  //Sub Categories
  useEffect(() => {
    dispatch(
      getAllItemSubCategories(selectedPurchaseArea, selectedItemCategory, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setItemsFetched(true);
      }),
    );
  }, [dispatch, selectedItemCategory]);

  // Item Attributes
  useEffect(() => {
    dispatch(
      getAllItemAttributesByPurcCode(selectedPurchaseArea, [], '', () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setItemsFetched(true);
      }),
    );
  }, [dispatch, selectedPurchaseArea]);

  useEffect(() => {
    if (currentItem) {
      //Purchase Order
      for (let i = 0; i < purchaseAreas.length; i++) {
        if (purchaseAreas[i].purcCode === currentItem.itemPurcCode) {
          setPurchaseAreaText(purchaseAreas[i]);
          setSelectedPurchaseArea(purchaseAreas[i].purcCode);
          break;
        }
      }

      //Category
      for (let i = 0; i < itemCategories.length; i++) {
        if (itemCategories[i].itmcCode === currentItem.itemItmcFamCode) {
          setItemCategoryText(itemCategories[i]);
          break;
        }
      }
      //SubCategory
      for (let i = 0; i < itemSubCategories.length; i++) {
        if (itemSubCategories[i].itmcCode === currentItem.itemItmcSubFamCode) {
          setItemSubCategoryText(itemSubCategories[i]);
          break;
        }
      }

      //Currency
      for (let i = 0; i < itemCurrencyCodes.length; i++) {
        if (itemCurrencyCodes[i].itmcCode === currentItem.itemCurrencyCode) {
          setItemCurrencyCodeText(itemCurrencyCodes[i]);
          break;
        }
      }

      //Status
      for (let i = 0; i < itemStatus.length; i++) {
        if (itemStatus[i].statusCode === currentItem.itemStatus) {
          setItemStatusText(itemStatus[i]);
          setSelectedItemStatus(currentItem.itemStatus);
          break;
        }
      }
    }
  });

  //******************* End UseEffect   ****************/
  //******************* Start Functions ****************/

  // Table items Attributes

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  // End Table items Attributes

  const handleRowChange = (value, id, column) => {
    //Almacena los datos de atributos adicionales del bien para posterior validacion.

    if (column === 'itemAtributeCode') {
      for (let i = 0; i < attributesValues.length; i++) {
        if (i + 1 === Number(id)) {
          attributesValues[i].itmaCode = value;
          break;
        }
      }
    }

    if (column === 'itemAtributeValue') {
      for (let i = 0; i < attributesValues.length; i++) {
        if (i + 1 === Number(id)) {
          attributesValues[i].itmaValue = value;
          break;
        }
      }
    }
  };

  const onSubmitClick = () => {
    let createOrUpdate = true;

    if (!selectedItemStatus) {
      setSelectedItemStatusError(<IntlMessages id="items.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!itemIsbn) {
      setItemIsbnError(<IntlMessages id="items.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!itemUnitValue) {
      setItemUnitValueError(<IntlMessages id="items.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!selectedItemCurrencyCode) {
      setSelectedItemCurrencyCodeError(<IntlMessages id="items.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!itemMaintenanceCicle) {
      setItemMaintenanceCicleError(<IntlMessages id="items.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!itemRenewalCicle) {
      setItemRenewalCicleError(<IntlMessages id="items.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!selectedItemSubCategory) {
      setSelectedItemSubCategoryError(<IntlMessages id="items.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!selectedItemCategory) {
      setSelectedItemCategoryError(<IntlMessages id="items.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!selectedPurchaseArea) {
      setSelectedPurchaseAreaError(<IntlMessages id="items.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!itemDescription) {
      setItemDescriptionError(<IntlMessages id="items.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!itemName) {
      setItemNameError(<IntlMessages id="items.appModule.requiredMessage" />);
      createOrUpdate = false;
    }

    // valida que atributo seleccionado tenga valor.
    /*     for (let i = 0; i < attributesValues.length; i++) {
          if(!attributesValues[i].itmaCode){
            if(attributesValues[i].itmaValue){
              createOrUpdate = false;
              break;
            }
          }
         }   */

    if (createOrUpdate) {
      //onItemAttributeSave();
      setOpenConfirmDialog(true);
    }
  };

  const handleConfirmCreate = () => {
    setOpenConfirmDialog(false);
    onItemAttributeSave();
  };

  const handleCancelCreate = () => {
    setOpenConfirmDialog(false);
  };

  const onItemAttributeSave = () => {
    //const itemAttribute = null;
    const itemDetail = {
      itemPurcCode: selectedPurchaseArea,
      itemDescription: itemDescription,
      itemName: itemName,
      itemItmcCode: selectedItemSubCategory,
      itemRenewalCycle: itemRenewalCicle,
      itemMaintenanceCycle: itemMaintenanceCicle,
      itemCurrencyCode: selectedItemCurrencyCode,
      itemUnitValue: itemUnitValue,
      itemIsbn: itemIsbn,
      itemAttribute01: attributesValues[0].itmaCode,
      itemValue01: attributesValues[0].itmaValue,
      itemAttribute02: attributesValues[1].itmaCode,
      itemValue02: attributesValues[1].itmaValue,
      itemAttribute03: attributesValues[2].itmaCode,
      itemValue03: attributesValues[2].itmaValue,
      itemAttribute04: attributesValues[3].itmaCode,
      itemValue04: attributesValues[3].itmaValue,
      itemAttribute05: attributesValues[4].itmaCode,
      itemValue05: attributesValues[4].itmaValue,
      itemAttribute06: attributesValues[5].itmaCode,
      itemValue06: attributesValues[5].itmaValue,
      itemAttribute07: attributesValues[6].itmaCode,
      itemValue07: attributesValues[6].itmaValue,
      //itemCreationdate:attributesValues[0].itmaCode,
      itemStatus: itemStatus.statusCode,
    };

    if (currentItem) {
      // const itemAttributeUpdate = null;
      const itemUpdate = {
        itemPurcCode: currentItem.itemPurcCode,
        itemDescription: itemDescription,
        itemName: itemName,
        itemItmcCode: selectedItemSubCategory,
        itemRenewalCycle: itemRenewalCicle,
        itemMaintenanceCycle: itemMaintenanceCicle,
        itemCurrencyCode: selectedItemCurrencyCode,
        itemUnitValue: itemUnitValue,
        itemIsbn: itemIsbn,
        itemAttribute01: attributesValues[0].itmaCode,
        itemValue01: attributesValues[0].itmaValue,
        itemAttribute02: attributesValues[1].itmaCode,
        itemValue02: attributesValues[1].itmaValue,
        itemAttribute03: attributesValues[2].itmaCode,
        itemValue03: attributesValues[2].itmaValue,
        itemAttribute04: attributesValues[3].itmaCode,
        itemValue04: attributesValues[3].itmaValue,
        itemAttribute05: attributesValues[4].itmaCode,
        itemValue05: attributesValues[4].itmaValue,
        itemAttribute06: attributesValues[5].itmaCode,
        itemValue06: attributesValues[5].itmaValue,
        itemAttribute07: attributesValues[6].itmaCode,
        itemValue07: attributesValues[6].itmaValue,
        //itemCreationdate:attributesValues[0].itmaCode,
        itemStatus: itemStatus.statusCode,
      };

      const itemCodeUpdate = currentItem.itemCode;
      dispatch(
        updateItem(itemCodeUpdate, itemUpdate, () => {
          onCloseDialog();
        }),
      );
    } else {
      dispatch(
        addNewItem(itemDetail, () => {
          onCloseDialog();
        }),
      );
    }
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentItem ? (
          <IntlMessages id="items.editCreate.form.editTitle" values={{ code: currentItem.itemCode }} />
        ) : (
          <IntlMessages id="items.editCreate.form.createTitle" />
        )}
      </DialogTitle>
      <DialogContent dividers>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Card className={classes.root}>
              <CardHeader
                className={classes.dialogTitleRoot}
                title={<IntlMessages id="items.appModule.filterLabel.item" />}
              />
              <CardContent>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                  <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
                    <input {...getInputProps()} />
                    <CmtAvatar size={70} src={profile_pic} />
                  </Box>
                  <GridContainer>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="itemName"
                        //label={"Text Value"}
                        fullWidth
                        variant="outlined"
                        label={<IntlMessages id="items.editCreate.label.itemName" />}
                        //defaultValue={''}
                        value={itemName}
                        editable="true"
                        //format="Number"
                        onChange={event => {
                          setItemName(event.target.value);
                          setItemNameError('');
                        }}
                        helperText={itemNameError}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="itemDescription"
                        //label={"Text Value"}
                        fullWidth
                        variant="outlined"
                        label={<IntlMessages id="items.editCreate.label.itemDescription" />}
                        //defaultValue={''}
                        value={itemDescription}
                        editable="true"
                        //format="Number"
                        onChange={event => {
                          setItemDescription(event.target.value);
                          setItemDescriptionError('');
                        }}
                        helperText={itemDescriptionError}
                      />
                    </Grid>
                  </GridContainer>
                </Box>
                <Box mb={{ xs: 6, md: 5 }}>
                  <GridContainer>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="purchaseAreas"
                        options={purchaseAreas}
                        value={purchaseAreaText}
                        getOptionLabel={option => option.purcName}
                        style={{ width: '100%' }}
                        //defaultValue={null}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="items.appModule.label.purchaseArea" />}
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
                            label={<IntlMessages id="items.appModule.label.itemCategory" />}
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
                            label={<IntlMessages id="items.appModule.label.itemSubCategory" />}
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="itemRenewalCicle"
                        //label={"Text Value"}
                        fullWidth
                        variant="outlined"
                        label={<IntlMessages id="items.editCreate.label.itemRenewalCicle" />}
                        //defaultValue={''}
                        value={itemRenewalCicle}
                        editable="true"
                        type="number"
                        onChange={event => {
                          setItemRenewalCicle(event.target.value);
                          setItemRenewalCicleError('');
                        }}
                        helperText={itemRenewalCicleError}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="itemMaintenanceCicle"
                        //label={"Text Value"}
                        fullWidth
                        variant="outlined"
                        label={<IntlMessages id="items.editCreate.label.itemMaintenanceCicle" />}
                        //defaultValue={''}
                        value={itemMaintenanceCicle}
                        editable="true"
                        type="number"
                        onChange={event => {
                          setItemMaintenanceCicle(event.target.value);
                          setItemMaintenanceCicleError('');
                        }}
                        helperText={itemMaintenanceCicleError}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="itemCurrencyCode"
                        options={itemCurrencyCodes}
                        value={itemCurrencyCodeText}
                        getOptionLabel={option => option.itmcName}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="items.appModule.label.itemCurrencyCode" />}
                            variant="outlined"
                            helperText={selectedItemCurrencyCodeError}
                          />
                        )}
                        onChange={(event, value) => {
                          setSelectedItemCurrencyCode(value ? value.itmcCode : null);
                          setItemCurrencyCodeText(value);
                          setSelectedItemCurrencyCodeError('');
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="itemUnitValue"
                        //label={"Text Value"}
                        fullWidth
                        variant="outlined"
                        label={<IntlMessages id="items.editCreate.label.itemUnitValue" />}
                        //defaultValue={''}
                        value={itemUnitValue}
                        editable="true"
                        type="number"
                        onChange={event => {
                          setItemUnitValue(event.target.value);
                          setItemUnitValueError('');
                        }}
                        helperText={itemUnitValueError}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="itemIsbn"
                        //label={"Text Value"}
                        fullWidth
                        variant="outlined"
                        label={<IntlMessages id="items.editCreate.label.itemIsbn" />}
                        //defaultValue={''}
                        value={itemIsbn}
                        editable="true"
                        type="number"
                        onChange={event => {
                          setItemIsbn(event.target.value);
                          setItemIsbnError('');
                        }}
                        helperText={itemUnitValueError}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="itemStatus"
                        options={itemStatus}
                        value={itemStatusText}
                        getOptionLabel={option => option.statusName}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="items.appModule.label.itemStatus" />}
                            variant="outlined"
                            helperText={selectedItemStatusError}
                          />
                        )}
                        onChange={(event, value) => {
                          setSelectedItemStatus(value ? value.statusCode : null);
                          setSelectedItemStatusError('');
                        }}
                      />
                    </Grid>
                  </GridContainer>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </div>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Card className={classes.root}>
              <CardHeader
                className={classes.dialogTitleRoot}
                title={<IntlMessages id="items.editCreate.label.itemAttributes" />}></CardHeader>
              <CardContent>
                {/*                   <AddEditItemAditonalAttributesTableToolbar
                    selected={selected}
                    setSelected={setSelected}
                    //onDeliveryAddressAdd={setOpenDeliveryAddressDialog}
                    //filterOptions={filterOptions}
                    //setFilterOptions={setFilterOptions}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    //onDeliveryAddressDelete={handleDeliveryAddressDelete}
                  /> */}
                <TableContainer className={classes.container}>
                  <Table
                    stickyHeader
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    aria-label="sticky enhanced table">
                    <AddEditItemAttributesTableHead
                      classes={classes}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      //onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={attributes.length}
                    />
                    <TableBody>
                      {!!attributes.length ? (
                        stableSort(attributes, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => (
                            <AddEditItemAttributesListRow
                              key={index}
                              row={row}
                              itemAttributes={itemAttributes}
                              defaultItemAtributeCode={
                                currentItem
                                  ? index === 0
                                    ? currentItem.itemAttribute01
                                    : index === 1
                                    ? currentItem.itemAttribute02
                                    : index === 2
                                    ? currentItem.itemAttribute03
                                    : index === 3
                                    ? currentItem.itemAttribute04
                                    : index === 4
                                    ? currentItem.itemAttribute05
                                    : index === 5
                                    ? currentItem.itemAttribute06
                                    : index === 6
                                    ? currentItem.itemAttribute07
                                    : ''
                                  : ''
                              }
                              defaultItemAtributeValue={
                                currentItem
                                  ? index === 0
                                    ? currentItem.itemValue01
                                    : index === 1
                                    ? currentItem.itemValue02
                                    : index === 2
                                    ? currentItem.itemValue03
                                    : index === 3
                                    ? currentItem.itemValue04
                                    : index === 4
                                    ? currentItem.itemValue05
                                    : index === 5
                                    ? currentItem.itemValue06
                                    : index === 6
                                    ? currentItem.itemValue07
                                    : ''
                                  : ''
                              }
                              //onRowClick={handleRowClick}
                              onRowChange={handleRowChange}
                              isSelected={isSelected}
                            />
                          ))
                      ) : (
                        <TableRow style={{ height: 20 * 1 }}>
                          <TableCell colSpan={14} rowSpan={1}>
                            {isFilterApplied ? (
                              <Box mb={5} component="p" color="common.dark">
                                {<IntlMessages id="items.editCreate.label.filterItemAtributesNoRecordsFound" />}
                              </Box>
                            ) : (
                              /*                                 <NoRecordFound>
                                                                {<IntlMessages id="transportOrderExpenses.appModule.filterNoRecordsFound" />}
                                                              </NoRecordFound> */
                              <Box mb={5} component="p" color="common.dark">
                                {/* <NoRecordFound> */}
                                {attributesFetched ? (
                                  <IntlMessages id="items.editCreate.label.filterAditionalAtributesNoRecordsFound" />
                                ) : (
                                  <IntlMessages id="items.appModule.loadingAditionalAtributesReport" />
                                )}
                              </Box>
                              /*   </NoRecordFound> */
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/*                   <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component="div"
                    count={itemsAttributes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                  /> */}
              </CardContent>
            </Card>
          </Paper>
        </div>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Save
            </Button>
          </Box>
        </Box>
        <ConfirmDialog
          open={openConfirmDialog}
          title={<IntlMessages id="items.appModule.createConfirm" />}
          content={<IntlMessages id="items.appModule.createMessage" />}
          onClose={handleCancelCreate}
          onConfirm={handleConfirmCreate}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEditItem;

AddEditItem.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
