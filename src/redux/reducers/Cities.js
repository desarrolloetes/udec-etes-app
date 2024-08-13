import {
  ADD_CITY,
  DELETE_CITY,
  GET_ALL_CITIES,
  SET_CURRENT_CITY,
  GET_ALL_CITY_BIBLIOGRAPHIC_CENTER,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  cities: [],
  currentCity: null,
  citiesBibliographicCenter: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_CITIES: {
      return {
        ...state,
        cities: action.payload,
      };
    }
    case SET_CURRENT_CITY: {
      return {
        ...state,
        currentCity: action.payload,
      };
    }
    case ADD_CITY: {
      return {
        ...state,
        cities: [action.payload, ...state.cities],
      };
    }
    case DELETE_CITY: {
      return {
        ...state,
        cities: state.cities.filter(city => city.code !== action.payload),
      };
    }
    case GET_ALL_CITY_BIBLIOGRAPHIC_CENTER: {
      return {
        ...state,
        citiesBibliographicCenter: action.payload,
      };
    }
    default:
      return state;
  }
};
