import { GET_ALL_GAP_SOURCE_STOCK } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  gapsSourceStock: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_GAP_SOURCE_STOCK: {
      return {
        ...state,
        gapsSourceStock: action.payload,
      };
    }
    default:
      return state;
  }
};
