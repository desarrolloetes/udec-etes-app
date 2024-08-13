import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import { ADD_ACTIVITY, DELETE_ACTIVITY, GET_ALL_ACTIVITIES, SET_CURRENT_ACTIVITY } from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllActivities = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/activities/getAll', {
        params: {
          filterOptions,
          searchTerm,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_ACTIVITIES, payload: data.data.activities });
          //console.log('getAllActivities::payload:' + data.data.majors);
          if (callbackFun) callbackFun(data.data.activities);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.activities.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.activities.error.message" />));
      });
  };
};

export const setCurrentActivity = activity => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_ACTIVITY, payload: activity });
  };
};

export const addNewActivity = (activity, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/activities/create', activity)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.activities.add.success.message" />));
          dispatch({ type: ADD_ACTIVITY, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.activities.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.activities.error.message" />));
      });
  };
};

export const updateActivity = (actCode, activity, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/activities/update?actCode=${actCode}`, activity)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.activities.update.success.message" />));
          //dispatch({ type: EDIT_MAJOR, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.activities.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.activities.error.message" />));
      });
  };
};

export const deleteActivity = (actCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/activities/delete?actCode=${actCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.activities.delete.success.message" />));
          dispatch({ type: DELETE_ACTIVITY, payload: actCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.activities.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.activities.error.message" />));
      });
  };
};
