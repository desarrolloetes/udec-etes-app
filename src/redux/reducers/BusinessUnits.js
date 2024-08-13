import {
  ADD_BUSINESS_UNIT,
  DELETE_BULK_BUSINESS_UNITS,
  DELETE_BUSINESS_UNIT,
  EDIT_BUSINESS_UNIT,
  GET_BUSINESS_UNITS,
  SET_BUSINESS_UNIT_DETAILS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  businessUnits: [],
  currentBusinessUnit: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BUSINESS_UNITS: {
      return {
        ...state,
        businessUnits: action.payload,
      };
    }
    case SET_BUSINESS_UNIT_DETAILS: {
      return {
        ...state,
        currentBusinessUnit: action.payload,
      };
    }
    case ADD_BUSINESS_UNIT: {
      return {
        ...state,
        businessUnits: [action.payload, ...state.businessUnits],
      };
    }
    case EDIT_BUSINESS_UNIT: {
      return {
        ...state,
        businessUnits: state.businessUnits.map(businessUnit =>
          businessUnit.code === action.payload.code ? action.payload : businessUnit,
        ),
      };
    }
    case DELETE_BUSINESS_UNIT: {
      return {
        ...state,
        businessUnits: state.businessUnits.filter(businessUnit => businessUnit.code !== action.payload),
      };
    }
    case DELETE_BULK_BUSINESS_UNITS: {
      return {
        ...state,
        businessUnits: state.businessUnits.filter(businessUnit => !action.payload.includes(businessUnit.code)),
      };
    }

    default:
      return state;
  }
};
