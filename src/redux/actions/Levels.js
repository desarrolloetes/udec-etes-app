import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_LEVEL,
  //DELETE_BULK_LEVELS,
  DELETE_LEVEL,
  EDIT_LEVEL,
  GET_LEVELS,
  SET_LEVEL_DETAILS,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getLevels = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/levels/getAll', { params: { filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_LEVELS,
            payload: data.data.levels,
          });
          if (callbackFun) callbackFun(data.data.levels);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.levels.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        console.log('getLevels:fetchError:' + error);
        dispatch(fetchError(<IntlMessages id="fetch.levels.error.message" values={{ code: error.message }} />));
      });
  };
};

export const setCurrentLevel = level => {
  return dispatch => {
    dispatch({ type: SET_LEVEL_DETAILS, payload: level });
  };
};

export const addNewLevel = (level, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/levels/create', level)
      .then(data => {
        if (data.status === 201) {
          dispatch(
            fetchSuccess(<IntlMessages id="fetch.levels.add.success.message" values={{ code: data.data.message }} />),
          );
          //dispatch({ type: GET_LEVELS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.levels.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.levels.error.message" values={{ code: error.message }} />));
      });
  };
};

/* export const sentMailToUser = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to user successfully'));
  };
}; */

export const updateLevel = (levelCode, level, callbackFun) => {
  //console.log(buCode);
  //console.log(businessUnit);
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/levels/update?levelCode=${levelCode}`, level)
      .then(data => {
        if (data.status === 200) {
          dispatch(
            fetchSuccess(<IntlMessages id="fetch.levels.update.success.message" values={{ code: data.data.message }} />),
          );
          //dispatch({ type: EDIT_LEVEL, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.levels.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.levels.error.message" values={{ code: error.message }} />));
      });
  };
};

/* export const updateRoleStatus = (data, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/roles/update-status', data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.user.update.statusSuccess.message" />));
          dispatch({ type: EDIT_USER, payload: response.data });
          if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
      });
  };
}; */

/* export const deleteBulkRoles = (roleIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/roles/bulk-delete', { roleIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess(<IntlMessages id="fetch.roles.delete.bulkSuccess.message" />));
          dispatch({ type: DELETE_BULK_ROLES, payload: userIds });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.roles.error.message" />));
      });
  };
}; */

export const deleteLevel = (levelCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/levels/delete?levelCode=${levelCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(
            fetchSuccess(<IntlMessages id="fetch.levels.delete.success.message" values={{ code: data.data.message }} />),
          );
          dispatch({ type: DELETE_LEVEL, payload: levelCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.levels.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.levels.error.message" values={{ code: error.message }} />));
      });
  };
};
