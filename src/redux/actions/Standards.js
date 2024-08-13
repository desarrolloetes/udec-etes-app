import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  GET_STANDARDS,
  DELETE_BULK_STANDARDS,
  ADD_PURCHASE_AREA,
  EDIT_PURCHASE_AREA,
  SET_CURRENT_STANDARD,
  DELETE_STANDARD,
  GET_STANDARD_COURSE,
  ENABLE_DISABLE_STANDARD,
  DISABLE_BULK_STANDARDS,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getStandardCourses = (stdcStdCode, stdcVersion, stdcYear, stdcOrgCode, callbackFun) => {
  return async dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    const { selectedBusinessUnit, selectedPurchaseArea } = JSON.parse(localStorage.getItem('userDomain')) || {};
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/standardCourses/getAllByStandardUserId', {
        params: {
          stdcPurcCode: selectedPurchaseArea,
          stdcBuCode: selectedBusinessUnit,
          stdcStdCode,
          stdcVersion,
          stdcYear,
          stdcOrgCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_STANDARD_COURSE,
            payload: data.data.standardCourses[0].standard,
          });
          if (callbackFun) callbackFun(data.data.standardCourses[0].standard);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standardCourse.get.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standardCourse.get.error.message" />));
      });
  };
};

export const getAllStandardsByUserId = (filterOptions = [], searchTerm = '', filterSelect = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    const { selectedBusinessUnit, selectedPurchaseArea } = JSON.parse(localStorage.getItem('userDomain')) || {};
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/standards/getAllByUser', {
        params: {
          businessUnitCode: selectedBusinessUnit,
          purchaseAreaCode: selectedPurchaseArea,
          filterOptions,
          searchTerm,
          filterSelect,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_STANDARDS, payload: data.data.standards });
          if (callbackFun) callbackFun(data.data.standards);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
      });
  };
};

export const getAllStandards = (
  filterOptions = [],
  searchTerm = '',
  stdCode,
  stdOrgCode,
  stdBuCode,
  stdPurcCode,
  stdYear,
  stdVersion,
  stdUserId,
  stdPurchase,
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    const { selectedBusinessUnit, selectedPurchaseArea } = JSON.parse(localStorage.getItem('userDomain')) || {};
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/standards/getAllBySearch', {
        params: {
          filterOptions,
          searchTerm,
          stdCode,
          stdOrgCode,
          stdBuCode,
          stdPurcCode,
          stdYear,
          stdVersion,
          stdUserId,
          stdPurchase,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_STANDARDS, payload: data.data.standards });
          if (callbackFun) callbackFun(data.data.standards);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
      });
  };
};

export const setCurrentStandard = standard => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_STANDARD, payload: standard });
  };
};

export const addNewPurchaseArea = (purcCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/purchaseArea/create', purcCode)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.purchaseAreas.add.success.message" />));
          dispatch({ type: ADD_PURCHASE_AREA, payload: data.data });
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

export const updatePurchaseArea = (purcCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/purchaseAreas/update?purcCode=', purcCode)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.purchaseAreas.update.success.message" />));
          dispatch({ type: EDIT_PURCHASE_AREA, payload: data.data });
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

export const updateUserStatus = (data, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/purchaseAreas/update?purcCode=', data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.purchaseAreas.update.statusSuccess.message" />));
          dispatch({ type: EDIT_PURCHASE_AREA, payload: response.data });
          if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.purchaseAreas.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.purchaseAreas.error.message" />));
      });
  };
};

export const deleteStandard = (
  standardCode,
  organizationCode,
  businessUnitCode,
  standardPurchaseAreaCode,
  standardVersion,
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete(`v1/standards/delete`, {
        params: {
          stdCode: standardCode,
          stdOrgCode: organizationCode,
          stdBuCode: businessUnitCode,
          stdPurcCode: standardPurchaseAreaCode,
          stdVersion: standardVersion,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.standard.delete.success.message" />));
          dispatch({ type: DELETE_STANDARD, payload: standardCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
      });
  };
};

export const deleteBulkStandards = (standardIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/standard/bulk-delete', { standardIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.user.delete.bulkSuccess.message" />));
          dispatch({ type: DELETE_BULK_STANDARDS, payload: standardIds });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
      });
  };
};

export const enableDisableStandard = (
  standardCode,
  organizationCode,
  businessUnitCode,
  standardPurchaseAreaCode,
  standardVersion,
  standardStatus,
  callbackFun,
) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put(`v1/standards/enableDisable`, {
        params: {
          stdCode: standardCode,
          stdOrgCode: organizationCode,
          stdBuCode: businessUnitCode,
          stdPurcCode: standardPurchaseAreaCode,
          stdVersion: standardVersion,
          stdStatus: standardStatus,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.standard.disable.success.message" />));
          //dispatch({ type: ENABLE_DISABLE_STANDARD, payload: standardCode });
          dispatch(getAllStandardsByUserId());
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
      });
  };
};
export const disableBulkStandards = (standardIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/standard/bulk-disable', { standardIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.standard.bulkdisable.success.message" />));
          //dispatch({ type: DISABLE_BULK_STANDARDS, payload: standardIds });
          dispatch(getAllStandardsByUserId());
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standard.error.message" />));
      });
  };
};
