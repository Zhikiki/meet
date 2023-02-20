import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents/> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('render textbox element', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('render textbox element correctly', () => {
    const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
    expect(
      NumberOfEventsWrapper.find('#numberOfEvents__input').prop('value')
    ).toBe(numberOfEvents);
  });

  test('change state when input changes', () => {
    const eventObject = { target: { value: 32 } };
    NumberOfEventsWrapper.find('#numberOfEvents__input').simulate(
      'change',
      eventObject
    );
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
  });
  // test('selecting a suggestion should change query state', () => {
  //   CitySearchWrapper.setState({
  //     query: 'Berlin',
  //   });
  //   const suggestions = CitySearchWrapper.state('suggestions');
  //   CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
  //   expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
  // });
});

// describe('<NumberOfEvents /> component', () => {
//   test('render NOE input with the list of options is rendered', () => {
//     const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
//     expect(NumberOfEventsWrapper.find('[list="noe"]')).toHaveLength(1);
//     expect(NumberOfEventsWrapper.find('#noe')).toHaveLength(1);
//     expect(NumberOfEventsWrapper.find('[list="noe"]')).toHaveLength(1);
//     expect(NumberOfEventsWrapper.find('[value="36"]')).toHaveLength(1);
//     expect(NumberOfEventsWrapper.find('[value="72"]')).toHaveLength(1);
//     expect(NumberOfEventsWrapper.find('[value="108"]')).toHaveLength(1);
//   });

//   test('noe-input is 36 (number type) by default', () => {
//     const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
//     const noe = NumberOfEventsWrapper.state('noe');
//     expect(NumberOfEventsWrapper.find('input.noe-input').prop('type')).toBe(
//       'number'
//     );
//     expect(NumberOfEventsWrapper.state('noe')).toBe(36);
//     expect(NumberOfEventsWrapper.find('.noe-input').prop('value')).toBe(noe);
//   });

//   test('change state when NOE input changes', () => {
//     const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
//     NumberOfEventsWrapper.setState({
//       noe: '36',
//     });
//     const eventObject = { target: { value: '72' } };
//     NumberOfEventsWrapper.find('.noe-input').simulate('change', eventObject);
//     expect(NumberOfEventsWrapper.state('noe')).toBe('72');
//   });
// });
