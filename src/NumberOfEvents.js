import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    noe: 36,
  };

  changeNOE(value) {
    this.setState({ noe: value });
  }

  render() {
    const { noe } = this.state;
    return (
      <div className='NumberOfEvents'>
        <input
          list='noe'
          type='number'
          className='noe-input'
          value={noe}
          onChange={(event) => {
            this.changeNOE(event.target.value);
          }}
        />
        <datalist id='noe'>
          <option value='36' />
          <option value='72' />
          <option value='108' />
        </datalist>
      </div>
    );
  }
}

export default NumberOfEvents;
