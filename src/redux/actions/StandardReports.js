import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import { GET_STANDARD_APPLIED_TO_MAJOR } from '@jumbo/constants/ActionTypes';
import { GET_STANDARD_APPLIED_TO_ROOM_LAYOUT } from '@jumbo/constants/ActionTypes';
import { GET_STANDARD_EQUIPMENT_BY_MAJOR } from '@jumbo/constants/ActionTypes';
import { GET_STANDARD_BOOK_COVERAGE } from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getStandardAppliedToMajor = (
  purcCode,
  buCode,
  majorCode,
  stdCode,
  stdVersion,
  filterOptions,
  searchTerm,
  callbackFun,
) => {
  return async dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    //const { selectedBusinessUnit, selectedPurchaseArea } = JSON.parse(localStorage.getItem('userDomain')) || {};
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/standards/getStandardApplieToMajor', {
        params: {
          purcCode,
          buCode,
          majorCode,
          stdCode,
          stdVersion,
          searchTerm,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_STANDARD_APPLIED_TO_MAJOR,
            payload: data.data.standardsAppliedToMajor,
          });
          if (callbackFun) callbackFun(data.data.standardsAppliedToMajor);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
      });
  };
};

export const getStandardAppliedToRoomLayout = (
  purcCode,
  buCode,
  rlayCode,
  stdCode,
  stdVersion,
  filterOptions,
  searchTerm,
  callbackFun,
) => {
  return async dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    //const { selectedBusinessUnit, selectedPurchaseArea } = JSON.parse(localStorage.getItem('userDomain')) || {};
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/standards/getStandardApplieToRoomLayout', {
        params: {
          purcCode, //:selectedPurchaseArea,
          buCode, //:selectedBusinessUnit,
          rlayCode,
          stdCode,
          stdVersion,
          searchTerm,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_STANDARD_APPLIED_TO_ROOM_LAYOUT,
            payload: data.data.standardsAppliedToRoomLayout,
          });
          if (callbackFun) callbackFun(data.data.standardsAppliedToRoomLayout);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
      });
  };
};

export const getStandardEquipmentByMajor = (purcCode, majorCode, progCode, filterOptions, searchTerm, callbackFun) => {
  return async dispatch => {
    //console.log("getStandardEquipmentByMajor::purcCode" + purcCode);
    //console.log("getStandardEquipmentByMajor::majorCode" + majorCode);
    //console.log("getStandardEquipmentByMajor::progCode" + progCode);
    //console.log("getStandardEquipmentByMajor::filterOptions" + filterOptions);
    //console.log("getStandardEquipmentByMajor::searchTerm" + searchTerm);
    //console.log();
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    //const { selectedBusinessUnit, selectedPurchaseArea } = JSON.parse(localStorage.getItem('userDomain')) || {};
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/standards/getStandardEquipmentByMajor', {
        params: {
          purcCode, //:selectedPurchaseArea,
          majorCode, //:selectedBusinessUnit,
          progCode,
          searchTerm,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_STANDARD_EQUIPMENT_BY_MAJOR,
            payload: data.data.standardsEquipmentByMajor,
          });
          if (callbackFun) callbackFun(data.data.standardsEquipmentByMajor);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
      });
  };
};

export const getBookCoverage = (
  orgCode,
  majorCode,
  progCode,
  cityCode,
  idStd,
  idDda,
  idStock,
  filterOptions,
  searchTerm,
  callbackFun,
) => {
  return async dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    //const { selectedBusinessUnit, selectedPurchaseArea } = JSON.parse(localStorage.getItem('userDomain')) || {};
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/standards/getBookCoverage', {
        params: {
          orgCode,
          majorCode,
          progCode,
          cityCode,
          idStd,
          idDda,
          idStock,
          filterOptions,
          searchTerm,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_STANDARD_BOOK_COVERAGE,
            payload: data.data.booksCoverage,
          });
          if (callbackFun) callbackFun(data.data.booksCoverage);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
      });
  };
};
