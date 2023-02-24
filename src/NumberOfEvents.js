import React, { Component } from 'react';
import { ErrorAlert } from './Alerts';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: this.props.numberOfEvents,
  };

  handleInputChanged = (event) => {
    const inputValue = event.target.value;

    this.props.updateEvents(null, inputValue);
    this.setState({ numberOfEvents: inputValue });

    if (inputValue < 1 || inputValue > 32) {
      this.setState({
        infoText: 'Select number from 1 to 32',
      });
    } else {
      this.setState({
        infoText: '',
      });
    }
  };

  render() {
    const numberOfEvents = this.state.numberOfEvents;
    return (
      <div className='numberOfEvents'>
        <label htmlFor='numberOfEvents__input' className='d-inline'>
          Number of events:
        </label>
        <input
          id='numberOfEvents__input'
          className='numberOfEvents__input d-inline'
          value={numberOfEvents}
          onChange={this.handleInputChanged}
        />
        <ErrorAlert text={this.state.infoText} />
        {/* <select
          name='pets'
          id='numberOfEvents__input'
          className='numberOfEvents__option'
          value={numberOfEvents}
          onChange={this.handleInputChanged}
        >
          <option value='32'>32</option>
          <option value='64'>64</option>
          <option value='96'>96</option>
        </select> */}
      </div>
    );
  }
}

export default NumberOfEvents;
