import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_BUSINESS_UNIT,
  //DELETE_BULK_BUSINESS_UNITS,
  DELETE_BUSINESS_UNIT,
  EDIT_BUSINESS_UNIT,
  GET_BUSINESS_UNITS,
  SET_BUSINESS_UNIT_DETAILS,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getBusinessUnits = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/businessUnits/getAll', { params: { filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_BUSINESS_UNITS,
            payload: data.data.businessUnits,
          });
          if (callbackFun) callbackFun(data.data.businessUnits);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.businessUnits.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.businessUnits.error.message" />));
      });
  };
};

export const setCurrentBusinessUnit = businessUnit => {
  return dispatch => {
    dispatch({ type: SET_BUSINESS_UNIT_DETAILS, payload: businessUnit });
  };
};

export const addNewBusinessUnit = (businessUnit, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/businessUnits/create', businessUnit)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.businessUnits.add.success.message" />));
          //dispatch({ type: GET_BUSINESS_UNITS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.businessUnits.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.businessUnits.error.message" />));
      });
  };
};

/* export const sentMailToUser = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to user successfully'));
  };
}; */

export const updateBusinessUnit = (buCode, businessUnit, callbackFun) => {
  //console.log(buCode);
  //console.log(businessUnit);
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/businessUnits/update?buCode=${buCode}`, businessUnit)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.businessUnits.update.success.message" />));
          //dispatch({ type: EDIT_BUSINESS_UNIT, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.businessUnits.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.businessUnits.error.message" />));
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

export const deleteBusinessUnit = (buCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/businessUnits/delete?buCode=${buCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.businessUnits.delete.success.message" />));
          dispatch({ type: DELETE_BUSINESS_UNIT, payload: buCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.businessUnits.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.businessUnits.error.message" />));
      });
  };
};
