import { GET_ORGANIZATIONS } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  organizations: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORGANIZATIONS: {
      return {
        ...state,
        organizations: action.payload,
      };
    }
    default:
      return state;
  }
};
