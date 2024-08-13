import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_ITEM,
  //DELETE_BULK_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  GET_ITEMS,
  GET_ALL_ITEMS,
  SET_ITEM_DETAILS,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllItems = (
  filterOptions = [],
  searchTerm = '',
  filterSelectOrgCode = '',
  filterSelectPurcCode = '',
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/items/getAll', {
        params: {
          filterOptions,
          searchTerm,
          filterSelectOrgCode,
          filterSelectPurcCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ITEMS, payload: data.data.items });
          if (callbackFun) callbackFun(data.data.items);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.items.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.items.error.message" values={{ code: error.message }} />));
      });
  };
};

export const getItems = (orgCode, purcCode, famCode, subFamCode, filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/items/getAll', {
        params: { orgCode, purcCode, famCode, subFamCode, filterOptions, searchTerm },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_ITEMS, payload: data.data.items });
          if (callbackFun) callbackFun(data.data.items);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.items.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.items.error.message" values={{ code: error.message }} />));
      });
  };
};

export const setCurrentItem = item => {
  return dispatch => {
    dispatch({ type: SET_ITEM_DETAILS, payload: item });
  };
};

export const addNewItem = (item, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/items/create', item)
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.items.add.success.message" values={{ code: data.data.message }} />));
          //dispatch({ type: GET_ITEMS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.items.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.items.error.message" values={{ code: error.response.data.message }} />));
      });
  };
};

export const updateItem = (itemCode, item, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/items/update?itemCode=${itemCode}`, item)
      .then(data => {
        if (data.status === 200) {
          dispatch(
            fetchSuccess(<IntlMessages id="fetch.items.update.success.message" values={{ code: data.data.message }} />),
          );
          //dispatch({ type: EDIT_ITEM, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.items.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.items.error.message" values={{ code: error.message }} />));
      });
  };
};

/* export const deleteBulkItems = (itemCodes, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('v1/items/bulk-delete', { itemCodes })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.items.delete.bulkSuccess.message" />));
          dispatch({ type: DELETE_BULK_ITEMS, payload: itemCodes });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.items.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.items.error.message" />));
      });
  };
}; */

export const deleteItem = (itemCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/items/delete?itemCode=${itemCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(
            fetchSuccess(<IntlMessages id="fetch.items.delete.success.message" values={{ code: data.data.message }} />),
          );
          dispatch({ type: DELETE_ITEM, payload: itemCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.items.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.items.error.message" values={{ code: error.message }} />));
      });
  };
};
