import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';
import EventDetails from '../EventDetails';

describe('<Event /> component', () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });
  test('<Event /> is correctly rendered', () => {
    expect(EventWrapper).toBeDefined();
  });

  test('event summary is rendered', () => {
    expect(EventWrapper.find('.summury')).toHaveLength(1);
  });
  test('event summary is rendered correctly', () => {
    expect(EventWrapper.find('.summury').text()).toBe(event.summary);
  });

  test('event start time is rendered', () => {
    expect(EventWrapper.find('.start-time')).toHaveLength(1);
  });
  test('event start time is rendered correctly', () => {
    expect(EventWrapper.find('.start-time').text()).toBe(event.start.dateTime);
  });

  test('event location is rendered', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
  });
  test('event location is rendered correctly', () => {
    expect(EventWrapper.find('.location').text()).toBe(event.location);
  });

  test('event details button is rendered correctly', () => {
    expect(EventWrapper.find('.details-button')).toHaveLength(1);
    expect(EventWrapper.find('.details-button').text()).toBe('Details');
  });

  test('event details initially collapsed', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
    expect(EventWrapper.find(EventDetails)).toHaveLength(0);
  });

  test('clicking details button changes the state', () => {
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('<EventDetails /> rendered when !collapsed', () => {
    expect(EventWrapper.state('collapsed')).toBe(false);
    expect(EventWrapper.find(EventDetails)).toHaveLength(1);
    expect(EventWrapper.find('.summury')).toHaveLength(0);
    expect(EventWrapper.find('.start-time')).toHaveLength(0);
    expect(EventWrapper.find('.location')).toHaveLength(0);
    expect(EventWrapper.find('.details-button')).toHaveLength(0);
  });
});
