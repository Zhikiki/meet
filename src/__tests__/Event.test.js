import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let event;
    beforeAll(() => {
      event = mockData[0];
    });
  test('<Event /> is correctly rendered', () => {
    const EventWrapper = shallow(<Event />);
    expect(EventWrapper).toBeDefined();
  });

  test('event summary is rendered', () => {
    const EventWrapper = shallow(<Event />);
    expect(EventWrapper.find('.summury')).toHaveLength(1);
  });

  test('event start time is rendered', () => {
    const EventWrapper = shallow(<Event />);
    expect(EventWrapper.find('.start-time')).toHaveLength(1);
  });
  test('event details button is rendered', () => {
    const EventWrapper = shallow(<Event />);
    expect(EventWrapper.find('.details-button')).toHaveLength(1);
  });
});
