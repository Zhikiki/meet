import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import React from 'react';
import { mount } from 'enzyme';
import { mockData } from '../mock-data';

// loadFeature() is built-in cucumber function, is used to load a Gherkin file (with scenarios)
// NOTE  file path to start from the root of the project
const feature = loadFeature('./src/features/filterEventsByCity.feature');

// defineFeature() is built-in cucumber function, is used to define the code for Gherkin file (feature)
defineFeature(feature, (test) => {
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({
    given,
    when,
    then,
  }) => {
    // Nothing happens here so we can leave function for 'given' empty
    given('user hasn’t searched for any city', () => {});

    // "when" specifies the main action of the test
    // the user opens the app means that App is mounted
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see the list of upcoming events all locations.', () => {
      // the act of getting the list of events is an asynchronous action
      // so the first we are updating the App component using AppWrapper.update()
      AppWrapper.update();
      expect(AppWrapper.find('.event').hostNodes()).toHaveLength(
        mockData.length
      );
    });
  });

  test('User should see a list of suggestions when they search for a city', ({
    given,
    when,
    then,
  }) => {
    given('the main page is open', () => {});

    when('the user starts typing in the city textbox', () => {});

    then(
      'the user should receive a list of cities (suggestions) that match what they’ve typed',
      () => {}
    );
  });

  test('User can select a city from the suggested list', ({
    given,
    and,
    when,
    then,
  }) => {
    given('user was typing “Berlin” in the city textbox', () => {});

    and('the list of suggested cities is showing', () => {});

    when(
      'the user selects a city (e.g., “Berlin, Germany”) from the list',
      () => {}
    );

    then(
      'their city should be changed to that city (i.e., “Berlin, Germany”)',
      () => {}
    );

    and(
      'the user should receive a list of upcoming events in that city',
      () => {}
    );
  });
});
