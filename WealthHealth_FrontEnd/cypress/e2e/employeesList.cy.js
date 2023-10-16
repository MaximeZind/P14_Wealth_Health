describe('If on Employees List, I select 25 entries', () => {
    it('will make the table longer', () => {
        cy.visit('/employeeslist');
        cy.get('div[class*="component_container"]').contains('Entries').click({ force: true });
        cy.get('span').contains('25').click();
    })
})