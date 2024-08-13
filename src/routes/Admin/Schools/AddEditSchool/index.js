import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
//import Box from '@material-ui/core/Box';
import GridContainer from '@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import CmtAvatar from '@coremat/CmtAvatar';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
//import CmtList from '@coremat/CmtList';
//import IconButton from '@material-ui/core/IconButton';
import AppSelectBox from '@jumbo/components/Common/formElements/AppSelectBox';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
//import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
//import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
//import CancelIcon from '@material-ui/icons/Cancel';
import { addNewSchool, updateSchool } from 'redux/actions/Schools';
import { getAllOrganizations } from 'redux/actions/Organizations';
import { getBusinessUnits } from 'redux/actions/BusinessUnits';
import { getChargeAccounts } from 'redux/actions/ChargeAccounts';
import { useDebounce } from '@jumbo/utils/commonHelper';
import Select from '@material-ui/core/Select';

//import { Box, TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';

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

/* function PhoneNumberInput({ onChange, value, ...other }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (!phoneNumber && value) {
      setTimeout(() => {
        setPhoneNumber(value);
      }, 300);
    }
  }, [phoneNumber, value]);

  const onNumberChange = number => {
    setPhoneNumber(number.formattedValue);
    onChange(number.formattedValue);
  };

  return <NumberFormat {...other} onValueChange={onNumberChange} value={phoneNumber} format="(###) ###-####" />;
} */

/* const labels = [
  { title: 'Masculino', slug: 'M' },
  { title: 'Femenino', slug: 'F' },
  { title: 'Otro', slug: 'O' },
]; */

const statusLabels = [
  { title: 'Activo', slug: 'S' },
  { title: 'Inactivo', slug: 'N' },
];

/*  const splitName = user => {
  if (user) {
    const [uFirstName, uMiddleName, uLastName, uTaxPayer,uName, uPassword, uEmail,uAddress, uCellPhone, uGender,uStatus] = user;
    return [uFirstName, uMiddleName, uLastName, uTaxPayer,uName, uPassword, uEmail,uAddress, uCellPhone, uGender,uStatus];
    //console.log({user});
    //return user;
  } 
  return ['', ''];
}; */

