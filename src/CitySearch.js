import React, { Component } from 'react';
import { InfoAlert } from './Alerts';

class CitySearch extends Component {
  state = {
    locations: this.props.locations,
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText: '',
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });

    if (suggestions.length === 0) {
      this.setState({
        query: value,
        // suggestions: [],
        infoText:
          "We can't find the city you are looking for. Please try another city",
      });
    } else {
      return this.setState({ query: value, suggestions, infoText: '' });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestion: [],
      showSuggestions: false,
      infoText: '',
    });
    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className='CitySearch'>
        <input
          type='text'
          className='city'
          id='city'
          value={this.state.query}
          onFocus={() => {
            this.setState({ showSuggestions: true, query: '' });
          }}
          onChange={this.handleInputChanged}
          placeholder='Search by city'
        />

        <ul
          className={
            this.state.showSuggestions
              ? 'suggestions showSuggestions'
              : 'display-none'
          }
        >
          <li className={this.state.infoText === '' && 'display-none'}>
            <InfoAlert text={this.state.infoText} />
          </li>
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li key='all' onClick={() => this.handleItemClicked('all')}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
