import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import { GET_ALL_GAP_SOURCE_STANDARD } from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllGapSourceStandard = (
  filterOptions = [],
  searchTerm = '',
  gapsProcId,
  gapsProcCode,
  gapsBuCode,
  gapsOrgCode,
  gapsStdCode,
  gapsStdVersion,
  gapsCoursCode,
  gapsRlayCode,
  gapsPurcCode,
  gapsItemCode,
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get(`v1/gapsSourceStandard/getAll`, {
        params: {
          filterOptions,
          searchTerm,
          gapsProcId,
          gapsProcCode,
          gapsBuCode,
          gapsOrgCode,
          gapsStdCode,
          gapsStdVersion,
          gapsCoursCode,
          gapsRlayCode,
          gapsPurcCode,
          gapsItemCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_GAP_SOURCE_STANDARD, payload: data.data.gapsSourceStandard });
          if (callbackFun) callbackFun(data.data.gapsSourceStandard);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
      });
  };
};

export const bulkLoadStandard = (payload, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/gapsSourceStandard/bulkLoad', payload)
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
