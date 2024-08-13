import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import CmtAvatar from '@coremat/CmtAvatar';
import Typography from '@material-ui/core/Typography';
//import Checkbox from '@material-ui/core/Checkbox';
//import StarBorderIcon from '@material-ui/icons/StarBorder';
//import StarIcon from '@material-ui/icons/Star';
import { useDispatch, useSelector } from 'react-redux';
//import CmtList from '../../../../@coremat/CmtList';
//import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
//import ClearIcon from '@material-ui/icons/Clear';
//import EmailIcon from '@material-ui/icons/Email';
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//import FingerprintIcon from '@material-ui/icons/Fingerprint';
//import HomeIcon from '@material-ui/icons/Home';
//import PhoneIcon from '@material-ui/icons/Phone';
//import WcIcon from '@material-ui/icons/Wc';

import useStyles from './index.style';
//import { Block, CheckCircleOutline } from '@material-ui/icons';
//import { Tooltip } from '@material-ui/core';

//import DialogContent from '@material-ui/core/DialogContent';
//import GridContainer from '../../../../@jumbo/components/GridContainer';
//import Grid from '@material-ui/core/Grid';
//import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import IntlMessages from '@jumbo/utils/IntlMessages';
//import AppSelectBox from '../../../../@jumbo/components/Common/formElements/AppSelectBox';
//import Button from '@material-ui/core/Button';
//import { useDropzone } from 'react-dropzone';

import { getUserRoles } from 'redux/actions/Users';
import { useDebounce } from '@jumbo/utils/commonHelper';

import TablePagination from '@material-ui/core/TablePagination';
import NoRecordFound from '../NoRecordFound';

import UserRolesTableHead from '../UserRolesTableHead';
import UserRolesTableToolbar from '../UserRolesTableToolbar';
import UserRolesListRow from '../UserRolesListRow';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { fetchError, fetchSuccess } from 'redux/actions';
import { addUserRoles } from 'redux/actions/Users';

/* const labels = [
  { title: 'Masculino', slug: 'M' },
  { title: 'Femenino', slug: 'F' },
  { title: 'Otro', slug: 'O' },
];
 */
/* const statusLabels = [
  { title: 'Activo', slug: 'S' }, 
  { title: 'Inactivo', slug: 'N' },
]; */

