Feature: Admin user can manage clients
    Scenario: Opening new client form 
        Given I am an admin 
        And on "Customers" page
        When I press "New" button 
        Then I should see information fields appear

    Scenario: Creating a new client 
        Given I am an admin with customer information form open
        When I fill out customer's information 
        And press "Save" button
        Then I should see newly added customer in "Customers" list on the left

    Scenario: Selecting a client to view details 
        Given I am an admin 
        And on "Customers" page
        When I press on one of the customers from "Customers" list on the left
        Then I should see customer's record and buttons "Edit" and "Delete" glow up

    Scenario: Initiating client deletion 
        Given I am an admin viewing a customer's record
        When I press "Delete" button 
        Then I should see "Delete customer" dialog window

    Scenario: Confirming client deletion 
        Given I am an admin with "Delete customer" dialog window open
        When I press "Delete" button
        Then I should no longer see said customer's record on "Customers" page

    Scenario: Accessing client note 
        Given I am an admin viewing a customer's record
        When I press "Edit" button
        Then I should be able to interact with "Notes" field

    Scenario: Adding a note to client record 
        Given I am an admin editing a customer's record
        When I leave a note
        And I press "Save" button
        Then I should see the updated note

    Scenario: Viewing customer's appointments 
        Given I am an admin 
        And on "Customers" page
        When I press on one of the customers from "Customers" list on the left
        Then I should see customer's appointments

    Scenario: Accessing appointment editing from customer record 
        Given I am an admin viewing a customer's appointments
        When I press appointment title 
        Then I should be redirected to "Calendar" page and see "Edit appointment" window 
    
    Scenario: Filtering customers by their information
        Given I am an admin
        And on "Customers" page
        When I type in client's infromation in look up field
        And press "Search" button
        Then I should see clients with matching info