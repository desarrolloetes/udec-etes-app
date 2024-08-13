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
import { addNewRole, updateRole } from 'redux/actions/Roles';

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

const AddEditRole = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const currentRole = useSelector(({ rolesReducer }) => rolesReducer.currentRole);

  //const [roleId, setRoleId] = useState('');
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [roleStatus, setRoleStatus] = useState('');
  const [profile_pic, setProfile_pic] = useState('');
  //const [company, setCompany] = useState(1);

  //const [roleIdError, setRoleIdrror] = useState('');
  const [roleNameError, setRoleNameError] = useState('');
  const [roleDescriptionError, setRoleDescriptionError] = useState('');
  //const [roleStatusError, setRoleStatusError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentRole) {
      //console.log({ currentRole });
      //setRoleId(currentRole.roleId);
      setRoleName(currentRole.roleName);
      setRoleDescription(currentRole.roleDescription);
      setRoleStatus(currentRole.roleStatus);
    }
  }, [currentRole]);

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

  const onRoleStatusChange = value => {
    setRoleStatus(value);
  };

  //console.log(`userGender: ${userGender}`)

  const onSubmitClick = () => {
    //const phoneNumbers = phones.filter(item => item.phone.trim());
    let createOrUpdate = true;
    if (!roleName) {
      setRoleNameError(<IntlMessages id="roles.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    if (!roleDescription) {
      setRoleDescriptionError(<IntlMessages id="roles.appModule.requiredMessage" />);
      createOrUpdate = false;
    }
    //if (!roleStatus) {
    //  setRoleStatusError(<IntlMessages id="roles.appModule.requiredMessage"/>);
    //  createOrUpdate = false;
    //}

    if (createOrUpdate) {
      onRoleSave();
    }
  };

  const onRoleSave = () => {
    const roleDetail = {
      profile_pic,
      //roleId:,
      roleName: roleName,
      roleDescription: roleDescription,
      roleStatus: roleStatus,
    };

    if (currentRole) {
      const roleUpdate = {
        roleId: roleDetail.roleId,
        roleName: roleDetail.roleName,
        roleDescription: roleDetail.roleDescription,
        roleStatus: roleDetail.roleStatus,
      };

      const roleIdUpdate = currentRole.roleId;
      //console.log({ roleUpdate });
      dispatch(
        //updateUser({ ...currentUser, ...userDetail }, () => {
        updateRole(roleIdUpdate, roleUpdate, () => {
          onCloseDialog();
        }),
      );
    } else {
      //console.log('addNewUser');
      //console.log({userDetail});
      dispatch(
        addNewRole(roleDetail, () => {
          onCloseDialog();
        }),
      );
    }
  };

  // const isPhonesMultiple = phones.length > 1;

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentRole ? (
          <IntlMessages id="roles.editCreate.form.editTitle" />
        ) : (
          <IntlMessages id="roles.editCreate.form.createTitle" />
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          {/*           <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={profile_pic} />
          </Box> */}
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label={<IntlMessages id="roles.editCreate.label.roleName" />}
                value={roleName}
                onChange={e => {
                  setRoleName(e.target.value);
                  setRoleNameError('');
                }}
                helperText={roleNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label={<IntlMessages id="roles.editCreate.label.roleDescription" />}
                value={roleDescription}
                onChange={e => {
                  setRoleDescription(e.target.value);
                  setRoleDescriptionError('');
                }}
                helperText={roleDescriptionError}
              />
            </Grid>
            {/*           </GridContainer>
        </Box> */}
            {/*  <GridContainer style={{ marginBottom: 12 }}> */}
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                data={statusLabels}
                label={<IntlMessages id="roles.editCreate.label.roleStatus" />}
                valueKey="slug"
                variant="outlined"
                labelKey="title"
                value={roleStatus}
                onChange={e => {
                  onRoleStatusChange(e.target.value);
                }}
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

export default AddEditRole;

AddEditRole.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
