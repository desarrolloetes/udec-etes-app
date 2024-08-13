import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import { GET_ALL_GAP_SOURCE_STOCK } from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllGapSourceStock = (
  filterOptions = [],
  searchTerm = '',
  gapstPurcCode,
  gapstProcId,
  gapstProcCode,
  gapstOrgCode,
  gapstCampCode,
  gapstCityCode,
  gapstItemId,
  gapstLibraryId,
  gapstVolume,
  gapstFormatType,
  gapstItemCode,
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get(`v1/gapsSourceStock/getAll`, {
        params: {
          filterOptions,
          searchTerm,
          gapstPurcCode,
          gapstProcId,
          gapstProcCode,
          gapstOrgCode,
          gapstCampCode,
          gapstCityCode,
          gapstItemId,
          gapstLibraryId,
          gapstVolume,
          gapstFormatType,
          gapstItemCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_GAP_SOURCE_STOCK, payload: data.data.gapsSourceStock });
          if (callbackFun) callbackFun(data.data.gapsSourceStock);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
      });
  };
};

export const bulkLoadStock = (payload, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/gapsSourceStock/bulkLoad', payload)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.process.add.success.message" />));
          //dispatch({ type: ADD_PROCESS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
      });
  };
};
