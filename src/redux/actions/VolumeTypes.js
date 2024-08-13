import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_VOLUME_TYPE,
  DELETE_VOLUME_TYPE,
  GET_ALL_VOLUME_TYPES,
  SET_CURRENT_VOLUME_TYPE,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllVolumeTypes = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/volumeTypes/getAll', {
        params: {
          filterOptions,
          searchTerm,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_VOLUME_TYPES, payload: data.data.volumeTypes });
          //console.log('getAllCities::payload:' + data.data.majors);
          if (callbackFun) callbackFun(data.data.volumeTypes);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.volumeTypes.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.volumeTypes.error.message" />));
      });
  };
};

export const setCurrentVolumeType = volumeType => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_VOLUME_TYPE, payload: volumeType });
  };
};

export const addNewVolumeType = (volumeType, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/volumeTypes/create', volumeType)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.volumeTypes.add.success.message" />));
          dispatch({ type: ADD_VOLUME_TYPE, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.volumeTypes.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.volumeTypes.error.message" />));
      });
  };
};

/* export const sentMailToUser = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to user successfully'));
  };
}; */

export const updateVolumeType = (vlmId, volumeType, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/volumeTypes/update?vlmId=${vlmId}`, volumeType)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.volumeTypes.update.success.message" />));
          //dispatch({ type: EDIT_MAJOR, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.volumeTypes.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.volumeTypes.error.message" />));
      });
  };
};

export const deleteCity = (vlmId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/volumeTypes/delete?vlmId=${vlmId}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.volumeTypes.delete.success.message" />));
          dispatch({ type: DELETE_VOLUME_TYPE, payload: vlmId });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.volumeTypes.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.volumeTypes.error.message" />));
      });
  };
};
