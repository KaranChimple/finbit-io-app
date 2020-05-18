import {
  WEATHERDATA_LOADING, 
  WEATHERDATA_SUCCESS, 
  WEATHERDATA_FAILURE,
} from '../actions/actionTypes';
import initialState from './initialState';

export default function weatherDataReducer(state = initialState.weatherData, action) {
    switch (action.type) {
        case WEATHERDATA_LOADING: {
            return {
              ...state,
              isLoading: true,
            };
        }
        case WEATHERDATA_SUCCESS: {
          return {
            ...state,
            isLoading: false,
            data: action.payload,
            error: null,
          };
        }
        case WEATHERDATA_FAILURE: {
          return {
            ...state,
            isLoading: false,
            error: action.error,
          }
        }
        default:
            return state;
    }
}