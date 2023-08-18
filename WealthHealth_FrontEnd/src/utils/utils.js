export function doesEmployeeExist(employeesList, newEmployee) {
    //Vérification que l'employé n'est pas déjà dans la liste 
    //On prend en compte Nom, Prénom, date de naissance
    let doesEmployeeExist = false;
    employeesList.map((employee) => {
        if (employee.firstName === newEmployee.firstName && employee.lastName === newEmployee.lastName && employee.dateOfBirth === newEmployee.dateOfBirth) {
            console.log("already exists");
            doesEmployeeExist = true;
            return;
        }
    });
    return doesEmployeeExist;
}