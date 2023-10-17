describe('If on Create employee, I click on next without filling up the form', () => {
    it('will show error messages', () => {
        cy.visit('/');
        cy.get('button[value="personnalInformations"]').click();
        cy.contains('Please enter a name');
        cy.contains('Enter a valid date');
    })
})

describe('If on Create employee, I click on next after filling up the form with mistakes', () => {
    it('will show error messages', () => {
        cy.visit('/');
        cy.get('input[name="firstName"]').type('######', { force: true });
        cy.get('input[name="lastName"]').type('######', { force: true });
        cy.get('input[name="dateOfBirth"]').type('xx/xx/xxxx', { force: true });
        cy.get('button[value="personnalInformations"]').click();
        cy.contains('The name is invalid');
        cy.contains('Enter a valid date');
    })
})

describe('If on Create employee, I successfully create an employee', () => {
    it('will open a confirmation modal', () => {
        const currentYear = new Date().getFullYear();
        cy.visit('/');
        cy.get('input[name="firstName"]').type('John', { force: true });
        cy.get('input[name="lastName"]').type('Doe', { force: true });
        cy.get('label[for="dateOfBirth"]').click();
        cy.get('span').contains(currentYear.toString()).click();
        cy.get('span').contains('1990').click();
        cy.get('button[value="personnalInformations"]').click();

        cy.get('form[class*="address"]').should('be.visible');

        cy.get('input[name="street"]').type('hollywood street', { force: true });
        cy.get('input[name="city"]').type('los angeles', { force: true });
        cy.get('div[class*="component_container"]').contains('State').click();
        cy.get('span').contains('Alabama').click();
        cy.get('input[name="zipCode"]').type('12345', { force: true });
        cy.get('button[value="employeeAddress"]').contains('Next').click();

        cy.get('div[class*="component_container"]').contains('Department').click();
        cy.get('span').contains('Marketing').click();
        cy.get('label[for="startDate"]').click();
        cy.get('span').contains('17').click();

        cy.get('button').contains('Create Employee').click();
        cy.get('div[class*="modal"] p').should('have.text', 'This employee was successfully created.');
    })
})

describe('If on Create employee, I create an employee already in the system', () => {
    it('will open a confirmation modal', () => {
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' })

        cy.visit('/');
        cy.get('input[name="firstName"]').type('Maxime', { force: true });
        cy.get('input[name="lastName"]').type('Zinderstein', { force: true });
        cy.get('label[for="dateOfBirth"]').click();
        cy.get('span').contains(currentYear.toString()).click();
        cy.get('span').contains('1990').click();
        cy.get('span').contains(currentMonth).click();
        cy.get('span').contains('May').click();
        cy.get('span').contains('5').click();
        cy.get('button[value="personnalInformations"]').click();

        cy.get('form[class*="address"]').should('be.visible');

        cy.get('input[name="street"]').type('hollywood street', { force: true });
        cy.get('input[name="city"]').type('los angeles', { force: true });
        cy.get('div[class*="component_container"]').contains('State').click();
        cy.get('span').contains('Alabama').click();
        cy.get('input[name="zipCode"]').type('12345', { force: true });
        cy.get('button[value="employeeAddress"]').contains('Next').click();

        cy.get('div[class*="component_container"]').contains('Department').click();
        cy.get('span').contains('Marketing').click();
        cy.get('label[for="startDate"]').click();
        cy.get('span').contains('17').click();

        cy.get('button').contains('Create Employee').click();
        cy.get('button:contains("Confirm")').should('exist');
        cy.get('button:contains("Update")').should('exist');
    })
})