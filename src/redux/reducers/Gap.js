import {
  GET_ALL_GAP_DEMAND_VS_STOCK,
  GET_ALL_GAP_STOCK_VS_DEMAND,
  GET_ALL_GAP_PERIODS_DDA,
  GET_ALL_GAP_PERIODS_STK,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  gapsDda: [],
  gapsStk: [],
  gapsPeriodsDda: [],
  gapsPeriodsStk: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_GAP_DEMAND_VS_STOCK: {
      return {
        ...state,
        gapsDda: action.payload,
      };
    }
    case GET_ALL_GAP_STOCK_VS_DEMAND: {
      return {
        ...state,
        gapsStk: action.payload,
      };
    }
    case GET_ALL_GAP_PERIODS_DDA: {
      return {
        ...state,
        gapsPeriodsDda: action.payload,
      };
    }

    case GET_ALL_GAP_PERIODS_STK: {
      return {
        ...state,
        gapsPeriodsStk: action.payload,
      };
    }
    default:
      return state;
  }
};
