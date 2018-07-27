import {
  BANNER_MESSAGE,
  CLEAR_BANNER_MESSAGE
} from './common_types';


const INITIAL_STATE = {
  bannerMessage: ''
};

export const requiredData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BANNER_MESSAGE:
      return { ...state, bannerMessage: action.payload };
    case CLEAR_BANNER_MESSAGE:
      return { ...state, bannerMessage: '' };
    default:
      return state;
  }
};
