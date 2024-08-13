import {
  ADD_COURSE,
  DELETE_BULK_COURSES,
  DELETE_COURSE,
  EDIT_COURSE,
  GET_COURSES,
  SET_COURSE_DETAILS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  courses: [],
  currentCourse: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COURSES: {
      return {
        ...state,
        courses: action.payload,
      };
    }
    case SET_COURSE_DETAILS: {
      return {
        ...state,
        currentCourse: action.payload,
      };
    }
    case ADD_COURSE: {
      return {
        ...state,
        courses: [action.payload, ...state.courses],
      };
    }
    case EDIT_COURSE: {
      return {
        ...state,
        courses: state.courses.map(course => (course.code === action.payload.code ? action.payload : course)),
      };
    }
    case DELETE_COURSE: {
      return {
        ...state,
        courses: state.courses.filter(course => course.code !== action.payload),
      };
    }
    case DELETE_BULK_COURSES: {
      return {
        ...state,
        courses: state.courses.filter(course => !action.payload.includes(course.code)),
      };
    }

    default:
      return state;
  }
};
