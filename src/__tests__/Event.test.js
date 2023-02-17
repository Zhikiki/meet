import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

import moment from 'moment';

describe('<Event /> component', () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });
  test('<Event /> is correctly rendered', () => {
    expect(EventWrapper).toHaveLength(1);
  });

  test('that <Event/> element is rendered', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('event details initially collapsed', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
    expect(EventWrapper.find('.event').children()).toHaveLength(1);
  });

  test('event-overview is rendered with children elements', () => {
    expect(EventWrapper.find('.event-overview')).toHaveLength(1);
    expect(EventWrapper.find('.summury')).toHaveLength(1);
    expect(EventWrapper.find('.event_date-info')).toHaveLength(1);
    expect(EventWrapper.find('.start-year')).toHaveLength(1);
    expect(EventWrapper.find('.start-date')).toHaveLength(1);
    expect(EventWrapper.find('.start-month')).toHaveLength(1);
    expect(EventWrapper.find('.start-hour')).toHaveLength(1);

    expect(EventWrapper.find('.location')).toHaveLength(1);
    expect(EventWrapper.find('button')).toHaveLength(1);
    expect(EventWrapper.find('button').text()).toBe(
      'Details' || 'Hide details'
    );
  });

  test('event-overview children elements are rendered correctly', () => {
    expect(EventWrapper.find('.summury').text()).toBe(event.summary);

    expect(EventWrapper.find('.start-year').text()).toBe(
      moment(event.start.dateTime).format('YYYY')
    );
    expect(EventWrapper.find('.start-date').text()).toBe(
      moment(event.start.dateTime).format('DD')
    );
    expect(EventWrapper.find('.start-month').text()).toBe(
      moment(event.start.dateTime).format('MMM')
    );
    expect(EventWrapper.find('.start-hour').text()).toBe(
      moment(event.start.dateTime).format('HH:mm')
    );

    expect(EventWrapper.find('.location').text()).toBe(
      `@${event.summary} | ${event.location}`
    );
    expect(EventWrapper.find('button').text()).toBe(
      'Details' || 'Hide details'
    );
  });

  test('clicking Details button changes the state', () => {
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('event__details rendered when !collapsed', () => {
    EventWrapper.setState({ collapsed: false });
    expect(EventWrapper.find('.event__details')).toHaveLength(1);
    expect(EventWrapper.find('.event').children()).toHaveLength(2);
  });

  test('clicking Hide details button changes the state', () => {
    EventWrapper.setState({ collapsed: false });
    EventWrapper.find('.hide-details-button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });
});
