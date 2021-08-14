Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

  Cypress.Commands.add('createBlog', ({ title,author,url }) => {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: { title, author,url },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    })
  
    cy.visit('http://localhost:3000')
  })

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

    describe('When logged in, user can view, like and remove blogs', function() {
        beforeEach(function() {
            cy.login({username:'cesar',password:'password'})
            cy.get('#new-blog-btn').click()
            cy.get('#title').type('blogCreatedFromcypress')
            cy.get('#author').type('Vin Diesel')
            cy.get('#url').type('http.com')
            cy.get('#create').click()
        })
    
        it('A blog can be created', function() {
          
          cy.contains('blogCreatedFromcypress - Vin Diesel')
          cy.get('.message')
          .should('contain','a new Blog blogCreatedFromcypress by Vin Diesel')
          .should('have.css','color','rgb(0, 128, 0)')
          .should('have.css', 'border-style', 'solid')
        })
        it('A blog can be liked', function() {
            cy.get('.showHideButton').click()
            cy.get('.likeButton').click()
            cy.contains('Likes:1')
            cy.get('.message') //
            .should('contain','The blog blogCreatedFromcypress received a like')
            .should('have.css','color','rgb(0, 128, 0)')
            .should('have.css', 'border-style', 'solid')
          })
          it('A blog can be deleted', function() {
            cy.get('.showHideButton').click()
            cy.get('.remove-blog').click()
            cy.get('logCreatedFromcypress - Vin Diesel').should('not.exist')
          })
    })
    //Esta vaina casi me derrite el cerebro. Testing, te amo y odio
    
    describe.only('Blogs Are sorted', function() {
        beforeEach(function() {
            cy.login({username:'cesar',password:'password'})
            cy.createBlog({title:'titulo',author:'alan',url:'http'})
            cy.createBlog({title:'titulo2',author:'fred',url:'http2'})
            cy.createBlog({title:'titulo3',author:'alfredo',url:'http3'})
        })

        it('Multiple Blogs Can Be liked and they are sorted', function() {
            const blog1=cy.contains('titulo - alan');
            likeMultipleTimes(blog1,3)
            const blog2=cy.contains('titulo2 - fred');
            likeMultipleTimes(blog2,1)
            const blog3=cy.contains('titulo3 - alfredo');
            likeMultipleTimes(blog3,4)

            cy.get('.blog').then(blogs=>{
                blogs.map((i,el)=>{
                    const blogInfo= i===0?'titulo3 - alfredo':i===1?'titulo - alan':'titulo2 - fred'
                    cy.wrap(el).should('contain', blogInfo)
                })
            })
            
          })
    })

  })


  const likeMultipleTimes=(element,times)=>{
    element.contains('View').click()
    for(let i=0;i<times;i++){
        element.get('.likeButton').click()
        element.parent().contains(`Likes:${i+1}`)
    }
    element.parent()
    element.parent().contains('Hide').click()
  }