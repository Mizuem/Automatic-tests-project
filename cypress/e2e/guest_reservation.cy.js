


describe('Guest reservation', () => {
  beforeEach(() => {
    cy.wait(1000);
    cy.fixture('clientData.json').then((data) => {
      cy.wrap(data).as('clientData');
    })
  });

  it('Guest selects appointment time', () => {
    cy.visit('localhost:8080')
    cy.get('#available-hours').should('be.visible')
    cy.get('#available-hours button').first().click()
    cy.get('.flatpickr-day:not(.flatpickr-disabled)').first().click()
    cy.get('#button-next-2').should('be.visible').click()
    cy.wait(500)
    cy.get('#step-3').should('have.class', 'active-step')

  })
  
  it('Guest provides contact information', () => {
    cy.getToSecondPage()

    cy.get('@clientData').then((clientData) => {
      cy.fillContactInfo(clientData)
    })

    cy.get('#button-next-3').should('be.visible').click()
    cy.get('#step-4').should('have.class', 'active-step')
  })
  
  it('Guest confirms appointment', () => {
    cy.getToThirdPage()
    cy.get('#book-appointment-submit').should('be.visible').click()
    cy.url().should('include', '/booking_confirmation')
  })

  it('Guest tries to leave information fields empty', () => {
    cy.getToSecondPage()
    cy.get('#button-next-3').should('be.visible').click()
    cy.get('#email.required.form-control.is-invalid').should('exist')
    cy.get('#first-name.required.form-control.is-invalid').should('exist')
    cy.get('#last-name.required.form-control.is-invalid').should('exist')
    cy.get('#phone-number.required.form-control.is-invalid').should('exist')
  })

  it('Booked time slot is not shown to other guests', () => {
    cy.visit('localhost:8080')
    cy.get('#available-hours').should('be.visible')
    // Get the text from the first button in the available hours
    cy.get('#available-hours button').first().invoke('text').then((text) => {
      cy.wrap(text).as('bookedTime')
    })

    // Finish the reservation
    cy.get('#available-hours button').first().click()

    cy.get('#button-next-2').should('be.visible').click()
    
    cy.get('@clientData').then((clientData) => {
      cy.fillContactInfo(clientData)
    })

    cy.get('#button-next-3').should('be.visible').click()
    cy.get('#book-appointment-submit').should('be.visible').click()
    cy.get('.btn.btn-primary.btn-large').click()

    // Make sure that we can no longer see the booked time slot
    cy.get('#available-hours button').first().invoke('text').then((text) => {
      cy.wrap(text).as('bookedTimeNew')
    })
    cy.get('@bookedTime').then((bookedTime) => {
      cy.get('@bookedTimeNew').then((bookedTimeNew) => {
        expect(bookedTime).not.to.equal(bookedTimeNew)
      })
    })
  })

  it('Guest navigates from confirmation to contact information page', () => {
    cy.getToThirdPage()
    cy.get('#button-back-4').click()
    cy.get('#step-3').should('have.class', 'active-step')
  })
  
  it('Guest navigates from contact information to appointment time selection', () => {
    cy.getToThirdPage()
    cy.get('#button-back-4').click()
    cy.get('#step-3').should('have.class', 'active-step')
    cy.get('#button-back-3').click()
    cy.get('#step-2').should('have.class', 'active-step')
  })

  it('Guest modifies information and navigates back to confirmation', () => {
    const modifiedAddress = 'New Address'
    cy.wrap(modifiedAddress).as('modifiedAddress')
    cy.getToThirdPage()
    cy.get('#button-back-4').click()
    cy.get('#step-3').should('have.class', 'active-step')
    cy.get('#address').should('be.visible').clear().type(modifiedAddress)
    cy.get('#button-next-3').should('be.visible').click()
    cy.get('#step-4').should('have.class', 'active-step')
    cy.get('@modifiedAddress').then((modifiedAddress) => {
      cy.get('div.mb-2').eq(12).should('contain', modifiedAddress)
    })
  })
})