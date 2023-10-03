// Fonction qui va filtrer les employés en fonction de
// l'input utilisateur
export function search(inputKeywords, employeesList) {
    let result = [];
    employeesList.map((employee) => {
        let count = 0;
        const employeesArray = Object.values(employee).toString();
        inputKeywords.map((word) => {
            if (employeesArray.toLowerCase().trim().includes(word.toLowerCase().trim())) {
                count++;
            }
            if (count === inputKeywords.length) {
                result.push(employee);
            }
        })
    });
    return result;
}