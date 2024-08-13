import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_CITY,
  DELETE_CITY,
  GET_ALL_CITIES,
  SET_CURRENT_CITY,
  GET_ALL_CITY_BIBLIOGRAPHIC_CENTER,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllCities = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/cities/getAll', {
        params: {
          filterOptions,
          searchTerm,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_CITIES, payload: data.data.cities });
          //console.log('getAllCities::payload:' + data.data.majors);
          if (callbackFun) callbackFun(data.data.cities);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.cities.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.cities.error.message" />));
      });
  };
};

export const getAllCitiesBibliographicCenter = (orgCode = null, filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/cities/getAllCitiesBibliographicCenter', {
        params: {
          orgCode,
          filterOptions,
          searchTerm,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_CITY_BIBLIOGRAPHIC_CENTER, payload: data.data.cities });
          //console.log('getAllCities::payload:' + data.data.majors);
          if (callbackFun) callbackFun(data.data.cities);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.cities.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.cities.error.message" />));
      });
  };
};

export const setCurrentCity = city => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_CITY, payload: city });
  };
};

export const addNewCity = (city, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/cities/create', city)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.cities.add.success.message" />));
          dispatch({ type: ADD_CITY, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.cities.error.message" />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.cities.error.message" />));
      });
  };
};

export const updateCity = (cityCode, city, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/cities/update?cityCode=${cityCode}`, city)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.cities.update.success.message" />));
          //dispatch({ type: EDIT_MAJOR, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.cities.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.cities.error.message" />));
      });
  };
};

export const deleteCity = (cityCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/cities/delete?cityCode=${cityCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.cities.delete.success.message" />));
          dispatch({ type: DELETE_CITY, payload: cityCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.cities.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.cities.error.message" />));
      });
  };
};
