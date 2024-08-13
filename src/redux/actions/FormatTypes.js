import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_FORMAT_TYPE,
  DELETE_FORMAT_TYPE,
  GET_ALL_FORMAT_TYPES,
  SET_CURRENT_FORMAT_TYPE,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllFormatTypes = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/formatTypes/getAll', {
        params: {
          filterOptions,
          searchTerm,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_FORMAT_TYPES, payload: data.data.formatTypes });
          //console.log('getAllCities::payload:' + data.data.majors);
          if (callbackFun) callbackFun(data.data.formatTypes);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.formatTypes.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.formatTypes.error.message" />));
      });
  };
};

export const setCurrentFormatType = formatType => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_FORMAT_TYPE, payload: formatType });
  };
};

export const addNewFormatTYpe = (formatType, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/formatTypes/create', formatType)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.formatTypes.add.success.message" />));
          dispatch({ type: ADD_FORMAT_TYPE, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.formatTypes.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.formatTypes.error.message" />));
      });
  };
};

export const updateFormatType = (fmtId, formatType, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/formatTypes/update?fmtId=${fmtId}`, formatType)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.formatTypes.update.success.message" />));
          //dispatch({ type: EDIT_MAJOR, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.formatTypes.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.formatTypes.error.message" />));
      });
  };
};

export const deleteFormatType = (fmtId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/formatTypes/delete?fmtId=${fmtId}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.formatTypes.delete.success.message" />));
          dispatch({ type: DELETE_FORMAT_TYPE, payload: fmtId });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.formatTypes.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.formatTypes.error.message" />));
      });
  };
};
