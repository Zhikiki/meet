import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alerts';
import WelcomeScreen from './WelcomeScreen';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);

    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          events = events.slice(0, this.state.numberOfEvents);
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  // Function updates events array according to chosen city
  updateEvents = (location, inputNumber) => {
    const { numberOfEvents, selectedLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === 'all'
            ? events
            : events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: eventsToShow,
          selectedLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          selectedLocation === 'all'
            ? events
            : events.filter((event) => event.location === selectedLocation);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          numberOfEvents: inputNumber,
        });
      });
    }
    // getEvents().then((events) => {
    //   const locationEvents =
    //     location === 'all'
    //       ? events
    //       : events.filter((event) => event.location === location);
    //   const eventsToShow = locationEvents.slice(0, inputNumber);
    //   this.setState({
    //     events: eventsToShow,
    //     numberOfEvents: inputNumber,
    //   });
    // });
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className='App' />;

    const offlineMessage = navigator.onLine
      ? ''
      : 'You are currently Offline. The list of events may not be up to date';

    return (
      <Container className='App my-5 p-3'>
        <Row className='d-flex flex-column-reverse flex-md-row justify-content-md-between mb-4'>
          <Col className='col-12'>
            <OfflineAlert text={offlineMessage} />
          </Col>
          <Col className='px-0 col-md-8'>
            <CitySearch
              locations={this.state.locations}
              updateEvents={this.updateEvents}
            />
          </Col>
          <Col>
            <NumberOfEvents
              numberOfEvents={this.state.numberOfEvents}
              updateEvents={this.updateEvents}
            />
          </Col>
        </Row>
        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </Container>
    );
  }
}

export default App;
