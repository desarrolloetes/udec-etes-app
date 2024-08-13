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
import { addNewMajor, updateMajor } from 'redux/actions/Majors';
import { getAllOrganizations } from 'redux/actions/Organizations';
import { getSchools } from 'redux/actions/Schools';
import { getChargeAccounts } from 'redux/actions/ChargeAccounts';
import { getLevels } from 'redux/actions/Levels';
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

const AddEditMajor = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const currentMajor = useSelector(({ majorsReducer }) => majorsReducer.currentMajor);
  const { organizations } = useSelector(({ organizationsReducer }) => organizationsReducer);
  const { schools } = useSelector(({ schoolsReducer }) => schoolsReducer);
  const { chargeAccounts } = useSelector(({ chargeAccountsReducer }) => chargeAccountsReducer);
  const { levels } = useSelector(({ levelsReducer }) => levelsReducer);

  const [majorDescription, setMajorDescription] = useState('');
  const [majorCode, setMajorCode] = useState('');
  const [majorStatus, setMajorStatus] = useState('');
  const [majorOrgCode, setMajorOrgCode] = useState('');
  const [majorCaccCode, setMajorCaccCode] = useState('');
  const [majorSchoolCode, setMajorSchoolCode] = useState('');
  const [majorLevelCode, setMajorLevelCode] = useState('');
  const [profile_pic, setProfile_pic] = useState('');

  const [majorDescriptionError, setMajorDescriptionError] = useState('');
  const [majorCodeError, setMajorCodeError] = useState('');
  const [majorStatusError, setMajorStatusError] = useState('');
  const [majorOrgCodeError, setMajorOrgCodeError] = useState('');
  const [majorCaccCodeError, setMajorCaccCodeError] = useState('');
  const [majorSchoolCodeError, setMajorSchoolCodeError] = useState('');
  const [majorLevelCodeError, setMajorLevelCodeError] = useState('');

  const [searchOrgTerm, setSearchOrgTerm] = useState('');
  const [searchSchoolTerm, setSearchSchoolTerm] = useState('');
  const [searchLevelTerm, setSearchLevelTerm] = useState('');

  const [filterOptions, setFilterOptions] = React.useState([]);
  const debouncedSearchOrgTerm = useDebounce(searchOrgTerm, 500);
  const debouncedSearchBuTerm = useDebounce(searchSchoolTerm, 500);
  const debouncedSearchLevelTerm = useDebounce(searchLevelTerm, 500);

  const [isFilterApplied, setFilterApplied] = useState(false);
  const [organizationsFetched, setOrganizationsFetched] = useState(false);
  const [schoolsFetched, setSchoolsFetched] = useState(false);
  const [levelFetched, setLevelFetched] = useState(false);

  const [selectedSchoolCode, setSelectedSchoolCode] = useState('');
  const [selectedCaccCode, setSelectedCaccCode] = useState('');
  const [selectedOrgCode, setSelectedOrgCode] = useState('');
  const [selectedLevelCode, setSelectedLevelCode] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentMajor) {
      setMajorDescription(currentMajor.majorDescription);
      setMajorCode(currentMajor.majorCode);
      setMajorStatus(currentMajor.majorStatus);
      setMajorOrgCode(currentMajor.majorOrgCode);
      setMajorCaccCode(currentMajor.majorCaccCode);
      setMajorSchoolCode(currentMajor.majorSchoolCode);
      setMajorLevelCode(currentMajor.majorLevelCode);
      //setSelectedOrgCode(currentMajor.majorOrgCode);
      //setSelectedSchoolCode(currentMajor.majorSchoolCode);
      //setSelectedCaccCode(currentMajor.majorCaccCode);
    }
  }, [currentMajor]);

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
      getSchools(filterOptions, selectedOrgCode, () => {
        setFilterApplied(!!filterOptions.length || !!selectedOrgCode);
        setSchoolsFetched(true);
        if (currentMajor) {
          setSelectedSchoolCode(currentMajor.majorSchoolCode);
        }
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getChargeAccounts(filterOptions, selectedOrgCode, () => {
        setFilterApplied(!!filterOptions.length || !!selectedOrgCode);
        setSchoolsFetched(true);
        if (currentMajor) {
          setSelectedCaccCode(currentMajor.majorCaccCode);
        }
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getLevels(filterOptions, debouncedSearchLevelTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchLevelTerm);
        setLevelFetched(true);
        if (currentMajor) {
          setSelectedLevelCode(currentMajor.majorLevelCode);
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

  const onMajorStatusChange = value => {
    setMajorStatus(value);
  };

  const onMajorOrgCodeChange = value => {
    setMajorOrgCode(value);
  };

  const onMajorSchoolCodeChange = value => {
    setMajorSchoolCode(value);
  };

  const onMajorCaccCodeChange = value => {
    setMajorCaccCode(value);
  };

  const onMajorLevelCodeChange = value => {
    setMajorLevelCode(value);
  };

  //console.log(`userGender: ${userGender}`)

  const onSubmitClick = () => {
    //const phoneNumbers = phones.filter(item => item.phone.trim());
    let createOrUpdate = true;
    if (!majorDescription) {
      setMajorDescriptionError(<IntlMessages id="majors.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!majorCode) {
      setMajorCodeError(<IntlMessages id="majors.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!majorStatus) {
      setMajorStatusError(<IntlMessages id="majors.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!majorOrgCode) {
      setMajorOrgCodeError(<IntlMessages id="majors.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!majorSchoolCode) {
      setMajorSchoolCodeError(<IntlMessages id="majors.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!majorCaccCode) {
      setMajorCaccCodeError(<IntlMessages id="majors.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!majorLevelCode) {
      setMajorLevelCodeError(<IntlMessages id="majors.appModule.requiredMessage" />);
      createOrUpdate = false;
    }

    if (createOrUpdate) {
      onMajorSave();
    }
  };

  const onMajorSave = () => {
    const majorDetail = {
      majorCode: majorCode,
      majorDescription: majorDescription,
      majorOrgCode: majorOrgCode,
      majorSchoolCode: majorSchoolCode,
      majorCaccCode: majorCaccCode,
      majorLevelCode: majorLevelCode,
      majorStatus: majorStatus,
    };

    if (currentMajor) {
      const majorUpdate = {
        // majorCode: majorDetail.majorCode,
        majorOrgCode: majorDetail.majorOrgCode,
        majorDescription: majorDetail.majorDescription,
        majorSchoolCode: majorDetail.majorSchoolCode,
        majorCaccCode: majorDetail.majorCaccCode,
        majorLevelCode: majorDetail.majorLevelCode,
        majorStatus: majorDetail.majorStatus,
      };

      const majorCodeUpdate = currentMajor.majorCode;
      //const majorOrgCodeUpdate = currentMajor.majorOrgCode;
      //console.log({ majorUpdate });
      dispatch(
        //updateUser({ ...currentUser, ...userDetail }, () => {
        updateMajor(majorCodeUpdate, majorUpdate, () => {
          onCloseDialog();
        }),
      );
    } else {
      //console.log('addNewUser');
      //console.log({userDetail});
      dispatch(
        addNewMajor(majorDetail, () => {
          onCloseDialog();
        }),
      );
    }
  };

  // const isPhonesMultiple = phones.length > 1;
  //console.log("currentMajor.majorSchoolCode:" + currentMajor.majorSchoolCode);
  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentMajor ? (
          <IntlMessages id="majors.editCreate.form.editTitle" />
        ) : (
          <IntlMessages id="majors.editCreate.form.createTitle" />
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          {/*           <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={profile_pic} />
          </Box> */}
          <GridContainer>
            {currentMajor ? (
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label={<IntlMessages id="majors.editCreate.label.majorCode" />}
                  value={majorCode}
                  editable="false"
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label={<IntlMessages id="majors.editCreate.label.majorCode" />}
                  value={majorCode}
                  onChange={e => {
                    setMajorCode(e.target.value);
                    setMajorCodeError('');
                  }}
                  helperText={majorCodeError}
                />
              </Grid>
            )}
            {currentMajor ? (
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label={<IntlMessages id="majors.editCreate.label.majorOrgCode" />}
                  value={majorOrgCode}
                  editable="false"
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6}>
                <AppSelectBox
                  fullWidth
                  id="organizations"
                  data={organizations}
                  label={<IntlMessages id="majors.editCreate.label.majorOrgCode" />}
                  valueKey="orgCode"
                  variant="outlined"
                  labelKey="orgDescription"
                  value={majorOrgCode}
                  onChange={e => {
                    onMajorOrgCodeChange(e.target.value);
                    setSelectedOrgCode(e.target.value);
                    setMajorOrgCodeError('');
                  }}
                  helperText={majorOrgCodeError}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label={<IntlMessages id="majors.editCreate.label.majorDescription" />}
                value={majorDescription}
                onChange={e => {
                  setMajorDescription(e.target.value);
                  setMajorDescriptionError('');
                }}
                helperText={majorDescriptionError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                id="schools"
                data={schools}
                label={<IntlMessages id="majors.editCreate.label.majorSchoolCode" />}
                valueKey="schoCode"
                variant="outlined"
                labelKey="schoDescription"
                value={selectedSchoolCode}
                onChange={e => {
                  onMajorSchoolCodeChange(e.target.value);
                  setSelectedSchoolCode(e.target.value);
                  setMajorSchoolCodeError('');
                }}
                helperText={majorSchoolCodeError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                id="chargeAccounts"
                data={chargeAccounts}
                label={<IntlMessages id="majors.editCreate.label.majorCaccCode" />}
                valueKey="caccCode"
                variant="outlined"
                labelKey="caccDescription"
                value={selectedCaccCode}
                onChange={e => {
                  onMajorCaccCodeChange(e.target.value);
                  setSelectedCaccCode(e.target.value);
                  setMajorCaccCodeError('');
                }}
                helperText={majorCaccCodeError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                id="levels"
                data={levels}
                label={<IntlMessages id="majors.editCreate.label.majorLevelCode" />}
                valueKey="levelCode"
                variant="outlined"
                labelKey="levelDescription"
                value={selectedLevelCode}
                onChange={e => {
                  onMajorLevelCodeChange(e.target.value);
                  setSelectedLevelCode(e.target.value);
                  setMajorLevelCodeError('');
                }}
                helperText={majorLevelCodeError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                data={statusLabels}
                label={<IntlMessages id="majors.editCreate.label.majorStatus" />}
                valueKey="slug"
                variant="outlined"
                labelKey="title"
                value={majorStatus}
                onChange={e => {
                  onMajorStatusChange(e.target.value);
                  setMajorStatusError('');
                }}
                helperText={majorStatusError}
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

export default AddEditMajor;

AddEditMajor.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
