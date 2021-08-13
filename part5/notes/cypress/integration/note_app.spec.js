Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})


Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    url: 'http://localhost:3001/api/notes',
    method: 'POST',
    body: { content, important },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
  cy.request('POST', 'http://localhost:3001/api/testing/reset') 
})


describe('Note app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'cesar perez',
        username: 'cesar',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
    
      cy.login({username:"cesar",password:"password"})
    })


    it('front page can be opened', function() {
      cy.contains('Notes')
      cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
      })

      it('user can login', function () {
        cy.contains('login').click()
        cy.get('#username').type('cesar')
        cy.get('#password').type('password')
        cy.get('#login-button').click()

        cy.contains('cesar perez logged-in')
      })  

      it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click() 
    
        cy.get('.error')
        .should('contain', 'Wrong Credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'cesar perez logged in')

      })

      describe.only('when logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'cesar', password: 'password' })
        })
      
    
        it('a new note can be created', function() {
          cy.createNote({
            content: 'another note cypressd',
            important: false
          })
          cy.contains('show all').click()
          cy.contains('a note created by cypress')
        })
  
        describe('and a note exists', function () {
          beforeEach(function () {
            cy.createNote({
              content: 'another note cypress',
              important: false
            })
            cy.contains('show all').click()
          })
    
          it('it can be made important', function () {
            cy.contains('another note cypress')
              .contains('make important')
              .click()
    
            cy.contains('another note cypress')
              .contains('make not important')
          })
        })



      })

  })