const UserRoles = ({ open, onCloseDialog }) => {
  const [filterOptions, setFilterOptions] = React.useState([]);
  //const [userRolesList, setUserRolesList] = React.useState([]);
  //const [userRolesList2, setUserRolesList2] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [userRolesFetched, setUserRolesFetched] = useState(false);

  const { currentUser, currentUserRoles } = useSelector(({ usersReducer }) => usersReducer);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [selected, setSelected] = React.useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  //const [loadtUserRolesSelected, setLoadUserRolesSelected] = React.useState([]);
  //const [openAlert, setOpenAlert] = React.useState(false);
  //const [selectedValue, setSelectedValue] = React.useState('Debe seleccionar al menos un Rol para asignar al usuario!');
  //const [usersFetched, setUsersFetched] = useState(false);

  useEffect(
    () => {
      //console.log('useEffect');
      dispatch(
        getUserRoles(currentUser.userId, filterOptions, debouncedSearchTerm, () => {
          setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          setUserRolesFetched(true);
        }),
      );
    },
    [dispatch, filterOptions, debouncedSearchTerm, currentUser.userId],
    currentUserRoles,
  );

  /*   useEffect(() => {
    getLoadUserRolesSelected(currentUserRoles);
  }, [currentUserRoles]);  */

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = currentUserRoles.map(n => n.usroRoleId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event, id) => {
    //console.log('handleRowClick');
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    //console.log('selected');
    /*     console.log(selectedIndex);
    console.log('event');
    console.log(event);  */

    //console.log([selected]);

    /*     if (assigned === 'S' && selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      //newSelected = newSelected.concat(selected.slice(1));
      //console.log('S selectedIndex === -1');
    } else if (assigned === 'S' && selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      //newSelected = newSelected.concat(selected, id); 
      //console.log('S selectedIndex === 0');
     } else if (assigned === 'N' && selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      //newSelected = newSelected.concat(selected.slice(1));
      //console.log('N selectedIndex === -1');
    } else if (assigned === 'N' && selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      //newSelected = newSelected.concat(selected, id);
      //console.log('N selectedIndex === 0');  */

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      //newSelected = newSelected.concat(selected.slice(1));
      //console.log('S selectedIndex === -1');
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      //newSelected = newSelected.concat(selected, id);
      //console.log('S selectedIndex === 0');
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      //console.log('selectedIndex === selected.length - 1');
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      //console.log('selectedIndex > 0');
    }
    // console.log(newSelected);
    setSelected(newSelected);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* const getUserRoless = async (userId) => {
  const token = localStorage.getItem('token') || '';
  const userRolesReq = await fetch(`${process.env.REACT_APP_API_URL}v1/userRoles/getAllRolesByUserId?usroUserId=${userId}`, 
  { 
    method: 'get', 
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  });
  const userRolesResponse = await userRolesReq.json();
  if (userRolesResponse.status=== 200){
    console.log('Encontro roles');
    console.log(userRolesResponse.userRoles); 
    setUserRolesList(userRolesResponse.userRoles);
  }else {
    setUserRolesList([]);
    console.log('No encontro roles');
    console.log({userRolesResponse}); 
  }

  return userRolesResponse.userRoles;
} */

  /*  useEffect(() => {
  //console.log('buscando roles');
  getUserRoless(currentUser.userId);
}, []);  */

  /*   const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  }); */

  //  const [profile_pic, setProfile_pic] = useState('');

  //const { userFirstName, userEmail, userStatus, userCellphone, userCompany, designation, profile_pic, starred } = currentUser;
  //const { userFirstName, userMiddleName, userLastName,userRut,userName,userEmail, userAddress, userGender, userStatus, userCellphone, userCompany, profile_pic} = currentUser;
  const { userFirstName, userMiddleName, userLastName, userCompany, profile_pic } = currentUser;
  /*   let genderIcon= '';
  if (userGender === 'M'){
    genderIcon =  <ManIcon />;
  }else if (userGender === 'F'){
    genderIcon =  <WomanIcon />;
  }else{
    //enderIcon = TransgenderIcon;
  } */

  /*   const getLoadUserRolesSelected = (array) => {
    let rolesArray = [];
    let obj = {};
    for (let i = 0; i<array.length; i++){
      obj['usroRoleId']=array[i].usroRoleId;
      obj['lecturas']=0;
      obj['asigned']=array[i].usroAsigned;
      rolesArray.push(obj)
    }
    console.log(rolesArray);
    setLoadUserRolesSelected(rolesArray);
    return rolesArray;

  } */

  const isSelected = id => {
    //console.log(selected.indexOf(id));
    /*     if (asigned === 'S' && selected.indexOf(id) === -1){
      return true;
    }else if (asigned === 'S' && selected.indexOf(id) === 0){
      return false;
    }else{  
      return selected.indexOf(id) !== -1;
    } */
    return selected.indexOf(id) !== -1;
  };

  /*   const isSelected = (id) => { 
    console.log(selected.indexOf(id));
    //{row.usroAsegned === 'S'  ? true : false}//

    //if (selected.indexOf(id) !== -1;
    let rolesArray = [];
    let obj = {};
    let loaded = false;
    for (let i = 0; i<loadtUserRolesSelected.length; i++){
      if ( loadtUserRolesSelected[i].usroRoleId === id && loadtUserRolesSelected[i].lecturas === 0 && loadtUserRolesSelected[i].asigned ==='S' ){
        obj['usroRoleId']=loadtUserRolesSelected[i].usroRoleId;
        obj['lecturas']=1;
        obj['asigned']=loadtUserRolesSelected[i].usroAsigned;
        rolesArray.push(obj)
        loaded=true;
      }
    }
    //setLoadUserRolesSelected(rolesArray);
    if (loaded === true){
      return true;
    }
      return selected.indexOf(id) !== -1;
  } */

  //console.log([selected]);
  const handleConfirmCreateRoles = () => {
    //  setOpenConfirmDialog(false);
    let userRoles = [];
    let obj = {};
    for (let i = 0; i < selected.length; i++) {
      obj = {};
      obj['usroUserId'] = currentUser.userId;
      obj['usroRoleId'] = selected[i];
      obj['usroSelected'] = 'S';
      obj['usroStatus'] = 'S';
      userRoles.push(obj);
      //userRoles.name='userRoles';
      //console.log(selected[i]);
    }

    dispatch(addUserRoles(userRoles, () => {}));

    dispatch(
      getUserRoles(currentUser.userId, filterOptions, debouncedSearchTerm, () => {
        //setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        //setUserRolesFetched(true);
      }),
    );

    handleCancelCreateRoles();
    //dispatch(setCurrentUserRoles([]));
    setTimeout(() => {
      dispatch(fetchSuccess(<IntlMessages id="fetch.user.delete.roleAssignment.message" />));
    }, 2000);

    onCloseDialog();
  };

  const handleCancelCreateRoles = () => {
    setOpenConfirmDialog(false);
    //setCurrentUserRoles([]);
  };

  const onSubmitClick = () => {
    if (selected.length === 0) {
      //console.log('enviar mensaje debe seleccinar al menos un rol');
      dispatch(fetchError(<IntlMessages id="users.appModule.roleAssignment.emptyRoles" />));
    } else {
      setOpenConfirmDialog(true);
    }
  };

  /* const handleClickOpen = () => {
  setOpenAlert(true);
}; */
  /* 
const handleClose = value => {
  setOpenAlert(false);
  setSelectedValue(value);
}; */

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        <IntlMessages id="users.userRoles.roleAssignment.form.editTitle" />
      </DialogTitle>
      <DialogContent dividers>
        {/* <div className={classes.root}> */}
        <Box className={classes.userInfoRoot}>
          <Box mr={3} display="flex" alignItems="center">
            <Box className={classes.avatarView} mr={{ xs: 4, md: 6 }}>
              <CmtAvatar size={70} src={profile_pic} alt={userFirstName} />
            </Box>
            <Box mt={-2}>
              <Box display="flex" alignItems="center">
                <Typography
                  className={classes.titleRoot}>{`${userFirstName} ${userMiddleName} ${userLastName} `}</Typography>
                {/* //              <Box ml={1}>
                <Checkbox
                  icon={<StarBorderIcon />}
                  checkedIcon={<StarIcon style={{ color: '#FF8C00' }} />}
                  checked={userFirstName}
                />
              </Box> // */}
              </Box>
              {userCompany && (
                <Box mt={-1}>
                  {userCompany && <Typography className={classes.subTitleRoot}>{userCompany}</Typography>}
                  {userCompany && <Typography className={classes.subTitleRoot}>@{userCompany}</Typography>}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Paper className={classes.paper}>
          <UserRolesTableToolbar
            // selected={selected}
            //setSelected={setSelected}
            // onUserAdd={setOpenUserDialog}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <TableContainer className={classes.container}>
            <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
              <UserRolesTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={currentUserRoles.length}
              />
              <TableBody>
                {!!currentUserRoles.length ? (
                  stableSort(currentUserRoles, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <UserRolesListRow
                        key={index}
                        row={row}
                        onRowClick={handleRowClick}
                        //onUserEdit={handleUserEdit}
                        //onUserDelete={handleUserDelete}
                        //onUserView={handleUserView}
                        //onUserRoles={handleUserRolesView}
                        isSelected={isSelected}
                      />
                    ))
                ) : (
                  <TableRow style={{ height: 53 * 6 }}>
                    <TableCell colSpan={7} rowSpan={10}>
                      {isFilterApplied ? (
                        <NoRecordFound>{<IntlMessages id="users.appModule.filterNoRecordsFound" />}</NoRecordFound>
                      ) : (
                        <NoRecordFound>
                          {userRolesFetched ? (
                            <IntlMessages id="users.userRoles.label.noRecordsFound" />
                          ) : (
                            <IntlMessages id="users.userRoles.label.loadingUsers" />
                          )}
                        </NoRecordFound>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={currentUserRoles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Paper>
        {/*       <GridContainer style={{ marginBottom: 12 }}>
      <Grid item xs={1} sm={6}> */}
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Save
            </Button>
          </Box>
        </Box>
        {/*         </Grid>   
        </GridContainer>  */}
        {/* {openUserDialog && <AddEditUser open={openUserDialog} onCloseDialog={handleCloseUserDialog} />}
      {openViewDialog && <UserDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}
      {openUserRolesDialog && <UserRoles open={openUserRolesDialog} onCloseDialog={handleCloseUserRolesDialog} />} */}

        <ConfirmDialog
          open={openConfirmDialog}
          title={<IntlMessages id="users.appModule.roleAssignment.createConfirm" />}
          content={<IntlMessages id="users.appModule.roleAssignment.createMessage" />}
          onClose={handleCancelCreateRoles}
          onConfirm={handleConfirmCreateRoles}
        />
        {/*       <Dialog selectedValue={selectedValue} open={openAlert} onClose={handleClose} /> */}
        {/* </div> */}

        {/*   <Box className={classes.userInfoRoot}>
        <Box mr={3} display="flex" alignItems="center">
          <Box className={classes.avatarView} mr={{ xs: 4, md: 6 }}>
            <CmtAvatar size={70} src={profile_pic} alt={userFirstName} />
          </Box>
          <Box mt={-2}>
            <Box display="flex" alignItems="center">
              <Typography className={classes.titleRoot}>{`${userFirstName} ${userMiddleName} ${userLastName} `}</Typography>
//              <Box ml={1}>
                <Checkbox
                  icon={<StarBorderIcon />}
                  checkedIcon={<StarIcon style={{ color: '#FF8C00' }} />}
                  checked={userFirstName}
                />
              </Box> //
            </Box>
            {(userCompany) && (
              <Box mt={-1}>
                {userCompany && <Typography className={classes.subTitleRoot}>{userCompany}</Typography>}
                {userCompany && <Typography className={classes.subTitleRoot}>@{userCompany}</Typography>}
                
              </Box>
            )}
          </Box>
        </Box>
        <Box ml="auto" mt={-2} display="flex" alignItems="center">
          <Box ml={1}>
            <Tooltip title={userStatus}>
              <IconButton aria-label="filter list">
                {userStatus === 'N' && <Block color="primary" />}
                {userStatus === 'S' && <CheckCircleOutline color="primary" />}
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
        {<IntlMessages id="users.userRoles.label.title"/>}
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <FingerprintIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {userRut}
          </Box>
        </Box>         
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <AccountCircleIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {userName}
          </Box>
        </Box>         
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <EmailIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {userEmail}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <PhoneIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {userCellphone}
          </Box>
        </Box>   
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <HomeIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {userAddress}
          </Box>
        </Box>     
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
        <WcIcon />
        <Box ml={5} color="primary.main" component="p" className="pointer">
            {userGender}
          </Box>
        </Box>                     
/*         <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 5 }}>
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
        </Box>  //
      </Box> */}
      </DialogContent>
    </Dialog>
  );
};

export default UserRoles;

UserRoles.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
