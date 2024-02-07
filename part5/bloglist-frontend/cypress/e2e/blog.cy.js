describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'teuser',
      password: 'p455word'
    }
    const userkaks = {
      name: 'no own blogs',
      username: 'blogboss',
      password: 's4l1s'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', userkaks)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('#username').should('contain', '')
    cy.get('#password').should('contain', '')
    cy.get('#login').should('contain', 'login')
  })

  describe('login', function() {
    it('login with valid user and pw', function() {
      cy.get('#username').type('teuser')
      cy.get('#password').type('p455word')
      cy.get('#login').click()
      cy.get('#notification').contains('logged in as Test User')
    })
    it('login with invalid user fails', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('p455word')
      cy.get('#login').click()
      cy.get('#notification').contains('wrong username or password')
    })
    it('login with invalid password fails', function () {
      cy.get('#username').type('teuser')
      cy.get('#password').type('wrongpw')
      cy.get('#login').click()
      cy.get('#notification').contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'teuser', password: 'p455word' })
      cy.get('#toggle_show').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create_blog').click()
      cy.get('#toggle_show').click()
      cy.get('#title').type('most liked')
      cy.get('#author').type('likable')
      cy.get('#url').type('likable url')
      cy.get('#create_blog').click()
    })
    it('create a new blog', function () {
      cy.get('#title').type('New blog')
      cy.get('#author').type('Jorma')
      cy.get('#url').type('http://salablog.com')
      cy.get('#create_blog').click()
      cy.get('#notification').contains('a new blog New blog by Jorma added')
      cy.get('.blog_shrinked').contains('New blog')
    })
    it('like a blog', function () {
      cy.get('.show_blog').click()
      cy.get('.like').click()
      cy.get('#notification').contains('liked test title')
    })
    it('delete own blog succeeds', function() {
      cy.get('.show_blog').click()
      cy.get('.delete').click()
      cy.get('#notification').contains('test title by test author was deleted successfully')
    })
    it('delete button is visible only for owner', function () {
      cy.get('.show_blog').click()
      cy.get('.delete')
        .should('exist')
        .should('be.visible')
        .should('be.enabled')
      cy.login({ username: 'blogboss', password: 's4l1s'})
      cy.get('.show_blog').click()
      cy.get('.delete').should('not.exist')
    })
    it.only('blogs are ordered by likes', function () {
      cy.get('ul li')
        .first()
        .contains('test title')
      cy.get('ul li')
        .eq(1)
        .find('.blog_shrinked')
        .find('.show_blog')
        .click()
      cy.get('ul li')
        .eq(1)
        .find('.like')
        .click()
      cy.get('ul li')
        .first()
        .contains('most liked')
      cy.get('ul li')
        .last()
        .contains('test title')
    })
  })
})