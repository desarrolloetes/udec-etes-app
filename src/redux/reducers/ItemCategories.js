import {
  ADD_ITEM_CATEGORY,
  DELETE_BULK_ITEM_CATEGORIES,
  DELETE_ITEM_CATEGORY,
  EDIT_ITEM_CATEGORY,
  GET_ITEM_CATEGORIES,
  GET_ALL_ITEM_CATEGORIES,
  GET_ALL_ITEM_SUB_CATEGORIES,
  SET_ITEM_CATEGORY_DETAILS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  itemCategories: [],
  itemSubCategories: [],
  currentItemCategory: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ITEM_CATEGORIES: {
      return {
        ...state,
        itemCategories: action.payload,
      };
    }
    case GET_ALL_ITEM_CATEGORIES: {
      return {
        ...state,
        itemCategories: action.payload,
      };
    }
    case GET_ALL_ITEM_SUB_CATEGORIES: {
      return {
        ...state,
        itemSubCategories: action.payload,
      };
    }
    case SET_ITEM_CATEGORY_DETAILS: {
      return {
        ...state,
        currentItemCategory: action.payload,
      };
    }
    case ADD_ITEM_CATEGORY: {
      return {
        ...state,
        itemCategories: [action.payload, ...state.itemCategories],
      };
    }
    case EDIT_ITEM_CATEGORY: {
      return {
        ...state,
        itemCategories: state.itemCategories.map(itemCategory =>
          itemCategory.code === action.payload.code ? action.payload : itemCategory,
        ),
      };
    }
    case DELETE_ITEM_CATEGORY: {
      return {
        ...state,
        itemCategories: state.itemCategories.filter(itemCategory => itemCategory.code !== action.payload),
      };
    }
    case DELETE_BULK_ITEM_CATEGORIES: {
      return {
        ...state,
        itemCategories: state.itemCategories.filter(itemCategory => !action.payload.includes(itemCategory.code)),
      };
    }
    default:
      return state;
  }
};
