import React from 'react';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t specified a number, 32 is the default', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper, NumberOfEventsWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('user has received a list of upcoming events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event').hostNodes()).toHaveLength(
        mockData.length
      );
    });

    when('user hasn’t specified a number of events to be shown', () => {});

    then('user receives first 32 upcoming events on the screen', () => {
      AppWrapper.update();
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
      expect(AppWrapper.find('.event').length).toBeLessThanOrEqual(32);
    });
  });

  test('User can change the number of events they want to see.', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper, NumberOfEventsWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('user has received a list of upcoming events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event').hostNodes()).toHaveLength(
        mockData.length
      );
    });

    when(
      'user specified a number of events to be shown by changing the number in input',
      () => {
        let numberInput = AppWrapper.find('.numberOfEvents__input');
        const newNumberOfEvents = { target: { value: 3 } };
        numberInput.simulate('change', newNumberOfEvents);
      }
    );

    then('the maximum of events listed should be the specified number', () => {
      AppWrapper.update();
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(3);
      expect(AppWrapper.find('.event').length).toBeLessThanOrEqual(3);
    });
  });
});
