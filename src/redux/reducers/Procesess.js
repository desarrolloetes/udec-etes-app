import {
  ADD_PROCESS,
  DELETE_PROCESS,
  GET_PROCESESS,
  SET_CURRENT_PROCESS,
  GET_PROCESESS_STOCK,
  GET_PROCESESS_DEMAND,
  GET_PROCESESS_STANDARD,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  procesess: [],
  procesess_stock: [],
  procesess_demand: [],
  procesess_standard: [],
  currentProcess: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROCESESS: {
      return {
        ...state,
        procesess: action.payload,
      };
    }
    case SET_CURRENT_PROCESS: {
      return {
        ...state,
        currentProcess: action.payload,
      };
    }
    case ADD_PROCESS: {
      return {
        ...state,
        procesess: [action.payload, ...state.procesess],
      };
    }
    case DELETE_PROCESS: {
      return {
        ...state,
        procesess: state.procesess.filter(procese => process.code !== action.payload),
      };
    }

    case GET_PROCESESS_STOCK: {
      return {
        ...state,
        procesess_stock: action.payload,
      };
    }

    case GET_PROCESESS_DEMAND: {
      return {
        ...state,
        procesess_demand: action.payload,
      };
    }

    case GET_PROCESESS_STANDARD: {
      return {
        ...state,
        procesess_standard: action.payload,
      };
    }
    default:
      return state;
  }
};
