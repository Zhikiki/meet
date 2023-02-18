import React, { Component } from 'react';

class CitySearch extends Component {
  state = {
    locations: this.props.locations,
    query: '',
    suggestions: [],
    showSuggestions: undefined,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({ query: value, suggestions });
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestion: [],
      showSuggestions: false,
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
