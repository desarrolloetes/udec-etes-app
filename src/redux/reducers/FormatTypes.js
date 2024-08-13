import {
  ADD_FORMAT_TYPE,
  DELETE_FORMAT_TYPE,
  GET_ALL_FORMAT_TYPES,
  SET_CURRENT_FORMAT_TYPE,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  formatTypes: [],
  setCurrentFormatType: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_FORMAT_TYPES: {
      return {
        ...state,
        formatTypes: action.payload,
      };
    }
    case SET_CURRENT_FORMAT_TYPE: {
      return {
        ...state,
        setCurrentFormatType: action.payload,
      };
    }
    case ADD_FORMAT_TYPE: {
      return {
        ...state,
        formatTypes: [action.payload, ...state.formatTypes],
      };
    }
    case DELETE_FORMAT_TYPE: {
      return {
        ...state,
        formatTypes: state.formatTypes.filter(formatType => formatType.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
