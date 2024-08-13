import { GET_ALL_GAP_SOURCE_STANDARD } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  gapsSourceStandard: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_GAP_SOURCE_STANDARD: {
      return {
        ...state,
        gapsSourceStandard: action.payload,
      };
    }
    default:
      return state;
  }
};
