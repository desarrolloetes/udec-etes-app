import {
  ADD_SCHOOL,
  DELETE_BULK_SCHOOLS,
  DELETE_SCHOOL,
  EDIT_SCHOOL,
  GET_SCHOOLS,
  SET_SCHOOL_DETAILS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  schools: [],
  currentSchool: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SCHOOLS: {
      return {
        ...state,
        schools: action.payload,
      };
    }
    case SET_SCHOOL_DETAILS: {
      return {
        ...state,
        currentSchool: action.payload,
      };
    }
    case ADD_SCHOOL: {
      return {
        ...state,
        schools: [action.payload, ...state.schools],
      };
    }
    case EDIT_SCHOOL: {
      return {
        ...state,
        schools: state.schools.map(school => (school.code === action.payload.code ? action.payload : school)),
      };
    }
    case DELETE_SCHOOL: {
      return {
        ...state,
        schools: state.schools.filter(school => school.code !== action.payload),
      };
    }
    case DELETE_BULK_SCHOOLS: {
      return {
        ...state,
        schools: state.schools.filter(school => !action.payload.includes(school.code)),
      };
    }

    default:
      return state;
  }
};
