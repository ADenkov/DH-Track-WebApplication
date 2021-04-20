
// describe('The Home Page', () => {
//     beforeEach(() => {
//       // reset and seed the database prior to every test
//       cy.exec('npm run db:reset && npm run db:seed')
//     })
  
//     it('successfully loads', () => {
//       cy.visit('/')
//     })
//   })

describe('test login button', () => {
    
    it('Visits the sign in page via "LOGIN" button on navbar', () => {
        cy.visit('http://localhost:3000/')

        cy.get('#btnLogin').click()

        cy.url().should('include', '/login')
    })
})

describe('test login function', () => {
    it('Tries to login with no credentials', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('.btn').click()
    })
})

describe('test login function', () => {
    it('Tries to login with correct credentials', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('#usernameInput')
            .type('Specialized')
            .should('have.value', 'Specialized')
        
        cy.get('#passwordInput')
            .type('123456')
            .should('have.value', '123456')

        cy.get('#loginBtn').click()
  })
})

describe('test login function', () => {
    it('Tries to login with incorrect credentials', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('#usernameInput')
            .type('Specialized')
            .should('have.value', 'Specialized')
        
        cy.get('#passwordInput')
            .type('wrong')
            .should('have.value', 'wrong')

        cy.get('#loginBtn').click()
  })
})




