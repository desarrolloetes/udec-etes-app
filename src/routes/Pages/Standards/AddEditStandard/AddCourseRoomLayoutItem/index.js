import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import DialogContent from '@material-ui/core/DialogContent';
import { TextField } from '@material-ui/core';

import GridContainer from '@jumbo/components/GridContainer';
import { Add, Delete } from '@material-ui/icons';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MomentUtils from '@date-io/moment';
import IntlMessages from '@jumbo/utils/IntlMessages';
import StandardCourse from '../StandardCourse';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getStandardCourses } from 'redux/actions/StandardsCourse';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchError, fetchSuccess } from 'redux/actions';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import { addNewCurrentStandarCourse } from 'redux/actions/StandardsCourse';
import { getAllItemSubCategories } from 'redux/actions/ItemCategories';
import { getItems } from 'redux/actions/Items';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
    // maxHeight: '100%',
    maxWidth: 'lg',
    fullWidth: true,
  },
  dialogTitleRoot: {
    '& .MuiTypography-h4': {
      fontSize: 14,
      color: theme.palette.common.dark,
    },
  },
  formControl: {
    margin: 0, //theme.spacing(2),
    minWidth: 60,
    width: '70%',
    height: '80%',
    [theme.breakpoints.up('md')]: {
      width: '40%',
      order: 2,
    },
  },
  standardControls: {
    minWidth: 120,
    width: '70%',
    height: '80%',
    marginTop: 10,
    [theme.breakpoints.up('md')]: {
      width: '40%',
      order: 2,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(4),
  },
  AppTextInputRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
}));

