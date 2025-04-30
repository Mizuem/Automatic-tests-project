
// ------------------------- Guest interactions ---------------------------------
Cypress.Commands.add('getToSecondPage', () => {
    cy.visit('localhost:8080')
    cy.get('#available-hours button').first().click()
    cy.wait(500)
    cy.get('#button-next-2').should('be.visible').click()
  })
Cypress.Commands.add('getToThirdPage', () => {
    cy.getToSecondPage()
    cy.fixture('clientData.json').then((clientData) => {
        cy.fillContactInfo(clientData)
      })
    cy.get('#button-next-3').should('be.visible').click()
  })
Cypress.Commands.add('fillContactInfo', (clientData) => {
    cy.get('#first-name').type(clientData.firstName)
    cy.get('#last-name').type(clientData.secondName)
    cy.get('#email').type(clientData.email)
    cy.get('#phone-number').type(clientData.phoneNumber)
    cy.get('#address').type(clientData.address)
    cy.get('#city').type(clientData.city)
    cy.get('#zip-code').type(clientData.zipCode)
    cy.get('#notes').type(clientData.note)
})

// -----------------------------------------------------------------------------

// ------------------------- Admin interactions --------------------------------

Cypress.Commands.add('loginToCustomersPage', () => {
  cy.visit('http://localhost:8080/index.php/customers')
  cy.get('[id="username"]').type('admin')
  cy.get('[id="password"]').type('admin123')
  cy.get('[class="btn btn-primary"]').click()
  cy.url().should('include', '/index.php/customers')
})

Cypress.Commands.add('loginToCalendarPage', () => {
  cy.visit('http://localhost:8080/index.php/calendar')
  cy.get('[id="username"]').type('admin')
  cy.get('[id="password"]').type('admin123')
  cy.get('[class="btn btn-primary"]').click()
})


//adds a reservation for existing client and get back to clients page
//(for admin_clients_manage tests)
Cypress.Commands.add('addReservationForClient', (clientName) => {
  cy.visit('http://localhost:8080/index.php/calendar')
  cy.get('[class="svg-inline--fa fa-square-plus"]').click()
  cy.wait(500)
  cy.contains('li', 'Appointment').click()
  cy.contains('Select').click()
  cy.get('.modal.fade.show').within(() => {
    cy.contains(clientName).click()
  })
  cy.get('#save-appointment').click()
  cy.get('.navbar-nav').find('.nav-link').eq(1).click()
})

Cypress.Commands.add('addNewClient', (clientData) => {
  cy.get('.required.form-control').should('have.attr', 'disabled')
  cy.get('#add-customer').click()
  cy.get('.required.form-control').should('not.have.attr', 'disabled')
  cy.fillContactInfo(clientData)
  cy.get('#save-customer').click()
})

Cypress.Commands.add('openResEdit', () => {
  cy.get('[tabindex="0"]').first().within(() => {
    cy.get('[class="fc-event-main"]').first().click({force: true})
  })
  cy.contains('Edit').click()
})
// -----------------------------------------------------------------------------