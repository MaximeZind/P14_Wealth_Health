export function doesEmployeeExist(employeesList, newEmployee) {
    // Vérification que l'employé n'est pas déjà dans la liste
    // On prend en compte Nom, Prénom, date de naissance

    const result = employeesList.filter((employee) => employee.firstName === newEmployee.firstName && employee.lastName === newEmployee.lastName && employee.dateOfBirth === newEmployee.dateOfBirth);
    return result;
}
export function generateUniqueID() {
    const timestamp = new Date().getTime();
    return timestamp;
  }

export function getEmployeeById(id, employeesList){
    const employee = employeesList.find((employee) => employee.id === id)
    return employee;
}

export function haveEmployeeInformationsChanged(employee, updatedEmployee){
    if(employee.firstName === updatedEmployee.firstName 
        && employee.lastName === updatedEmployee.lastName 
        && employee.dateOfBirth === updatedEmployee.dateOfBirth){
            return false;
    } else if (employee.firstName !== updatedEmployee.firstName 
        || employee.lastName !== updatedEmployee.lastName 
        || employee.dateOfBirth !== updatedEmployee.dateOfBirth){
            return true;
        }
}   