import { ADD_ACTIVITY, DELETE_ACTIVITY, GET_ALL_ACTIVITIES, SET_CURRENT_ACTIVITY } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  activities: [],
  currentActivity: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_ACTIVITIES: {
      return {
        ...state,
        activities: action.payload,
      };
    }
    case SET_CURRENT_ACTIVITY: {
      return {
        ...state,
        currentActivity: action.payload,
      };
    }
    case ADD_ACTIVITY: {
      return {
        ...state,
        activities: [action.payload, ...state.activities],
      };
    }
    case DELETE_ACTIVITY: {
      return {
        ...state,
        activities: state.activities.filter(activity => activity.actCode !== action.payload),
      };
    }
    default:
      return state;
  }
};
