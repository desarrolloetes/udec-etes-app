import {
  ADD_ITEM,
  DELETE_BULK_ITEMS,
  DELETE_ITEM,
  EDIT_ITEM,
  GET_ITEMS,
  GET_ALL_ITEMS,
  SET_ITEM_DETAILS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  items: [],
  currentItem: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case GET_ALL_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case SET_ITEM_DETAILS: {
      return {
        ...state,
        currentItem: action.payload,
      };
    }
    case ADD_ITEM: {
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    }
    case EDIT_ITEM: {
      return {
        ...state,
        items: state.items.map(item => (item.code === action.payload.code ? action.payload : item)),
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.code !== action.payload),
      };
    }
    case DELETE_BULK_ITEMS: {
      return {
        ...state,
        items: state.items.filter(item => !action.payload.includes(item.code)),
      };
    }
    default:
      return state;
  }
};
