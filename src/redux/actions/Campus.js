import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import { ADD_CAMPUS, DELETE_CAMPUS, GET_ALL_CAMPUS, SET_CURRENT_CAMPUS } from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllCampus = (filterOptions = [], searchTerm = '', orgCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/campus/getAll', {
        params: {
          filterOptions,
          searchTerm,
          orgCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_CAMPUS, payload: data.data.campus });
          //console.log('getAllCampus::payload:' + data.data.majors);
          if (callbackFun) callbackFun(data.data.campus);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.campus.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.campus.error.message" />));
      });
  };
};

export const setCurrentCampus = campus => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_CAMPUS, payload: campus });
  };
};

export const addNewCampus = (campus, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/campus/create', campus)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.campus.add.success.message" />));
          dispatch({ type: ADD_CAMPUS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.campus.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.campus.error.message" />));
      });
  };
};

export const updateCampus = (campCode, campus, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/campus/update?campCode=${campCode}`, campus)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.campus.update.success.message" />));
          //dispatch({ type: EDIT_MAJOR, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.campus.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.campus.error.message" />));
      });
  };
};

export const deleteCampus = (campCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/campus/delete?campCode=${campCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.campus.delete.success.message" />));
          dispatch({ type: DELETE_CAMPUS, payload: campCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.campus.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.campus.error.message" />));
      });
  };
};
