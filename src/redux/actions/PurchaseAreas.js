import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_PURCHASE_AREA,
  DELETE_PURCHASE_AREA,
  EDIT_PURCHASE_AREA,
  GET_PURCHASE_AREAS,
  SET_PURCHASE_AREA_DETAILS,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getPurchaseAreas = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/purchaseAreas/getAll', { params: { filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_PURCHASE_AREAS,
            payload: data.data.purchaseAreas,
          });
          if (callbackFun) callbackFun(data.data.purchaseAreas);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.purchaseAreas.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.purchaseAreas.error.message" />));
      });
  };
};

export const setCurrentPurchaseArea = purchaseArea => {
  return dispatch => {
    dispatch({ type: SET_PURCHASE_AREA_DETAILS, payload: purchaseArea });
  };
};

export const addNewPurchaseArea = (purchaseArea, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/purchaseAreas/create', purchaseArea)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.purchaseAreas.add.success.message" />));
          //dispatch({ type: ADD_PURCHASE_AREA, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.purchaseAreas.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.purchaseAreas.error.message" />));
      });
  };
};

export const updatePurchaseArea = (purcCode, purchaseArea, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/purchaseAreas/update?purcCode=${purcCode}`, purchaseArea)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.purchaseAreas.update.success.message" />));
          //dispatch({ type: EDIT_PURCHASE_AREA, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.purchaseAreas.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.purchaseAreas.error.message" />));
      });
  };
};

export const deletePurchaseArea = (purcCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/purchaseAreas/delete?purcCode=${purcCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.purchaseAreas.delete.success.message" />));
          dispatch({ type: DELETE_PURCHASE_AREA, payload: purcCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.purchaseAreas.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.purchaseAreas.error.message" />));
      });
  };
};
