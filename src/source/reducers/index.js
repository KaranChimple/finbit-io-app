import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import weatherDataReducer from './weatherDataReducer';
// import user from './userReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    weatherData: weatherDataReducer,
});

export default rootReducer;