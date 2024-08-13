import {
  ADD_PURCHASE_AREA,
  DELETE_PURCHASE_AREA,
  EDIT_PURCHASE_AREA,
  GET_PURCHASE_AREAS,
  SET_PURCHASE_AREA_DETAILS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  purchaseAreas: [],
  currentPurchaseArea: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PURCHASE_AREAS: {
      return {
        ...state,
        purchaseAreas: action.payload,
      };
    }
    case SET_PURCHASE_AREA_DETAILS: {
      return {
        ...state,
        currentPurchaseArea: action.payload,
      };
    }
    case ADD_PURCHASE_AREA: {
      return {
        ...state,
        purchaseAreas: [action.payload, ...state.purchaseAreas],
      };
    }
    case EDIT_PURCHASE_AREA: {
      return {
        ...state,
        purchaseAreas: state.purchaseAreas.map(purchaseArea =>
          purchaseArea.purcCode === action.payload.purcCode ? action.payload : purchaseArea,
        ),
      };
    }
    case DELETE_PURCHASE_AREA: {
      return {
        ...state,
        purchaseAreas: state.purchaseAreas.filter(purchaseArea => purchaseArea.purcCode !== action.payload),
      };
    }
    default:
      return state;
  }
};
