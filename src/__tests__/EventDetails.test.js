import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import EventDetails from '../EventDetails';

describe('<EventDetails /> component', () => {
  let event, EventDetailsWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventDetailsWrapper = shallow(<EventDetails event={event} />);
  });
  test('<Event /> is correctly rendered', () => {
    expect(EventDetailsWrapper.state('collapsed')).toBe(false);
    expect(EventDetailsWrapper).toBeDefined();
  });

  test('event summary is rendered', () => {
    expect(EventDetailsWrapper.find('.summury')).toHaveLength(1);
  });
  test('event summary is rendered correctly', () => {
    expect(EventDetailsWrapper.find('.summury').text()).toBe(event.summary);
  });

  test('event start time is rendered', () => {
    expect(EventDetailsWrapper.find('.start-time')).toHaveLength(1);
  });
  test('event start time is rendered correctly', () => {
    expect(EventDetailsWrapper.find('.start-time').text()).toBe(
      event.start.dateTime
    );
  });

  test('event description is rendered', () => {
    expect(EventDetailsWrapper.find('.description')).toHaveLength(1);
  });
  test('event description is rendered correctly', () => {
    expect(EventDetailsWrapper.find('.description').text()).toBe(
      event.description
    );
  });

  test('event location is rendered', () => {
    expect(EventDetailsWrapper.find('.location')).toHaveLength(1);
  });
  test('event location is rendered correctly', () => {
    expect(EventDetailsWrapper.find('.location').text()).toBe(event.location);
  });

  test('hide details button is rendered correctly', () => {
    expect(EventDetailsWrapper.find('.hide-details-button')).toHaveLength(1);
    expect(EventDetailsWrapper.find('.hide-details-button').text()).toBe(
      'Hide details'
    );
  });

  test('clicking hide details button changes the state', () => {
    EventDetailsWrapper.find('.hide-details-button').simulate('click');
    expect(EventDetailsWrapper.state('collapsed')).toBe(true);
  });
});
