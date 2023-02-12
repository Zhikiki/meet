import React from 'react';
import { shallow } from 'enzyme/build';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';

// describe - is a container for scope of tests
describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
});
