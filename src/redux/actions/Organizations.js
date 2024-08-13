import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import { GET_ORGANIZATIONS } from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllOrganizations = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/organizations/getAll', { params: { filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ORGANIZATIONS, payload: data.data.organizations });
          if (callbackFun) callbackFun(data.data.organizations);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.organization.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.organization.error.message" />));
      });
  };
};
