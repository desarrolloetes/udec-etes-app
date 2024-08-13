import axios from 'services/config';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import {
  DELETE_STANDARD_COURSE_ITEM,
  GET_STANDARD_COURSE,
  DELETE_STANDARD_BY_RELAY_COURSE,
  ADD_CURRENT_STANDARD_COURSE,
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
          dispatch({ type: GET_STANDARD_COURSE, payload: data.data.standardCourses[0].standard });
          dispatch(fetchSuccess(<IntlMessages id="fetch.standardCourse.get.success.message" />));
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

export const deleteStandardCourse = (standardCourseItem, indexCourse, itemId, callbackFun) => {
  return async dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete('v1/standardCourses/delete', {
        params: {
          stdcStdCode: standardCourseItem[0].stdcStdCode,
          stdcOrgCode: standardCourseItem[0].stdcOrgCode,
          stdcBuCode: standardCourseItem[0].stdcBuCode,
          stdcPurcCode: standardCourseItem[0].stdcPurcCode,
          stdcCoursCode: standardCourseItem[0].stdcCoursCode,
          stdcRlayCode: standardCourseItem[0].stdcRlayCode,
          stdcItemCode: standardCourseItem[0].stdcItemCode,
          stdcStdVersion: standardCourseItem[0].stdcStdVersion,
          stdcSchoCode: standardCourseItem[0].stdcSchoCode,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: DELETE_STANDARD_COURSE_ITEM, payload: { indexCourse, itemId } });
          dispatch(fetchSuccess(<IntlMessages id="fetch.standardCourseItem.delete.success.message" />));
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standardCourse.get.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standardCourse.get.error.message" />));
      });
  };
};

export const deleteByRlayCourse = (
  stdCode,
  stdOrgCode,
  stdBuCode,
  stdPurcCode,
  stdVersion,
  courseId,
  relayId,
  callbackFun,
) => {
  return async dispatch => {
    dispatch(fetchStart());
    const token = localStorage.getItem('token') || '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios
      .delete('v1/standardCourses/deleteByRlayCourse', {
        params: {
          stdcStdCode: stdCode,
          stdcOrgCode: stdOrgCode,
          stdcBuCode: stdBuCode,
          stdcPurcCode: stdPurcCode,
          stdcCoursCode: courseId,
          stdcRlayCode: relayId,
          stdcStdVersion: stdVersion,
        },
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: DELETE_STANDARD_BY_RELAY_COURSE, payload: { courseId } });
          dispatch(fetchSuccess(<IntlMessages id="fetch.standardCourse.delete.success.message" />));
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError(<IntlMessages id="fetch.standardCourse.get.error.message" />));
        }
      })
      .catch(error => {
        dispatch(fetchError(<IntlMessages id="fetch.standardCourse.get.error.message" />));
      });
  };
};

export const addNewCurrentStandarCourse = relay => {
  return dispatch => {
    dispatch({ type: ADD_CURRENT_STANDARD_COURSE, payload: relay });
  };
};
