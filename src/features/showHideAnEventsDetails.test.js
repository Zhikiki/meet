import React from 'react';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { mockData } from '../mock-data';
import Event from '../Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default', ({
    given,
    when,
    and,
    then,
  }) => {
    let AppWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    when('list of events is loaded', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event').hostNodes()).toHaveLength(
        mockData.length
      );
    });

    and('the user did not click the „Show Details“ yet', () => {});

    then('event details are not visible for user', () => {
      expect(AppWrapper.find('.event__details')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and(
      'user received list of upcoming events with general information',
      () => {
        AppWrapper.update();
        expect(AppWrapper.find('.event').hostNodes()).toHaveLength(
          mockData.length
        );
        expect(AppWrapper.find('.event__details')).toHaveLength(0);
      }
    );

    when('user pushes the button “Details” for specific event', () => {
      AppWrapper.find('.details-button').at(0).simulate('click');
    });

    then('specific event is being expanded with the details', () => {
      expect(AppWrapper.find('.event__details')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('specific event is being expanded with the details', () => {
      AppWrapper.update();
      let specificEvent = AppWrapper.find(Event).at(0);
      specificEvent.find('.details-button').simulate('click');
      expect(specificEvent.state('collapsed')).toEqual(false);
      expect(AppWrapper.find('.event__details')).toHaveLength(1);
    });

    when('user pushes the button “Back” for specific event', () => {
      AppWrapper.find('.hide-details-button').at(0).simulate('click');
    });

    then('specific event is being collapsed', () => {
      expect(AppWrapper.find(Event).at(0).state('collapsed')).toEqual(true);
      expect(AppWrapper.find('.event__details')).toHaveLength(0);
    });
  });
});
