import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import { GET_ROOMS_LAYOUTS } from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllRoomLayoutsByParameters = (
  purcCode,
  buCode,
  stdCode,
  orgCode,
  filterOptions = [],
  searchTerm = '',
  filterSelect = '',
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    const { selectedBusinessUnit, selectedPurchaseArea } = JSON.parse(localStorage.getItem('userDomain')) || {};
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/roomLayouts/getAllByParameters', {
        params: {
          purcCode: selectedPurchaseArea,
          buCode: selectedBusinessUnit,
          stdCode,
          orgCode,
          searchTerm,
          filterSelect,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ROOMS_LAYOUTS, payload: data.data.roomLayouts });
          if (callbackFun) callbackFun(data.data.roomLayouts);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.roomsLayout.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.roomsLayout.error.message" values={{ code: error.message }} />));
      });
  };
};

export const getAllRoomLayouts = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/roomLayouts/getAll', { params: { filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_ROOMS_LAYOUTS,
            payload: data.data.roomLayouts,
          });
          if (callbackFun) callbackFun(data.data.roomLayouts);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.roomsLayout.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.roomsLayout.error.message" values={{ code: error.message }} />));
      });
  };
};

export const getAllRoomLayoutsByPurcCode = (purcCode, filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/roomLayouts/getAllByPurcCode', { params: { purcCode, filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_ROOMS_LAYOUTS,
            payload: data.data.roomLayouts,
          });
          if (callbackFun) callbackFun(data.data.roomLayouts);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.roomsLayout.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.roomsLayout.error.message" values={{ code: error.message }} />));
      });
  };
};
