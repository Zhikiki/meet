import React, { Component } from 'react';
import './App.css'
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
  state = {
    events: [],
    locations: [],
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  };

  render() {
    return (
      <Container className='App my-5'>
        <Row className=''>
          <Col>
            <CitySearch
              locations={this.state.locations}
              updateEvents={this.updateEvents}
              className='mb-5'
            />
          </Col>
          <Col>
            <NumberOfEvents />
          </Col>
        </Row>

        <EventList events={this.state.events} />
      </Container>
    );
  }
}

export default App;
