import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  GET_ALL_GAP_DEMAND_VS_STOCK,
  GET_ALL_GAP_STOCK_VS_DEMAND,
  GET_ALL_GAP_PERIODS_DDA,
  GET_ALL_GAP_PERIODS_STK,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllGapDemandVsStock = (
  filterOptions = [],
  searchTerm = '',
  gapProcId,
  gapProcCode,
  gapStdcAcademicYear,
  gapStdcAcademicPeriod,
  gapOrgCode,
  gapCampCode,
  gapSchoCode,
  gapCoursCode,
  gapItemCode,
  gapVolume,
  gapCityCode,
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get(`v1/gaps/getAllDemandVsStock`, {
        params: {
          filterOptions,
          searchTerm,
          gapProcId,
          gapProcCode,
          gapStdcAcademicYear,
          gapStdcAcademicPeriod,
          gapOrgCode,
          gapCampCode,
          gapSchoCode,
          gapCoursCode,
          gapItemCode,
          gapVolume,
          gapCityCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_GAP_DEMAND_VS_STOCK, payload: data.data.gapsDda });
          if (callbackFun) callbackFun(data.data.gapsDda);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.gaps.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.gaps.error.message" />));
      });
  };
};

export const getAllGapStockVsDemand = (
  filterOptions = [],
  searchTerm = '',
  gapProcId,
  gapProcCode,
  gapStdcAcademicYear,
  gapStdcAcademicPeriod,
  gapOrgCode,
  gapCampCode,
  gapSchoCode,
  gapCoursCode,
  gapItemCode,
  gapVolume,
  gapCityCode,
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get(`v1/gaps/getAllStockVsDemand`, {
        params: {
          filterOptions,
          searchTerm,
          gapProcId,
          gapProcCode,
          gapStdcAcademicYear,
          gapStdcAcademicPeriod,
          gapOrgCode,
          gapCampCode,
          gapSchoCode,
          gapCoursCode,
          gapItemCode,
          gapVolume,
          gapCityCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_GAP_STOCK_VS_DEMAND, payload: data.data.gapsStk });
          if (callbackFun) callbackFun(data.data.gapsStk);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.gaps.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.gaps.error.message" />));
      });
  };
};

export const gapCalculation = (payload, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/gaps/calculation', payload)
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

export const getAllGapPeriodsDda = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/gaps/getAllPeriodsDda', {})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_GAP_PERIODS_DDA, payload: data.data.gapPeriodsDda });
          //console.log('getAllCities::payload:' + data.data.majors);
          if (callbackFun) callbackFun(data.data.gapPeriods);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.gaps.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.gaps.error.message" />));
      });
  };
};

export const getAllGapPeriodsStk = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/gaps/getAllPeriodsStk', {})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_GAP_PERIODS_STK, payload: data.data.gapPeriodsStk });
          //console.log('getAllCities::payload:' + data.data.majors);
          if (callbackFun) callbackFun(data.data.gapPeriods);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.gaps.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.gaps.error.message" />));
      });
  };
};
