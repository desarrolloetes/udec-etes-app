import {
  ADD_LEVEL,
  DELETE_BULK_LEVELS,
  DELETE_LEVEL,
  EDIT_LEVEL,
  GET_LEVELS,
  SET_LEVEL_DETAILS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  levels: [],
  currentLevels: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEVELS: {
      return {
        ...state,
        levels: action.payload,
      };
    }
    case SET_LEVEL_DETAILS: {
      return {
        ...state,
        currentLevels: action.payload,
      };
    }
    case ADD_LEVEL: {
      return {
        ...state,
        levels: [action.payload, ...state.levels],
      };
    }
    case EDIT_LEVEL: {
      return {
        ...state,
        levels: state.levels.map(level => (level.code === action.payload.code ? action.payload : level)),
      };
    }
    case DELETE_LEVEL: {
      return {
        ...state,
        levels: state.levels.filter(level => level.code !== action.payload),
      };
    }
    case DELETE_BULK_LEVELS: {
      return {
        ...state,
        levels: state.levels.filter(level => !action.payload.includes(level.code)),
      };
    }

    default:
      return state;
  }
};
