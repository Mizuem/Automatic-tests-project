describe('Admin can manage clients\' reservations', () => {
  
  it('Changing reservation status', () => {
    cy.loginToCalendarPage()
    
    // Opening reservation details test
    cy.addReservationForClient('Gordon Freeman')
    cy.visit('http://localhost:8080/index.php/calendar')
    cy.get('[tabindex="0"]').first().within(() => {
      cy.get('[class="fc-event-main"]').first().click({force: true})
    })
    cy.get('[class="popover bs-popover-auto fade show"]').should('exist')
    
    // Accessing reservation edit mode test
    cy.contains('Edit').click()
    cy.get('[id="appointments-modal"]').should('not.have.attr', 'aria-hidden')
    
    // Changing reservation status
    cy.get('[id="appointment-status"]').select(3)
    cy.get('[id="save-appointment"]').click()
    cy.wait(500)
    cy.get('[tabindex="0"]').first().within(() => {
      cy.get('[class="fc-event-main"]').first().click({force: true})
    })
    cy.contains('Cancelled')
  })

  it('Setting new reservation time', () => {
    cy.loginToCalendarPage()
    cy.openResEdit()
    cy.get('[id="start-datetime"]').click()
    cy.get('[class="numInput flatpickr-hour"]').first().type('3')
    cy.wait(300)
    cy.get('[class="numInput flatpickr-minute"]').first().type('30')
    cy.wait(300)
    cy.get('[id="email"]').click()
    cy.wait(500)
    cy.get('[id="end-datetime"]').click()
    cy.get('[class="numInput flatpickr-hour"]').eq(1).type('4')
    cy.wait(300)
    cy.get('[class="numInput flatpickr-minute"]').eq(1).type('00')
    cy.wait(300)
    cy.get('[id="save-appointment"]').click()
    cy.contains('3:30')
    cy.contains('4:00')
  })

  it('Emptying reservation time fields', () => {
    cy.loginToCalendarPage()
    cy.openResEdit()
    //-------------------------------------------------------------------
    // chat gpt solution to 
    // TypeError: Cannot read properties of undefined (reading 'getTime')
    // which was occuring when i tried to empty datetime field
    // to cause an error for a test
    cy.get('[id="start-datetime"]').invoke('val').then(originalValue => {
      cy.log(`Original Value: ${originalValue}`)
    })
    cy.get('[id="start-datetime"]').then($el => {
      const el = $el[0]
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
      nativeInputValueSetter.call(el, '')
      el.dispatchEvent(new Event('change', { bubbles: true }))
    })
    //--------------------------------------------------------------------
    cy.get('[id="email"]').click()
    cy.wait(300)
    cy.get('[id="save-appointment"]').click()
    cy.contains('Fields with * are required.')
  })

  it('Creating new appointment from the time table', () => {
    cy.loginToCalendarPage()
    // Initiating new reservation creation test
    cy.get('[data-time="09:45:00"]').eq(1).click()
    cy.get('[id="message-modal"]').should('not.have.attr', 'aria-hidden="true"')
    // Opening new appointment form test
    cy.get('[class="btn btn-primary"]').eq(3).click()
    cy.contains('New Appointment')
    // Creating new appointment test
    cy.fixture('clientData.json').then((clientData) => {
      cy.get('#first-name').type(clientData.firstName)
      cy.get('#last-name').type(clientData.secondName)
      cy.get('#email').type(clientData.email)
      cy.get('#phone-number').type(clientData.phoneNumber)
      cy.get('#address').type(clientData.address)
      cy.get('#city').type(clientData.city)
      cy.get('#zip-code').type(clientData.zipCode)
      cy.get('#customer-notes').type(clientData.note)
    })
    cy.get('#start-datetime').invoke('val').as('startTime')
    cy.get('#end-datetime').invoke('val').as('endTime')
    cy.get('[id="save-appointment"]').click()
    cy.wait(1000)
    cy.get('@startTime').then((startTime) => {
      cy.get('@endTime').then((endTime) => {
        let start = startTime.split(' ')[1]
        let startAmPm = startTime.split(' ')[2]
        let end = endTime.split(' ')[1]
        let endAmPm = endTime.split(' ')[2]
        let timeRange = start + ' ' + startAmPm + ' - ' + end + ' ' + endAmPm
        cy.contains(timeRange)
      })
    })
  })

  it('Deleting a reservation', () => {
    cy.loginToCalendarPage()
    // Initiating reservation deletion test
    // deleting a reservation created in previous test suit
    cy.contains('9:45 am - 10:15 am').click({force:true})
    cy.contains('Delete').click()
    cy.get('[id="message-modal"]').should('not.have.attr', 'aria-hidden')
    // Confirming reservation deletion test
    cy.get('[id="cancellation-reason"]').type('123123')
    cy.get('[class="btn btn-primary"]').eq(3).click()
    cy.get('body').should('not.contain', '9:45 am - 10:15 am')
  })

  it('Setting up unavailability', () => {
    cy.loginToCalendarPage()
    // Opening unavailability form test
    cy.get('[data-time="16:15:00"]').eq(1).click()
    cy.get('[id="message-modal"]')
    .should('not.have.attr', 'aria-hidden="true"')
    cy.get('[class="btn btn-outline-primary"]').click()
    cy.contains('New Unavailability')
    // Setting up unavailability
    cy.get('[id="save-unavailability"]').click()
    
    cy.get('body').should('contain', '4:15 pm - 4:30 pm')
    //cleaning up
    cy.contains('4:15 pm - 4:30 pm').click({force:true})
    cy.contains('Delete').click()
  })

  it('Syncing reservations calendar with Google calendar', () => {
    cy.loginToCalendarPage()
    // Pressing calendar "enable sync" when filtering calendar by providers test
    cy.get('[id="select-filter-item"]').select(1)
    cy.get('[id="enable-sync"]').click()
    cy.get('[id="message-modal"]')
      .should('not.have.attr', 'aria-hidden')

    // Syncing reservations calendar with Caldav calendar test
    // Couldn't do the google option 
    // since there's a new window popping out in cypress app
    cy.get('[class="btn btn-outline-primary me-auto"]').click()
    cy.get('[class="modal-header"]').should('contain', 'CalDAV Server')
  })
})