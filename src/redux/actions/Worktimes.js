import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import { ADD_WORKTIME, DELETE_WORKTIME, GET_ALL_WORKTIMES, SET_CURRENT_WORKTIME } from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllWorktimes = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/worktimes/getAll', {
        params: {
          filterOptions,
          searchTerm,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_WORKTIMES, payload: data.data.workTimes });
          //console.log('getAllWorktimes::payload:' + data.data.majors);
          if (callbackFun) callbackFun(data.data.worktimes);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.worktimes.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.worktimes.error.message" />));
      });
  };
};

export const setCurrentWorktime = worktime => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_WORKTIME, payload: worktime });
  };
};

export const addNewWorktime = (worktime, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/worktimes/create', worktime)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.worktimes.add.success.message" />));
          dispatch({ type: ADD_WORKTIME, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.worktimes.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.worktimes.error.message" />));
      });
  };
};

export const updateActivity = (wktCode, worktime, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/worktimes/update?wktCode=${wktCode}`, worktime)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.worktimes.update.success.message" />));
          //dispatch({ type: EDIT_MAJOR, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.worktimes.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.worktimes.error.message" />));
      });
  };
};

export const deleteWorktime = (wktCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/worktimes/delete?wktCode=${wktCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.worktimes.delete.success.message" />));
          dispatch({ type: DELETE_WORKTIME, payload: wktCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.worktimes.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.worktimes.error.message" />));
      });
  };
};
