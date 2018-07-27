import {
  AUTH_USER,
  AUTH_ADMIN,
  CLEAR_MESSAGE
} from './common_types';

export const PASSWORD_RESET = 'PASSWORD_RESET';
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';
export const UPDATE_PASS = 'UPDATE_PASS';
export const UPDATE_PASS_ERROR = 'UPDATE_PASS_ERROR';
export const UPDATE_EMAIL_ERROR = 'UPDATE_EMAIL_ERROR';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_EMAIL_ERROR = 'GET_EMAIL_ERROR';
export const BANNER_READ = 'BANNER_READ';
export const SHOW_ELEMENT = 'SHOW_ELEMENT';

import axios from 'axios';

export const resetPasswordRequest = ({ email }) => {
  return dispatch => {
    axios.post('/sendpasswordreset', { email })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: PASSWORD_RESET_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: PASSWORD_RESET,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: PASSWORD_RESET_ERROR,
          payload: err.message
        });
      });
  };
};

export const resetPassword = ({ password, token, id }) => {
  return dispatch => {
    axios.post('/resetpasswordrequest', { password, token, id })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: PASSWORD_RESET_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: PASSWORD_RESET,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: PASSWORD_RESET_ERROR,
          payload: err.message
        });
      });
  };
};

export const getEmail = (id) => {
  return dispatch => {
    axios.post('/getemail', { id })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: GET_EMAIL_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: GET_EMAIL,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: GET_EMAIL_ERROR,
          payload: err.message
        });
      });
  };
};

export const updateEmail = (email, id) => {
  return dispatch => {
    axios.post('/updateemail', { email, id })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: UPDATE_EMAIL_ERROR,
            payload: response.data.error
          });
        } else {
          /* re-auth the user with the new email */
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
        }
      })
      .catch(err => {
        dispatch({
          type: UPDATE_EMAIL_ERROR,
          payload: err.message
        });
      });
  };
};

export const changePassword = (password, id) => {
  return dispatch => {
    axios.post('/changepassword', { password, id })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: UPDATE_PASS_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: UPDATE_PASS,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: UPDATE_PASS_ERROR,
          payload: err.message
        });
      });
  };
};

/* only used when new user decides to start over with initial questions  */
export const deleteUser = (id) => {
  return dispatch => {
    axios.post('/deleteuser', { id })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: DELETE_USER_ERROR,
            payload: response.data.error
          });
        }
      })
      .catch(err => {
        dispatch({
          type: DELETE_USER_ERROR,
          payload: err.message
        });
      });
  };
};


const INITIAL_STATE = {
  passReset: '',
  passResetError: '',
  updateEmailError: '',
  email: '',
  emailError: '',
  updatePass: '',
  updatePassError: '',
  bannerRead: false,
  elementType: '',
  deleteUserError: ''
};

export const userActionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PASSWORD_RESET:
      return { ...state, passReset: action.payload, passResetError: '' };
    case PASSWORD_RESET_ERROR:
      return { ...state, passResetError: action.payload };
    case DELETE_USER_ERROR:
      return { ...state, deleteUserError: action.payload };
    case UPDATE_PASS:
      return { ...state, updatePass: action.payload };
    case UPDATE_PASS_ERROR:
      return { ...state, updatePassError: action.payload };
    case UPDATE_EMAIL_ERROR:
      return { ...state, updateEmailError: action.payload };
    case GET_EMAIL:
      return { ...state, email: action.payload };
    case GET_EMAIL_ERROR:
      return { ...state, emailError: action.payload };
    case BANNER_READ:
      return { ...state, bannerRead: true };
    case SHOW_ELEMENT:
      return { ...state, elementType: action.payload };
    case CLEAR_MESSAGE:
      return {
        ...state,
        deleteUserError: '',
        updateEmailError: '',
        emailError: '',
        updatePass: '',
        updatePassError: '',
        passResetError: '',
        passReset: ''
      };
    default:
      return state;
  }
};
