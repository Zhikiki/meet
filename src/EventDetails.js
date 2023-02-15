import React, { Component } from 'react';

class EventDetails extends Component {
  state = {
    collapsed: false,
  };
  toogleState = () => {
    this.setState({
      collapsed: true,
    });
  };
  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    return (
      <div className='EventDetails'>
        {!collapsed && (
          <>
            <h2 className='summury'>{event.summary}</h2>
            <p className='start-time'>{event.start.dateTime}</p>
            <span className='location'>{event.location}</span>
            <p className='description'>{event.description}</p>
            <button className='hide-details-button' onClick={this.toogleState}>
              Hide details
            </button>
          </>
        )}
      </div>
    );
  }
}

export default EventDetails;
