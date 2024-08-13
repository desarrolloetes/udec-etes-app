import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import { GET_ALL_GAP_SOURCE_DEMAND, GET_ALL_GAP_SOURCE_DEMAND_PERIODS } from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllGapSourceDemand = (
  filterOptions = [],
  searchTerm = '',
  gapdProcId,
  gapdProcCode,
  gapdStdcAcademicYear,
  gapdStdcAcademicPeriod,
  gapdOrgCode,
  gapdCampCode,
  gapdSchoCode,
  gapdCoursCode,
  gapdWktCode,
  gapdActCode,
  gapdCityCode,
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get(`v1/gapsSourceDemand/getAll`, {
        params: {
          filterOptions,
          searchTerm,
          gapdProcId,
          gapdProcCode,
          gapdStdcAcademicYear,
          gapdStdcAcademicPeriod,
          gapdOrgCode,
          gapdCampCode,
          gapdSchoCode,
          gapdCoursCode,
          gapdWktCode,
          gapdActCode,
          gapdCityCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_GAP_SOURCE_DEMAND, payload: data.data.gapsSourceDemand });
          if (callbackFun) callbackFun(data.data.gapsSourceDemand);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
      });
  };
};

export const bulkLoadDemand = (payload, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/gapsSourceDemand/bulkLoad', payload)
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

export const getAllDemandPeriods = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/gapsSourceDemand/getAllDemandPeriods', {
        params: {
          filterOptions,
          searchTerm,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_GAP_SOURCE_DEMAND_PERIODS, payload: data.data.demandPeriods });
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
