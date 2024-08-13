import { GET_STANDARD_APPLIED_TO_MAJOR } from '@jumbo/constants/ActionTypes';
import { GET_STANDARD_APPLIED_TO_ROOM_LAYOUT } from '@jumbo/constants/ActionTypes';
import { GET_STANDARD_EQUIPMENT_BY_MAJOR } from '@jumbo/constants/ActionTypes';
import { GET_STANDARD_BOOK_COVERAGE } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  standardAppliedToMajor: [],
  standardAppliedToRoomLayout: [],
  standardsEquipmentByMajor: [],
  booksCoverage: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STANDARD_APPLIED_TO_MAJOR: {
      return {
        ...state,
        standardAppliedToMajor: action.payload,
      };
    }
    case GET_STANDARD_APPLIED_TO_ROOM_LAYOUT: {
      return {
        ...state,
        standardAppliedToRoomLayout: action.payload,
      };
    }
    case GET_STANDARD_EQUIPMENT_BY_MAJOR: {
      return {
        ...state,
        standardsEquipmentByMajor: action.payload,
      };
    }
    case GET_STANDARD_BOOK_COVERAGE: {
      return {
        ...state,
        booksCoverage: action.payload,
      };
    }
    default:
      return state;
  }
};
