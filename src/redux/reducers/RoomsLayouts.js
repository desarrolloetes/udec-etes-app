import { GET_ROOMS_LAYOUTS } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  roomsLayouts: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROOMS_LAYOUTS: {
      return {
        ...state,
        roomsLayouts: action.payload,
      };
    }
    default:
      return state;
  }
};
