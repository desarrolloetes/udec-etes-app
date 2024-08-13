import { Box, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import DialogContent from '@material-ui/core/DialogContent';
import GridContainer from '@jumbo/components/GridContainer';
import { Add, Delete } from '@material-ui/icons';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MomentUtils from '@date-io/moment';
import IntlMessages from '@jumbo/utils/IntlMessages';
import StandardCourse from './StandardCourse';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getStandardCourses } from 'redux/actions/StandardsCourse';
import { getAllCoursesByOrgCodeAndSchoCode } from 'redux/actions/Courses';
import { getAllRoomLayoutsByPurcCode } from 'redux/actions/RoomsLayouts';
import { getAllItemCategories } from 'redux/actions/ItemCategories';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import AddCourseRoomLayout from './AddCourseRoomLayout';
import { fetchError, fetchSuccess } from 'redux/actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from '../index.style';
import { addNewCurrentStandarCourse } from 'redux/actions/StandardsCourse';
import AppSelectBox from '@jumbo/components/Common/formElements/AppSelectBox';
/* import { getBusinessUnits } from '../../../../redux/actions/BusinessUnits';
import { getPurchaseAreas }    from '../../../../redux/actions/PurchaseAreas';
import { getAllOrganizations } from '../../../../redux/actions/Organizations';
import { getSchools } from '../../../../redux/actions/Schools'; */
import { getSchools } from '../../../../redux/actions/Schools';

/* const useStyles = makeStyles(theme => ({
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
    minWidth: 120,
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
    marginTop: 0,
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
})); */

