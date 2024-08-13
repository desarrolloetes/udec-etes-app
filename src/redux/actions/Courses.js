import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/config';
import {
  ADD_COURSE,
  //DELETE_BULK_COURSES,
  DELETE_COURSE,
  EDIT_COURSE,
  GET_COURSES,
  SET_COURSE_DETAILS,
} from '@jumbo/constants/ActionTypes';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';

export const getAllCourses = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/courses/getAll', { params: { filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_COURSES,
            payload: data.data.courses,
          });
          if (callbackFun) callbackFun(data.data.courses);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.courses.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.courses.error.message" values={{ code: error.message }} />));
      });
  };
};

export const getAllCoursesByOrgCodeAndSchoCode = (orgCode, schoCode, filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .get('v1/courses/getAllByOrgAndScholl', { params: { orgCode, schoCode, filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: GET_COURSES,
            payload: data.data.courses,
          });
          if (callbackFun) callbackFun(data.data.courses);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.courses.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.courses.error.message" values={{ code: error.message }} />));
      });
  };
};

export const setCurrentCourse = course => {
  return dispatch => {
    dispatch({ type: SET_COURSE_DETAILS, payload: course });
  };
};

export const addNewCourse = (course, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .post('v1/courses/create', course)
      .then(data => {
        if (data.status === 201) {
          dispatch(
            fetchSuccess(<IntlMessages id="fetch.courses.add.success.message" values={{ code: data.data.message }} />),
          );
          //dispatch({ type: GET_COURSES, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          //console.log('status no es 200');
          dispatch(fetchError(<IntlMessages id="fetch.courses.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        //console.log('catch error en la llamada');
        dispatch(fetchError(<IntlMessages id="fetch.courses.error.message" values={{ code: error.message }} />));
      });
  };
};

/* export const sentMailToUser = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to user successfully'));
  };
}; */

export const updateCourse = (coursCode, course, callbackFun) => {
  //console.log(buCode);
  //console.log(businessUnit);
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .patch(`v1/courses/update?coursCode=${coursCode}`, course)
      .then(data => {
        if (data.status === 200) {
          dispatch(
            fetchSuccess(<IntlMessages id="fetch.courses.update.success.message" values={{ code: data.data.message }} />),
          );
          //dispatch({ type: EDIT_COURSE, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.courses.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.courses.error.message" values={{ code: error.message }} />));
      });
  };
};

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

export const deleteCourse = (coursCode, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete(`v1/courses/delete?coursCode=${coursCode}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(
            fetchSuccess(<IntlMessages id="fetch.courses.delete.success.message" values={{ code: data.data.message }} />),
          );
          dispatch({ type: DELETE_COURSE, payload: coursCode });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.courses.error.message" values={{ code: data.data.message }} />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.courses.error.message" values={{ code: error.message }} />));
      });
  };
};
