import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_ITEM_ATTRIBUTE,
  //DELETE_BULK_ITEM_ATTRIBUTE,
  DELETE_ITEM_ATTRIBUTE,
  EDIT_ITEM_ATTRIBUTE,
  GET_ITEM_ATTRIBUTES,
  GET_ALL_ITEM_ATTRIBUTES,
  SET_ITEM_ATTRIBUTE_DETAILS,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllItemAttributes = (
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
      .get('v1/itemAttributes/getAll', {
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
          dispatch({ type: GET_ITEM_ATTRIBUTES, payload: data.data.itemAttributes });
          if (callbackFun) callbackFun(data.data.itemAttributes);
        } else {
          dispatch(
            fetchError(<IntlMessages id="fetch.itemAttributes.error.message" values={{ code: data.data.message }} />),
          );
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemAttributes.error.message" values={{ code: error.message }} />));
      });
  };
};

export const getAllItemAttributesByPurcCode = (purcCode, filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/itemAttributes/getAllByPurcCode', {
        params: { purcCode, filterOptions, searchTerm },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_ITEM_ATTRIBUTES, payload: data.data.itemAttributes });
          if (callbackFun) callbackFun(data.data.itemAttributes);
        } else {
          dispatch(
            fetchError(<IntlMessages id="fetch.itemAttributes.error.message" values={{ code: data.data.message }} />),
          );
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemAttributes.error.message" values={{ code: error.message }} />));
      });
  };
};

export const setCurrentItemAttribute = itemAttribute => {
  return dispatch => {
    dispatch({ type: SET_ITEM_ATTRIBUTE_DETAILS, payload: itemAttribute });
  };
};

export const addNewItemAttribute = (itemAttribute, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/itemAttributes/create', itemAttribute)
      .then(data => {
        if (data.status === 201) {
          dispatch(
            fetchSuccess(
              <IntlMessages id="fetch.itemAttributes.add.success.message" values={{ code: data.data.message }} />,
            ),
          );
          //dispatch({ type: GET_ITEM_ATTRIBUTES, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(
            fetchError(<IntlMessages id="fetch.itemAttributes.error.message" values={{ code: data.data.message }} />),
          );
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemAttributes.error.message" values={{ code: error.message }} />));
      });
  };
};

export const updateItemAttribute = (itmaCode, itemAttribute, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/itemAttributes/update?itmaCode=${itmaCode}`, itemAttribute)
      .then(data => {
        if (data.status === 200) {
          dispatch(
            fetchSuccess(
              <IntlMessages id="fetch.itemAttributes.update.success.message" values={{ code: data.data.message }} />,
            ),
          );
          //dispatch({ type: EDIT_ITEM_ATTRIBUTE, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(
            fetchError(<IntlMessages id="fetch.itemAttributes.error.message" values={{ code: data.data.message }} />),
          );
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemAttributes.error.message" values={{ code: error.message }} />));
      });
  };
};

export const deleteItemAttribute = (itmaCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/itemAttributes/delete?itemCode=${itmaCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(
            fetchSuccess(
              <IntlMessages id="fetch.itemAttributes.delete.success.message" values={{ code: data.data.message }} />,
            ),
          );
          dispatch({ type: DELETE_ITEM_ATTRIBUTE, payload: itmaCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(
            fetchError(<IntlMessages id="fetch.itemAttributes.error.message" values={{ code: data.data.message }} />),
          );
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.itemAttributes.error.message" values={{ code: error.message }} />));
      });
  };
};
