describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
  })
})

describe('Nav buttons exist', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('a[aria-label="Employees list"]').should('exist');
    cy.get('a[aria-label="Create employee"]').should('exist');

  })
})

describe('If I click on Employees list', () => {
  it('navigates to /employeeslist', () => {
    cy.visit('/');
    cy.get('a[aria-label="Employees list"]').click();
    cy.url().should('include', '/employeeslist');
  })
})