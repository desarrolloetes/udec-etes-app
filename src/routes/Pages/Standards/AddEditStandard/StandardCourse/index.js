import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import IntlMessages from '@jumbo/utils/IntlMessages';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import GridContainer from '@jumbo/components/GridContainer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Delete, Add } from '@material-ui/icons';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import StandardCourseItems from './StandardCourseItems';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { deleteByRlayCourse } from 'redux/actions/StandardsCourse';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCurrentStandarCourse } from 'redux/actions/StandardsCourse';
import AddCourseRoomLayoutItem from '../AddCourseRoomLayoutItem';

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

const StandardCourse = ({ onCloseDialog, onSubmitClick, relay, index, removeCourseItem, setCoursesFetched }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentStandardCourse } = useSelector(({ standardsReducer }) => standardsReducer);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [relayId, setRelayId] = useState('');
  //Dialogs
  const [openAddCourseRoomLayoutItemDialog, setOpenAddCourseRoomLayoutItemDialog] = useState(false);

  const handleCourseRoomLayoutDelete = courseId => {
    setCourseId(courseId);
    //setRelayId(stdcRlayCode);
    setOpenConfirmDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    //setOpenConfirmDialog(false);
    //const { stdCode, stdOrgCode, stdBuCode, stdPurcCode, stdVersion } = currentStandardCourse[0];
    //dispatch(deleteByRlayCourse(stdCode, stdOrgCode, stdBuCode, stdPurcCode, stdVersion, courseId, relayId));
    //setCoursesFetched(false);

    setOpenConfirmDialog(false);
    setCoursesFetched(true);
    const relayFiltered = currentStandardCourse[0].relay.filter(relay => relay.courseId !== courseId);
    currentStandardCourse[0].relay = relayFiltered;
    dispatch(addNewCurrentStandarCourse(currentStandardCourse[0]));
    // if (indexItem === indexCourse) setExpanded(`panel${indexCourse}`);
  };

  const handleAddItemOpenDialog = () => {
    setOpenAddCourseRoomLayoutItemDialog(true);
    // dispatch(setCurrentStandard([]));
  };

  const handleCloseDialog = () => {
    setOpenAddCourseRoomLayoutItemDialog(false);
    // dispatch(setCurrentStandard([]));
  };

  return (
    <>
      <Card className={classes.root} variant="outlined" style={{ maxWidth: '100%', minWidth: '100%', marginBottom: 10 }}>
        <Accordion
          // expanded={expanded === `panel${index}`}
          // onChange={handlePanelExpandChange(`panel${index}`)}
          TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            style={{ backgroundColor: '#ffc107' }}>
            <Typography className={classes.heading}>
              {relay.stdcRlayCode} - [{relay.stdcCoursCode}] {relay.stdcCoursDescription}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GridContainer style={{ marginTop: 10, marginLeft: 6, maxWidth: '99%', minWidth: '99%' }}>
              <Grid item xs={6} sm={6}>
                <AppTextInput
                  fullWidth
                  // style={{ marginTop: 8 }}
                  variant="outlined"
                  label={<IntlMessages id="standards.appModule.rooms" />}
                  value={relay.stdcRlayDescription}
                  readOnly={true}
                  // onChange={e => setCompany(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <AppTextInput
                  fullWidth
                  // style={{ marginTop: 8 }}
                  variant="outlined"
                  label={<IntlMessages id="standards.appModule.course" />}
                  value={relay.stdcCoursDescription}
                  readOnly={true}
                  // onChange={e => setDesignation(e.target.value)}
                />
              </Grid>
              {/* Card Principal Relay-AsignaturaItemes */}
              <Card
                key={index}
                className={classes.root}
                variant="outlined"
                style={{ maxWidth: '100%', minWidth: '100%', marginBottom: 10 }}>
                {/* Inicia Items  */}
                {relay.items
                  ? relay.items.map((item, idx) => (
                      <StandardCourseItems
                        key={idx}
                        indexItem={idx}
                        indexCourse={index}
                        item={item}
                        onCloseDialog={onCloseDialog}
                        onSubmitClick={onSubmitClick}
                        removeCourseItem={removeCourseItem}
                        setCoursesFetched={setCoursesFetched}
                        // setExpanded={setExpanded}
                      />
                    ))
                  : null}
                {/* Finaliza Items */}
              </Card>
            </GridContainer>
          </AccordionDetails>
          <Box display="flex" justifyContent="flex-end">
            <CardActions>
              <Button variant="outlined" color="primary" onClick={() => handleAddItemOpenDialog(relay.courseId)}>
                <Add />
              </Button>
              {/* <Box ml={2}> */}
              <Button variant="outlined" color="primary" onClick={() => handleCourseRoomLayoutDelete(relay.courseId)}>
                <Delete />
              </Button>
            </CardActions>
          </Box>
        </Accordion>
      </Card>
      <ConfirmDialog
        open={openConfirmDialog}
        title={<IntlMessages id="appModule.deleteConfirm" />}
        content={<IntlMessages id="standards.appModule.standardCourseRoomLayout.deleteMessage" />}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      {openAddCourseRoomLayoutItemDialog && (
        <AddCourseRoomLayoutItem
          open={openAddCourseRoomLayoutItemDialog}
          onCloseDialog={handleCloseDialog}
          relay={relay}
          index={index}
        />
      )}
    </>
  );
};

export default StandardCourse;
