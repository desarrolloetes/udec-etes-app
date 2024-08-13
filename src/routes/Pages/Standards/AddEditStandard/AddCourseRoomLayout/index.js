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
import { getAllItemCategories } from 'redux/actions/ItemCategories';
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

const AddCourseRoomLayout = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { currentStandard, currentStandardCourse } = useSelector(({ standardsReducer }) => standardsReducer);
  const { roomsLayouts } = useSelector(({ roomsLayoutsReducer }) => roomsLayoutsReducer);
  const { courses } = useSelector(({ coursesReducer }) => coursesReducer);

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

  //RoomLayouts (Recintos Prototipos)
  const [roomLayoutText, setRoomLayoutText] = useState('');
  const [selectedRoomLayoutError, setSelectedRoomLayoutError] = useState('');
  const [selectedRoomLayout, setSelectedRoomLayout] = useState(null);

  //Courses (Asignaturas)
  const [courseText, setCourseText] = useState('');
  const [selectedCourseError, setSelectedCourseError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  //Dialogs
  const [openAddCouseRoomLayoutDialog, setOpenAddCouseRoomLayoutDialog] = useState(false);

  const dispatch = useDispatch();

  const onSubmitClick = () => {
    if (!selectedRoomLayout) {
      setSelectedRoomLayoutError(<IntlMessages id="standards.appModule.requiredMessage" />);
    } else if (!selectedCourse) {
      setSelectedCourseError(<IntlMessages id="standards.appModule.requiredMessage" />);
    } else {
      //valida que no exista la asignatura laboratorio
      let filtro = [];
      if (currentStandardCourse[0].standardId != null && currentStandardCourse[0].relay != null) {
        let filtro = currentStandardCourse[0].relay.filter(
          relay =>
            relay.stdcCoursCode.toLowerCase().includes(selectedCourse.toLowerCase()) &&
            relay.stdcRlayCode.toLowerCase().includes(selectedRoomLayout.toLowerCase()),
        );
      }
      if (filtro.length == 0) {
        // confirmar el agregar asignatura laboratorio
        setOpenAddCouseRoomLayoutDialog(true);
      } else {
        dispatch(fetchError(<IntlMessages id="standards.editCreate.CourseRoomLayout.error.message" />));
      }
    }
  };

  const handleConfirmAddCouseRoomLayout = () => {
    setOpenAddCouseRoomLayoutDialog(false);
    onLaboratorioAsignaturaSave();
  };

  const handleCancelAddCouseRoomLayout = () => {
    setOpenAddCouseRoomLayoutDialog(false);
  };

  const onLaboratorioAsignaturaSave = () => {
    // Completa datos del estandar al recinto.

    const keyToDelete = {
      stdcStdCode: currentStandardCourse[0].stdCode,
      stdcOrgCode: currentStandardCourse[0].stdOrgCode,
      stdcBuCode: currentStandardCourse[0].stdBuCode,
      stdcPurcCode: currentStandardCourse[0].stdPurcCode,
      stdcCoursCode: selectedCourse,
      stdcRlayCode: selectedRoomLayout,
      stdcItemCode: 0,
      stdcStdVersion: currentStandardCourse[0].stdVersion,
      stdcSchoCode: currentStandardCourse[0].stdSchoCode,
    };

    const item = {
      itemId: 1, //obtener el ultimo id del listado de items
      itmItemCode: '', //vacio al inicio se actualiza el selecionar el item/bien
      itmItemDescription: '',
      itmItmcName: '',
      itmItmcParent: 0,
      itmPerformance: 0,
      itmRenewalCicle: 0,
      itmMaintenanceCicle: 0,
      itmAttribute01: '',
      itmValue01: '',
      itmAttribute02: '',
      itmValue02: '',
      itmAttribute03: '',
      itmValue03: '',
      itmAttribute04: '',
      itmValue04: '',
      itmAttribute05: '',
      itmValue05: '',
      itmAttribute06: '',
      itmValue06: '',
      itmAttribute07: '',
      itmValue07: '',
      keyToDelete: keyToDelete,
    };

    let items = [];
    items.push(item);

    const relay = {
      courseId: (currentStandardCourse[0].relay ? currentStandardCourse[0].relay.length : 0) + 1, //obtener el ultimo id del asignatura labotarorio
      items: [],
      stdcBuCode: currentStandardCourse[0].stdBuCode,
      stdcCoursCode: selectedCourse,
      stdcCoursDescription: courseText ? courseText.coursDescription : '',
      stdcOrgCode: currentStandardCourse[0].stdOrgCode,
      stdcPurcCode: currentStandardCourse[0].stdPurcCode,
      stdcRlayCode: selectedRoomLayout,
      stdcRlayDescription: roomLayoutText ? roomLayoutText.rlayDescription : '',
      stdcSchoCode: currentStandardCourse[0].stdSchoCode,
      stdcSchoDescription: currentStandardCourse[0].stdcSchoDescription,
      stdcStdVersion: currentStandardCourse[0].stdVersion,
      stdcYear: currentStandardCourse[0].stdYear,
    };

    //let relays = [];
    //relays.push(relay);
    //Agregra asignatura / laboratorio en memoria con un bien vacio.
    //dispatch addNewCurrentStandarCourse

    currentStandardCourse[0].relay.push(relay);
    dispatch(addNewCurrentStandarCourse(currentStandardCourse[0]));
    dispatch(fetchSuccess(<IntlMessages id="standards.editCreate.CourseRoomLayout.addCurrent.success.message" />));
    onCloseDialog();
    //Load Categorys  (Familia de Bienes para Busqueda)
    dispatch(
      getAllItemCategories(currentStandardCourse[0].stdPurcCode, () => {
        // setCoursesFetched(true);
      }),
    );
  };

  const handleStandardCourseDelete = (stdcCoursCode, stdcRlayCode) => {
    // setCourseId(stdcCoursCode);
    // setRelayId(stdcRlayCode);
    // setOpenConfirmDialog(true);
  };

  return (
    <Dialog fullWidth open={open} onClose={onCloseDialog} className={classes.dialogRoot} scroll="body">
      <DialogTitle className={classes.dialogTitleRoot}>
        <IntlMessages id="standards.editCreate.title.addCourseRoomLayout" />
      </DialogTitle>
      <DialogContent dividers>
        {/* Inicia Cabecera para agregar asignatura + laboratorio*/}
        <Card className={classes.root} variant="outlined" style={{ marginBottom: 10, padding: 20 }}>
          <GridContainer style={{ marginTop: 10, marginLeft: 10 }}>
            <Grid item xs={12} sm={10}>
              <Autocomplete
                id="roomsLayouts"
                options={roomsLayouts}
                value={roomLayoutText}
                getOptionLabel={option => option.rlayOptionLabel}
                style={{ width: '100%' }}
                //defaultValue={null}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={<IntlMessages id="standards.editCreate.label.roomLayout" />}
                    variant="outlined"
                    helperText={selectedRoomLayoutError}
                  />
                )}
                onChange={(event, value) => {
                  setSelectedRoomLayout(value ? value.rlayCode : null);
                  setRoomLayoutText(value);
                  setSelectedRoomLayoutError('');
                }}
              />
            </Grid>
          </GridContainer>
          <GridContainer style={{ marginTop: 10, marginLeft: 10 }}>
            <Grid item xs={12} sm={10}>
              <Autocomplete
                id="courses"
                options={courses}
                value={courseText}
                getOptionLabel={option => option.coursOptionLabel}
                style={{ width: '100%' }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={<IntlMessages id="standards.editCreate.label.course" />}
                    variant="outlined"
                    helperText={selectedCourseError}
                  />
                )}
                onChange={(event, value) => {
                  setSelectedCourse(value ? value.coursCode : null);
                  setCourseText(value);
                  setSelectedCourseError('');
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
          open={openAddCouseRoomLayoutDialog}
          title={<IntlMessages id="standards.editCreate.addCourseRoomLayout.createConfirm" />}
          content={<IntlMessages id="standards.editCreate.addCourseRoomLayout.createMessage" />}
          onClose={handleCancelAddCouseRoomLayout}
          onConfirm={handleConfirmAddCouseRoomLayout}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseRoomLayout;

AddCourseRoomLayout.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
