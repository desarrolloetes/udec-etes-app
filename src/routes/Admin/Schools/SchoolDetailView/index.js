import React from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import CmtAvatar from '@coremat/CmtAvatar';
import Typography from '@material-ui/core/Typography';
//import Checkbox from '@material-ui/core/Checkbox';
//import StarBorderIcon from '@material-ui/icons/StarBorder';
//import StarIcon from '@material-ui/icons/Star';
import { useSelector } from 'react-redux';
//import CmtList from '@coremat/CmtList';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
//import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
//import WcIcon from '@material-ui/icons/Wc';

import useStyles from './index.style';
import { Block, CheckCircleOutline } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

//import DialogContent from '@material-ui/core/DialogContent';
//import GridContainer from '@jumbo/components/GridContainer';
//import Grid from '@material-ui/core/Grid';
//import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import IntlMessages from '@jumbo/utils/IntlMessages';
//import AppSelectBox from '@jumbo/components/Common/formElements/AppSelectBox';
//import Button from '@material-ui/core/Button';
//import { useDropzone } from 'react-dropzone';
//import { useState } from 'react';

/* const labels = [
  { title: 'Masculino', slug: 'M' },
  { title: 'Femenino', slug: 'F' },
  { title: 'Otro', slug: 'O' },
]; */

/* const statusLabels = [
  { title: 'Activo', slug: 'S' },
  { title: 'Inactivo', slug: 'N' },
]; */

const SchoolDetailView = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { currentSchool } = useSelector(({ schoolsReducer }) => schoolsReducer);
  //console.log(currentSchool);
  /*   const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  }); */

  //  const [profile_pic, setProfile_pic] = useState('');

  //const { userFirstName, userEmail, userStatus, userCellphone, userCompany, designation, profile_pic, starred } = currentSchool;
  const {
    schoCode,
    schoDescription,
    schoOrgCode,
    schoOrgDescription,
    schoCaccCode,
    schoCaccDescription,
    schoBuCode,
    schoBuName,
    schoStatus,
    profile_pic,
  } = currentSchool;
  /*   let genderIcon= '';
  if (userGender === 'M'){
    genderIcon =  <ManIcon />;
  }else if (userGender === 'F'){
    genderIcon =  <WomanIcon />;
  }else{
    //enderIcon = TransgenderIcon;
  } */

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <Box className={classes.userInfoRoot}>
        <Box mr={3} display="flex" alignItems="center">
          <Box className={classes.avatarView} mr={{ xs: 4, md: 6 }}>
            <CmtAvatar size={70} src={profile_pic} alt={schoDescription} />
          </Box>
          <Box mt={-2}>
            <Box display="flex" alignItems="center">
              <Typography className={classes.titleRoot}>{`${schoDescription}`}</Typography>
              {/*               <Box ml={1}>
                <Checkbox
                  icon={<StarBorderIcon />}
                  checkedIcon={<StarIcon style={{ color: '#FF8C00' }} />}
                  checked={userFirstName}
                />
              </Box> */}
            </Box>
            {/*             {(userCompany) && (
              <Box mt={-1}>
                {userCompany && <Typography className={classes.subTitleRoot}>{userCompany}</Typography>}
                {userCompany && <Typography className={classes.subTitleRoot}>@{userCompany}</Typography>}
              </Box>
            )} */}
          </Box>
        </Box>
        <Box ml="auto" mt={-2} display="flex" alignItems="center">
          <Box ml={1}>
            <Tooltip title={schoStatus}>
              <IconButton aria-label="filter list">
                {schoStatus === 'N' && <Block color="primary" />}
                {schoStatus === 'S' && <CheckCircleOutline color="primary" />}
              </IconButton>
            </Tooltip>
          </Box>
          <Box ml={1}>
            <IconButton onClick={onCloseDialog}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box px={6} py={5}>
        <Box mb={5} component="p" color="common.dark">
          {<IntlMessages id="schools.schoolDetailview.label.title" />}
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <FingerprintIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {schoCode}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <AccountCircleIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {schoDescription}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <AccountCircleIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {'[' + schoOrgCode + '] ' + schoOrgDescription}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <AccountCircleIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {'[' + schoCaccCode + '] ' + schoCaccDescription}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <AccountCircleIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {schoBuName}
          </Box>
        </Box>
        {/*         <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <EmailIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {roleDescription}
          </Box>
        </Box> */}
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <PhoneIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {schoStatus}
          </Box>
        </Box>
        {/*         <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 5 }}>
          <PhoneIcon />
          <Box ml={5}>
            <CmtList
              data={phones}
              renderRow={(item, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <Box color="text.secondary">{item.phone}</Box>
                  <Box ml={2} className={classes.labelRoot}>
                    {item.label}
                  </Box>
                </Box>
              )}
            />
          </Box>
        </Box>  */}
      </Box>
    </Dialog>
  );
};

export default SchoolDetailView;

SchoolDetailView.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
