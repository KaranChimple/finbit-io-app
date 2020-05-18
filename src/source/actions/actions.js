import { 
    LOAD_USERS_SUCCESS, 
    WEATHERDATA_LOADING, 
    WEATHERDATA_SUCCESS, 
    WEATHERDATA_FAILURE 
} from './actionTypes';
import axios from 'axios';

const baseUrl = 'https://api.github.com/search/users?q=location%3A';
const weatherDataBaseUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=';
const appIdDetails = '&appid=ff5d084541aac5b27ef0f46c449da8ca';

const loadUsersSuccess = (users) => {
    return {
        type: LOAD_USERS_SUCCESS,
        users
    };
}

export const weatherDataLoading = (bool) => {
    return {
        type: WEATHERDATA_LOADING,
        bool,
    };
};

export const weatherDataSuccess = (data) => {
    return {
        type: WEATHERDATA_SUCCESS,
        payload: data,
    };
};

export const weatherDataFailure = (error) => {
    return {
        type: WEATHERDATA_FAILURE,
        error,
    };
};

export const loadUsers = (cityName) => async dispatch => {
    const response = await axios.get(`${baseUrl}${cityName}`);
    dispatch(loadUsersSuccess(response.data.items))
}

export const getWeatherData = (cityId = '1283240') => async dispatch => {
    dispatch(weatherDataLoading(true));
    try {
        const resp = await axios.get(`${weatherDataBaseUrl}${cityId}${appIdDetails}`);
        dispatch(weatherDataSuccess(resp.data));
    } catch(error) {
        dispatch(weatherDataFailure(error));
    }
}