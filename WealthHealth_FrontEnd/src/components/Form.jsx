import React, { useState } from 'react';
import classes from '../styles/Form.module.css';
import { getDepartments, getStates } from '../utils/fetchData';
import { addEmployee } from '../actions/employees.action';
import { validateForm } from '../utils/formValidation';
import { useDispatch } from 'react-redux';
import TextInput from './TextInput';
import DateInput from './dateInput';

function Form() {

    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('');
    const [dateOfBirthErrorMsg, setDateOfBirthErrorMsg] = useState('');
    const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
    const [streetErrorMsg, setStreetErrorMsg] = useState('');
    const [cityErrorMsg, setCityErrorMsg] = useState('');
    const [zipCodeErrorMsg, setZipCodeErrorMsg] = useState('');

    const dispatch = useDispatch()
    async function saveEmployee(event){
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        const formValidation = validateForm(formJson);
        console.log(formValidation);
        if (formValidation.isValid){
            dispatch(addEmployee(formJson));
            setFirstNameErrorMsg(null);
            setLastNameErrorMsg(null);
            setDateOfBirthErrorMsg(null);
            setStartDateErrorMsg(null);
            setStreetErrorMsg(null);
            setCityErrorMsg(null);
            setZipCodeErrorMsg(null);
        } else if (!formValidation.isValid){
            setFirstNameErrorMsg(formValidation.data.firstNameValidation.errorMsg);
            setLastNameErrorMsg(formValidation.data.lastNameValidation.errorMsg);
            setDateOfBirthErrorMsg(formValidation.data.dateOfBirthValidation.errorMsg);
            setStartDateErrorMsg(formValidation.data.startDateValidation.errorMsg);
            setStreetErrorMsg(formValidation.data.streetValidation.errorMsg);
            setCityErrorMsg(formValidation.data.cityValidation.errorMsg);
            setZipCodeErrorMsg(formValidation.data.zipCodeValidation.errorMsg);
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
                        <label htmlFor="state">State</label>
                        <select name="state" id="state" >
                            {states.map((state) =>{
                                return <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                            })}
                        </select>
                        <TextInput name='zipCode' label='Zip Code' errorMsg={zipCodeErrorMsg}/>
                    </fieldset>
                    <label htmlFor="department">Department</label>
                    <select name="department" id="department">
                        {departments.map((department) => {
                            return <option key={department} value={department}>{department}</option>
                        })}
                    </select>
                    <button value="submit">Save</button>
                </form>
    );
}

export default Form;