describe('Admin user can manage clients', () => {
  beforeEach(() => {
    cy.wait(1000) 
  })
  
  it('Accessing appointment editing from customer record', () => {
    cy.loginToCustomersPage()
    cy.addReservationForClient('Gordon Freeman')
    cy.get('.customer-row.entry').first().click()
    cy.get('#customer-appointments').within(() => {
      cy.get('.appointment-row').should('exist')
      cy.get('[role="img"]').first().click()
    })
    cy.get('[class="text-black-50 mb-3 fw-light"]')
      .should('contain', 'Appointment Details')
  })

  it('Creating a new client', () => {
    cy.loginToCustomersPage()
    cy.get('.required.form-control').should('have.attr', 'disabled')
    cy.get('#add-customer').click()
    cy.get('.required.form-control').should('not.have.attr', 'disabled')
    cy.fixture('clientData.json').then((clientData) => {
      cy.fillContactInfo(clientData)
      cy.get('#save-customer').click()
      cy.wait(1000)
      //make sure the added client exists with the right info
      cy.get('.text-muted').first().invoke('text').then((text) => {
        const clientMail = text.split(',')[0];
        expect(clientMail).to.equal(clientData.email)
      })
    })
  })

  it('Selecting a client to view details', () => {
    cy.loginToCustomersPage()
    cy.get('#edit-customer').should('have.attr', 'disabled')
    cy.get('#delete-customer').should('have.attr', 'disabled')
    cy.get('[class="customer-row entry"]').first().click()
    cy.get('#edit-customer').should('not.have.attr', 'disabled')
    cy.get('#delete-customer').should('not.have.attr', 'disabled')
  })

  it('Initiating client deletion', () => {
    cy.loginToCustomersPage()
    cy.get('[class="customer-row entry"]').first().click()
    cy.get('#delete-customer').click()
    cy.get('#message-modal').should('not.have.attr', 'aria-hidden')
  })

  it('Confirming client deletion', () => {
    cy.loginToCustomersPage()
    cy.get('[class="customer-row entry"]').first().click()
    cy.get('.text-muted').first().invoke('text').then((text) => {
      const clientMail = text.split(',')[0];
      cy.wrap(clientMail).as('clientMail')
    })
    cy.get('#delete-customer').click()
    cy.get('[class="modal-footer"]').within(() => {
      cy.get('[class="btn btn-primary"]').click()
    })
    cy.wait(1000)
    cy.get('@clientMail').then((clientMail) => {
      cy.get('.text-muted').first().invoke('text').then((text) => {
        const tmp = text.split(',')[0];
        expect(clientMail).to.not.equal(tmp)
      })
    }) 
  })

  it('Adding or modifying a note to client record', () => {
    const newNote = "text"
    cy.loginToCustomersPage()
    cy.get('[class="customer-row entry"]').first().click()
    cy.get('#notes').should('have.attr', 'disabled')
    cy.get('#edit-customer').click()
    cy.get('#notes').should('not.have.attr', 'disabled')
    cy.wrap(newNote).as('newNote')
    cy.get('@newNote').then((newNote) => {
      cy.get('#notes').clear().type(newNote)
      cy.get('#save-customer').click()
      cy.get('#notes').invoke('val').should('contain', newNote)
    })
  })

  it('Filtering customers by their information', () => {
    //add couple more clients
    const lookUp = "John"
    cy.loginToCustomersPage()
    cy.fixture('client4Data.json').then((clientData) => {
      cy.addNewClient(clientData)
    })
    cy.wait(500)
    cy.fixture('client3Data.json').then((clientData) => {
      cy.addNewClient(clientData)
    })
    cy.wait(500)
    cy.fixture('client2Data.json').then((clientData) => {
      cy.addNewClient(clientData)
    })
    //filter the clients using info stored in the lookUp constant
    //also make sure that dontLookUp doesn't appear in the results list
    cy.get('[class="key form-control"]').type(lookUp)
    cy.get('[class="filter btn btn-outline-secondary"]').click()
    cy.wait(1000)
    cy.wrap(lookUp).as('lookUp')
    cy.get('@lookUp').then((lookUp) => {
      cy.get('[class="customer-row entry"]').each(($fullName) => {
        const fullName = $fullName.text().trim()
        cy.wrap(fullName.toLowerCase()).should('include', lookUp.toLowerCase())
      })
    })
    
    
  })

})