export function validatePersonnalInformations(object) {
    const firstNameValidation = validateName(object.firstName);
    const lastNameValidation = validateName(object.lastName);
    const dateOfBirthValidation = validateDate(object.dateOfBirth, 18, 100);
    const array = [firstNameValidation, lastNameValidation, dateOfBirthValidation];
    let isValid = true;
    array.map((item) => {
        if (!item.response) {
            isValid = false;
            return;
        }
    });
    const validation = {
        isValid: isValid,
        data: {
            firstName: firstNameValidation.response,
            lastName: lastNameValidation.response,
            dateOfBirth: dateOfBirthValidation.response,
        },
        errorMsg: {
            firstName: firstNameValidation.errorMsg,
            lastName: lastNameValidation.errorMsg,
            dateOfBirth: dateOfBirthValidation.errorMsg,
        }
    }
    return validation;
}

export function validateAddress(object) {

    const streetValidation = validateStreet(object.street);
    const cityValidation = validateCity(object.city);
    const zipCodeValidation = validateZipCode(object.zipCode);
    const array = [streetValidation, cityValidation, zipCodeValidation];

    let isValid = true;
    array.map((item) => {
        if (!item.response) {
            isValid = false;
            return;
        }
    });
    const validation = {
        isValid: isValid,
        data: {
            street: streetValidation.response,
            city: cityValidation.response,
            state: object.state,
            zipCode: zipCodeValidation.response,
        },
        errorMsg: {
            street: streetValidation.errorMsg,
            city: cityValidation.errorMsg,
            zipCode: zipCodeValidation.errorMsg
        }
    }
    return validation;
}

export function validateWorkSituation(object, dateOfBirth) {

    const startDateValidation = validateDate(object.startDate, false, false, dateOfBirth);
    const array = [startDateValidation];

    let isValid = true;
    array.map((item) => {
        if (!item.response) {
            isValid = false;
            return;
        }
    });
    const validation = {
        isValid: isValid,
        data: {
            startDate: startDateValidation.response,
            department: object.department
        },
        errorMsg: {
            startDate: startDateValidation.errorMsg,
        }
    }
    return validation;
}

// Fonction pour valider les noms
export function validateName(string) {
    const nameValue = string.trim();
    const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/; // pattern
    let response = false;
    let errorMsg = null;

    if (nameValue.length >= 2) { // plus de 2 caractères
        if ((regex.test(nameValue)) && (!nameValue.includes(",,")) && (!nameValue.includes("..")) && (!nameValue.includes("''")) && (!nameValue.includes("--")) && (!nameValue.trim().includes("  "))) {
            response = nameValue.charAt(0).toUpperCase() + nameValue.slice(1).toLowerCase();
        } else if ((regex.test(nameValue) === false) || (nameValue.includes(",,")) || (nameValue.includes("..")) || (nameValue.includes("''")) || (nameValue.includes("--")) || nameValue.trim().includes("  ")) {
            errorMsg = "The name is invalid."
        }
    } else if (nameValue.length < 2) {
        errorMsg = "The name should be at least 2 characters."
    }

    let validation = {
        response: response,
        errorMsg: errorMsg
    }
    return validation;
}

// fonction pour valider les dates
// Si c'est une date de naissance, on aura l'âge max et l'âge min à vérifier
export function validateDate(string, ageMin, ageMax, dateOfBirth) {
    const date = new Date(string.trim());
    let response = false;
    let errorMsg = null;

    if (date.toString() === 'Invalid Date') {
        errorMsg = 'Enter a valid date.'
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
                errorMsg = 'The employee is too young to work.';
            } else if (age >= ageMax) {
                errorMsg = 'The employee must be under 100 years old';
            }
        } else if (dateOfBirth) {
            const DOB = new Date(dateOfBirth.trim());
            const yearDifference = date.getFullYear() - DOB.getFullYear();
            if (yearDifference < 18) {
                errorMsg = 'The employee must be at least 18 to start working';
            } else if (yearDifference === 18) {
                // If the year difference is exactly 18, check months and days
                const birthMonth = DOB.getMonth();
                const comparisonMonth = date.getMonth();
                const birthDay = DOB.getDate();
                const comparisonDay = date.getDate();
                if (comparisonMonth < birthMonth || (comparisonMonth === birthMonth && comparisonDay < birthDay)) {
                    errorMsg = 'The employee must be at least 18 to start working';
                }
            }
        }
        const day = (date.getDate()).toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const MMDDYYYYdate = `${month}/${day}/${year}`;
        response = MMDDYYYYdate;
    }
    if (errorMsg) {
        response = false;
    }
    let validation = {
        response: response,
        errorMsg: errorMsg
    }
    return validation;
}

// Fonction pour valider la rue
export function validateStreet(string) {
    const address = string.trim();
    let response = false;
    let errorMsg = null;
    const minLength = 5;
    const regex = /^[a-zA-Z0-9\s'.,-]*$/;
    if (address.length === 0) {
        errorMsg = "This field is empty.";
    } else if (address.length !== 0 && address.length < minLength) {
        errorMsg = "This address is too short.";
    } else if (address.length >= minLength) {
        if (!regex.test(address)) {
            errorMsg = "This address is invalid."
        } else if (regex.test(address)) {
            response = address.toLowerCase();
        }
    }

    let validation = {
        response: response,
        errorMsg: errorMsg
    }
    return validation;
}

// Fonction pour valider la ville
export function validateCity(string) {
    const city = string.trim();
    let response = false;
    let errorMsg = null;
    const minLength = 2;
    const regex = /^[a-zA-Z\s.,-]*$/;
    if (city.length === 0) {
        errorMsg = "This field is empty.";
    } else if (city.length !== 0 && city.length < minLength) {
        errorMsg = "This city name is too short.";
    } else if (city.length >= minLength) {
        if (!regex.test(city)) {
            errorMsg = "This city name is invalid."
        } else if (regex.test(city)) {
            response = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
        }
    }

    let validation = {
        response: response,
        errorMsg: errorMsg
    }
    return validation;
}

// Fonction pour valider le zipcode
export function validateZipCode(string) {
    const zipCode = string.trim();
    let response = false;
    let errorMsg = null;
    // Zip code américain : XXXXX ou XXXXX-XXXX
    let regex = /^\d{5}(?:-\d{4})?$/;

    if (regex.test(zipCode)) {
        response = zipCode;
    } else if (!regex.test(zipCode)) {
        errorMsg = 'The Zip Code is invalid.'
    }

    let validation = {
        response: response,
        errorMsg: errorMsg
    }
    return validation;
}