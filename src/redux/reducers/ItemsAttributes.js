import {
  ADD_ITEM_ATTRIBUTE,
  DELETE_BULK_ITEM_ATTRIBUTES,
  DELETE_ITEM_ATTRIBUTE,
  EDIT_ITEM_ATTRIBUTE,
  GET_ITEM_ATTRIBUTES,
  GET_ALL_ITEM_ATTRIBUTES,
  SET_ITEM_ATTRIBUTE_DETAILS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  itemAttributes: [],
  currentItemAttribute: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ITEM_ATTRIBUTES: {
      return {
        ...state,
        itemAttributes: action.payload,
      };
    }
    case GET_ALL_ITEM_ATTRIBUTES: {
      return {
        ...state,
        itemAttributes: action.payload,
      };
    }
    case SET_ITEM_ATTRIBUTE_DETAILS: {
      return {
        ...state,
        currentItemAttribute: action.payload,
      };
    }
    case ADD_ITEM_ATTRIBUTE: {
      return {
        ...state,
        itemAttributes: [action.payload, ...state.itemAttributes],
      };
    }
    case EDIT_ITEM_ATTRIBUTE: {
      return {
        ...state,
        itemAttributes: state.itemAttributes.map(itemAttribute =>
          itemAttribute.code === action.payload.code ? action.payload : itemAttribute,
        ),
      };
    }
    case DELETE_ITEM_ATTRIBUTE: {
      return {
        ...state,
        itemAttributes: state.itemAttributes.filter(itemAttribute => itemAttribute.code !== action.payload),
      };
    }
    case DELETE_BULK_ITEM_ATTRIBUTES: {
      return {
        ...state,
        itemAttributes: state.itemAttributes.filter(itemAttribute => !action.payload.includes(itemAttribute.code)),
      };
    }
    default:
      return state;
  }
};
