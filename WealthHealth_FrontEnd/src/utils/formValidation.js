// Fonction pour valider les noms
export function validateName(string) {
    const nameValue = string.trim();
    const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/; //pattern
    let response = false;
    let errorMsg = null;

    if (nameValue.length >= 2) { // plus de 2 caractères
        if ((regex.test(nameValue)) && (!nameValue.includes(",,")) && (!nameValue.includes("..")) && (!nameValue.includes("''")) && (!nameValue.includes("--")) && (!nameValue.trim().includes("  "))) {
            response = nameValue.toLowerCase();
        } else if ((regex.test(nameValue) === false) || (nameValue.includes(",,")) || (nameValue.includes("..")) || (nameValue.includes("''")) || (nameValue.includes("--")) || nameValue.trim().includes("  ")) {
            errorMsg = "Le nom est invalide."
        }
    } else if (nameValue.length < 2) {
        errorMsg = "Le nom doit faire au moins 2 charactères."
    }

    let validation = {
        response: response,
        errorMsg: errorMsg
    }
    return validation;
}

export function validateDate(string, ageMin, ageMax) {
    const date = new Date(string.trim());
    let response = false;
    let errorMsg = null;

    if (date.toString() === 'Invalid Date') {
        errorMsg = 'Enter a valid date'
    } else if (date.toString() !== 'Invalid Date') {
        if (ageMin && ageMax) {
            const today = new Date();
            const currentDay = today.getDate() + 1;
            const currentMonth = today.getMonth() + 1;
            const currentYear = today.getFullYear();
            let age = currentYear - date.getFullYear();

            if ((currentMonth < date.getMonth() + 1) || (currentMonth === date.getMonth() + 1 && currentDay < date.getDate() + 1)) {
                age--;
            }
            if (age < ageMin) {
                errorMsg = 'The employee is too young to work';
            } else if (age > ageMax) {
                errorMsg = 'The employee is too old to work';
            }
        }
        const day = (date.getDate() + 1).toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const DDMMYYYYdate = `${day}/${month}/${year}`;
        response = DDMMYYYYdate;
    }
    let validation = {
        response: response,
        errorMsg: errorMsg
    }
    return validation;
}