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
import { gapCalculation } from 'redux/actions/Gap';
import { fetchError } from 'redux/actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { getAllStockProcesses, getAllDemandProcesses, getAllStandardProcesses } from 'redux/actions/Processes';

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

const AddEditGap = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const proctStockId = process.env.REACT_APP_SOURCE_STOCK;
  const proctDemandId = process.env.REACT_APP_SOURCE_DEMAND;
  const proctStandardId = process.env.REACT_APP_SOURCE_STANDARD;
  const { purchaseArea } = useSelector(({ auth }) => auth);
  const { procesess_stock } = useSelector(({ procesessReducer }) => procesessReducer);
  const { procesess_demand } = useSelector(({ procesessReducer }) => procesessReducer);
  const { procesess_standard } = useSelector(({ procesessReducer }) => procesessReducer);

  const [emailNotification, setEmailNotification] = useState('');
  const [emailNotificationError, setEmailNotificationError] = useState('');

  // Upload Json Stock
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [json, setJson] = useState('');

  const [stockText, setStockText] = React.useState('');
  const [stockError, setStockError] = React.useState('');
  const [stockCode, setStockCode] = React.useState('');

  const [demandText, setDemandText] = React.useState('');
  const [demandError, setDemandError] = React.useState('');
  const [demandCode, setDemandCode] = React.useState('');

  const [standardText, setStandardText] = React.useState('');
  const [standardError, setStandardError] = React.useState('');
  const [standardCode, setStandardCode] = React.useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllStockProcesses([], '', proctStockId, purchaseArea, () => {
        // setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        // setProcesessFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllDemandProcesses([], '', proctDemandId, purchaseArea, () => {
        // setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        // setProcesessFetched(true);
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllStandardProcesses([], '', proctStandardId, purchaseArea, () => {
        // setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        // setProcesessFetched(true);
      }),
    );
  }, []);

  const onSubmitClick = () => {
    let createOrUpdate = true;
    // Valida email para notificacion de proceso stock
    if (!emailNotification) {
      setEmailNotificationError(<IntlMessages id="procesess.appModule.dataRequired.email" />);
      createOrUpdate = false;
    }
    // Valida json stock
    if (!stockText) {
      createOrUpdate = false;
      setStockError(<IntlMessages id="procesess.appModule.dataRequired" />);
      dispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired" />));
    }
    if (!demandText) {
      createOrUpdate = false;
      setDemandError(<IntlMessages id="procesess.appModule.dataRequired" />);
      dispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired" />));
    }

    if (!standardText) {
      createOrUpdate = false;
      setStandardError(<IntlMessages id="procesess.appModule.dataRequired" />);
      dispatch(fetchError(<IntlMessages id="procesess.appModule.dataRequired" />));
    }
    if (createOrUpdate) {
      onProcessSave();
    }
  };

  const onProcessSave = () => {
    const headerData = {
      proc_purc_code: purchaseArea,
      proc_email_notification: emailNotification,
      procStock: stockCode,
      procDemand: demandCode,
      procStandard: standardCode,
    };

    const payload = {
      header: headerData,
    };

    dispatch(
      gapCalculation(payload, () => {
        onCloseDialog();
      }),
    );
  };

  /*   const handleFileUpload = e => {
      if (!e.target.files) {
        return;
      }
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = e => {
        //console.log("e.target.result", e.target.result);
        setJson(e.target.result);
      };
  
      const file = e.target.files[0];
      const { name } = file;
      setFile(file);
      setFilename(name);
    }; */

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        <IntlMessages id="procesess.editCreate.form.createDemandTitle" />
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={6}>
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
              <Autocomplete
                id="stocks"
                options={procesess_stock}
                value={stockText}
                getOptionLabel={option => (option.procCode !== undefined ? option.procCode + ' ' + option.procMsg : '')}
                style={{ width: '100%' }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={<IntlMessages id="gaps.filters.label.labelGapStock" />}
                    variant="outlined"
                    helperText={stockError}
                  />
                )}
                onChange={(event, value) => {
                  setStockText(value);
                  setStockError('');
                  setStockCode(value ? value.procId : null);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="demand"
                options={procesess_demand}
                value={demandText}
                getOptionLabel={option => (option.procCode !== undefined ? option.procCode + ' ' + option.procMsg : '')}
                style={{ width: '100%' }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={<IntlMessages id="gaps.filters.label.labelGapDemand" />}
                    variant="outlined"
                    helperText={demandError}
                  />
                )}
                onChange={(event, value) => {
                  setDemandText(value);
                  setDemandError('');
                  setDemandCode(value ? value.procId : null);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="standard"
                options={procesess_standard}
                value={standardText}
                getOptionLabel={option => (option.procCode !== undefined ? option.procCode + ' ' + option.procMsg : '')}
                style={{ width: '100%' }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={<IntlMessages id="gaps.filters.label.labelGapStandard" />}
                    variant="outlined"
                    helperText={standardError}
                  />
                )}
                onChange={(event, value) => {
                  setStandardText(value);
                  setStandardError('');
                  setStandardCode(value ? value.procId : null);
                }}
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

export default AddEditGap;

AddEditGap.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
