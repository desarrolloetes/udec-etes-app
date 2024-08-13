import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_ROLE,
  //DELETE_BULK_ROLES,
  DELETE_ROLE,
  EDIT_ROLE,
  GET_ROLES,
  SET_ROLE_DETAILS,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getRoles = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/roles/getAll', { params: { filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ROLES, payload: data.data.roles });
          if (callbackFun) callbackFun(data.data.roles);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
      });
  };
};

export const setCurrentRole = role => {
  return dispatch => {
    dispatch({ type: SET_ROLE_DETAILS, payload: role });
  };
};

export const addNewRole = (role, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/roles/create', role)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.roles.add.success.message" />));
          //dispatch({ type: GET_USERS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
      });
  };
};

/* export const sentMailToUser = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to user successfully'));
  };
}; */

export const updateRole = (roleId, role, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/roles/update?roleId=${roleId}`, role)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.roles.update.success.message" />));
          //dispatch({ type: EDIT_USER, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
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

export const deleteRole = (roleId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete(`v1/roles/delete?roleId=${roleId}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.roles.delete.success.message" />));
          dispatch({ type: DELETE_ROLE, payload: roleId });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
      });
  };
};
