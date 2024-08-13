import {
  ADD_VOLUME_TYPE,
  DELETE_VOLUME_TYPE,
  GET_ALL_VOLUME_TYPES,
  SET_CURRENT_VOLUME_TYPE,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  volumeTypes: [],
  currentVolumeType: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_VOLUME_TYPES: {
      return {
        ...state,
        volumeTypes: action.payload,
      };
    }
    case SET_CURRENT_VOLUME_TYPE: {
      return {
        ...state,
        currentVolumeType: action.payload,
      };
    }
    case ADD_VOLUME_TYPE: {
      return {
        ...state,
        volumeTypes: [action.payload, ...state.volumeTypes],
      };
    }
    case DELETE_VOLUME_TYPE: {
      return {
        ...state,
        volumeTypes: state.volumeTypes.filter(volumeType => volumeType.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
