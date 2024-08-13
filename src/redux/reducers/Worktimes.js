import { ADD_WORKTIME, DELETE_WORKTIME, GET_ALL_WORKTIMES, SET_CURRENT_WORKTIME } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  worktimes: [],
  currentWorktime: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_WORKTIMES: {
      return {
        ...state,
        worktimes: action.payload,
      };
    }
    case SET_CURRENT_WORKTIME: {
      return {
        ...state,
        currentWorktime: action.payload,
      };
    }
    case ADD_WORKTIME: {
      return {
        ...state,
        worktimes: [action.payload, ...state.worktimes],
      };
    }
    case DELETE_WORKTIME: {
      return {
        ...state,
        worktimes: state.worktimes.filter(worktime => worktime.wktCode !== action.payload),
      };
    }
    default:
      return state;
  }
};
