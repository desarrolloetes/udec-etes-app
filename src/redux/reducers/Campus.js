import { ADD_CAMPUS, DELETE_CAMPUS, GET_ALL_CAMPUS, SET_CURRENT_CAMPUS } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  campus: [],
  currentCampus: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_CAMPUS: {
      return {
        ...state,
        campus: action.payload,
      };
    }
    case SET_CURRENT_CAMPUS: {
      return {
        ...state,
        currentCampus: action.payload,
      };
    }
    case ADD_CAMPUS: {
      return {
        ...state,
        campus: [action.payload, ...state.campus],
      };
    }
    case DELETE_CAMPUS: {
      return {
        ...state,
        campus: state.campus.filter(campus => campus.campCode !== action.payload),
      };
    }
    default:
      return state;
  }
};
