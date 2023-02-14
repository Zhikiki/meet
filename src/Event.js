import React, { Component } from 'react';
import EventDetails from './EventDetails';

class Event extends Component {
  state = {
    collapsed: true,
  };

  toogleState = () => {
    this.setState({
      collapsed: false,
    });
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    return (
      <div className='Event'>
        <h2 className='summury'>{event.summary}</h2>
        <p className='start-time'>{event.start.dateTime}</p>
        <span className='location'>{event.location}</span>
        <button className='details-button' onClick={this.toogleState}>
          Details
        </button>
        {!collapsed && <EventDetails event={event} />}
      </div>
    );
  }
}
export default Event;
