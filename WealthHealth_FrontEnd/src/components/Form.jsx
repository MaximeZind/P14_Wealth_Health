import React, { useState } from 'react';
import classes from '../styles/Form.module.css';
import { getDepartments, getStates } from '../utils/fetchData';
import { addEmployee } from '../actions/employees.action';
import { validatePersonnalInformations, validateAddress, validateWorkSituation } from '../utils/formValidation';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from './TextInput';
import DateInput from './datepicker/DateInput';
import Dropdown from './dropdown/Dropdown';
import Button from './Button';
import { doesEmployeeExist, generateUniqueID } from '../utils/utils';
import PropTypes from 'prop-types';

function Form({ openModal, colorPalette }) {

    const dispatch = useDispatch()
    const departments = getDepartments();
    const states = getStates();
    const EmployeeList = useSelector((state) => state.employeesReducer);

    // Messages d'erreur
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('');
    const [dateOfBirthErrorMsg, setDateOfBirthErrorMsg] = useState('');
    const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
    const [streetErrorMsg, setStreetErrorMsg] = useState('');
    const [cityErrorMsg, setCityErrorMsg] = useState('');
    const [zipCodeErrorMsg, setZipCodeErrorMsg] = useState('');

    // States avec nos données
    const [personnalInformations, setPersonnalInformations] = useState(null);
    const [employeeAddress, setEmployeeAddress] = useState(null);

    // States pour gérer les animations / formulaires affichés
    const [personnalInformationsStatus, setPersonnalInformationsStatus] = useState('active');
    const [employeeAddressStatus, setEmployeeAddressStatus] = useState('inactive');
    const [workSituationStatus, setWorkSituationStatus] = useState('inactive');

    // Fonction qui gère la navigation d'un formulaire à l'autre, une fois validé
    // (gère les animations via setTimeOut)
    function handleClickNext(completedPart) {
        if (completedPart === 'personnalInformations') {
            setPersonnalInformationsStatus('inactivating');
            setTimeout(() => {
                setEmployeeAddressStatus('activating');
                setPersonnalInformationsStatus('inactive');
            }, 450);
            setTimeout(() => {
                setEmployeeAddressStatus('active');
            }, 900);
        } else if (completedPart === 'employeeAddress') {
            setEmployeeAddressStatus('inactivating');
            setTimeout(() => {
                setWorkSituationStatus('activating');
                setEmployeeAddressStatus('inactive');
            }, 450);
            setTimeout(() => {
                setWorkSituationStatus('active');
            }, 900);
        }
    }

    // Fonction pour revenir au formulaire précédent
    // (gère les animations via setTimeOut)
    function handleClickPrevious(event) {
        event.preventDefault();
        const completedPart = event.target.value;
        if (completedPart === 'employeeAddress') {
            setEmployeeAddressStatus('inactivating_right');
            setTimeout(() => {
                setPersonnalInformationsStatus('activating_right');
                setEmployeeAddressStatus('inactive');
            }, 450);
            setTimeout(() => {
                setPersonnalInformationsStatus('active');
            }, 900);
        } else if (completedPart === 'workSituation') {
            setWorkSituationStatus('inactivating_right');
            setTimeout(() => {
                setEmployeeAddressStatus('activating_right');
                setWorkSituationStatus('inactive');
            }, 450);
            setTimeout(() => {
                setEmployeeAddressStatus('active');
            }, 900);
        }
    }

    // Fonction de gestion de soumission du formulaire (appelée à chaque étape)
    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        // Première partie du formulaire
        if (form.className.includes('personnal_informations')) {
            const formValidation = validatePersonnalInformations(formJson);
            if (formValidation.isValid === true) {
                setPersonnalInformations(formValidation.data);
                handleClickNext('personnalInformations');
            }
            handleErrorMsgs(formValidation.errorMsg);
            // Seconde partie du formulaire
        } else if (form.className.includes('address')) {
            const formValidation = validateAddress(formJson);
            if (formValidation.isValid === true) {
                setEmployeeAddress(formValidation.data);
                handleClickNext('employeeAddress');
            }
            handleErrorMsgs(formValidation.errorMsg);
            // Dernière partie du formulaire
        } else if (form.className.includes('work_situation')) {
            const formValidation = validateWorkSituation(formJson, personnalInformations.dateOfBirth);
            if (formValidation.isValid === true) {
                // On attribue un id correspondant a la longueur de la liste + 1
                const idObject = { id: generateUniqueID() }
                const newEmployee = Object.assign(personnalInformations, employeeAddress, formValidation.data, idObject);
                // Vérification que l'employé n'est pas déjà dans la liste
                const verification = doesEmployeeExist(EmployeeList, newEmployee);
                if (verification === false) {
                    // Si l'employé n'existe pas, on l'ajoute au state
                    openModal(true);
                    dispatch(addEmployee(newEmployee));
                } else if (verification === true) {
                    // Sinon, un message d'erreur s'affiche dans la modale
                    openModal(false, newEmployee);
                }
            }
            handleErrorMsgs(formValidation.errorMsg);
        }
    }

    // fonction de gestion des messages d'erreur
    // reçoit un objet type:
    // {
    //  dateOfBirth: "Enter a valid date"
    //  firstName: "The name should be a least 2 characters"
    // }
    function handleErrorMsgs(errorMsgs) {

        const setters = {
            firstName: setFirstNameErrorMsg,
            lastName: setLastNameErrorMsg,
            dateOfBirth: setDateOfBirthErrorMsg,
            startDate: setStartDateErrorMsg,
            street: setStreetErrorMsg,
            city: setCityErrorMsg,
            zipCode: setZipCodeErrorMsg,
        };

        Object.entries(errorMsgs).map(([field, errorMsg]) => {
            // exemple
            // if (setters[firstName]){
            //     setters[firstName(errorMsg)] ( ou setFirstNameErrorMsg(errorMsg))
            // }
            if (setters[field]) {
                setters[field](errorMsg);
            }
        });
    }


    return (
        <div>
            <form
                className={`${classes.personnal_informations} ${classes[personnalInformationsStatus]}`}
                action="#"
                onSubmit={handleFormSubmit}
                id="add_personnal_informations">
                <TextInput name='firstName'
                    label='First Name'
                    errorMsg={firstNameErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor} />
                <TextInput name='lastName'
                    label='Last Name'
                    errorMsg={lastNameErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor} />
                <DateInput name='dateOfBirth'
                    label='Date of Birth'
                    errorMsg={dateOfBirthErrorMsg}
                    yearsRangeMin={1923}
                    yearsRangeMax={2023}
                    roundYearHighlight={true}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor}
                    selectedDayFontColor={colorPalette.secondaryColor}
                    previousNextMonthFontColor={colorPalette.quinaryColor}
                    iconColor={colorPalette.tertiaryColor}
                    backgroundColor={colorPalette.secondaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}
                    selectedDayBackgroundColor={colorPalette.quarternaryColor}
                    selectedMonthYearBackgroundColor={colorPalette.senaryColor}
                    todayBackgroundColor={colorPalette.senaryColor}
                />
                <Button text='Next' 
                type='submit' 
                value='personnalInformations'
                fontColor={colorPalette.secondaryColor}
                hoveredFontColor={colorPalette.quarternaryColor}
                backgroundColor={colorPalette.quarternaryColor}
                hoveredBackgroundColor={colorPalette.primaryColor} />
            </form>
            <form
                className={`${classes.address} ${classes[employeeAddressStatus]}`}
                action="#"
                onSubmit={handleFormSubmit}
                id="add_address">
                <TextInput name='street'
                    label='Street'
                    errorMsg={streetErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor} />
                <TextInput name='city'
                    label='City'
                    errorMsg={cityErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor} />
                <Dropdown list={states}
                    name='state'
                    label='State'
                    height={40}
                    backgroundColor={colorPalette.secondaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}
                    fontColor={colorPalette.tertiaryColor}
                    hoveredFontColor={colorPalette.tertiaryColor}
                    separatedBox={true} searchBar={true} />
                <TextInput name='zipCode'
                    label='Zip Code'
                    errorMsg={zipCodeErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor} />
                <div className={classes.buttons}>
                    <Button text='Previous' 
                    value='employeeAddress' 
                    onClick={handleClickPrevious}
                    fontColor={colorPalette.secondaryColor}
                    hoveredFontColor={colorPalette.quarternaryColor}
                    backgroundColor={colorPalette.quarternaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor} />
                    <Button text='Next' value='employeeAddress' />
                </div>
            </form>
            <form
                className={`${classes.work_situation} ${classes[workSituationStatus]}`}
                onSubmit={handleFormSubmit}>
                <Dropdown list={departments}
                    name='department'
                    label='Department'
                    height={40}
                    backgroundColor={colorPalette.secondaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}
                    fontColor={colorPalette.tertiaryColor}
                    hoveredFontColor={colorPalette.tertiaryColor}
                    separatedBox={true} />
                <DateInput name='startDate' label='Start Date' errorMsg={startDateErrorMsg} yearsRangeMin={1923} yearsRangeMax={2023} roundYearHighlight={true} />
                <div className={classes.buttons}>
                    <Button text='Previous' 
                    value='workSituation' 
                    onClick={handleClickPrevious} 
                    fontColor={colorPalette.secondaryColor}
                    hoveredFontColor={colorPalette.quarternaryColor}
                    backgroundColor={colorPalette.quarternaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}/>
                    <Button text='Create Employee' 
                    value='submit' 
                    fontColor={colorPalette.secondaryColor}
                    hoveredFontColor={colorPalette.quarternaryColor}
                    backgroundColor={colorPalette.quarternaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}/>
                </div>
            </form>
        </div>
    );
}

Form.propTypes = {
    openModal: PropTypes.func.isRequired,
    colorPalette: PropTypes.shape({
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        tertiaryColor: PropTypes.string,
        quarternaryColor: PropTypes.string,
        quinaryColor: PropTypes.string,
    }),
}

export default Form;