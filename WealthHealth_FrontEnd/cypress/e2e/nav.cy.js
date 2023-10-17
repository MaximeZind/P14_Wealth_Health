describe('If on Create Employee, I click on the "Employees List" icon', () => {
    it('will take me to the employees list page', () => {
        cy.visit('/');
        cy.get('a[aria-label="Employees list"]').click();
        cy.get('table').should('exist');
        cy.get('a[aria-label="Create employee"]').click();
        cy.get('h2').contains('Create Employee').should('exist');
    })
})

describe('If I navigate to a url that does not exist', () => {
    it('will take me to the 404 page', () => {
        cy.visit('/wrongurl');
        cy.url().should('include', '/404');
    })
})