describe('If on Employees List, I select 25 entries', () => {
    it('will make the table longer', () => {
        cy.visit('/employeeslist');
        cy.get('table tr').should('have.length', 11) //tableau a 10 lignes + 1 du header
        cy.get('div[class*="dropdown_header"]').click({ force: true });
        cy.get('span[value="25"]').click();
        cy.get('table tr').should('have.length.greaterThan', 11); //tableau a plus de 10 lignes
    })
})

describe('If on Employees List, I type in the search field', () => {
    it('will filter the table entries', () => {
        cy.visit('/employeeslist');
        cy.get('table tr').should('have.length', 11) //tableau a 10 lignes + 1 du header
        cy.get('input[id="search"]').type('Leonardo');
        cy.get('table tr').should('have.length', 2) //tableau a 1 ligne (dicaprio) + 1 du header
        cy.get('input[id="search"]').clear();
        cy.get('table tr').should('have.length', 11) //tableau a 10 lignes + 1 du header
    })
})

describe('If on Employees List, I click on "Next"', () => {
    it('will take me to the second page of the table, with 6 entries', () => {
        cy.visit('/employeeslist');
        cy.get('p').contains('Next').click();
        cy.get('table tr').should('have.length', 7) //tableau a 7 lignes + 1 du header
        cy.get('p').contains('Previous').click();
        cy.get('table tr').should('have.length', 11) //tableau a 7 lignes + 1 du header
    })
})