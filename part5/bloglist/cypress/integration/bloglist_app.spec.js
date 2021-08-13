describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'cesar perez',
        username: 'cesar',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.get('#login-form')
    })

    describe('login',function(){
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('cesar')
            cy.get('#password').type('password')
            cy.get('#login-button').click()
            cy.contains('Welcome! cesar perez, you are logged in')
          })
          it('fails with wrong credentials', function() {
            cy.get('#username').type('pedro')
            cy.get('#password').type('cacahuate')
            cy.get('#login-button').click()
            cy.get('.error').should('contain','error: Wrong Credentials')
            .should('have.css', 'color', 'rgb(255, 0, 0)')
            .should('have.css', 'border-style', 'solid')
            //cy.contains('Welcome! cesar perez, you are logged in')
          })
    })

  })