const AddCourseRoomLayoutItem = ({ open, onCloseDialog, relay, index }) => {
  const classes = useStyles();
  const { currentStandard, currentStandardCourse } = useSelector(({ standardsReducer }) => standardsReducer);
  const { itemCategories } = useSelector(({ itemCategoriesReducer }) => itemCategoriesReducer);
  const { itemSubCategories } = useSelector(({ itemCategoriesReducer }) => itemCategoriesReducer);
  const { items } = useSelector(({ itemsReducer }) => itemsReducer);

  const [purchaseAreaName, setPurchaseAreaName] = useState('');
  const [businessUnitName, setBusinessUnitName] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [schools, setSchools] = useState([]);
  // const [standardYear, setStandardYear] = useState('');
  const [standardActive, setStandardActive] = useState('');
  const [coursesFetched, setCoursesFetched] = useState(false);
  const [relays, setRelays] = useState([]);
  // const [businessUnit, setBusinessUnit] = useState([]);
  // const [purchaseArea, setPurchaseArea] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [expanded, setExpanded] = useState(false);

  //Category (Familia)
  const [categoryText, setCategoryText] = useState('');
  const [selectedCategoryError, setSelectedCategoryError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Sub Category (Subfamilia)
  const [subCategoryText, setSubCategoryText] = useState('');
  const [selectedSubCategoryError, setSelectedSubCategoryError] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  //Items
  const [itemText, setItemText] = useState('');
  const [selectedItemError, setSelectedItemError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);

  //Dialogs
  const [openAddCouseRoomLayoutItemDialog, setOpenAddCouseRoomLayoutItemDialog] = useState(false);

  useEffect(() => {
    if (currentStandard.id != null) {
      const { stdOrgCode, stdSchoCode, stdPurcCode } = currentStandard;
      //Load Sub Categorys  (Sub Familia de Bienes para Busqueda)
      dispatch(
        getAllItemSubCategories(stdPurcCode, selectedCategory, () => {
          // setCoursesFetched(true);
        }),
      );
    } else {
      //Load Sub Categorys  (Sub Familia de Bienes para Busqueda)
      if (typeof selectedCategory != 'undefined' || selectedCategory != null) {
        dispatch(
          getAllItemSubCategories(currentStandardCourse[0].stdPurcCode, selectedCategory, () => {
            // setCoursesFetched(true);
          }),
        );
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (currentStandard.id != null) {
      const { stdOrgCode, stdSchoCode, stdPurcCode } = currentStandard;
      //Load Items  (Clases Bienes)
      dispatch(
        getItems(stdOrgCode, stdPurcCode, selectedCategory, selectedSubCategory, [], '', () => {
          // setCoursesFetched(true);
        }),
      );
    } else {
      //Load Items  (Clases Bienes)
      if (typeof selectedCategory != 'undefined' && typeof selectedCategory != 'undefined') {
        dispatch(
          getItems(
            currentStandardCourse[0].stdOrgCode,
            currentStandardCourse[0].stdPurcCode,
            selectedCategory,
            selectedSubCategory,
            [],
            '',
            () => {
              // setCoursesFetched(true);
            },
          ),
        );
      }
    }
  }, [selectedSubCategory]);

  const dispatch = useDispatch();

  const onSubmitClick = () => {
    if (!selectedCategory) {
      setSelectedCategoryError(<IntlMessages id="standards.appModule.requiredMessage" />);
    } else if (!selectedSubCategory) {
      setSelectedSubCategoryError(<IntlMessages id="standards.appModule.requiredMessage" />);
    } else if (!selectedItem) {
      setSelectedItemError(<IntlMessages id="standards.appModule.requiredMessage" />);
    } else {
      //valida que no exista el bien bajo la combinacion asignatura/laboratorio
      let filtro = currentStandardCourse[0].relay[index].items.filter(item => item.itmItemCode == selectedItem);
      if (filtro.length === 0) {
        // confirmar el agregar item a la asignatura/laboratorio
        setOpenAddCouseRoomLayoutItemDialog(true);
      } else {
        dispatch(fetchError(<IntlMessages id="standards.editCreate.CourseRoomLayoutItem.error.message" />));
      }
    }
  };

  const handleConfirmAddCouseRoomItemLayout = () => {
    setOpenAddCouseRoomLayoutItemDialog(false);
    onItemLaboratorioAsignaturaSave();
  };

  const handleCancelAddCouseRoomLayoutItem = () => {
    setOpenAddCouseRoomLayoutItemDialog(false);
  };

  const onItemLaboratorioAsignaturaSave = () => {
    // Completa datos del estandar al recinto.

    const keyToDelete = {
      stdcStdCode: currentStandardCourse[0].stdCode,
      stdcOrgCode: currentStandardCourse[0].stdOrgCode,
      stdcBuCode: currentStandardCourse[0].stdBuCode,
      stdcPurcCode: currentStandardCourse[0].stdPurcCode,
      stdcCoursCode: selectedSubCategory,
      stdcRlayCode: selectedCategory,
      stdcItemCode: selectedItem,
      stdcStdVersion: currentStandardCourse[0].stdVersion,
      stdcSchoCode: currentStandardCourse[0].stdSchoCode,
    };

    const item = {
      itemId: currentStandardCourse[0].relay[index].items.length + 1, //obtener el ultimo id del listado de items
      itmItemCode: selectedItemData.itemCode, //vacio al inicio se actualiza el selecionar el item/bien
      itmItemDescription: selectedItemData.itemDescription,
      itmItmcName: selectedItemData.itemItmcFamName,
      itmItmcParent: selectedItemData.itemItmcSubFamName,
      itmPerformance: '0',
      itmRenewalCicle: '0',
      itmMaintenanceCicle: '0',
      itmAttribute01: selectedItemData.itemAttribute01,
      itmValue01: selectedItemData.itemValue01,
      itmAttribute02: selectedItemData.itemAttribute02,
      itmValue02: selectedItemData.itemValue02,
      itmAttribute03: selectedItemData.itemAttribute03,
      itmValue03: selectedItemData.itemValue03,
      itmAttribute04: selectedItemData.itemAttribute04,
      itmValue04: selectedItemData.itemValue04,
      itmAttribute05: '',
      itmValue05: '',
      itmAttribute06: '',
      itmValue06: '',
      itmAttribute07: '',
      itmValue07: '',
      keyToDelete: keyToDelete,
    };

    /*   let items = [];
      items.push(item); */

    /*   const relay = {
        courseId: currentStandardCourse[0].relay.length + 1, //obtener el ultimo id del asignatura labotarorio
        items: items,
        stdcBuCode: currentStandardCourse[0].stdBuCode,
        stdcCoursCode: selectedSubCategory,
        stdcCoursDescription: currentStandardCourse[0].stdcCoursDescription,
        stdcOrgCode: currentStandardCourse[0].stdOrgCode,
        stdcPurcCode: currentStandardCourse[0].stdPurcCode,
        stdcRlayCode: selectedCategory,
        stdcRlayDescription: currentStandardCourse[0].stdcRlayDescription,
        stdcSchoCode: currentStandardCourse[0].stdSchoCode,
        stdcSchoDescription: currentStandardCourse[0].stdcSchoDescription,
        stdcStdVersion: currentStandardCourse[0].stdVersion,
        stdcYear: currentStandardCourse[0].stdYear,
    
      }; */

    //let relays = [];
    //relays.push(relay);
    //Agregra asignatura / laboratorio en memoria con un bien vacio.
    //dispatch addNewCurrentStandarCourse

    currentStandardCourse[0].relay[index].items.push(item);
    dispatch(addNewCurrentStandarCourse(currentStandardCourse[0]));
    dispatch(fetchSuccess(<IntlMessages id="standards.editCreate.CourseRoomLayout.addCurrent.success.message" />));
    onCloseDialog();
  };

  const handleStandardCourseDelete = (stdcCoursCode, stdcRlayCode) => {
    // setCourseId(stdcCoursCode);
    // setRelayId(stdcRlayCode);
    // setOpenConfirmDialog(true);
  };

  return (
    <Dialog fullWidth open={open} onClose={onCloseDialog} className={classes.dialogRoot} scroll="body">
      <DialogTitle className={classes.dialogTitleRoot}>
        <IntlMessages id="standards.editCreate.title.addCourseRoomLayoutItem" />
      </DialogTitle>
      <DialogContent dividers>
        {/* Inicia Cabecera para agregar Item al grupo asignatura + laboratorio*/}
        <Card className={classes.root} variant="outlined" style={{ marginBottom: 10, padding: 20 }}>
          <GridContainer style={{ marginTop: 10, marginLeft: 10 }}>
            <Grid item xs={12} sm={10}>
              <Autocomplete
                id="itemCategories"
                options={itemCategories}
                value={categoryText}
                getOptionLabel={option => option.itmcName}
                style={{ width: '100%' }}
                //defaultValue={null}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={<IntlMessages id="standards.editCreate.label.rlayCourseCategory" />}
                    variant="outlined"
                    helperText={selectedCategoryError}
                  />
                )}
                onChange={(event, value) => {
                  setSelectedCategory(value ? value.itmcCode : null);
                  setCategoryText(value);
                  setSelectedCategoryError('');
                }}
              />
            </Grid>
          </GridContainer>
          <GridContainer style={{ marginTop: 10, marginLeft: 10 }}>
            <Grid item xs={12} sm={10}>
              <Autocomplete
                id="itemSubCategories"
                options={itemSubCategories}
                value={subCategoryText}
                getOptionLabel={option => option.itmcName}
                style={{ width: '100%' }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={<IntlMessages id="standards.editCreate.label.rlayCourseSubCategory" />}
                    variant="outlined"
                    helperText={selectedSubCategoryError}
                  />
                )}
                onChange={(event, value) => {
                  setSelectedSubCategory(value ? value.itmcCode : null);
                  setSubCategoryText(value);
                  setSelectedSubCategoryError('');
                }}
              />
            </Grid>
          </GridContainer>
          <GridContainer style={{ marginTop: 10, marginLeft: 10 }}>
            <Grid item xs={12} sm={10}>
              <Autocomplete
                id="items"
                options={items}
                value={itemText}
                getOptionLabel={option => option.itemOptionLabel}
                style={{ width: '100%' }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={<IntlMessages id="standards.editCreate.label.relayCourseItem" />}
                    variant="outlined"
                    helperText={selectedItemError}
                  />
                )}
                onChange={(event, value) => {
                  setSelectedItem(value ? value.itemCode : null);
                  setSelectedItemData(value);
                  setItemText(value);
                  setSelectedItemError('');
                }}
              />
            </Grid>
          </GridContainer>
        </Card>
        {/* Fin Cabecera para el registro de asignatura laboratorio*/}
        <Box display="flex" justifyContent="flex-end" mb={4} className={classes.formControl}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Save
            </Button>
          </Box>
        </Box>

        <ConfirmDialog
          open={openAddCouseRoomLayoutItemDialog}
          title={<IntlMessages id="standards.editCreate.addCourseRoomLayoutItem.createConfirm" />}
          content={<IntlMessages id="standards.editCreate.addCourseRoomLayoutItem.createMessage" />}
          onClose={handleCancelAddCouseRoomLayoutItem}
          onConfirm={handleConfirmAddCouseRoomItemLayout}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseRoomLayoutItem;

AddCourseRoomLayoutItem.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
