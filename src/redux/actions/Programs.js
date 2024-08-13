import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import { GET_PROGRAMS } from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllPrograms = (filterOptions = [], searchTerm = '', filterSelect = '', callbackFun) => {
  return dispatch => {
    //console.log("getAllPrograms::filterOptions:" + filterOptions);
    //console.log("getAllPrograms::searchTerm:" + searchTerm);
    //console.log("getAllPrograms::filterSelect:" + filterSelect);
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/programs/getAll', {
        params: { filterOptions, searchTerm, filterSelect },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_PROGRAMS, payload: data.data.programs });
          //console.log("MAJORS" + {dpayload: data.data.majors});
          if (callbackFun) callbackFun(data.data.programs);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.major.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.major.error.message" />));
      });
  };
};
