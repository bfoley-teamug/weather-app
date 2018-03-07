import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { term: '' };

    //to define setState in the callback function below
    this.onInputChange = this.onInputChange.bind(this);
    //
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    //fetch that weather data
    this.props.fetchWeather(this.state.term);
    this.setState({ term: '' });
  }

//input-group is bootstrap
  render() {
    return (
      <form onSubmit={ this.onFormSubmit } className="input-group">
        <input
          placeholder="Get a 5-day forecast in any city"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Search</button>
        </span>
      </form>

    );
  }
}

//connect the search bar container to fetchWeather
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchWeather}, dispatch);
}

//null because no state is needed; a function has to be the 2nd arg
export default connect(null, mapDispatchToProps)(SearchBar);
