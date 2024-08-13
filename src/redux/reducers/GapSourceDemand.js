import { GET_ALL_GAP_SOURCE_DEMAND, GET_ALL_GAP_SOURCE_DEMAND_PERIODS } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  gapsSourceDemand: [],
  gapsSourceDemandPeriods: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_GAP_SOURCE_DEMAND: {
      return {
        ...state,
        gapsSourceDemand: action.payload,
      };
    }
    case GET_ALL_GAP_SOURCE_DEMAND_PERIODS: {
      return {
        ...state,
        gapsSourceDemandPeriods: action.payload,
      };
    }
    default:
      return state;
  }
};
