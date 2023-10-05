import React, { useState } from 'react';
import classes from '../styles/Form.module.css';
import { getDepartments, getStates } from '../utils/fetchData';
import { addEmployee } from '../actions/employees.action';
import { validatePersonnalInformations, validateAddress, validateWorkSituation } from '../utils/formValidation';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from './TextInput';
import {DateInput} from 'maximez_date_picker';
// import Dropdown from './dropdown/Dropdown';
import {Dropdown} from 'maximez_dropdown';
import Button from './Button';
import { doesEmployeeExist, generateUniqueID } from '../utils/utils';
import PropTypes from 'prop-types';

/**
 * Composant Form pour ajouter un nouvel employé en plusieurs étapes.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {function} props.openModal - La fonction pour ouvrir une modale (doit être fournie par le parent).
 * @param {Object} props.colorPalette - La palette de couleurs utilisée pour le formulaire.
 * @param {string} props.colorPalette.primaryColor - La couleur principale.
 * @param {string} props.colorPalette.secondaryColor - La couleur secondaire.
 * @param {string} props.colorPalette.tertiaryColor - La couleur tertiaire.
 * @param {string} props.colorPalette.quarternaryColor - La couleur quaternaire.
 * @param {string} props.colorPalette.quinaryColor - La couleur quinaire.
 * @param {string} props.colorPalette.senaryColor - La couleur sénary.
 * @returns {JSX.Element} Le composant Form rendu.
 */


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
    const [stateErrorMsg, setStateErrorMsg] = useState('');
    const [zipCodeErrorMsg, setZipCodeErrorMsg] = useState('');
    const [departmentErrorMsg, setDepartmentErrorMsg] = useState('');

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
                const possibleDuplicates = doesEmployeeExist(EmployeeList, newEmployee);
                if (possibleDuplicates.length === 0) {
                    // Si l'employé n'existe pas, on l'ajoute au state
                    openModal(possibleDuplicates, newEmployee);
                    dispatch(addEmployee(newEmployee));
                } else if (possibleDuplicates.length > 0) {
                    // Sinon, un message d'erreur s'affiche dans la modale
                    openModal(possibleDuplicates, newEmployee);
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
            state: setStateErrorMsg,
            zipCode: setZipCodeErrorMsg,
            department: setDepartmentErrorMsg,
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
                id="add_personnal_informations"
                style={{
                    backgroundColor: colorPalette.secondaryColor,
                    border: `1px solid ${colorPalette.quinaryColor}`,
                }}>
                <TextInput name='firstName'
                    label='First Name'
                    errorMsg={firstNameErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor}
                    borderBottomColor={colorPalette.senaryColor} />
                <TextInput name='lastName'
                    label='Last Name'
                    errorMsg={lastNameErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor}
                    borderBottomColor={colorPalette.senaryColor} />
                <DateInput name='dateOfBirth'
                    label='Date of Birth'
                    errorMsg={dateOfBirthErrorMsg}
                    yearsRangeMin={1923}
                    yearsRangeMax={2023}
                    dateInputField={true}
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
                    borderBottomColor={colorPalette.senaryColor}
                />
                <Button text='Next'
                    type='submit'
                    value='personnalInformations'
                    fontColor={colorPalette.secondaryColor}
                    hoveredFontColor={colorPalette.quarternaryColor}
                    backgroundColor={colorPalette.quarternaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}
                    borderColor={colorPalette.quarternaryColor}
                    hoveredBorderColor={colorPalette.quarternaryColor} />
            </form>
            <form
                className={`${classes.address} ${classes[employeeAddressStatus]}`}
                action="#"
                onSubmit={handleFormSubmit}
                id="add_address"
                style={{
                    backgroundColor: colorPalette.secondaryColor,
                    border: `1px solid ${colorPalette.quinaryColor}`,
                }}>
                <TextInput name='street'
                    label='Street'
                    errorMsg={streetErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor}
                    borderBottomColor={colorPalette.senaryColor} />
                <TextInput name='city'
                    label='City'
                    errorMsg={cityErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor}
                    borderBottomColor={colorPalette.senaryColor} />
                <Dropdown list={states}
                    name='state'
                    label='State'
                    errorMsg={stateErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    backgroundColor={colorPalette.secondaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}
                    fontColor={colorPalette.tertiaryColor}
                    hoveredFontColor={colorPalette.tertiaryColor}
                    borderBottomColor={colorPalette.senaryColor}
                    separatedBox={true} searchBar={true} />
                <TextInput name='zipCode'
                    label='Zip Code'
                    errorMsg={zipCodeErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor}
                    borderBottomColor={colorPalette.senaryColor} />
                <div className={classes.buttons}>
                    <Button text='Previous'
                        value='employeeAddress'
                        onClick={handleClickPrevious}
                        fontColor={colorPalette.secondaryColor}
                        hoveredFontColor={colorPalette.quarternaryColor}
                        backgroundColor={colorPalette.quarternaryColor}
                        hoveredBackgroundColor={colorPalette.primaryColor}
                        borderColor={colorPalette.quarternaryColor}
                        hoveredBorderColor={colorPalette.quarternaryColor} />
                    <Button text='Next'
                        value='employeeAddress'
                        fontColor={colorPalette.secondaryColor}
                        hoveredFontColor={colorPalette.quarternaryColor}
                        backgroundColor={colorPalette.quarternaryColor}
                        hoveredBackgroundColor={colorPalette.primaryColor}
                        borderColor={colorPalette.quarternaryColor}
                        hoveredBorderColor={colorPalette.quarternaryColor} />
                </div>
            </form>
            <form
                className={`${classes.work_situation} ${classes[workSituationStatus]}`}
                onSubmit={handleFormSubmit}
                style={{
                    backgroundColor: colorPalette.secondaryColor,
                    border: `1px solid ${colorPalette.quinaryColor}`,
                }}>
                <Dropdown list={departments}
                    name='department'
                    label='Department'
                    errorMsg={departmentErrorMsg}
                    height={40}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    backgroundColor={colorPalette.secondaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}
                    fontColor={colorPalette.tertiaryColor}
                    hoveredFontColor={colorPalette.tertiaryColor}
                    borderBottomColor={colorPalette.senaryColor}
                    separatedBox={true} />
                <DateInput name='startDate'
                    label='Start Date'
                    errorMsg={startDateErrorMsg}
                    yearsRangeMin={1923}
                    yearsRangeMax={2023}
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
                    borderBottomColor={colorPalette.senaryColor} />
                <div className={classes.buttons}>
                    <Button text='Previous'
                        value='workSituation'
                        onClick={handleClickPrevious}
                        fontColor={colorPalette.secondaryColor}
                        hoveredFontColor={colorPalette.quarternaryColor}
                        backgroundColor={colorPalette.quarternaryColor}
                        hoveredBackgroundColor={colorPalette.primaryColor}
                        borderColor={colorPalette.quarternaryColor}
                        hoveredBorderColor={colorPalette.quarternaryColor} />
                    <Button text='Create Employee'
                        value='submit'
                        fontColor={colorPalette.secondaryColor}
                        hoveredFontColor={colorPalette.quarternaryColor}
                        backgroundColor={colorPalette.quarternaryColor}
                        hoveredBackgroundColor={colorPalette.primaryColor}
                        borderColor={colorPalette.quarternaryColor}
                        hoveredBorderColor={colorPalette.quarternaryColor} />
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
        senaryColor: PropTypes.string,
    }).isRequired,
}

export default Form;