import { GET_PROGRAMS } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  programs: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROGRAMS: {
      return {
        ...state,
        programs: action.payload,
      };
    }
    default:
      return state;
  }
};
