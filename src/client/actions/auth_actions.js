import {
  AUTH_USER,
  AUTH_ADMIN,
  CLEAR_USER,
  CLEAR_MESSAGE,
} from './common_types';

import { SHOW_ELEMENT } from './user_actions';

export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UNAUTH_ADMIN = 'UNAUTH_ADMIN';
export const SHOW_AUTH_FOR_ACCOUNT = 'SHOW_AUTH_FOR_ACCOUNT';
export const SHOW_AUTH_FOR_ACCOUNT_ERROR = 'SHOW_AUTH_FOR_ACCOUNT_ERROR';

import axios from 'axios';

export const signUpUser = (values, id) => {
  return dispatch => {
    axios.post('/signup', { values, id })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: AUTH_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: AUTH_USER,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: err.message
        });
      });
  };
};

export const signInUser = ({ email, password }) => {
  return dispatch => {
    axios.post('/signin', { email, password })
      .then(response => {
        if (response.data.ok) {
          if (response.data.ok.isAdmin) {
            dispatch({
              type: AUTH_ADMIN,
              payload: response.data.ok
            });
          } else {
            dispatch({
              type: AUTH_USER,
              payload: response.data.ok
            });
          }
        } else {
          dispatch({
            type: AUTH_ERROR,
            payload: response.data.error
          });
        }
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: err.message
        });
      });
  };
};

export const signOutUser = () => {
  return dispatch => {
    dispatch({ type: UNAUTH_USER });
    dispatch({ type: UNAUTH_ADMIN });
    dispatch({ type: CLEAR_MESSAGE });
  };
};

/* ADMIN SIGN IN AS */
export const signInAs = (email) => {
  return dispatch => {
    axios.post('/adminsigninas', { email })
      .then(response => {
        if (response.data.ok) {
          dispatch({
            type: AUTH_USER,
            payload: response.data.ok
          });
        } else {
          dispatch({
            type: AUTH_ERROR,
            payload: response.data.error
          });
        }
      });
  };
};

export const checkPassword = (id, password) => {
  return dispatch => {
    axios.post('/checkpassword', { id, password })
      .then(response => {
        if (response.data.ok) {
          dispatch({
            type: SHOW_AUTH_FOR_ACCOUNT,
            showAFA: false
          });
          dispatch({
            type: SHOW_ELEMENT,
            payload: 'account'
          });
        } else {
          dispatch({
            type: SHOW_AUTH_FOR_ACCOUNT_ERROR,
            payload: response.data.error,
            showAFA: false
          });
        }
      });
  };
};


const INITIAL_STATE = {
  user: '',
  error: '',
  authenticated: false,
  adminUser: '',
  confirmEmail: ''
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        error: '', /* clear any auth error that wasn't done manually */
        confirmEmail: action.payload.confirmEmail
      };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: '', error: '' };
    case CLEAR_USER:
      return { ...state, user: '' };
    case AUTH_ADMIN:
      return {
        ...state,
        authenticated: true,
        adminUser: action.payload,
        error: '', /* clear any auth error that wasn't done manually */
        confirmEmail: action.payload.confirmEmail
      };
    case UNAUTH_ADMIN:
      return { ...state, authenticated: false, adminUser: '' };
    case SHOW_AUTH_FOR_ACCOUNT:
      return { ...state, showAFA: action.showAFA };
    case SHOW_AUTH_FOR_ACCOUNT_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_MESSAGE:
      return { ...state, error: '', confirmEmail: '' };
    default:
      return state;
  }
};
