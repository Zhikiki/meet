import React from 'react';
import { shallow, mount } from 'enzyme/build';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';
import { getEvents } from '../api';

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
  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    // mount instead of shallow to render App component together with childrens
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    // state of events should be first defined in parent component
    expect(AppEventsState).not.toEqual(undefined);
    // comparing App's events with EventList's events to ensure it's been passed correctly
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    // tests that are beeng run in one DOm will effect each other
    // So wee need to clean the DOM after each test
    AppWrapper.unmount();
  });

  // We are repeating the same test for CitySearch component
  // Checking whether locations prop was passed correctly from App to CitySearch
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    // ExtractLocations is a function that takes only location from each event
    // it takes only one piece from all info about event, so we can use it
    const locations = extractLocations(mockData);
    // suggestions state has been set to have all available cities.
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    // hold the index of the selected suggestion from the suggestions array (random)
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    // Once the index is selected, it’s used to return the actual suggestion, which is then stored in the variable.
    const selectedCity = suggestions[selectedIndex];
    // instance calls any function component has directly
    // handleItemClicked sets state of query = selected suggestion
    // await has been added because it’s expected that it will have async code
    // that involves fetching the full list of events
    // before filtering them down to the list of events that match the selected city.
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    // function gets data fron API call or mockData
    const allEvents = await getEvents();
    // filter events, when their location is the same as selected suggestion
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    // showSuggestions state has been set to be true (rendered).
    CitySearchWrapper.setState({ showSuggestions: true });
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    // "See all cities" is defined as last last item (length -1)
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    await getEvents();
    expect(AppWrapper.state('events')).toHaveLength(mockData.length);

    AppWrapper.unmount();
  });

  test('App passes "numberOfEvents" state as a prop to NumberOfEvents', () => {
    // mount instead of shallow to render App component together with childrens
    const AppWrapper = mount(<App />);
    const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');
    // state of events should be first defined in parent component
    expect(AppNumberOfEventsState).not.toEqual(undefined);
    // comparing App's events with EventList's events to ensure it's been passed correctly
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(
      AppNumberOfEventsState
    );
    // tests that are beeng run in one DOm will effect each other
    // So wee need to clean the DOM after each test
    AppWrapper.unmount();
  });

  test('Change "numberOfEvents" when the input number changes', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const inputNumberOfEvents = NumberOfEventsWrapper.find(
      '.numberOfEvents__input'
    );
    const eventObject = { target: { value: 20 } };
    inputNumberOfEvents.simulate('change', eventObject);
    await getEvents();
    expect(AppWrapper.state('numberOfEvents')).toBe(20);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(20);
    AppWrapper.unmount();
  });

  test('The number of events rendered matching the input number', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const EventListWrapper = AppWrapper.find(EventList);
    const eventObject = { target: { value: 1 } };

    await NumberOfEventsWrapper.instance().handleInputChanged(eventObject);
    await getEvents();

    expect(AppWrapper.state('events')).toHaveLength(1);
    expect(EventListWrapper).toHaveLength(1);

    AppWrapper.unmount();
  });

  test('The contenct of the event rendered matching the content of the mock API', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: 1 } };
    await NumberOfEventsWrapper.instance().handleInputChanged(eventObject);
    await getEvents();
    expect(AppWrapper.state('events')).toEqual([mockData[0]]);
    AppWrapper.unmount();
  });
});
