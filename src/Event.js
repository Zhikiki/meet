import React, { Component } from 'react';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    return (
      <div className='event'>
        <div className='event-overview'>
          <Row className='d-flex flex-row align-items-center mb-3'>
            <Col className='event_date-info col-12 col-md-2 '>
              <Row className='d-flex flex-md-column align-items-end align-items-md-center'>
                <Col className='start-year text-center'>{`${moment(
                  event.start.dateTime
                ).format('YYYY')}`}</Col>
                <Col className='start-date text-center lh-1'>{`${moment(
                  event.start.dateTime
                ).format('DD')}`}</Col>
                <Col className='start-month text-center'>{`${moment(
                  event.start.dateTime
                ).format('MMM')}`}</Col>
                <Col className='start-hour text-center'>{`${moment(
                  event.start.dateTime
                ).format('HH:mm')}`}</Col>
              </Row>
            </Col>
            <Col>
              <h2 className='summury'>{event.summary}</h2>
              <p className='location'>
                @{event.summary} | {event.location}
              </p>
            </Col>
          </Row>

          {collapsed ? (
            <Row className='mx-md-5 mx-1'>
              <Col className='text-end'>
                <button className='details-button' onClick={this.toogleState}>
                  Details
                </button>
              </Col>
            </Row>
          ) : (
            <Row className='mx-md-5'>
              <Col className='text-end'>
                <button
                  className='hide-details-button'
                  onClick={this.toogleState}
                >
                  Hide details
                </button>
              </Col>
            </Row>
          )}
        </div>
        {!collapsed && (
          <div className='event__details ms-4 mt-3'>
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
