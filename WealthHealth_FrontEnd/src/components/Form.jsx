import React, { useState } from 'react';
import classes from '../styles/Form.module.css';
import { getDepartments, getStates } from '../utils/fetchData';
import { addEmployee } from '../actions/employees.action';
import { validateForm } from '../utils/formValidation';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from './TextInput';
import DateInput from './DateInput';
import Dropdown from './Dropdown';

function Form() {

    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('');
    const [dateOfBirthErrorMsg, setDateOfBirthErrorMsg] = useState('');
    const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
    const [streetErrorMsg, setStreetErrorMsg] = useState('');
    const [cityErrorMsg, setCityErrorMsg] = useState('');
    const [zipCodeErrorMsg, setZipCodeErrorMsg] = useState('');

    const EmployeeList = useSelector((state) => state.employeesReducer);

    const dispatch = useDispatch()

    function saveEmployee(event){
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        //On associe les champs avec les fonctions qui mettent en place les messages d'erreur
        const setters = {
            firstName: setFirstNameErrorMsg,
            lastName: setLastNameErrorMsg,
            dateOfBirth: setDateOfBirthErrorMsg,
            startDate: setStartDateErrorMsg,
            street: setStreetErrorMsg,
            city: setCityErrorMsg,
            zipCode: setZipCodeErrorMsg,
        };
        const formValidation = validateForm(formJson);
        console.log(formValidation.data);
        if (formValidation.isValid){
            //Vérification que l'employé n'est pas déjà dans la liste 
            //On prend en compte Nom, Prénom, date de naissance
            let doesEmployeeExist = false;
            EmployeeList.map((employee) => {
                if (employee.firstName === formValidation.data.firstName && employee.lastName === formValidation.data.lastName && employee.dateOfBirth === formValidation.data.dateOfBirth ){
                    console.log("already exists");
                    doesEmployeeExist = true;
                    return;
                }
            });
            if (doesEmployeeExist){
                return;
            }
            //Si l'employé n'existe pas, on l'ajoute au state 
            dispatch(addEmployee(formValidation.data));
            //Et on efface les messages d'erreur
            Object.values(setters).forEach(setter => setter(''));
        } else if (!formValidation.isValid){
            //Mise en place des messages d'erreur
            Object.entries(formValidation.errorMsg).map(([field, errorMsg]) => {
                if (setters[field]){
                    setters[field](errorMsg);
                }
            });
        }
    }

    const departments = getDepartments();
    const states = getStates();

    return (
                <form onSubmit={saveEmployee} action="#" id="create_employee">
                    <TextInput name='firstName' label='First Name' errorMsg={firstNameErrorMsg}/>
                    <TextInput name='lastName' label='Last Name' errorMsg={lastNameErrorMsg}/>
                    <DateInput name='dateOfBirth' label='Date of Birth' errorMsg={dateOfBirthErrorMsg}/>
                    <DateInput name='startDate' label='Start Date' errorMsg={startDateErrorMsg}/>

                    <fieldset className={classes.address}>
                        <legend>Address</legend>
                        <TextInput name='street' label='Street' errorMsg={streetErrorMsg}/>
                        <TextInput name='city' label='City' errorMsg={cityErrorMsg}/>
                        <Dropdown list={states} name='state' label='State' />
                        <TextInput name='zipCode' label='Zip Code' errorMsg={zipCodeErrorMsg}/>
                    </fieldset>
                    <Dropdown list={departments} name='department' label='Department' />
                    <button value="submit">Save</button>
                </form>
    );
}

export default Form;