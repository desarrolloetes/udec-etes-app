import {
  ADD_ROLE,
  DELETE_BULK_USERS,
  DELETE_ROLE,
  EDIT_ROLE,
  GET_ROLES,
  SET_ROLE_DETAILS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  roles: [],
  currentRole: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROLES: {
      return {
        ...state,
        roles: action.payload,
      };
    }
    case SET_ROLE_DETAILS: {
      return {
        ...state,
        currentRole: action.payload,
      };
    }
    case ADD_ROLE: {
      return {
        ...state,
        roles: [action.payload, ...state.roles],
      };
    }
    case EDIT_ROLE: {
      return {
        ...state,
        roles: state.roles.map(role => (role.id === action.payload.id ? action.payload : role)),
      };
    }
    case DELETE_ROLE: {
      return {
        ...state,
        roles: state.roles.filter(role => role.id !== action.payload),
      };
    }
    case DELETE_BULK_USERS: {
      return {
        ...state,
        users: state.users.filter(user => !action.payload.includes(user.id)),
      };
    }

    default:
      return state;
  }
};
