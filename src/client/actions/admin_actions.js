import {
  BANNER_MESSAGE,
  CLEAR_BANNER_MESSAGE,
  CLEAR_MESSAGE,
} from './common_types';

export const ADMIN_USERS = 'ADMIN_USERS';
export const ADMIN_ERROR = 'ADMIN_ERROR';
export const ADMIN_SEND_EMAIL = 'ADMIN_SEND_EMAIL';
export const ADMIN_SEND_EMAIL_ERROR = 'ADMIN_SEND_EMAIL_ERROR';
export const ADMIN_STATUS_MESSAGE = 'ADMIN_STATUS_MESSAGE';
export const ADMIN_USER_SEARCH = 'ADMIN_USER_SEARCH';
export const GET_LOGS = 'GET_LOGS';
export const GET_LOGS_ERROR = 'GET_LOGS_ERROR';

import axios from 'axios';

export const getAllUsers = () => {
  return dispatch => {
    axios.get('/allusers')
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ADMIN_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: ADMIN_USERS,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: ADMIN_ERROR,
          payload: err.message
        });
      });
  };
};

export const sendEmail = (values) => {
  return dispatch => {
    axios.post('/sendadminemail', values)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ADMIN_SEND_EMAIL_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: ADMIN_SEND_EMAIL,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: ADMIN_SEND_EMAIL_ERROR,
          payload: err.message
        });
      });
  };
};

export const setBannerMessage = (message) => {
  return dispatch => {
    axios.post('/banner', { message })
      .then(response => {
        if (response.data.ok) {
          dispatch({
            type: BANNER_MESSAGE,
            payload: message
          });
        } else {
          dispatch({
            type: ADMIN_ERROR,
            payload: response.data
          });
        }
      })
      .catch(err => {
        dispatch({
          type: ADMIN_ERROR,
          payload: err.message
        });
      });
  };
};

export const clearBannerMessage = () => {
  return dispatch => {
    axios.post('/clearbanner')
      .then(response => {
        if (response.data.ok) {
          dispatch({
            type: CLEAR_BANNER_MESSAGE
          });
        } else {
          dispatch({
            type: ADMIN_ERROR,
            payload: response.data
          });
        }
      })
      .catch(err => {
        dispatch({
          type: ADMIN_ERROR,
          payload: err.message
        });
      });
  };
};

export const getBannerMessage = () => {
  return dispatch => {
    axios.get('/getbannermessage')
      .then(response => {
        dispatch({
          type: BANNER_MESSAGE,
          payload: response.data.ok
        });
      })
      .catch(err => {
        dispatch({
          type: ADMIN_ERROR,
          payload: err.message
        });
      });
  };
};

export const setAdminStatus = (userId) => {
  return dispatch => {
    axios.post('/setadminstatus', { userId })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ADMIN_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: ADMIN_STATUS_MESSAGE,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: ADMIN_ERROR,
          payload: err.message
        });
      });
  };
};

export const userSearch = (email) => {
  return dispatch => {
    axios.post('/usersearch', { email })
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: ADMIN_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: ADMIN_USER_SEARCH,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: ADMIN_ERROR,
          payload: err.message
        });
      });
  };
};

export const getLogs = () => {
  return dispatch => {
    axios.get('/getlogs')
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: GET_LOGS_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: GET_LOGS,
            payload: response.data.ok
          });
        }
      })
      .catch(err => {
        dispatch({
          type: GET_LOGS_ERROR,
          payload: err.message
        });
      });
  };
};


let INITIAL_STATE = {
  adminError: '',
  adminEmailSent: '',
  adminMessage: '',
  userFromSearch: '',
  logs: '',
  logsError: '',
  allUsers: ''
};

export const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADMIN_USERS:
      return { ...state, allUsers: action.payload };
    case ADMIN_ERROR:
      return { ...state, adminError: action.payload };
    case ADMIN_SEND_EMAIL:
      return { ...state, adminEmailSent: action.payload };
    case ADMIN_SEND_EMAIL_ERROR:
      return { ...state, adminError: action.payload };
    case ADMIN_STATUS_MESSAGE:
      return { ...state, adminMessage: action.payload };
    case ADMIN_USER_SEARCH:
      return { ...state, userFromSearch: action.payload };
    case GET_LOGS:
      return { ...state, logs: action.payload };
    case GET_LOGS_ERROR:
      return { ...state, logsError: action.payload };
    case CLEAR_MESSAGE:
      return {
        ...state,
        adminError: '',
        adminEmailSent: '',
        adminMessage: '',
        logsError: ''
      };
    default:
      return state;
  }
};
