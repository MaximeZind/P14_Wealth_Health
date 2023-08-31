import React, { useState } from 'react';
import classes from '../styles/Form.module.css';
import { getDepartments, getStates } from '../utils/fetchData';
import { addEmployee } from '../actions/employees.action';
import { validatePersonnalInformations, validateAddress, validateWorkSituation } from '../utils/formValidation';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from './TextInput';
import DateInput from './DateInput';
import Dropdown from './dropdown/Dropdown';
import Button from './button';
import { doesEmployeeExist } from '../utils/utils';
import PropTypes from 'prop-types';

function Form({getModalText}) {

    const dispatch = useDispatch()
    const departments = getDepartments();
    const states = getStates();
    const EmployeeList = useSelector((state) => state.employeesReducer);

    //Messages d'erreur
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('');
    const [dateOfBirthErrorMsg, setDateOfBirthErrorMsg] = useState('');
    const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
    const [streetErrorMsg, setStreetErrorMsg] = useState('');
    const [cityErrorMsg, setCityErrorMsg] = useState('');
    const [zipCodeErrorMsg, setZipCodeErrorMsg] = useState('');

    //States avec nos données
    const [personnalInformations, setPersonnalInformations] = useState(null);
    const [employeeAddress, setEmployeeAddress] = useState(null);

    //States pour gérer les animations / formulaires affichés
    const [personnalInformationsStatus, setPersonnalInformationsStatus] = useState('active');
    const [employeeAddressStatus, setEmployeeAddressStatus] = useState('inactive');
    const [workSituationStatus, setWorkSituationStatus] = useState('inactive');

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

    function handleFormSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        if (form.className.includes('personnal_informations')) {
            const formValidation = validatePersonnalInformations(formJson);
            if (formValidation.isValid === true) {
                setPersonnalInformations(formValidation.data);
                handleClickNext('personnalInformations');
            }
            handleErrorMsgs(formValidation.errorMsg);
        } else if (form.className.includes('address')) {
            const formValidation = validateAddress(formJson);
            if (formValidation.isValid === true) {
                setEmployeeAddress(formValidation.data);
                handleClickNext('employeeAddress');
            }
            handleErrorMsgs(formValidation.errorMsg);
        } else if (form.className.includes('work_situation')) {
            const formValidation = validateWorkSituation(formJson);
            if (formValidation.isValid === true) {
                const newEmployee = Object.assign(personnalInformations, employeeAddress, formValidation.data);
                //Vérification que l'employé n'est pas déjà dans la liste 
                const verification = doesEmployeeExist(EmployeeList, newEmployee);
                if (verification === false) {
                    //Si l'employé n'existe pas, on l'ajoute au state 
                    getModalText('This employee was successfully created!');
                    dispatch(addEmployee(newEmployee));
                } else if (verification === true){
                    getModalText('This employee was already created.');
                }
            }
            handleErrorMsgs(formValidation.errorMsg);
        }
    }

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
                    <Dropdown list={states} name='state' label='State' />
                <TextInput name='firstName' label='First Name' errorMsg={firstNameErrorMsg} />
                <TextInput name='lastName' label='Last Name' errorMsg={lastNameErrorMsg} />
                <DateInput name='dateOfBirth' label='Date of Birth' errorMsg={dateOfBirthErrorMsg} />
                <Button text='Next' type='submit' value='personnalInformations' />
            </form>
            <form
                className={`${classes.address} ${classes[employeeAddressStatus]}`}
                action="#"
                onSubmit={handleFormSubmit}
                id="add_address">
                <TextInput name='street' label='Street' errorMsg={streetErrorMsg} />
                <TextInput name='city' label='City' errorMsg={cityErrorMsg} />
                <Dropdown list={states} name='state' label='State' />
                <TextInput name='zipCode' label='Zip Code' errorMsg={zipCodeErrorMsg} />
                <div className={classes.buttons}>
                    <Button text='Previous' value='employeeAddress' onClick={handleClickPrevious} />
                    <Button text='Next' value='employeeAddress' />
                </div>
            </form>
            <form
                className={`${classes.work_situation} ${classes[workSituationStatus]}`}
                onSubmit={handleFormSubmit}>
                <Dropdown list={departments} name='department' label='Department' />
                <DateInput name='startDate' label='Start Date' errorMsg={startDateErrorMsg} />
                <div className={classes.buttons}>
                    <Button text='Previous' value='workSituation' onClick={handleClickPrevious} />
                    <Button text='Create Employee' value='submit' />
                </div>
            </form>
        </div>
    );
}

Form.propTypes = {
    getModalText: PropTypes.func.isRequired,
  }

export default Form;