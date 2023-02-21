Feature: Specify Number of events

  Scenario: When user hasn’t specified a number, 32 is the default 
    Given app is loaded
    And user has received a list of upcoming events
    When  user hasn’t specified a number of events to be shown
    Then user receives first 32 upcoming events on the screen

  Scenario: User can change the number of events they want to see.
    Given app is loaded
    And user has received a list of upcoming events
    When user specified a number of events to be shown by changing the number in input
    Then the maximum of events listed should be the specified number