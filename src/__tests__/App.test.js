import React from 'react';
import { shallow } from 'enzyme/build';
import App from '../App';

// describe - is a container for scope of tests
describe('<App /> component', () => {
  test('render list of events', () => {
  const AppWrapper = shallow(<App />);
  expect(AppWrapper.find(EventList)).toHaveLength(1);
});
});
