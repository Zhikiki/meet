import React, { Component } from 'react';

class Event extends Component {
  render() {
    // const { event } = this.props;
    return (
      <div className='Event'>
        <h2 className='summury'></h2>
        <p className='start-time'></p>
        <button className='details-button'>details</button>
      </div>
    );
  }
}
export default Event;
