import React, { useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CmtAvatar from '@coremat/CmtAvatar';
import CardActions from '@material-ui/core/CardActions';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import IntlMessages from '@jumbo/utils/IntlMessages';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import GridContainer from '@jumbo/components/GridContainer';
import { useDropzone } from 'react-dropzone';
import { Save, Delete, Edit } from '@material-ui/icons';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStandardCourse } from 'redux/actions/StandardsCourse';
import { addNewCurrentStandarCourse } from 'redux/actions/StandardsCourse';
import AppSelectBox from '@jumbo/components/Common/formElements/AppSelectBox';

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
}));

const itemAvailableOptionsList = [
  {
    label: <IntlMessages id="standards.editCreate.item.available" />,
    value: 'S',
  },
  {
    label: <IntlMessages id="standards.editCreate.item.notAvailable" />,
    value: 'N',
  },
];

const StandardCourseItems = ({
  onCloseDialog,
  onSubmitClick,
  item,
  indexItem,
  indexCourse,
  removeCourseItem,
  setCoursesFetched,
  // setExpanded,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentStandard, currentStandardCourse } = useSelector(({ standardsReducer }) => standardsReducer);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedItemId, setSelectedItemId] = useState('');

  const [profile_pic, setProfile_pic] = useState('https://via.placeholder.com/450.png/09a/fff');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [sku, setSku] = useState('');
  const [performance, setPerformance] = useState(0);
  const [renewalCycle, setRenewalCycle] = useState(0);
  const [maintenanceCycle, setMaintenanceCycle] = useState(0);
  const [itemDescription, setItemDescription] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [itemAuthor, setItemAuthor] = useState('');
  const [itemPublisher, setItemPublisher] = useState('');
  const [itemEdition, setItemEdition] = useState('');
  const [itemYear, setItemYear] = useState('');
  const [itemFormat, setItemFormat] = useState('');
  const [itemStatus, setItemStatus] = useState('');
  const [itemStatusError, setItemStatusError] = useState('');
  const [itemIsbn, setItemIsbn] = useState('');
  //Enable or Disable Item Edition
  const [enabled, setEnabled] = useState(true);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  useEffect(() => {
    if (item) {
      setSku(item.itmItemCode);
      setPerformance(item.itmPerformance);
      setRenewalCycle(item.itmRenewalCicle);
      setMaintenanceCycle(item.itmMaintenanceCicle);
      setItemDescription(item.itmItemDescription);
      setItemIsbn(item.itmIsbn);
      setItemTitle(item.itmValue01);
      setItemAuthor(item.itmValue02);
      setItemPublisher(item.itmValue03);
      setItemEdition(item.itmValue04);
      setItemYear(item.itmValue05);
      setItemFormat(item.itmValue06);
      //setItemStatus(item.itmValue07);
      setItemStatus(item.itmStatus);
    }
  }, [item, currentStandardCourse, currentStandard]);

  const handleStandardCourseItemDelete = (standard, itemId) => {
    setSelectedItem(standard);
    setSelectedItemId(itemId);
    setOpenConfirmDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    //dispatch(deleteStandardCourse(selectedItem, indexCourse, selectedItemId));
    setCoursesFetched(true);
    //removeCourseItem(indexCourse, selectedItemId);
    const itemsFiltered = currentStandardCourse[0].relay[indexCourse].items.filter(item => item.itemId !== selectedItemId);
    currentStandardCourse[0].relay[indexCourse].items = itemsFiltered;
    dispatch(addNewCurrentStandarCourse(currentStandardCourse[0]));
    // if (indexItem === indexCourse) setExpanded(`panel${indexCourse}`);
  };

  const handleToggle = () => {
    setEnabled(!enabled);
  };

  const updateCurrentPerformance = value => {
    setCoursesFetched(true);
    currentStandardCourse[0].relay[indexCourse].items[indexItem].itmPerformance = value;
    dispatch(addNewCurrentStandarCourse(currentStandardCourse[0]));
  };

  const updateCurrentRenewalCycle = value => {
    setCoursesFetched(true);
    currentStandardCourse[0].relay[indexCourse].items[indexItem].itmRenewalCicle = value;
    dispatch(addNewCurrentStandarCourse(currentStandardCourse[0]));
  };
  const updateMaintenanceCycle = value => {
    setCoursesFetched(true);
    currentStandardCourse[0].relay[indexCourse].items[indexItem].itmMaintenanceCicle = value;
    dispatch(addNewCurrentStandarCourse(currentStandardCourse[0]));
  };

  const updateItemStatus = value => {
    setCoursesFetched(true);
    currentStandardCourse[0].relay[indexCourse].items[indexItem].itmStatus = value;
    dispatch(addNewCurrentStandarCourse(currentStandardCourse[0]));
  };

  return (
    <>
      <GridContainer
        key={indexCourse}
        className={classes.root}
        style={{
          marginTop: 14,
          marginLeft: 22,
          marginBottom: 20,
          maxWidth: '98%',
          minWidth: '98%',
        }}>
        <Card className={classes.root} variant="outlined" style={{ maxWidth: '98%', minWidth: '98%' }} raised>
          <GridContainer style={{ marginTop: 15, marginLeft: 15, maxWidth: '85%', minWidth: '85%' }}>
            <Grid item {...getRootProps()} className="pointer">
              <input {...getInputProps()} />
              <CmtAvatar size={180} src={profile_pic} variant="square" />
            </Grid>
            <Grid item xs={4} sm container spacing={2}>
              <Grid item xs container direction="row" justifyContent="space-evenly" alignItems="baseline">
                <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginBottom: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.sku" />}
                    value={sku || ''}
                    disabled={true}
                    onChange={e => setSku(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.itemAuthor" />}
                    value={itemAuthor || ''}
                    disabled={true}
                    onChange={e => setItemAuthor(e.target.value)}
                  />
                </Grid>
                {/* Fin columnas item */}
                {/* Inicio columnas detalle itemes */}
                <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.itemDescription" />}
                    value={itemDescription || ''}
                    disabled={enabled}
                    onChange={e => setItemDescription(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item xs container direction="row" justifyContent="space-evenly" alignItems="baseline">
                <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.itemTitle" />}
                    value={itemTitle || ''}
                    disabled={true}
                    onChange={e => setItemTitle(e.target.value)}
                  />
                </Grid>

                <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.itemEdition" />}
                    value={itemEdition || ''}
                    disabled={true}
                    onChange={e => setItemEdition(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.itemYear" />}
                    value={itemYear || ''}
                    disabled={true}
                    onChange={e => setItemYear(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item xs container direction="row" justifyContent="space-evenly" alignItems="baseline">
                <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.itemFormat" />}
                    value={itemFormat || ''}
                    disabled={true}
                    onChange={e => setItemFormat(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.itemIsbn" />}
                    value={itemIsbn || ''}
                    disabled={true}
                    onChange={e => setItemIsbn(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.itemPublisher" />}
                    value={itemPublisher || ''}
                    disabled={true}
                    onChange={e => setItemPublisher(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid item xs container direction="row" justifyContent="space-evenly" alignItems="baseline">
                <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.renewalCycle" />}
                    value={renewalCycle || ''}
                    disabled={enabled}
                    type="number"
                    //onChange={e => setRenewalCycle(e.target.value)}
                    onChange={e => {
                      setRenewalCycle(e.target.value);
                      updateCurrentRenewalCycle(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.maintenanceCycle" />}
                    value={maintenanceCycle || ''}
                    disabled={enabled}
                    type="number"
                    //onChange={e => setMaintenanceCycle(e.target.value)}
                    onChange={e => {
                      setMaintenanceCycle(e.target.value);
                      updateMaintenanceCycle(e.target.value);
                    }}
                  />
                </Grid>
                <Grid>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.performance" />}
                    value={performance || ''}
                    //disabled={true}
                    disabled={enabled}
                    type="number"
                    //onChange={e => setPerformance(e.target.value)}
                    onChange={e => {
                      setPerformance(e.target.value);
                      updateCurrentPerformance(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs container direction="row" justifyContent="space-evenly" alignItems="baseline">
                <Grid item>
                  <AppSelectBox
                    fullWidth
                    data={itemAvailableOptionsList}
                    label={<IntlMessages id="standards.appModule.itemStatus" />}
                    valueKey="value"
                    variant="outlined"
                    labelKey="label"
                    value={itemStatus}
                    disabled={enabled}
                    onChange={e => {
                      setItemStatus(e.target.value ? 'S' : 'N');
                      updateItemStatus(e.target.value);
                      //setStandard(e.target.checked ? 'S' : 'N', e.target.value ? 'S' : 'N', "available");
                    }}
                    helperText={itemStatusError}
                  />
                </Grid>

                {/*                 <Grid item>
                  <AppTextInput
                    fullWidth
                    style={{ marginTop: 15, marginRight: 15 }}
                    variant="outlined"
                    label={<IntlMessages id="standards.appModule.itemStatus" />}
                    value={itemStatus || ''}
                    disabled={true}
                    onChange={e => setItemStatus(e.target.value)}
                  />
                </Grid> */}
              </Grid>
            </Grid>
          </GridContainer>
          <Box display="flex" justifyContent="flex-end">
            <CardActions>
              {/*               <Button variant="outlined" color="primary" disabled>
                <Save />
              </Button> */}
              {/* <Box ml={2}> */}
              <Button
                variant="outlined"
                color="primary"
                disabled={false}
                onClick={() => handleToggle()}
                //onClick={() => handleStandardCourseItemDelete(item.keyToDelete, item.itemId)}
              >
                <Edit />
              </Button>
              {/* <Box ml={2}> */}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleStandardCourseItemDelete(item.keyToDelete, item.itemId)}>
                <Delete />
              </Button>
            </CardActions>
          </Box>
        </Card>
      </GridContainer>
      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="appModule.deleteConfirm" />}
        content={<IntlMessages id="standards.appModule.standardCourseItem.deleteMessage" />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default StandardCourseItems;
