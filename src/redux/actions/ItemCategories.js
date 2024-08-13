import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_ITEM_CATEGORY,
  DELETE_BULK_ITEM_CATEGORIES,
  DELETE_ITEM_CATEGORY,
  EDIT_ITEM_CATEGORY,
  GET_ITEM_CATEGORIES,
  GET_ALL_ITEM_CATEGORIES,
  GET_ALL_ITEM_SUB_CATEGORIES,
  SET_ITEM_CATEGORY_DETAILS,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAll = (purcCode, famCode, subFamCode, filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/itemCategories/getAll', {
        params: { purcCode, famCode, subFamCode, filterOptions, searchTerm },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_ITEM_CATEGORIES, payload: data.data.itemCategories });
          if (callbackFun) callbackFun(data.data.itemCategories);
        } else {
          dispatch(
            fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: data.data.message }} />),
          );
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: error.message }} />));
      });
  };
};

export const getAllItemCategories = (itmcPurcCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/itemCategories/getAllByPurcCode', {
        params: { itmcPurcCode },
      })
      //.get(`v1/itemCategories/getAllByPurcCode?itmcPurcCode=${itmcPurcCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_ITEM_CATEGORIES, payload: data.data.itemCategories });
          if (callbackFun) callbackFun(data.data.itemCategories);
        } else {
          dispatch(
            fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: data.data.message }} />),
          );
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: error.message }} />));
      });
  };
};

export const getAllItemSubCategories = (itmcPurcCode, itmcParentCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/itemCategories/getAllByParentCode', {
        params: { itmcPurcCode, itmcParentCode },
      })
      //.get(`v1/itemCategories/getAllByParentCode?itmcPurcCode=${itmcPurcCode}&itmcParentCode=${itmcParentCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_ITEM_SUB_CATEGORIES, payload: data.data.itemCategories });
          if (callbackFun) callbackFun(data.data.itemCategories);
        } else {
          dispatch(
            fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: data.data.message }} />),
          );
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: error.message }} />));
      });
  };
};

export const setCurrentItem = item => {
  return dispatch => {
    dispatch({ type: SET_ITEM_CATEGORY_DETAILS, payload: item });
  };
};

export const addNewItem = (itemCategory, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/itemCategories/create', itemCategory)
      .then(data => {
        if (data.status === 201) {
          dispatch(
            fetchSuccess(
              <IntlMessages id="fetch.itemCategories.add.success.message" values={{ code: data.data.message }} />,
            ),
          );
          //dispatch({ type: GET_ITEM_CATEGORIES, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(
            fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: data.data.message }} />),
          );
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: error.message }} />));
      });
  };
};

export const updateItem = (itmcCode, itemCategory, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/itemCategories/update?itmcCode=${itmcCode}`, itemCategory)
      .then(data => {
        if (data.status === 200) {
          dispatch(
            fetchSuccess(
              <IntlMessages id="fetch.itemCategories.update.success.message" values={{ code: data.data.message }} />,
            ),
          );
          //dispatch({ type: EDIT_ITEM, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(
            fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: data.data.message }} />),
          );
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: error.message }} />));
      });
  };
};

/* export const deleteBulkItemCategories = (itmcCodes, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('v1/itemCategories/bulk-delete', { itemCategoryCodes })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.itemCategories.delete.bulkSuccess.message" />));
          dispatch({ type: DELETE_BULK_ITEM_CATEGORIES, payload: itemCategoryCodes });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.itemCategories.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemCategories.error.message" />));
      });
  };
}; */

export const deleteItem = (itmcCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/itemCategories/delete?itmcCode=${itmcCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(
            fetchSuccess(
              <IntlMessages id="fetch.itemCategories.delete.success.message" values={{ code: data.data.message }} />,
            ),
          );
          dispatch({ type: DELETE_ITEM_CATEGORY, payload: itmcCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(
            fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: data.data.message }} />),
          );
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemCategories.error.message" values={{ code: error.message }} />));
      });
  };
};
