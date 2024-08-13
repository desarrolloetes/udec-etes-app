import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_MAJOR,
  //DELETE_BULK_MAJOR,
  DELETE_MAJOR,
  EDIT_MAJOR,
  GET_MAJORS,
  GET_ALL_MAJORS,
  SET_MAJOR_DETAILS,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllMajors = (
  filterOptions = [],
  searchTerm = '',
  filterSelectOrgCode = '',
  filterSelectPurcCode = '',
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/majors/getAll', {
        params: {
          filterOptions,
          searchTerm,
          filterSelectOrgCode,
          filterSelectPurcCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_MAJORS, payload: data.data.majors });
          // console.log('getAllMajors::payload:' + data.data.majors);
          if (callbackFun) callbackFun(data.data.majors);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.major.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.major.error.message" />));
      });
  };
};

export const getMajors = (filterOptions = [], searchTerm = '', filterSelect = '', callbackFun) => {
  return dispatch => {
    //console.log("getAllMajors::filterOptions" + filterOptions);
    //console.log("getAllMajors::searchTerm" + searchTerm);
    //console.log("getAllMajors::filterSelect" + filterSelect);
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/majors/getAllMajors', {
        params: { filterOptions, searchTerm, filterSelect },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_MAJORS, payload: data.data.majors });
          //console.log("getAllMajors::payload:" + data.data.majors );
          if (callbackFun) callbackFun(data.data.majors);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.major.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.major.error.message" />));
      });
  };
};

export const setCurrentMajor = major => {
  return dispatch => {
    dispatch({ type: SET_MAJOR_DETAILS, payload: major });
  };
};

export const addNewMajor = (major, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/majors/create', major)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.majors.add.success.message" />));
          //dispatch({ type: GET_MAJORS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.majors.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.majors.error.message" />));
      });
  };
};

/* export const sentMailToUser = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to user successfully'));
  };
}; */

export const updateMajor = (majorCode, major, callbackFun) => {
  //console.log(buCode);
  //console.log(major);
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/majors/update?majorCode=${majorCode}`, major)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.majors.update.success.message" />));
          //dispatch({ type: EDIT_MAJOR, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.majors.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.majors.error.message" />));
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

export const deleteMajor = (majorCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/majors/delete?majorCode=${majorCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.majors.delete.success.message" />));
          dispatch({ type: DELETE_MAJOR, payload: majorCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.majors.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.majors.error.message" />));
      });
  };
};
