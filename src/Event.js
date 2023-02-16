import React, { Component } from 'react';
import moment from 'moment';

class Event extends Component {
  state = {
    collapsed: true,
  };

  toogleState = () => {
    this.state.collapsed
      ? this.setState({
          collapsed: false,
        })
      : this.setState({
          collapsed: true,
        });
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;

    // const eventStart = moment(event.start.dateTime).format('DD-MM-YYYY HH:mm');
    const eventStart = moment(event.start.dateTime).format('llll');
    return (
      <div className='event'>
        <div className='event-overview'>
          <h2 className='summury'>{event.summary}</h2>
          <p className='start-time'>{`${eventStart}`}</p>
          <p className='location'>
            @{event.summary} | {event.location}
          </p>
          {collapsed ? (
            <button className='details-button' onClick={this.toogleState}>
              Details
            </button>
          ) : (
            <button className='hide-details-button' onClick={this.toogleState}>
              Hide details
            </button>
          )}
        </div>
        {!collapsed && (
          <div className='event__details'>
            <h3>About event:</h3>
            <p className='description'>{event.description}</p>
            <h4>
              <a
                href={event.htmlLink}
                target='_blank'
                rel='noopener noreferrer'
              >
                See details on Google Calendar
              </a>
            </h4>
          </div>
        )}
      </div>
    );
  }
}
export default Event;
