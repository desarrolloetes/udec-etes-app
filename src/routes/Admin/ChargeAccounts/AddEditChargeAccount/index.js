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
import { addNewChargeAccount, updateChargeAccount } from 'redux/actions/ChargeAccounts';
import { getAllOrganizations } from 'redux/actions/Organizations';
import { useDebounce } from '@jumbo/utils/commonHelper';

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

const AddEditChargeAccount = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const currentChargeAccount = useSelector(({ chargeAccountsReducer }) => chargeAccountsReducer.currentChargeAccount);
  const { organizations } = useSelector(({ organizationsReducer }) => organizationsReducer);

  //const [roleId, setRoleId] = useState('');
  const [caccDescription, setChargeAccountDescription] = useState('');
  const [caccOrgCode, setOrgCode] = useState('');
  const [caccStatus, setChargeAccountStatus] = useState('');
  const [caccCode, setChargeAccountCode] = useState('');
  const [profile_pic, setProfile_pic] = useState('');
  //const [company, setCompany] = useState(1);

  //const [roleIdError, setRoleIdrror] = useState('');
  const [caccDescriptionError, setChargeAccountDescriptionError] = useState('');
  const [caccOrgCodeError, setOrgCodeError] = useState('');
  const [caccCodeError, setChargeAccountCodeError] = useState('');
  const [caccStatusError, setChargeAccountStatusError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const dispatch = useDispatch();
  const [searchOrgTerm, setSearchOrgTerm] = useState('');
  const [filterOptions, setFilterOptions] = React.useState([]);
  const debouncedSearchOrgTerm = useDebounce(searchOrgTerm, 500);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [organizationsFetched, setOrganizationsFetched] = useState(false);

  useEffect(() => {
    if (currentChargeAccount) {
      //console.log({ currentChargeAccount });
      //setRoleId(currentChargeAccount.roleId);
      setChargeAccountDescription(currentChargeAccount.caccDescription);
      setOrgCode(currentChargeAccount.caccOrgCode);
      setChargeAccountStatus(currentChargeAccount.caccStatus);
      setChargeAccountCode(currentChargeAccount.caccCode);
    }
  }, [currentChargeAccount]);

  useEffect(() => {
    dispatch(
      getAllOrganizations(filterOptions, debouncedSearchOrgTerm, () => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchOrgTerm);
        setOrganizationsFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchOrgTerm]);

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

  const onChargeAccountStatusChange = value => {
    setChargeAccountStatus(value);
  };

  const onChargeAccountOrganizationChange = value => {
    setOrgCode(value);
  };

  //console.log(`userGender: ${userGender}`)

  const onSubmitClick = () => {
    //const phoneNumbers = phones.filter(item => item.phone.trim());
    let createOrUpdate = true;
    if (!caccDescription) {
      setChargeAccountDescriptionError(<IntlMessages id="chargeAccounts.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!caccStatus) {
      setChargeAccountStatusError(<IntlMessages id="chargeAccounts.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!currentChargeAccount) {
      if (!caccOrgCode) {
        setOrgCodeError(<IntlMessages id="chargeAccounts.appModule.requiredMessage" />);
        createOrUpdate = false;
      }
      if (!caccCode) {
        setChargeAccountCodeError(<IntlMessages id="chargeAccounts.appModule.requiredMessage" />);
        createOrUpdate = false;
      }
    }

    if (createOrUpdate) {
      onChargeAccountSave();
    }
  };

  const onChargeAccountSave = () => {
    const chargeAccountDetail = {
      caccOrgCode: caccOrgCode,
      caccDescription: caccDescription,
      caccStatus: caccStatus,
      caccCode: caccCode,
    };

    if (currentChargeAccount) {
      const chargeAccountUpdate = {
        // caccOrgCode: chargeAccountDetail.caccOrgCode,
        caccDescription: chargeAccountDetail.caccDescription,
        caccStatus: chargeAccountDetail.caccStatus,
      };

      const caccOrgCodeUpdate = currentChargeAccount.caccOrgCode;
      const caccCodeUpdate = currentChargeAccount.caccCode;
      dispatch(
        //updateUser({ ...currentUser, ...userDetail }, () => {
        updateChargeAccount(caccCodeUpdate, caccOrgCodeUpdate, chargeAccountUpdate, () => {
          onCloseDialog();
        }),
      );
    } else {
      dispatch(
        addNewChargeAccount(chargeAccountDetail, () => {
          onCloseDialog();
        }),
      );
    }
  };

  // const isPhonesMultiple = phones.length > 1;
  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentChargeAccount ? (
          <IntlMessages id="chargeAccounts.editCreate.form.editTitle" />
        ) : (
          <IntlMessages id="chargeAccounts.editCreate.form.createTitle" />
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          {/*           <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={profile_pic} />
          </Box> */}
          <GridContainer>
            {currentChargeAccount ? (
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label={<IntlMessages id="chargeAccounts.editCreate.label.caccCode" />}
                  value={caccCode}
                  editable="false"
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label={<IntlMessages id="chargeAccounts.editCreate.label.caccCode" />}
                  value={caccCode}
                  onChange={e => {
                    setChargeAccountCode(e.target.value);
                    setChargeAccountCodeError('');
                  }}
                  helperText={caccCodeError}
                />
              </Grid>
            )}
            {currentChargeAccount ? (
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label={<IntlMessages id="chargeAccounts.editCreate.label.caccOrgCode" />}
                  value={caccOrgCode}
                  editable="false"
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6}>
                <AppSelectBox
                  fullWidth
                  data={organizations}
                  label={<IntlMessages id="chargeAccounts.editCreate.label.caccOrgCode" />}
                  valueKey="orgCode"
                  variant="outlined"
                  labelKey="orgDescription"
                  value={caccOrgCode}
                  onChange={e => {
                    onChargeAccountOrganizationChange(e.target.value);
                    setOrgCodeError('');
                  }}
                  helperText={caccOrgCodeError}
                />
                {/*             <AppTextInput
              fullWidth
              variant="outlined"
              label={<IntlMessages id="chargeAccounts.editCreate.label.caccOrgCode" />}
              value={caccOrgCode}
              onChange={e => {
                setOrgCode(e.target.value);
                setOrgCodeError('');
              }}
              helperText={caccOrgCodeError}  
            /> */}
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label={<IntlMessages id="chargeAccounts.editCreate.label.caccDescription" />}
                value={caccDescription}
                onChange={e => {
                  setChargeAccountDescription(e.target.value);
                  setChargeAccountDescriptionError('');
                }}
                helperText={caccDescriptionError}
              />
            </Grid>
            {/*           </GridContainer>
        </Box> */}
            {/*  <GridContainer style={{ marginBottom: 12 }}> */}
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                data={statusLabels}
                label={<IntlMessages id="chargeAccounts.editCreate.label.caccStatus" />}
                valueKey="slug"
                variant="outlined"
                labelKey="title"
                value={caccStatus}
                onChange={e => {
                  onChargeAccountStatusChange(e.target.value);
                  setChargeAccountStatusError('');
                }}
                helperText={caccStatusError}
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

export default AddEditChargeAccount;

AddEditChargeAccount.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
