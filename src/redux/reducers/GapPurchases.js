import { GET_ALL_GAP_PURCHASES } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  gapPurchases: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_GAP_PURCHASES: {
      return {
        ...state,
        gapPurchases: action.payload,
      };
    }
    default:
      return state;
  }
};
