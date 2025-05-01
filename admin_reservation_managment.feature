Feature: Admin can manage clients' reservations
    Scenario: Opening reservation details
        Given I am an admin
        And I am on "Calendar" page
        When I press on reservation in the time table
        Then I should see reservation details window pop up

    Scenario: Accessing reservation edit mode
        Given I am an admin viewing reservation details
        When I press "Edit" button
        Then I should see "Edit appointment" window pop up
        When I press on "Status" field
        Then I should see possible reservation statuses list pop up

    Scenario: Changing reservation status 
        Given I am an admin editing a reservation with status options open
        When I choose appropriate reservation status
        And press "Save" button
        Then I should see appropriate reservation status in reservation details

    Scenario: Opening datetime picker
        Given I am an admin editing a reservation
        When I press on "Start Date/Time" or "End Date/Time"
        Then I should see datetime picker widget pop up

    Scenario: Setting new reservation time
        Given I am an admin with datetime picker open
        When I set appropriate date and time for a reservation
        And press "Save" button
        Then I should see the reservation in appropriate place in time table
        And I should see appropriate date/time in reservation details
    
    Scenario: Emptying reservation time fields
        Given I am an admin editing a reservation
        When I empty out datetime fields
        Then I should see date/time fields light up red indicating an error
    
    Scenario: Initiating new reservation creation
        Given I am an admin 
        And I am on "Calendar" page
        When I press on an empty time slot in time table
        Then I should see "Add new event" dialog window pop up

    Scenario: Opening new appointment form
        Given I am an admin with "Add new event" dialog open
        When I press "New appointment" button
        Then I should see "New appointment" window pop up

    Scenario: Creating new appointment
        Given I am an admin with "New appointment" form open
        When I set appointment details 
        And fill out customer information
        And press "Save" button
        Then I should see new appointment in time table

    Scenario: Initiating reservation deletion
        Given I am an admin viewing reservation details
        When I press "Delete" button
        Then I should see "Delete appointment" window asking me to provide a reason and confirm my action

    Scenario: Confirming reservation deletion
        Given I am an admin with "Delete appointment" window open
        When I press "Delete" button
        Then I should no longer see said reservation on time table

    Scenario: Opening unavailability form
        Given I am an admin with "Add new event" dialog open
        When I press "Unavailability" button
        Then I should see "New unavailability" window pop up

    Scenario: Setting up unavailability
        Given I am an admin with "New unavailability" window open
        When I choose unavailable provider
        And choose the time period of unavailability
        And press "Save" button
        Then I should see said unavailability window on the time table

    Scenario: Filtering appointments by provider
        Given I am an admin
        And I am on the "Calendar" page
        When I open the Providers and Services dropdown menu
        And I select "Jane Doe" from the list
        Then I should see only appointments related to provider "Jane Doe" on the calendar

    Scenario: Filtering appointments by services
        Given I am an admin
        And I am on the "Calendar" page
        When I open the Providers and Services dropdown menu
        And I select "Room 42" service from the list
        Then I should see only appointments related to service "Room 42" on the calendar

    Scenario: Pressing calendar "enable sync" when filtering calendar by provider
        Given I am an admin
        And I am on the "Calendar" page
        And I have the calendar appointments filtered by Providers
        When I press "Enable sync" button 
        Then I should see "Enable sync" dialog window with external calendars options
    
    Scenario: Syncing reservations calendar with Google calendar
        Given I am an admin with "Enable sync" dialog window open
        When I press "Google calendar" options
        Then I should be redirected to Google login page
    
    Scenario: Syncing reservations calendar with Caldav calendar
        Given I am an admin with "Enable sync" dialog window open
        When I press "Caldav calendar" option 
        Then I should see "Caldav server" window pop up
    
    

