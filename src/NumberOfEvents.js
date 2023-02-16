import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });
  };

  render() {
    const numberOfEvents = this.state.numberOfEvents;
    return (
      <div className='numberOfEvents'>
        <label>Number of events</label>
        <input
          id='numberOfEvents__input'
          value={numberOfEvents}
          onChange={this.handleInputChanged}
        />
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
  // state = {
  //   noe: 36,
  // };

  // changeNOE(value) {
  //   this.setState({ noe: value });
  // }

  // render() {
  //   const { noe } = this.state;
  //   return (
  //     <div className='NumberOfEvents'>
  //       <input
  //         list='noe'
  //         type='number'
  //         className='noe-input'
  //         value={noe}
  //         onChange={(event) => {
  //           this.changeNOE(event.target.value);
  //         }}
  //       />
  //       <datalist id='noe'>
  //         <option value='36' />
  //         <option value='72' />
  //         <option value='108' />
  //       </datalist>
  //     </div>
  //   );
  // }
}

export default NumberOfEvents;
