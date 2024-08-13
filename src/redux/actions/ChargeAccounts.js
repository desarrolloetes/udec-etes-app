import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_CHARGE_ACCOUNT,
  //DELETE_BULK_CHARGE_ACCOUNTS,
  DELETE_CHARGE_ACCOUNT,
  EDIT_CHARGE_ACCOUNT,
  GET_CHARGE_ACCOUNTS,
  SET_CHARGE_ACCOUNT_DETAILS,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getChargeAccounts = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/chargeAccounts/getAll', { params: { filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_CHARGE_ACCOUNTS,
            payload: data.data.chargeAccounts,
          });
          if (callbackFun) callbackFun(data.data.chargeAccounts);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.chargeAccounts.error.message" />));
        }
      })
      .catch(error => {
        console.log('getChargeAccounts:fetchError:' + error);
        dispatch(fetchError(<IntlMessages id="fetch.chargeAccounts.error.message" />));
      });
  };
};

export const setCurrentChargeAccount = chargeAccount => {
  return dispatch => {
    dispatch({ type: SET_CHARGE_ACCOUNT_DETAILS, payload: chargeAccount });
  };
};

export const addNewChargeAccount = (chargeAccount, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/chargeAccounts/create', chargeAccount)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.chargeAccounts.add.success.message" />));
          //dispatch({ type: GET_CHARGE_ACCOUNTS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.chargeAccounts.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.chargeAccounts.error.message" />));
      });
  };
};

/* export const sentMailToUser = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to user successfully'));
  };
}; */

export const updateChargeAccount = (caccCode, caccOrgCode, chargeAccount, callbackFun) => {
  //console.log(buCode);
  //console.log(businessUnit);
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/chargeAccounts/update?caccCode=${caccCode}&caccOrgCode=${caccOrgCode}`, chargeAccount)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.chargeAccounts.update.success.message" />));
          //dispatch({ type: EDIT_CHARGE_ACCOUNT, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.chargeAccounts.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.chargeAccounts.error.message" />));
      });
  };
};

/* export const updateRoleStatus = (data, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/roles/update-status', data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.user.update.statusSuccess.message" />));
          dispatch({ type: EDIT_USER, payload: response.data });
          if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
      });
  };
}; */

/* export const deleteBulkRoles = (roleIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/roles/bulk-delete', { roleIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.roles.delete.bulkSuccess.message" />));
          dispatch({ type: DELETE_BULK_ROLES, payload: userIds });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
      });
  };
}; */

export const deleteChargeAccount = (caccCode, caccOrgCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/chargeAccounts/delete?caccCode=${caccCode}&caccOrgCode=${caccOrgCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.chargeAccounts.delete.success.message" />));
          dispatch({ type: DELETE_CHARGE_ACCOUNT, payload: caccCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.chargeAccounts.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.chargeAccounts.error.message" />));
      });
  };
};
