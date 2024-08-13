import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
//import Box from '@material-ui/core/Box';
import GridContainer from '@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import CmtAvatar from '@coremat/CmtAvatar';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import AppSelectBox from '@jumbo/components/Common/formElements/AppSelectBox';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { bulkLoadStandard } from 'redux/actions/GapSourceStandard';
import { fetchError } from 'redux/actions';

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

const AddEditGapSourceStandard = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { purchaseArea } = useSelector(({ auth }) => auth);
  const [emailNotification, setEmailNotification] = useState('');
  const [emailNotificationError, setEmailNotificationError] = useState('');

  const [msg, setMsg] = useState('');
  const [msgError, setMsgError] = useState('');

  const dispatch = useDispatch();

  const onSubmitClick = () => {
    let createOrUpdate = true;
    // Valida email para notificacion de proceso stock
    if (!emailNotification) {
      setEmailNotificationError(<IntlMessages id="procesess.appModule.dataRequired.email" />);
      createOrUpdate = false;
    }
    if (!msg) {
      setMsgError(<IntlMessages id="procesess.appModule.dataRequired.msg" />);
      createOrUpdate = false;
    }

    if (createOrUpdate) {
      onProcessSave();
    }
  };

  const onProcessSave = () => {
    const headerData = {
      proc_purc_code: purchaseArea,
      proc_email_notification: emailNotification,
      proc_msg: msg,
    };

    const payload = {
      header: headerData,
    };

    dispatch(
      bulkLoadStandard(payload, () => {
        onCloseDialog();
      }),
    );
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        <IntlMessages id="procesess.editCreate.form.createStandardTitle" />
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={12}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label={<IntlMessages id="procesess.editCreate.label.emailNotification" />}
                value={emailNotification}
                onChange={e => {
                  setEmailNotification(e.target.value);
                  setEmailNotificationError('');
                }}
                helperText={emailNotificationError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label={<IntlMessages id="procesess.editCreate.label.msg" />}
                value={msg}
                onChange={e => {
                  setMsg(e.target.value);
                  setMsgError('');
                }}
                helperText={msgError}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditGapSourceStandard;

AddEditGapSourceStandard.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
