import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import { getWeatherData } from '../actions/actions';
import Loader from 'react-loader-spinner';
import _, { isEmpty, debounce } from 'lodash';
import { MdArrowDropDown } from 'react-icons/md';
import CustomizedTables from './customTable';

// const cityList = require('../jsonData/city.list.json');
// let shortenedList = [];

class WeatherData extends Component {
	constructor() {
		super();
		this.state = {
			cityList: require('../jsonData/city.list.json'),
			listToBeShown: [],
			cityName: '',
			isLoading: false,
			limit: 50,
			start: 0,
			selectedCity: {},
			shouldListBeVisible: false,
			shortenedList: [],
			shortenedListToBeShown: [],
		};
		this.getDataMatchingCityName = debounce(this.getDataMatchingCityName, 300)
	}

	componentDidMount() {
		// Loads some users on initial load
		this.nextValues();
		this.props.getWeatherData();
	}

	nextValues = () => {
		const { start, limit, cityList, cityName, shortenedList } = this.state;
		if (isEmpty(cityName))
			this.setState({ isLoading: true }, () => {
				this.setState({ listToBeShown: cityList.splice(start, limit) }, () => {
					this.setState({ isLoading: false, limit: limit + 50 });
				});
			});
		else
			this.setState({ isLoading: true }, () => {
				this.setState({ shortenedListToBeShown: shortenedList.splice(start, limit) }, () => {
					this.setState({ isLoading: false, limit: limit + 50 });
				});
			});
	}

	handleChange = (event) => {
		this.setState({
			cityName: event.target.value,
			shouldListBeVisible: true,
		});
		this.getDataMatchingCityName();
	}

	handleCityNameSelect = (item) => {
		const { selectedCity } = this.state;
		const textToBeAssigned = `${item.name}${isEmpty(item.state) ? '' : `, ${item.state}`}, ${item.country}`;
		this.setState({
			cityName: textToBeAssigned,
			selectedCity: item,
			shouldListBeVisible: false
		}, () => {
			// shortenedList = [];
			if (!isEmpty(selectedCity))
				this.props.getWeatherData(selectedCity.id);
		});
	}

	getDataMatchingCityName = () => {
		const { cityList, shortenedList, cityName } = this.state;
		console.log('cityName', cityName, shortenedList, cityList);
		if (!isEmpty(cityName) || cityName.length > 2)
			this.setState({ shortenedList: cityList.filter(d => d.name.includes(cityName)) }, () => {
				this.setState({shortenedListToBeShown: shortenedList.splice(0, 50)});
			});
		else
			this.setState({ shortenedList: [] });
		console.log('shortenedList: ', shortenedList);
	}

	handleSubmit = (event) => {
		const { selectedCity } = this.state;
		console.log('handleSubmit called')
		event.preventDefault();
		if (!isEmpty(selectedCity))
			this.props.getWeatherData(selectedCity.id);
		this.setState({
			selectedCity: {},
		});
	}

	getActualTimeInMs = (time) => {
		return time + 1589724910374;
	}

	render() {
		const { cityName, listToBeShown, shouldListBeVisible, loading, selectedCity, shortenedList, shortenedListToBeShown } = this.state;
		const { weatherData } = this.props;
		console.log('shortenedList', shortenedList, listToBeShown);
		return (
			<div className="App">
				<form className="App-header-top-aligned" >
					<label>
						Enter City Name:
				<input type="text" value={cityName} onChange={this.handleChange} style={{ marginLeft: 10 }} />
						{shouldListBeVisible && <div style={styles.whiteBackground} className="search-list-container">
							{(!isEmpty(shortenedListToBeShown) ? shortenedListToBeShown : listToBeShown).map((item, index) => (
								<div key={index} onClick={() => this.handleCityNameSelect(item)}>
									<p>{`${item.name}${isEmpty(item.state) ? '' : `,${item.state}`},${item.country}`}</p>
								</div>
							))}
							{(!isEmpty(shortenedListToBeShown) ? shortenedListToBeShown : listToBeShown).length >= 50 && !loading && <div onClick={this.nextValues}>Next</div>}
							{(!isEmpty(shortenedListToBeShown) ? shortenedListToBeShown : listToBeShown).length >= 50 && loading && <div
								style={styles.loaderStyle}
							>
								<Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
							</div>}
						</div>}
					</label>
					<div onClick={() => this.setState({ shouldListBeVisible: !shouldListBeVisible })}>
						<MdArrowDropDown size={36} />
					</div>
					<input type="button" value="Submit" style={styles.submitButtonMargins} onClick={this.handleSubmit} />
				</form>
				{!isEmpty(weatherData) && <div className="city-element-text">
					<label>City name: {weatherData.city.name}</label>
					<br />
					<label>City Country: {weatherData.city.country}</label>
					<br />
					<label>Sunrise Time: {new Date(this.getActualTimeInMs(weatherData.city.sunrise)).toUTCString()}</label>
					<br />
					<label>Sunset Time: {new Date(this.getActualTimeInMs(weatherData.city.sunset)).toUTCString()}</label>
					<br />
				</div>}
				{!isEmpty(weatherData) && <CustomizedTables list={weatherData.list} />}
			</div>
		)
	}

}

const styles = {
	loaderStyle: {
		width: "100%",
		height: "100",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: '#282c34'
	},
	whiteBackground: { backgroundColor: 'white' },
	submitButtonMargins: { marginLeft: 10, marginTop: 10, },
}

const mapStateToProps = (state) => ({
	weatherData: state.weatherData.data,
})

export default connect(mapStateToProps, { getWeatherData })(WeatherData);