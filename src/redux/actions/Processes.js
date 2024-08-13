import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_PROCESS,
  DELETE_PROCESS,
  GET_PROCESESS,
  SET_CURRENT_PROCESS,
  GET_PROCESESS_STOCK,
  GET_PROCESESS_DEMAND,
  GET_PROCESESS_STANDARD,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllProcesses = (filterOptions = [], searchTerm = '', proctId = null, purcCode = null, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get(`v1/processes/getAll`, {
        params: {
          filterOptions,
          searchTerm,
          proctId,
          purcCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_PROCESESS, payload: data.data.processes });
          if (callbackFun) callbackFun(data.data.processes);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
      });
  };
};

export const setCurrentProcess = process => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_PROCESS, payload: process });
  };
};

export const addNewProcess = (process, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/processes/create', process)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.process.add.success.message" />));
          dispatch({ type: ADD_PROCESS, payload: data.data });
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

export const deleteProcess = (procId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/processes/delete?procId=${procId}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.process.delete.success.message" />));
          dispatch({ type: DELETE_PROCESS, payload: procId });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
      });
  };
};

export const getAllStockProcesses = (filterOptions = [], searchTerm = '', proctId = null, purcCode = null, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get(`v1/processes/getAll`, {
        params: {
          filterOptions,
          searchTerm,
          proctId,
          purcCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_PROCESESS_STOCK, payload: data.data.processes });
          if (callbackFun) callbackFun(data.data.processes);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
      });
  };
};

export const getAllDemandProcesses = (filterOptions = [], searchTerm = '', proctId = null, purcCode = null, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get(`v1/processes/getAll`, {
        params: {
          filterOptions,
          searchTerm,
          proctId,
          purcCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_PROCESESS_DEMAND, payload: data.data.processes });
          if (callbackFun) callbackFun(data.data.processes);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
      });
  };
};

export const getAllStandardProcesses = (
  filterOptions = [],
  searchTerm = '',
  proctId = null,
  purcCode = null,
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get(`v1/processes/getAll`, {
        params: {
          filterOptions,
          searchTerm,
          proctId,
          purcCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_PROCESESS_STANDARD, payload: data.data.processes });
          if (callbackFun) callbackFun(data.data.processes);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.process.error.message" />));
      });
  };
};
