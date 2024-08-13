import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';
import { setAuthUser, setForgetPassMailSent, updateLoadUser } from '../../../redux/actions/Auth';
import React from 'react';
import axios from './config';

const JWTAuth = {
  onRegister: ({ name, email, password }) => {
    return dispatch => {
      dispatch(fetchStart());
      axios
        .post('auth/register', {
          email: email,
          password: password,
          name: name,
        })
        .then(({ data }) => {
          if (data.result) {
            localStorage.setItem('token', data.token.access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token.access_token;
            dispatch(fetchSuccess());
            dispatch(JWTAuth.getAuthUser(true, data.token.access_token));
          } else {
            dispatch(fetchError(data.error));
          }
        })
        .catch(function(error) {
          dispatch(fetchError(error.message));
        });
    };
  },

  onLogin: ({ user, password, companyId, selectedBusinessUnit, selectedPurchaseArea }) => {
    return dispatch => {
      try {
        dispatch(fetchStart());
        axios
          .post('v1/auth', {
            username: user,
            password: password,
            userCompany: companyId,
            businessUnit: selectedBusinessUnit,
            purchaseArea: selectedPurchaseArea,
          })
          .then(({ data }) => {
            if (data.result) {
              localStorage.setItem('token', data.token.access_token);
              localStorage.setItem('userDomain', JSON.stringify({ selectedBusinessUnit, selectedPurchaseArea }));
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token.access_token;
              dispatch(fetchSuccess());
              dispatch(JWTAuth.getAuthUser(true, data.token.access_token, selectedBusinessUnit, selectedPurchaseArea));
            } else {
              dispatch(fetchError(data.error));
            }
          })
          .catch(function(error) {
            dispatch(fetchError(error.response.data.message));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },
  onLogout: () => {
    return dispatch => {
      dispatch(fetchStart());
      axios
        .post('v1/auth/logout')
        .then(({ data }) => {
          if (data.result) {
            dispatch(fetchSuccess());
            localStorage.removeItem('token');
            dispatch(setAuthUser([]));
          } else {
            dispatch(fetchError(data.error));
          }
        })
        .catch(function(error) {
          dispatch(fetchError(error.message));
        });
    };
  },

  getAuthUser: (loaded = false, token, selectedBusinessUnit, selectedPurchaseArea) => {
    return dispatch => {
      if (!token) {
        const token = localStorage.getItem('token') || '';
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      }
      let userDomain = {};
      if (!selectedBusinessUnit || !selectedPurchaseArea) userDomain = JSON.parse(localStorage.getItem('userDomain')) || {};
      else userDomain = { selectedBusinessUnit, selectedPurchaseArea };
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));
      axios
        .post('v1/auth/me')
        .then(({ data }) => {
          if (data.result) {
            dispatch(fetchSuccess());
            const user = {
              user: data.user,
              purchaseArea: userDomain.selectedPurchaseArea,
              businessUnit: userDomain.selectedBusinessUnit,
            };
            dispatch(setAuthUser(user));
          } else {
            dispatch(updateLoadUser(true));
          }
        })
        .catch(function(error) {
          dispatch(updateLoadUser(true));
        });
    };
  },

  onForgotPassword: () => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(setForgetPassMailSent(true));
        dispatch(fetchSuccess());
      }, 300);
    };
  },
  getSocialMediaIcons: () => {
    return <React.Fragment> </React.Fragment>;
  },
};

export default JWTAuth;
