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
    it('will create one more entry in the list', () => {

        cy.visit('/employeeslist');
        cy.get('div[class*="dropdown_header"]').click({ force: true });
        cy.get('span[value="25"]').click();
        cy.get('table tr').should('have.length', 17);
        cy.get('a[aria-label="Create employee"]').click();

        newEmployeeCreation('John', 'Doe', '1990', 'June', '17');

        cy.get('div[class*="modal"] p').should('have.text', 'This employee was successfully created.');
        cy.get('button:contains("Close")').click();
        cy.get('a[aria-label="Employees list"]').click();
        cy.get('div[class*="dropdown_header"]').click({ force: true });
        cy.get('span[value="25"]').click();
        cy.get('table tr').should('have.length', 18);
    })
})

describe('If on Create employee, I create an employee already in the system, and click on Confirm', () => {
    it('will create a new employee', () => {
        newEmployeeCreation('Maxime', 'Zinderstein', '1990', 'May', '5');
        cy.get('button:contains("Confirm")').click();
        cy.get('button:contains("Close")').click();
        cy.get('a[aria-label="Employees list"]').click();
        cy.get('input[id="search"]').type('Maxime');
        cy.get('table tr').should('have.length', 3)

    })
})

describe('If on Create employee, I create an employee already in the system, and click on Update', () => {
    it('will update the existing employee', () => {
        newEmployeeCreation('Maxime', 'Zinderstein', '1990', 'May', '5');
        cy.get('button:contains("Update")').click();
        cy.get('button:contains("Close")').click();
        cy.get('a[aria-label="Employees list"]').click();
        cy.get('input[id="search"]').type('Maxime');
        cy.get('table tr').should('have.length', 2)
        cy.get('table tr:contains("Maxime")').should('contain', 'hollywood street');
    })
})


//Function that will correctly fill the forms, and stop at the Confirm/Update modal
function newEmployeeCreation(firstName, lastName, year, month, day) {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' })

    cy.visit('/');
    cy.get('input[name="firstName"]').type(firstName, { force: true });
    cy.get('input[name="lastName"]').type(lastName, { force: true });
    cy.get('label[for="dateOfBirth"]').click();
    cy.get('span').contains(currentYear.toString()).click();
    cy.get('span').contains(year).click();
    cy.get('span').contains(currentMonth).click();
    cy.get('span').contains(month).click();
    cy.get('span').contains(day).click();
    cy.get('button[value="personnalInformations"]').click();

    cy.get('form[class*="address"]').should('be.visible');

    cy.get('input[name="street"]').type('hollywood street', { force: true });
    cy.get('input[name="city"]').type('los angeles', { force: true });
    cy.get('div[class*="component_container"]')
        .contains('State')
        .parent()
        .find('div[class*="dropdown_header"]')
        .click();
    cy.get('span').contains('Alabama').click();
    cy.get('input[name="zipCode"]').type('12345', { force: true });
    cy.get('button[value="employeeAddress"]').contains('Next').click();

    cy.get('div[class*="component_container"]')
        .contains('Department')
        .parent()
        .find('div[class*="dropdown_header"]')
        .click();
    cy.get('span').contains('Marketing').click();
    cy.get('label[for="startDate"]').click();
    cy.get('span').contains('17').click();

    cy.get('button').contains('Create Employee').click();
}
