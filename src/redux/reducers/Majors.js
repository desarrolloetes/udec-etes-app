import {
  ADD_MAJOR,
  DELETE_BULK_MAJORS,
  DELETE_MAJOR,
  EDIT_MAJOR,
  GET_MAJORS,
  GET_ALL_MAJORS,
  SET_MAJOR_DETAILS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  majors: [],
  currentMajor: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MAJORS: {
      return {
        ...state,
        majors: action.payload,
      };
    }
    case GET_ALL_MAJORS: {
      return {
        ...state,
        majors: action.payload,
      };
    }
    case SET_MAJOR_DETAILS: {
      return {
        ...state,
        currentMajor: action.payload,
      };
    }
    case ADD_MAJOR: {
      return {
        ...state,
        majors: [action.payload, ...state.majors],
      };
    }
    case EDIT_MAJOR: {
      return {
        ...state,
        majors: state.majors.map(major => (major.code === action.payload.code ? action.payload : major)),
      };
    }
    case DELETE_MAJOR: {
      return {
        ...state,
        majors: state.majors.filter(major => major.code !== action.payload),
      };
    }
    case DELETE_BULK_MAJORS: {
      return {
        ...state,
        majors: state.majors.filter(major => !action.payload.includes(major.code)),
      };
    }
    default:
      return state;
  }
};
