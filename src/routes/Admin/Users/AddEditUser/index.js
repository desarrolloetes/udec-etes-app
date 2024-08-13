import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
//import Box from '@material-ui/core/Box';
import GridContainer from '@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import CmtAvatar from '@coremat/CmtAvatar';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
//import CmtList from '../../../../@coremat/CmtList';
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
import { isValidEmail } from '@jumbo/utils/commonHelper';
import { addNewUser, updateUser } from 'redux/actions/Users';

import { Box, TextField } from '@material-ui/core';

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

const labels = [
  { title: 'Masculino', slug: 'M' },
  { title: 'Femenino', slug: 'F' },
  { title: 'Otro', slug: 'O' },
];

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

const AddEditUser = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const currentUser = useSelector(({ usersReducer }) => usersReducer.currentUser);

  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userGender, setUserGender] = useState('M');
  const [profile_pic, setProfile_pic] = useState('');
  //const [phones, setPhones] = useState([{ phone: '', label: 'home' }]);
  const [userTaxPayer, setUserTaxPayer] = useState('');
  const [userStatus, setUserStatus] = useState('S');
  const [userPassword, setUserPassword] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const [company, setCompany] = useState(1);
  //const [designation, setDesignation] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [middleNameError, setMiddleNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [userPasswordError, setUserPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  //const [phoneError, setPhoneError] = useState('');
  const [userTaxPayerError, setUserTaxPayerError] = useState('');
  const [userAddressError, setUserAddressError] = useState('');
  const [userPhoneError, setUserPhoneError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      //console.log({currentUser})
      setUserId(currentUser.userId);
      setCompany(currentUser.userCompay);
      setCompany(currentUser.userCompay);
      setFirstName(currentUser.userFirstName);
      setMiddleName(currentUser.userMiddleName);
      setLastName(currentUser.userLastName);
      setUserName(currentUser.userName);
      setUserTaxPayer(currentUser.userRut);
      //setProfile_pic(currentUser.profile_pic);
      setEmail(currentUser.userEmail);
      //setPhones([currentUser.userCellphone]);
      //setPhones([{ phone: '', label: 'home' }]);
      //onPhoneNoAdd(currentUser.userCellphone,0);
      setUserPhone(currentUser.userCellphone);
      setUserGender(currentUser.userGender);
      setUserStatus(currentUser.userStatus);
      setUserPassword(currentUser.userPassword);
      setUserAddress(currentUser.userAddress);
    }
  }, [currentUser]);

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

  const onUserGenderChange = value => {
    setUserGender(value);
  };

  const onUserStatusChange = value => {
    setUserStatus(value);
  };

  //console.log(`userGender: ${userGender}`)

  const onSubmitClick = () => {
    //const phoneNumbers = phones.filter(item => item.phone.trim());
    let createOrUpdate = true;
    if (!firstName) {
      setFirstNameError(<IntlMessages id="users.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!middleName) {
      setMiddleNameError(<IntlMessages id="users.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!lastName) {
      setLastNameError(<IntlMessages id="users.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!userName) {
      setUserNameError(<IntlMessages id="users.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!email) {
      setEmailError(<IntlMessages id="users.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!isValidEmail(email)) {
      setEmailError(<IntlMessages id="users.appModule.emailNotValid" />);
      createOrUpdate = false;
    }
    if (!userTaxPayer) {
      setUserTaxPayerError(<IntlMessages id="users.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!userPassword) {
      setUserPasswordError(<IntlMessages id="users.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!userAddress) {
      setUserAddressError(<IntlMessages id="users.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!userPhone) {
      setUserPhoneError(<IntlMessages id="users.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    /*     if (phoneNumbers.length === 0) {
      setPhoneError(<IntlMessages id="users.appModule.requiredMessage"/>);
    } else {
     
    } */
    if (createOrUpdate) {
      onUserSave();
    }
  };

  const onUserSave = () => {
    const userDetail = {
      profile_pic,
      //name: `${firstName} ${lastName}`,
      userId: userId,
      userCompay: company,
      userFirstname: `${firstName}`,
      userMiddlename: `${middleName}`,
      userLastname: `${lastName}`,
      userName: `${userName}`,
      userTaxPayer: `${userTaxPayer}`,
      userEmail: `${email}`,
      //userCellphone: phoneNumbers[0].phone,
      userCellphone: `${userPhone}`,
      userGender: `${userGender}`,
      userStatus: `${userStatus}`,
      userPassword: `${userPassword}`,
      userAddress: `${userAddress}`,

      // designation,
    };

    if (currentUser) {
      const userUpdate = {
        userFirstname: userDetail.userFirstname,
        userMiddlename: userDetail.userMiddlename,
        userLastname: userDetail.userLastname,
        userEmail: userDetail.userEmail,
        userCellphone: userDetail.userFirstname,
        userGender: userDetail.userGender,
        userPassword: userDetail.userPassword,
        userTaxPayer: userDetail.userTaxPayer,
        userStatus: userDetail.userStatus,
        userAddress: userDetail.userAddress,
        confirmUserPassword: userDetail.userPassword,
      };

      const userIdUpdate = currentUser.userId;
      //console.log({userUpdate});
      dispatch(
        //updateUser({ ...currentUser, ...userDetail }, () => {
        updateUser(userIdUpdate, userUpdate, () => {
          onCloseDialog();
        }),
      );
    } else {
      //console.log('addNewUser');
      //console.log({userDetail});
      dispatch(
        addNewUser(userDetail, () => {
          onCloseDialog();
        }),
      );
    }
  };

  // const isPhonesMultiple = phones.length > 1;

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentUser ? (
          <IntlMessages id="users.editCreate.form.editTitle" />
        ) : (
          <IntlMessages id="users.editCreate.form.createTitle" />
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={profile_pic} />
          </Box>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label={<IntlMessages id="users.editCreate.label.firstName" />}
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                  setFirstNameError('');
                }}
                helperText={firstNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label={<IntlMessages id="users.editCreate.label.middleName" />}
                value={middleName}
                onChange={e => {
                  setMiddleName(e.target.value);
                  setMiddleNameError('');
                }}
                helperText={middleNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label={<IntlMessages id="users.editCreate.label.lastName" />}
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value);
                  setLastNameError('');
                }}
                helperText={lastNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label={<IntlMessages id="users.editCreate.label.taxPayerId" />}
                value={userTaxPayer}
                onChange={e => {
                  setUserTaxPayer(e.target.value);
                  setUserTaxPayerError('');
                }}
                helperText={userTaxPayerError}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label={<IntlMessages id="users.editCreate.label.userName" />}
            value={userName}
            onChange={e => {
              setUserName(e.target.value);
              setUserNameError('');
            }}
            helperText={userNameError}
          />
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <TextField
            type="password"
            label={<IntlMessages id="users.editCreate.label.password" />}
            fullWidth
            onChange={event => {
              setUserPassword(event.target.value);
              setUserPasswordError('');
            }}
            defaultValue={userPassword}
            // value={password}
            margin="normal"
            variant="outlined"
            className={classes.textFieldRoot}
            //error={password === ""}
            helperText={userPasswordError}
          />
        </Box>
        {/*         <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label={<IntlMessages id="users.editCreate.label.taxPayerId"/>}
            value={userTaxPayer}
            onChange={e => {
              setUserTaxPayer(e.target.value);
              setUserTaxPayerError('');
            }}
            helperText={userTaxPayerError}
          />
        </Box>   */}
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label={<IntlMessages id="users.editCreate.label.email" />}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            helperText={emailError}
          />
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label={<IntlMessages id="users.editCreate.label.address" />}
            value={userAddress}
            onChange={e => {
              setUserAddress(e.target.value);
              setUserAddressError('');
            }}
            helperText={userAddressError}
          />
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label={<IntlMessages id="users.editCreate.label.phone" />}
            value={userPhone}
            onChange={e => {
              setUserPhone(e.target.value);
              setUserPhoneError('');
            }}
            helperText={userPhoneError}
          />
        </Box>
        {/* 
        <CmtList
          data={phones}
          renderRow={(item, index) => (
            <GridContainer style={{ marginBottom: 2 }} key={index}>
              <Grid item xs={12} sm={isPhonesMultiple ? 6 : 8}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label={<IntlMessages id="users.editCreate.label.phone"/>}
                  onChange={number => onPhoneNoAdd(number, index)}
                  helperText={phoneError}
                  InputProps={{
                    inputComponent: PhoneNumberInput,
                    inputProps: { value: item.phone },
                  }}
                />
              </Grid>
//               <Grid item xs={isPhonesMultiple ? 10 : 12} sm={4}>
                <AppSelectBox
                  fullWidth
                  data={labels}
                  label="Label"
                  valueKey="slug"
                  variant="outlined"
                  labelKey="title"
                  value={item.label}
                  onChange={e => onLabelChange(e.target.value, index)}
                />
              </Grid>
              {index > 0 && (
                <Grid container item xs={2} sm={2} justifyContent="center" alignItems="center">
                  <IconButton color="inherit" onClick={() => onPhoneRowRemove(index)} size="small">
                    <CancelIcon />
                  </IconButton>
                </Grid>
              )} //
            </GridContainer>
          )}
        /> */}
        {/* <Box mb={{ xs: 6, md: 5 }} display="inline-flex" alignItems="center" className="pointer">
          <Button color="primary" onClick={onPhoneRowAdd} startIcon={<AddCircleOutlineIcon />}>
            Add More
          </Button>
        </Box> */}
        <GridContainer style={{ marginBottom: 12 }}>
          <Grid item xs={12} sm={6}>
            <AppSelectBox
              fullWidth
              data={labels}
              label={<IntlMessages id="users.editCreate.label.gender" />}
              valueKey="slug"
              variant="outlined"
              labelKey="title"
              value={userGender}
              onChange={e => {
                onUserGenderChange(e.target.value);
              }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Company name"
              value={userGender}
              onChange={e => setUserGender(e.target.value)}
            />
          </Grid> */}

          {/* <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Job title"
              value={designation}
              onChange={e => setDesignation(e.target.value)}
            />
          </Grid> */}
        </GridContainer>
        <GridContainer style={{ marginBottom: 12 }}>
          <Grid item xs={12} sm={6}>
            <AppSelectBox
              fullWidth
              data={statusLabels}
              label={<IntlMessages id="users.editCreate.label.status" />}
              valueKey="slug"
              variant="outlined"
              labelKey="title"
              value={userStatus}
              onChange={e => {
                onUserStatusChange(e.target.value);
              }}
            />
          </Grid>
        </GridContainer>
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

export default AddEditUser;

AddEditUser.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
