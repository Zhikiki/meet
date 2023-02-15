import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('render NOE input with the list of options is rendered', () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    expect(NumberOfEventsWrapper.find('[list="noe"]')).toHaveLength(1);
    expect(NumberOfEventsWrapper.find('#noe')).toHaveLength(1);
    expect(NumberOfEventsWrapper.find('[list="noe"]')).toHaveLength(1);
    expect(NumberOfEventsWrapper.find('[value="36"]')).toHaveLength(1);
    expect(NumberOfEventsWrapper.find('[value="72"]')).toHaveLength(1);
    expect(NumberOfEventsWrapper.find('[value="108"]')).toHaveLength(1);
  });

  test('noe-input is 36 (number type) by default', () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    const noe = NumberOfEventsWrapper.state('noe');
    expect(NumberOfEventsWrapper.find('input.noe-input').prop('type')).toBe(
      'number'
    );
    expect(NumberOfEventsWrapper.state('noe')).toBe(36);
    expect(NumberOfEventsWrapper.find('.noe-input').prop('value')).toBe(noe);
  });

  test('change state when NOE input changes', () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    NumberOfEventsWrapper.setState({
      noe: '36',
    });
    const eventObject = { target: { value: '72' } };
    NumberOfEventsWrapper.find('.noe-input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('noe')).toBe('72');
  });
});
