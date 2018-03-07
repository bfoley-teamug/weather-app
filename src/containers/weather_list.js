import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/charts';
import GoogleMaps from '../components/google_maps';


class WeatherList extends Component {
  renderWeather(cityData) {
    const cityName = cityData.city.name;
    const cityTemps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273);
    const cityPressures = cityData.list.map(weather => weather.main.pressure);
    const cityHumidities = cityData.list.map(weather => weather.main.humidity);
    const lon = cityData.city.coord.lon;
    const lat = cityData.city.coord.lat;

    return(
      <tr key={cityName}>
        <td><GoogleMaps lon={lon} lat={lat} /></td>
        <td><Chart data={cityTemps} color="orange" units="C" /></td>
        <td><Chart data={cityPressures} color="green" units="hPA" /></td>
        <td><Chart data={cityHumidities} color="blue" units="%" /></td>
      </tr>
    )
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temp (C)</th>
            <th>Pressure (hPA)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}


function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
