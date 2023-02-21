Feature: Show or hide an events details

Scenario: An event element is collapsed by default
Given list of events is loaded 
When app is loaded
And the user did not click the „Show Details“ yet
Then event details are not visible for user

Scenario: User can expand an event to see its details
Given app is loaded
And user received list of upcoming events with general information
When user pushes the button “Details” for specific event
Then specific event is being expanded with the details 

Scenario: User can collapse an event to hide its details
Given app is loaded
And specific event is being expanded with the details
When user pushes the button “Back” for specific event
Then specific event is being collapsed
And the user should receive a list of upcoming events in that city