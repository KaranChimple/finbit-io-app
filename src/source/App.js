import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import UsersList from './screens/UsersList';
import WeatherData from './screens/weatherData';

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <WeatherData />
            </Provider>
        )
    }
}

export default App;