const AddEditSchool = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const currentSchool = useSelector(({ schoolsReducer }) => schoolsReducer.currentSchool);
  const { organizations } = useSelector(({ organizationsReducer }) => organizationsReducer);
  const { businessUnits } = useSelector(({ businessUnitsReducer }) => businessUnitsReducer);
  const { chargeAccounts } = useSelector(({ chargeAccountsReducer }) => chargeAccountsReducer);

  const [schoDescription, setSchoolDescription] = useState('');
  const [schoCode, setSchoolCode] = useState('');
  const [schoStatus, setSchoolStatus] = useState('');
  const [schoOrgCode, setSchoolOrgCode] = useState('');
  const [schoCaccCode, setSchoolCaccCode] = useState('');
  const [schoBuCode, setSchoolBuCode] = useState('');
  const [profile_pic, setProfile_pic] = useState('');

  const [schoDescriptionError, setSchoolDescriptionError] = useState('');
  const [schoCodeError, setSchoolCodeError] = useState('');
  const [schoStatusError, setSchoolStatusError] = useState('');
  const [schoOrgCodeError, setSchoolOrgCodeError] = useState('');
  const [schoCaccCodeError, setSchoolCaccCodeError] = useState('');
  const [schoBuCodeError, setSchoolBuCodeError] = useState('');

  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchOrgTerm, setSearchOrgTerm] = useState('');
  const [searchBuTerm, setSearchBuTerm] = useState('');
  const debouncedSearchOrgTerm = useDebounce(searchOrgTerm, 500);
  const debouncedSearchBuTerm = useDebounce(searchBuTerm, 500);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [organizationsFetched, setOrganizationsFetched] = useState(false);
  const [businessUnitsFetched, setBusinessUnitsFetched] = useState(false);

  const [selectedBuCode, setSelectedBuCode] = useState('');
  const [selectedCaccCode, setSelectedCaccCode] = useState('');
  const [selectedOrgCode, setSelectedOrgCode] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSchool) {
      setSchoolDescription(currentSchool.schoDescription);
      setSchoolCode(currentSchool.schoCode);
      setSchoolStatus(currentSchool.schoStatus);
      setSchoolOrgCode(currentSchool.schoOrgCode);
      setSchoolCaccCode(currentSchool.schoCaccCode);
      setSchoolBuCode(currentSchool.schoBuCode);
      //setSelectedOrgCode(currentSchool.schoOrgCode);
      //setSelectedBuCode(currentSchool.schoBuCode);
      //setSelectedCaccCode(currentSchool.schoCaccCode);
    }
  }, [currentSchool]);

  useEffect(() => {
    dispatch(
      getAllOrganizations(filterOptions, debouncedSearchOrgTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchOrgTerm);
        setOrganizationsFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchOrgTerm]);

  useEffect(() => {
    dispatch(
      getBusinessUnits(filterOptions, debouncedSearchBuTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchBuTerm);
        setBusinessUnitsFetched(true);
        if (currentSchool) {
          setSelectedBuCode(currentSchool.schoBuCode);
        }
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getChargeAccounts(filterOptions, selectedOrgCode, () => {
        setFilterApplied(!!filterOptions.length || !!selectedOrgCode);
        setBusinessUnitsFetched(true);
        if (currentSchool) {
          setSelectedCaccCode(currentSchool.schoCaccCode);
        }
      }),
    );
  }, []);

  /*   const onPhoneNoAdd = (number, index) => {
    const updatedList = [...phones];
    updatedList[index].phone = number;
    setPhones(updatedList);
    setPhoneError('');
  }; */

  /*   const onPhoneRowRemove = index => {
    const updatedList = [...phones];
    updatedList.splice(index, 1);
    setPhones(updatedList);
  };

  const onPhoneRowAdd = () => {
    setPhones(phones.concat({ phone: '', label: 'home' }));
  }; */

  /*   const onLabelChange = (value, index) => {
    const updatedList = [...phones];
    updatedList[index].label = value;
    setPhones(updatedList);
  }; */

  /*   const onUserGenderChange = (value) => {
    setUserGender(value);
  }; */

  const onSchoolStatusChange = value => {
    setSchoolStatus(value);
  };

  const onSchoolOrgCodeChange = value => {
    setSchoolOrgCode(value);
  };

  const onSchoolBuCodeChange = value => {
    setSchoolBuCode(value);
  };

  const onSchoolCaccCodeChange = value => {
    setSchoolCaccCode(value);
  };

  //console.log(`userGender: ${userGender}`)

  const onSubmitClick = () => {
    //const phoneNumbers = phones.filter(item => item.phone.trim());
    let createOrUpdate = true;
    if (!schoDescription) {
      setSchoolDescriptionError(<IntlMessages id="schools.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!schoCode) {
      setSchoolCodeError(<IntlMessages id="schools.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!schoStatus) {
      setSchoolStatusError(<IntlMessages id="schools.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!schoOrgCode) {
      setSchoolOrgCodeError(<IntlMessages id="schools.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!schoBuCode) {
      setSchoolBuCodeError(<IntlMessages id="schools.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!schoCaccCode) {
      setSchoolCaccCodeError(<IntlMessages id="schools.appModule.requiredMessage" />);
      createOrUpdate = false;
    }

    if (createOrUpdate) {
      onSchoolSave();
    }
  };

  const onSchoolSave = () => {
    const schoolDetail = {
      schoCode: schoCode,
      schoDescription: schoDescription,
      schoOrgCode: schoOrgCode,
      schoBuCode: schoBuCode,
      schoCaccCode: schoCaccCode,
      schoStatus: schoStatus,
    };

    if (currentSchool) {
      const schoolUpdate = {
        // schoCode: schoolDetail.schoCode,
        //schoOrgCode: schoolDetail.schoOrgCode,
        schoDescription: schoolDetail.schoDescription,
        schoBuCode: schoolDetail.schoBuCode,
        schoCaccCode: schoolDetail.schoCaccCode,
        schoStatus: schoolDetail.schoStatus,
      };

      const schoCodeUpdate = currentSchool.schoCode;
      const schoOrgCodeUpdate = currentSchool.schoOrgCode;
      //console.log({ schoolUpdate });
      dispatch(
        //updateUser({ ...currentUser, ...userDetail }, () => {
        updateSchool(schoCodeUpdate, schoOrgCodeUpdate, schoolUpdate, () => {
          onCloseDialog();
        }),
      );
    } else {
      //console.log('addNewUser');
      //console.log({userDetail});
      dispatch(
        addNewSchool(schoolDetail, () => {
          onCloseDialog();
        }),
      );
    }
  };

  // const isPhonesMultiple = phones.length > 1;
  //console.log("currentSchool.schoBuCode:" + currentSchool.schoBuCode);
  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentSchool ? (
          <IntlMessages id="schools.editCreate.form.editTitle" />
        ) : (
          <IntlMessages id="schools.editCreate.form.createTitle" />
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          {/*           <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={profile_pic} />
          </Box> */}
          <GridContainer>
            {currentSchool ? (
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label={<IntlMessages id="schools.editCreate.label.schoCode" />}
                  value={schoCode}
                  editable="false"
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label={<IntlMessages id="schools.editCreate.label.schoCode" />}
                  value={schoCode}
                  onChange={e => {
                    setSchoolCode(e.target.value);
                    setSchoolCodeError('');
                  }}
                  helperText={schoCodeError}
                />
              </Grid>
            )}
            {currentSchool ? (
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label={<IntlMessages id="schools.editCreate.label.schoOrgCode" />}
                  value={schoOrgCode}
                  editable="false"
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6}>
                <AppSelectBox
                  fullWidth
                  id="organizations"
                  data={organizations}
                  label={<IntlMessages id="schools.editCreate.label.schoOrgCode" />}
                  valueKey="orgCode"
                  variant="outlined"
                  labelKey="orgDescription"
                  value={schoOrgCode}
                  onChange={e => {
                    onSchoolOrgCodeChange(e.target.value);
                    setSelectedOrgCode(e.target.value);
                    setSchoolOrgCodeError('');
                  }}
                  helperText={schoOrgCodeError}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label={<IntlMessages id="schools.editCreate.label.schoDescription" />}
                value={schoDescription}
                onChange={e => {
                  setSchoolDescription(e.target.value);
                  setSchoolDescriptionError('');
                }}
                helperText={schoDescriptionError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                id="chargeAccounts"
                data={chargeAccounts}
                label={<IntlMessages id="schools.editCreate.label.schoCaccCode" />}
                valueKey="caccCode"
                variant="outlined"
                labelKey="caccDescription"
                value={selectedCaccCode}
                onChange={e => {
                  onSchoolCaccCodeChange(e.target.value);
                  setSelectedCaccCode(e.target.value);
                  setSchoolCaccCodeError('');
                }}
                helperText={schoCaccCodeError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                id="businessUnits"
                data={businessUnits}
                label={<IntlMessages id="schools.editCreate.label.schoBuCode" />}
                valueKey="buCode"
                variant="outlined"
                labelKey="buName"
                value={selectedBuCode}
                onChange={e => {
                  onSchoolBuCodeChange(e.target.value);
                  setSelectedBuCode(e.target.value);
                  setSchoolBuCodeError('');
                }}
                helperText={schoBuCodeError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                data={statusLabels}
                label={<IntlMessages id="schools.editCreate.label.schoStatus" />}
                valueKey="slug"
                variant="outlined"
                labelKey="title"
                value={schoStatus}
                onChange={e => {
                  onSchoolStatusChange(e.target.value);
                  setSchoolStatusError('');
                }}
                helperText={schoStatusError}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditSchool;

AddEditSchool.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
