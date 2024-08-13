import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box, FormControl, InputLabel, Select } from '@material-ui/core';
import { AuthMethods } from '../../../../services/auth';
import ContentLoader from '../../ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
// import { NavLink } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';

import { fetchError } from '../../../../redux/actions';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getBusinessUnits } from 'redux/actions/BusinessUnits';
import { getPurchaseAreas } from 'redux/actions/PurchaseAreas';

//import { getPurchaseAreas } from 'redux/actions/PurchaseAreas';

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    width: '70%',
    height: '80%',
    [theme.breakpoints.up('md')]: {
      width: '60%',
      order: 2,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(4),
  },
}));
//variant = 'default', 'standard'

const companyId = process.env.REACT_APP_COMPANY_ID;

const SignIn = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  //Carta ToDo: validar si se va a usar
  const businessUnit = useSelector(({ businessUnitsReducer }) => businessUnitsReducer.businessUnits);
  //Carta ToDo: validar si se va a usar
  const purchaseArea = useSelector(({ purchaseAreasReducer }) => purchaseAreasReducer.purchaseAreas);

  const [user, setUser] = useState(); //useState('demo@example.com');
  const [password, setPassword] = useState(); //'Anto1908' //useState('demo#123');
  //const [businessUnit, setBusinessUnit] = useState([]);
  //const [purchaseArea, setPurchaseArea] = useState([]);

  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState();
  const [selectedPurchaseArea, setSelectedPurchaseArea] = useState();

  const [userBusinessUnit, setUserBusinessUnit] = useState({});
  const [userPurchaseArea, setUserPurchaseArea] = useState({});

  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const onSubmit = () => {
    let checkInputData = true;
    let access = true;
    if (
      user === undefined ||
      password === undefined ||
      selectedBusinessUnit === 'None' ||
      selectedPurchaseArea === 'None' ||
      selectedBusinessUnit === undefined ||
      selectedPurchaseArea === undefined
    ) {
      dispatch(fetchError(<IntlMessages id="appModule.dataRequired" />));
      checkInputData = false;
    }
    if (checkInputData === true) {
      /* if (userPurchaseArea === undefined || Object.keys(userPurchaseArea).length === 0) {
        setTimeout(() => {
          dispatch(fetchError(<IntlMessages id="appModule.purchaseAreaNoAccess" />));
        }, 2000);
        access = false;
      }
      if (userBusinessUnit === undefined || Object.keys(userBusinessUnit).length === 0) {
        dispatch(fetchError(<IntlMessages id="appModule.businessUnitNoAccess" />));
        //      setTimeout(() => {   }, 2000);
        access = false;
      } */
      if (access === true) {
        dispatch(
          AuthMethods[method].onLogin({
            user,
            password,
            companyId,
            selectedBusinessUnit,
            selectedPurchaseArea,
          }),
        );
      }
    }
  };

  /*   const getPurchaseAreas = async () => {
    const purchaseAreas = await fetch(`${process.env.REACT_APP_API_URL}v1/purchaseAreas/getAll`)
    .then(data => {
      if (data.status === 200) {
        //dispatch(fetchSuccess());
        //dispatch({ type: GET_CARTAS, payload: data.data });
        //if (callbackFun) callbackFun(data.data);
        setPurchaseArea(data.data.purchaseAreas);
      } else {
        //dispatch(fetchError(<IntlMessages id="cartas.fetch.error.message" values = {{code:data.data.message}}/>));
        setPurchaseArea([]);
      }
    })
    .catch(error => {
      dispatch(fetchError(<IntlMessages id="cartas.fetch.error.message" values = {{code:error.message}}/>));
    });

/*     const purchaseAreasResponse = await purchaseAreas.json();
    if (purchaseAreasResponse.status === 200) {
      setPurchaseArea(purchaseAreasResponse.purchaseAreas);
    } else {
      setPurchaseArea([]);
    }   
  }; */
  /* 
  const getBusinessUnit = async () => {
    const businessUnit = await fetch(`${process.env.REACT_APP_API_URL}v1/businessUnits/getAll`)
    .then(data => {
      if (data.status === 200) {
        //dispatch(fetchSuccess());
        //dispatch({ type: GET_CARTAS, payload: data.data });
        //if (callbackFun) callbackFun(data.data);
        setBusinessUnit(data.data.businessUnits);
      } else {
        //dispatch(fetchError(<IntlMessages id="cartas.fetch.error.message" values = {{code:data.data.message}}/>));
        setBusinessUnit([]);
      }
    })
    .catch(error => {
      dispatch(fetchError(<IntlMessages id="cartas.fetch.error.message" values = {{code:error.message}}/>));
    });

/*     const businessUnitResponse = await businessUnit.json();
    if (businessUnitResponse.status === 200) {
      setBusinessUnit(businessUnitResponse.businessUnits);
    } else {
      setBusinessUnit([]);
    } 
  }; */

  /*  const getUserPurchaseArea = async (user, selectedPurchaseArea) => {
    const accessToPurchaseAreasRequest = await fetch(
      `${process.env.REACT_APP_API_URL}v1/userPurchaseAreas/getOneByUserName?uspaUserName=${user}&uspaPurcCode=${selectedPurchaseArea}`,
    );
    if (accessToPurchaseAreasRequest.ok) {
      const accessToPurchaseAreasResponse = await accessToPurchaseAreasRequest.json();
      setUserPurchaseArea(accessToPurchaseAreasResponse.userPurchaseArea);
    } else {
      setUserPurchaseArea({});
    }
  };

  const getUserBusinessUnit = async (user, selectedBusinessUnit) => {
    const accessToBusinessUnitRequest = await fetch(
      `${process.env.REACT_APP_API_URL}v1/userBusinessUnits/getOneByUserName?usbuUserName=${user}&usbuBuCode=${selectedBusinessUnit}`,
    );
    if (accessToBusinessUnitRequest.ok) {
      const accessToBusinessUnitResponse = await accessToBusinessUnitRequest.json();
      setUserBusinessUnit(accessToBusinessUnitResponse.userBusinessUnit);
    } else {
      setUserBusinessUnit({});
    }
  }; */

  useEffect(() => {
    dispatch(getPurchaseAreas());
    dispatch(getBusinessUnits());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src={'/images/auth/login-img.png'} />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={3}>
          <CmtImage src={'/images/logo.png'} />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Login
        </Typography>
        <form onSubmit={onSubmit}>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.user" />}
              fullWidth
              onChange={event => setUser(event.target.value)}
              defaultValue={user}
              // value={user}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              error={user === ''}
              helperText={user === '' ? <IntlMessages id="appModule.userEmpty" /> : ' '}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChange={event => setPassword(event.target.value)}
              defaultValue={password}
              // value={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              error={password === ''}
              helperText={password === '' ? <IntlMessages id="appModule.passwordEmpty" /> : ' '}
            />
          </Box>
          <FormControl variant="outlined" size="medium" className={classes.formControl}>
            <InputLabel htmlFor="outlined-purchaseArea">{<IntlMessages id="label.purchaseArea" />}</InputLabel>
            <Select
              native
              value={selectedPurchaseArea}
              onChange={event => {
                setSelectedPurchaseArea(event.target.value);
                //getUserPurchaseArea(user, event.target.value);
              }}
              label="purchaseArea"
              margin="dense"
              inputProps={{
                name: 'purchaseArea',
                id: 'outlined-purchaseArea',
              }}
              error={selectedPurchaseArea === 'None'}>
              <option value="None" />
              {purchaseArea.map(purc => {
                return (
                  <option key={purc.id} name={purc.purcName} value={purc.purcCode}>
                    {purc.purcName}
                  </option>
                );
              })}
            </Select>
            <FormHelperText>
              {selectedPurchaseArea === 'None' ? <IntlMessages id="appModule.purchaseAreaEmpty" /> : ' '}
            </FormHelperText>
          </FormControl>
          <FormControl variant="outlined" size="medium" className={classes.formControl}>
            <InputLabel htmlFor="outlined-businessUnit">{<IntlMessages id="label.businessUnit" />}</InputLabel>
            <Select
              native
              value={selectedBusinessUnit}
              onChange={event => {
                setSelectedBusinessUnit(event.target.value);
                //getUserBusinessUnit(user, event.target.value);
              }}
              label="businessUnit"
              margin="dense"
              inputProps={{
                name: 'businessUnit',
                id: 'outlined-businessUnit',
              }}
              error={selectedBusinessUnit === 'None'}>
              <option value="None" />
              {businessUnit.map(bu => {
                return (
                  <option key={bu.id} name={bu.buName} value={bu.buCode}>
                    {bu.buName}
                  </option>
                );
              })}
            </Select>
            <FormHelperText>
              {selectedBusinessUnit === 'None' ? <IntlMessages id="appModule.businessUnitEmpty" /> : ' '}
            </FormHelperText>
          </FormControl>
          {/* <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <FormControlLabel
              className={classes.formcontrolLabelRoot}
              control={<Checkbox name="checkedA" />}
              label={<IntlMessages id="appModule.rememberMe" />}
            />
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/forgot-password">
                <IntlMessages id="appModule.forgotPassword" />
              </NavLink>
            </Box>
          </Box> */}

          <Box display="flex" alignItems="center" justifyContent="space-between" marginTop={10}>
            <Button onClick={onSubmit} variant="contained" color="primary">
              <IntlMessages id="appModule.signIn" />
            </Button>

            {/*  <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/signup">
                <IntlMessages id="signIn.signUp" />
              </NavLink>
            </Box>*/}
          </Box>
        </form>

        {dispatch(AuthMethods[method].getSocialMediaIcons())}

        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default SignIn;
