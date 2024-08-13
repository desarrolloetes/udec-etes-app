import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import { GET_ALL_GAP_PURCHASES } from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllGapPurchases = (
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
      .get(`v1/purchases/getAll`, {
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
          dispatch({ type: GET_ALL_GAP_PURCHASES, payload: data.data.gapPurchases });
          if (callbackFun) callbackFun(data.data.gapPurchases);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.gapPurchases.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.gapPurchases.error.message" />));
      });
  };
};
