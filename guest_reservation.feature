Feature: Guest reservation
    Scenario: Guest selects appointment time
        Given I am a guest and want to make an appointment
        When I choose an available time slot
        And press the "Next" button
        Then I should be redirected to the customer information page

    Scenario: Guest provides contact information
        Given I am a guest on the customer information page
        When I fill out my contact information
        And I press the "Next" button
        Then I should see the "Appointment Confirmation" page

    Scenario: Guest confirms appointment
        Given I am a guest on the "Appointment Confirmation" page
        When I press the "Confirm" button
        Then I should see the "Success" page

    Scenario: Guest tries to proceed to confirmation page without filling out all compulsory information fields
        Given I am a guest 
        And I am on the "Customer Information" page
        When I leave one or more compulsory fields empty
        And I press "Next" button
        Then I should see empty fields glow up red indicating an error
        And I should remain on "Customer Information" page

    Scenario: Booked time slot is not shown to other guests
        Given I am a guest
        And I have successfully booked an appointment at 11:00 AM on April 14
        When another guest opens the "Appointment Date & Time" page 
        And chooses April 14th Date
        Then they should not see 11:00 AM as an available option
    
    Scenario: Guest navigates from confirmation to contact information page
        Given I am a guest
        And I am on stage 3 of reservation
        When I press "Back" button
        Then I should see the stage 2 of reservation

    Scenario: Guest navigates from contact information to appointment time selection
        Given I am a guest on stage 2 of reservation
        When I modify my information
        And press "Back" button
        Then I should see the stage 1 of reservation

    Scenario: Guest modifies information and navigates back to confirmation
        Given I am a guest on stage 1 of reservation
        When I modify the reservation date and time
        And press "Next" button 2 times
        Then I should see changes to reservation info and date on stage 3