const AddEditStandard = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { currentStandard, currentStandardCourse } = useSelector(({ standardsReducer }) => standardsReducer);
  const { authUser, purchaseArea, businessUnit } = useSelector(({ auth }) => auth);
  const { selectedBusinessUnit, selectedPurchaseArea } = JSON.parse(localStorage.getItem('userDomain'));
  const businessUnits = useSelector(({ businessUnitsReducer }) => businessUnitsReducer.businessUnits);
  const purchaseAreas = useSelector(({ purchaseAreasReducer }) => purchaseAreasReducer.purchaseAreas);
  const { schools } = useSelector(({ schoolsReducer }) => schoolsReducer);
  const { organizations } = useSelector(({ organizationsReducer }) => organizationsReducer);

  const [purchaseAreaName, setPurchaseAreaName] = useState('');
  const [businessUnittName, setBusinessUnittName] = useState('');
  const [standardName, setStandardName] = useState('');
  const [editMode, setEditMode] = useState(true);

  // const [standardYear, setStandardYear] = useState('');
  const [standardActive, setStandardActive] = useState('');
  const [standardActiveError, setStandardActiveError] = useState('');
  const [coursesFetched, setCoursesFetched] = useState(false);
  const [relays, setRelays] = useState([]);
  const [availableForPurchaseActive, setAvailableForPurchaseActive] = useState('');
  const [availableForPurchaseActiveError, setAvailableForPurchaseActiveError] = useState('');
  // const [businessUnit, setBusinessUnit] = useState([]);
  // const [purchaseArea, setPurchaseArea] = useState([]);
  //Organization
  const [organizationText, setOrganizationText] = useState('');
  const [selectedOrganizationError, setSelectedOrganizationError] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [organizationss, setOrganizations] = useState([]);
  //Schools
  const [schoolText, setSchoolText] = useState('');
  const [selectedSchoolError, setSelectedSchoolError] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schoolss, setSchools] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [expanded, setExpanded] = useState(false);

  //Dialogs
  const [openViewDialog, setOpenViewDialog] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    // setExpanded(isExpanded ? panel : false);
  };

  //Dialogs
  const [openAddCourseRoomLayoutDialog, setOpenAddCourseRoomLayoutDialog] = useState(false);

  const dispatch = useDispatch();

  const standardAvailableOptionsList = [
    {
      label: <IntlMessages id="standards.editCreate.available" />,
      value: 'S',
    },
    {
      label: <IntlMessages id="standards.editCreate.notAvailable" />,
      value: 'N',
    },
  ];

  const standardStatusOptionsList = [
    {
      label: <IntlMessages id="standards.editCreate.status.active" />,
      value: 'S',
    },
    {
      label: <IntlMessages id="standards.editCreate.status.inactive" />,
      value: 'N',
    },
  ];

  useEffect(() => {
    // Edititing Standard
    if (currentStandard.id !== null) {
      const {
        stdCode,
        stdVersion,
        stdYear,
        stdOrgCode,
        stdPurcDescription,
        stdPurcCode,
        stdBuName,
        stdName,
        stdOrgDescription,
        stdSchoCode,
        stdSchoDescription,
        stdAvailableForPurchase,
        stdStatus,
      } = currentStandard;

      setPurchaseAreaName(stdPurcDescription);
      setBusinessUnittName(stdBuName);
      setStandardName(stdName);
      setOrganizations([
        {
          orgCode: stdOrgCode,
          orgDescription: stdOrgDescription,
        },
      ]);
      setSchools([
        {
          schoCode: stdSchoCode,
          schoDescription: stdSchoDescription,
        },
      ]);
      setOrganizations(organizations);
      //setSchools(schools);

      //setSelectedOrganization(stdOrgCode);
      //setOrganizationText(organizationss[0]);
      //setSelectedSchool(stdSchoCode);
      //setSchoolText(schoolss[0]);
      //Set organizations
      for (let i = 0; i < organizations.length; i++) {
        if (organizations[i].orgCode === stdOrgCode) {
          setOrganizationText(organizations[i]);
          break;
        }
      }

      //Set schools
      for (let i = 0; i < schools.length; i++) {
        if (schools[i].schoCode === stdSchoCode) {
          setSchoolText(schools[i]);
          break;
        }
      }
      setSelectedDate(new Date(stdYear, 11, 17));
      setAvailableForPurchaseActive(stdAvailableForPurchase);
      setStandardActive(stdStatus);

      if (!coursesFetched) {
        dispatch(
          getStandardCourses(stdCode, stdVersion, stdYear, stdOrgCode, () => {
            setCoursesFetched(true);
          }),
        );
      }
      setEditMode(false);
    }
    // Create  Standard
    if (currentStandard.id === null) {
      setOrganizations(organizations);
      //setSchools(schools);

      for (let i = 0; i < purchaseAreas.length; i++) {
        if (purchaseAreas[i].purcCode === purchaseArea) {
          setPurchaseAreaName(purchaseAreas[i].purcName);
        }
      }

      for (let j = 0; j < businessUnits.length; j++) {
        if (businessUnits[j].buCode === businessUnit) {
          setBusinessUnittName(businessUnits[j].buName);
        }
      }

      setStandardName('');
      setSelectedDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
      setStandardActive('S');
    }
  }, []);

  useEffect(() => {
    if (currentStandardCourse[0].standardId !== null) {
      setRelays(currentStandardCourse[0]?.relay);
      //setRelays(currentStandardCourse[0]);
    } else {
      setRelays([]);
    }
  }, [currentStandardCourse]);

  useEffect(
    () => {
      // Edit Standard
      if (currentStandard.id !== null) {
        const { stdOrgCode, stdSchoCode, stdPurcCode } = currentStandard;

        //Load room layout (Recintos prototipos)
        dispatch(
          getAllRoomLayoutsByPurcCode(purchaseArea, [], '', () => {
            // setCoursesFetched(true);
          }),
        );
        //Load courses  (Asignaturas)
        dispatch(
          getAllCoursesByOrgCodeAndSchoCode(stdOrgCode, stdSchoCode, [], '', () => {
            // setCoursesFetched(true);
          }),
        );

        //Load Categorys  (Familia de Bienes para Busqueda)
        //dispatch(
        //  getAllItemCategories(stdPurcCode, () => {
        //    // setCoursesFetched(true);
        //  }),
        // );
      }
      // if (currentStandard.id === null) {

      /*       dispatch(
            getSchools([], selectedOrganization, () => {
              //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
             // setSchoolsFetched(true);
            }),
          );   */

      // dispatch(
      //   getAllRoomLayouts([], '', () => {
      //     // setCoursesFetched(true);
      //   }),
      // );
      //Load courses  (Asignaturas)
      //   dispatch(
      //    getAllCoursesByOrgCodeAndSchoCode(selectedOrganization, selectedSchool, [], '', () => {
      //       // setCoursesFetched(true);
      //    }),
      //  );

      //Load Categorys  (Familia de Bienes para Busqueda)
      //dispatch(
      //  getAllItemCategories(purchaseArea, () => {
      //    // setCoursesFetched(true);
      //  }),
      //);
      //}
      //}
      /*     if (currentStandard.length == 0) {
    
          dispatch(
            getAllOrganizations([], '', () => {
              //setFilterApplied(!!filterOptions.length || !!debouncedSearchOrgTerm);
             // setOrganizationsFetched(true);
            }),
          );
          dispatch(
            getSchools([], '', () => {
              //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
             // setSchoolsFetched(true);
            }),
          ); 
          dispatch(getPurchaseAreas());
          dispatch(getBusinessUnits());           
        } */
    },
    //, [selectedOrganization, selectedSchool, standardName, standardActive]);
    [dispatch, selectedOrganization, selectedSchool],
  );

  //Get Schools (Unidades Academicas)
  useEffect(() => {
    //Create Standard
    if (currentStandard.id === null) {
      if (selectedOrganization !== '') {
        dispatch(
          getSchools([], selectedOrganization, () => {
            //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
            // setSchoolsFetched(true);
            //setSchools(schools);
          }),
        );
      }
    }
  }, [selectedOrganization]);

  //Get Schools (Unidades Academicas)
  useEffect(() => {
    //Create Standard
    if (currentStandard.id === null) {
      if (selectedOrganization !== '' && selectedSchool !== '') {
        //Load courses  (Asignaturas)
        dispatch(
          getAllCoursesByOrgCodeAndSchoCode(selectedOrganization, selectedSchool, [], '', () => {
            //setSchools(schools);
          }),
        );

        //Load room layout (Recintos prototipos)
        dispatch(
          getAllRoomLayoutsByPurcCode(purchaseArea, [], '', () => {
            // setCoursesFetched(true);
          }),
        );
      }
    }
  }, [selectedSchool]);

  //Get Schools (Unidades Academicas)
  useEffect(() => {
    setSchools(schools);
  }, [schools]);

  const removeCourseItem = (indexCourse, itemId) => {
    setRelays(currentStandardCourse[0].relay[indexCourse].items.filter(item => item.itemId !== itemId));
  };

  const onSubmitClick = () => {
    let standardSave = true;
    // Validar que el estandar tenga al menos un laboratorio/asignatura
    if (currentStandardCourse[0].relay.length === 0) {
      standardSave = false;
      dispatch(fetchError(<IntlMessages id="standards.editCreate.standardRelayCourse.error.message" />));
    } else {
      // Validar que cada laboratorio/asignatura tenga al menos un item (bien)
      for (let i = 0; i < currentStandardCourse[0].relay.length; i++) {
        if (currentStandardCourse[0].relay[i].items.length === 0) {
          standardSave = false;
          dispatch(
            fetchError(
              <IntlMessages
                id="standards.editCreate.standardItem.error.message"
                values={{
                  code:
                    currentStandardCourse[0].relay[i].stdcRlayCode + '-' + currentStandardCourse[0].relay[i].stdcCourseCode,
                }}
              />,
            ),
          );
          break;
        }
      }
      if (standardSave) {
        // validar que cada bien tenga el registro de las cantidades de rendimiento, ciclo de renovacion, ciclo de mantencion.
        for (let i = 0; i < currentStandardCourse[0].relay.length; i++) {
          for (let j = 0; j < currentStandardCourse[0].relay[i].items.length; j++) {
            if (
              currentStandardCourse[0].relay[i].items[j].itmMaintenanceCicle === null ||
              currentStandardCourse[0].relay[i].items[j].itmRenewalCicle === null ||
              currentStandardCourse[0].relay[i].items[j].itmPerformance === null
            ) {
              standardSave = false;
              dispatch(
                fetchError(
                  <IntlMessages
                    id="standards.editCreate.standardItemAtributes.error.message"
                    values={{
                      code:
                        currentStandardCourse[0].relay[i].stdcRlayCode +
                        '-' +
                        currentStandardCourse[0].relay[i].stdcCourseCode +
                        '-' +
                        currentStandardCourse[0].relay[i].items[j].itemCode,
                    }}
                  />,
                ),
              );
              break;
            }
          }
        }
      }
    }
    if (standardSave) {
      onStandardSave(currentStandardCourse[0]);
    }
  };

  const onStandardSave = standard => {
    // dispatch(setCurrentStandard([]));
  };

  const setStandard = (value, description, item) => {
    currentStandardCourse[0].standardId = 0;
    currentStandardCourse[0].stdBuCode = selectedBusinessUnit;
    currentStandardCourse[0].stdPurcCode = selectedPurchaseArea;
    currentStandardCourse[0].stdVersion = 1;
    currentStandardCourse[0].stdYear = selectedDate;
    currentStandardCourse[0].stdAvailableForPurchase = 'N';

    if (item === 'standardName') {
      currentStandardCourse[0].stdName = value;
    }
    if (item === 'organization') {
      currentStandardCourse[0].stdOrgCode = value;
      currentStandardCourse[0].stdOrgDescription = description;
    }
    if (item === 'school') {
      currentStandardCourse[0].stdCode = value;
      currentStandardCourse[0].stdSchoCode = value;
      currentStandardCourse[0].stdcSchoDescription = description;
      currentStandardCourse[0].stdCaccCode = value;
      currentStandardCourse[0].stdCaccDescription = description;
    }
    if (item === 'available') {
      currentStandardCourse[0].stdAvailableForPurchase = value;
    }
    if (item === 'status') {
      currentStandardCourse[0].stdStatus = value;
    }
    dispatch(addNewCurrentStandarCourse(currentStandardCourse[0]));
  };

  const handleStandardCourseDelete = (stdcCoursCode, stdcRlayCode) => {
    // setCourseId(stdcCoursCode);
    // setRelayId(stdcRlayCode);
    // setOpenConfirmDialog(true);
  };

  const handleOpenDialog = () => {
    setOpenAddCourseRoomLayoutDialog(true);
    // dispatch(setCurrentStandard([]));
  };

  const handleCloseDialog = () => {
    setOpenAddCourseRoomLayoutDialog(false);
    // dispatch(setCurrentStandard([]));
  };

  return (
    <Dialog maxWidth="xl" open={open} onClose={onCloseDialog} className={classes.dialogRoot} scroll="body">
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentStandard ? (
          <IntlMessages id="standards.appModule.editStandardCourseTitle" />
        ) : (
          <IntlMessages id="standards.appModule.addStandardCourseTitle" />
        )}
      </DialogTitle>
      <DialogContent dividers>
        {/* Inicia Cabecera */}
        <div className={classes.root}>
          {currentStandard.id ? (
            <Card
              className={classes.root}
              variant="outlined"
              style={{ maxWidth: '100%', minWidth: '100%', marginBottom: 10 }}>
              <CardContent>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                  <GridContainer style={{ marginTop: 10, marginLeft: 10, maxWidth: '99%', minWidth: '99%' }}>
                    <Grid item xs={6} sm={4}>
                      <AppTextInput
                        //fullWidth
                        // style={{ marginTop: 8 }}
                        variant="outlined"
                        label={<IntlMessages id="label.purchaseArea" />}
                        value={purchaseAreaName}
                        disabled
                        // onChange={e => setCompany(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <AppTextInput
                        //fullWidth
                        // style={{ marginTop: 8 }}
                        variant="outlined"
                        label={<IntlMessages id="label.businessUnit" />}
                        value={businessUnittName}
                        disabled
                        // onChange={e => setDesignation(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <AppTextInput
                        //fullWidth
                        // style={{ marginTop: 8 }}
                        variant="outlined"
                        label={<IntlMessages id="standards.appModule.standardName" />}
                        value={standardName}
                        disabled
                        onChange={e => {
                          setStandardName(e.target.value);
                          setStandard(e.target.value, e.target.value, 'standardName');
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      {/*             <FormControl
              variant="outlined"
              size="medium"
              className={classes.standardControls}
              style={{ maxWidth: '100%', minWidth: '100%' }}>
              <InputLabel htmlFor="outlined-organization">{<IntlMessages id="label.organization" />}</InputLabel>
              <Select
                value={selectedOrganization}
                defaultValue={selectedOrganization}
                onChange={event => {
                  setSelectedOrganization(event.target.value);
                  // getUserPurchaseArea(user, event.target.value);
                }}
                label={<IntlMessages id="label.organization" />}
                variant="outlined"
                margin="dense"
                inputProps={{
                  id: `outlined-organization`,
                }}
                readOnly={standardName !== ''}
                disabled={standardName !== ''}
                error={selectedOrganization === 'None'}>
                <option value="None" />
                {organizationss.map((organization, index) => {
                  return (
                    <option key={index} name={organization?.orgDescription} value={organization?.orgCode}>
                      {organization?.orgDescription}
                    </option>
                  );
                })}
              </Select>
              <FormHelperText>
                {selectedOrganization === 'None' ? <IntlMessages id="appModule.organizationEmpty" /> : ' '}
              </FormHelperText>
            </FormControl> */}
                      <Autocomplete
                        id="organizationss"
                        options={organizationss}
                        value={organizationText}
                        //getOptionSelected={(option, value) => option.orgCode}
                        getOptionLabel={option => option.orgDescription}
                        style={{ width: '100%' }}
                        disabled
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="label.organization" />}
                            variant="outlined"
                            helperText={selectedOrganizationError}
                          />
                        )}
                        onChange={(event, value) => {
                          setSelectedOrganization(value.orgCode);
                          setOrganizationText(value);
                          setSelectedOrganizationError('');
                          setStandard(value.orgCode, value.orgDescription, 'organization');
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      {/*             <FormControl
              variant="outlined"
              size="medium"
              className={classes.standardControls}
              style={{ maxWidth: '100%', minWidth: '100%' }}>
              <InputLabel id="outlined-organization">{<IntlMessages id="label.school" />}</InputLabel>
              <Select
                fullWidth
                id="outlined-organization"
                value={selectedSchool}
                defaultValue={selectedSchool}
                onChange={event => {
                  setSelectedSchool(event.target.value);
                  // getUserPurchaseArea(user, event.target.value);
                }}
                label={<IntlMessages id="label.school" />}
                variant="outlined"
                margin="dense"
                inputProps={{
                  id: `outlined-school`,
                }}
                readOnly={standardName !== ''}
                disabled={standardName !== ''}
                error={selectedSchool === 'None'}>
                <option value="None" />
                {schoolss.map((school, index) => {
                  return (
                    <option key={index} name={school?.schoDescription} value={school?.schoCode}>
                      {school?.schoDescription}
                    </option>
                  );
                })}
              </Select>
              <FormHelperText>
                {selectedSchool === 'None' ? <IntlMessages id="appModule.schoolEmpty" /> : ' '}
              </FormHelperText>
            </FormControl> */}
                      <Autocomplete
                        id="schools"
                        options={schoolss}
                        value={schoolText}
                        getOptionLabel={option => option.schoDescription}
                        //getOptionSelected={(option, value) => option.schoDescription}
                        // style={{ width: '100%' }}
                        disabled
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="label.school" />}
                            variant="outlined"
                            helperText={selectedSchoolError}
                          />
                        )}
                        onChange={(event, value) => {
                          setSelectedSchool(value.schoCode);
                          setSchoolText(value);
                          setSelectedSchoolError('');
                          setStandard(value.schoCode, value.schoDescription, 'school');
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                          disableToolbar
                          style={{ marginTop: -8 }}
                          margin="dense"
                          variant="outlined"
                          value={selectedDate}
                          onChange={setSelectedDate}
                          views={['year']}
                          openTo="year"
                          disabled
                          label={<IntlMessages id="standards.appModule.standardYear" />}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <AppSelectBox
                        fullWidth
                        data={standardStatusOptionsList}
                        label={<IntlMessages id="standards.appModule.status" />}
                        valueKey="value"
                        variant="outlined"
                        labelKey="label"
                        value={standardActive}
                        disabled
                        onChange={e => {
                          setStandardActive(e.target.value ? 'S' : 'N');
                          setStandard(e.target.checked ? 'S' : 'N', e.target.value ? 'S' : 'N', 'status');
                        }}
                        helperText={standardActiveError}
                      />
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <AppSelectBox
                        fullWidth
                        data={standardAvailableOptionsList}
                        label={<IntlMessages id="standards.appModule.available" />}
                        valueKey="value"
                        variant="outlined"
                        labelKey="label"
                        value={availableForPurchaseActive}
                        onChange={e => {
                          setAvailableForPurchaseActive(e.target.value ? 'S' : 'N');
                          setStandard(e.target.checked ? 'S' : 'N', e.target.value ? 'S' : 'N', 'available');
                        }}
                        helperText={availableForPurchaseActiveError}
                      />
                    </Grid>

                    {/*                     <Grid item xs={6} sm={4}>
                      <FormControlLabel
                        value={standardActive}
                        checked={standardActive === 'S'}
                        style={{ marginLeft: 0, marginTop: -40 }}
                        control={<Checkbox color="primary" />}
                        label={<IntlMessages id="standards.appModule.available" />}
                        labelPlacement="start"
                        disabled
                        onChange={e => {
                          setStandardActive(e.target.checked ? 'S' : 'N');
                          setStandard(e.target.checked ? 'S' : 'N', e.target.checked ? 'S' : 'N', "available");
                        }}
                      />
                    </Grid> */}
                  </GridContainer>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card
              className={classes.root}
              variant="outlined"
              style={{ maxWidth: '100%', minWidth: '100%', marginBottom: 10 }}>
              <CardContent>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                  <GridContainer style={{ marginTop: 10, marginLeft: 10, maxWidth: '99%', minWidth: '99%' }}>
                    <Grid item xs={6} sm={4}>
                      <AppTextInput
                        //fullWidth
                        // style={{ marginTop: 8 }}
                        variant="outlined"
                        label={<IntlMessages id="label.purchaseArea" />}
                        value={purchaseAreaName}
                        // onChange={e => setCompany(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <AppTextInput
                        //fullWidth
                        // style={{ marginTop: 8 }}
                        variant="outlined"
                        label={<IntlMessages id="label.businessUnit" />}
                        value={businessUnittName}
                        // onChange={e => setDesignation(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <AppTextInput
                        //fullWidth
                        // style={{ marginTop: 8 }}
                        variant="outlined"
                        label={<IntlMessages id="standards.appModule.standardName" />}
                        value={standardName}
                        onChange={e => {
                          setStandardName(e.target.value);
                          setStandard(e.target.value, e.target.value, 'standardName');
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      {/*             <FormControl
            variant="outlined"
            size="medium"
            className={classes.standardControls}
            style={{ maxWidth: '100%', minWidth: '100%' }}>
            <InputLabel htmlFor="outlined-organization">{<IntlMessages id="label.organization" />}</InputLabel>
            <Select
              value={selectedOrganization}
              defaultValue={selectedOrganization}
              onChange={event => {
                setSelectedOrganization(event.target.value);
                // getUserPurchaseArea(user, event.target.value);
              }}
              label={<IntlMessages id="label.organization" />}
              variant="outlined"
              margin="dense"
              inputProps={{
                id: `outlined-organization`,
              }}
              readOnly={standardName !== ''}
              disabled={standardName !== ''}
              error={selectedOrganization === 'None'}>
              <option value="None" />
              {organizationss.map((organization, index) => {
                return (
                  <option key={index} name={organization?.orgDescription} value={organization?.orgCode}>
                    {organization?.orgDescription}
                  </option>
                );
              })}
            </Select>
            <FormHelperText>
              {selectedOrganization === 'None' ? <IntlMessages id="appModule.organizationEmpty" /> : ' '}
            </FormHelperText>
          </FormControl> */}
                      <Autocomplete
                        id="organizationss"
                        options={organizationss}
                        value={organizationText}
                        //getOptionSelected={(option, value) => option.orgCode}
                        getOptionLabel={option => option.orgDescription}
                        style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="label.organization" />}
                            variant="outlined"
                            helperText={selectedOrganizationError}
                          />
                        )}
                        onChange={(event, value) => {
                          setSelectedOrganization(value.orgCode);
                          setOrganizationText(value);
                          setSelectedOrganizationError('');
                          setStandard(value.orgCode, value.orgDescription, 'organization');
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      {/*             <FormControl
            variant="outlined"
            size="medium"
            className={classes.standardControls}
            style={{ maxWidth: '100%', minWidth: '100%' }}>
            <InputLabel id="outlined-organization">{<IntlMessages id="label.school" />}</InputLabel>
            <Select
              fullWidth
              id="outlined-organization"
              value={selectedSchool}
              defaultValue={selectedSchool}
              onChange={event => {
                setSelectedSchool(event.target.value);
                // getUserPurchaseArea(user, event.target.value);
              }}
              label={<IntlMessages id="label.school" />}
              variant="outlined"
              margin="dense"
              inputProps={{
                id: `outlined-school`,
              }}
              readOnly={standardName !== ''}
              disabled={standardName !== ''}
              error={selectedSchool === 'None'}>
              <option value="None" />
              {schoolss.map((school, index) => {
                return (
                  <option key={index} name={school?.schoDescription} value={school?.schoCode}>
                    {school?.schoDescription}
                  </option>
                );
              })}
            </Select>
            <FormHelperText>
              {selectedSchool === 'None' ? <IntlMessages id="appModule.schoolEmpty" /> : ' '}
            </FormHelperText>
          </FormControl> */}
                      <Autocomplete
                        id="schools"
                        options={schoolss}
                        value={schoolText}
                        getOptionLabel={option => option.schoDescription}
                        //getOptionSelected={(option, value) => option.schoDescription}
                        // style={{ width: '100%' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={<IntlMessages id="label.school" />}
                            variant="outlined"
                            helperText={selectedSchoolError}
                          />
                        )}
                        onChange={(event, value) => {
                          setSelectedSchool(value.schoCode);
                          setSchoolText(value);
                          setSelectedSchoolError('');
                          setStandard(value.schoCode, value.schoDescription, 'school');
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                          disableToolbar
                          style={{ marginTop: -8 }}
                          margin="dense"
                          variant="outlined"
                          value={selectedDate}
                          onChange={setSelectedDate}
                          views={['year']}
                          openTo="year"
                          label={<IntlMessages id="standards.appModule.standardYear" />}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <AppSelectBox
                        fullWidth
                        data={standardStatusOptionsList}
                        label={<IntlMessages id="standards.appModule.status" />}
                        valueKey="value"
                        variant="outlined"
                        labelKey="label"
                        value={standardActive}
                        disabled
                        onChange={e => {
                          setStandardActive(e.target.value ? 'S' : 'N');
                          setStandard(e.target.checked ? 'S' : 'N', e.target.value ? 'S' : 'N', 'status');
                        }}
                        helperText={standardActiveError}
                      />
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <AppSelectBox
                        fullWidth
                        data={standardAvailableOptionsList}
                        label={<IntlMessages id="standards.appModule.available" />}
                        valueKey="value"
                        variant="outlined"
                        labelKey="label"
                        value={standardActive}
                        onChange={e => {
                          setAvailableForPurchaseActive(e.target.value ? 'S' : 'N');
                          setStandard(e.target.checked ? 'S' : 'N', e.target.value ? 'S' : 'N', 'available');
                        }}
                        helperText={availableForPurchaseActiveError}
                      />
                    </Grid>

                    {/*                     <Grid item xs={6} sm={4}>
                      <FormControlLabel
                        value={standardActive}
                        checked={standardActive === 'S'}
                        style={{ marginLeft: 0, marginTop: -40 }}
                        control={<Checkbox color="primary" />}
                        label={<IntlMessages id="standards.appModule.available" />}
                        labelPlacement="start"
                        onChange={e => {
                          setStandardActive(e.target.checked ? 'S' : 'N');
                          setStandard(e.target.checked ? 'S' : 'N', e.target.checked ? 'S' : 'N', "available");
                        }}
                      />
                    </Grid> */}
                  </GridContainer>
                </Box>
              </CardContent>
            </Card>
          )}
          {/* Fin Cabecera */}
          {/* Inicia Asignaturas */}
          <Card className={classes.root} variant="outlined" style={{ maxWidth: '99%', minWidth: '99%', marginBottom: 10 }}>
            {relays
              ? relays.map((relay, index) => (
                  <StandardCourse
                    key={index}
                    onCloseDialog={onCloseDialog}
                    onSubmitClick={onSubmitClick}
                    relay={relay}
                    index={index}
                    removeCourseItem={removeCourseItem}
                    setCoursesFetched={setCoursesFetched}
                  />
                ))
              : null}
            {/* Fin Asignaturas */}
            <Box display="flex" justifyContent="flex-end">
              <CardActions>
                <Button variant="outlined" color="primary" onClick={() => handleOpenDialog()}>
                  <Add />
                </Button>
                {/* <Box ml={2}> */}
                <Button variant="outlined" color="primary" onClick={() => handleStandardCourseDelete('', '')}>
                  <Delete />
                </Button>
              </CardActions>
            </Box>
          </Card>
          <Box display="flex" justifyContent="flex-end" mb={4} className={classes.formControl}>
            <Button onClick={onCloseDialog}>Cancel</Button>
            <Box ml={2}>
              <Button variant="contained" color="primary" onClick={onSubmitClick}>
                Save
              </Button>
            </Box>
          </Box>
        </div>
      </DialogContent>
      {openAddCourseRoomLayoutDialog && (
        <AddCourseRoomLayout open={openAddCourseRoomLayoutDialog} onCloseDialog={handleCloseDialog} />
      )}
    </Dialog>
  );
};

export default AddEditStandard;

AddEditStandard.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
