import React, { useState } from 'react';
import classes from '../styles/UpdateForm.module.css';
import TextInput from '../components/TextInput';
import DateInput from '../components/datepicker/DateInput';
import Dropdown from '../components/dropdown/Dropdown';
import Button from './button';
import { getDepartments, getStates } from '../utils/fetchData';
import PropTypes from 'prop-types';



function UpdateForm({closeModal, updateEmployee}) {

    const states = getStates();
    const departments = getDepartments();

    // Messages d'erreur
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('');
    const [dateOfBirthErrorMsg, setDateOfBirthErrorMsg] = useState('');
    const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
    const [streetErrorMsg, setStreetErrorMsg] = useState('');
    const [cityErrorMsg, setCityErrorMsg] = useState('');
    const [zipCodeErrorMsg, setZipCodeErrorMsg] = useState('');

    return (
        <form className={classes.update_form}>
            <h2> Update Employee</h2>
            <TextInput name='firstName' label='First Name' errorMsg={firstNameErrorMsg} />
            <TextInput name='lastName' label='Last Name' errorMsg={lastNameErrorMsg} />
            <DateInput name='dateOfBirth' label='Date of Birth' errorMsg={dateOfBirthErrorMsg} yearsRangeMin={1923} yearsRangeMax={2023} roundYearHighlight={true} />
            <TextInput name='street' label='Street' errorMsg={streetErrorMsg} />
            <TextInput name='city' label='City' errorMsg={cityErrorMsg} />
            <Dropdown list={states} name='state' label='State' height={40} separatedBox={true} searchBar={true} />
            <TextInput name='zipCode' label='Zip Code' errorMsg={zipCodeErrorMsg} />
            <Dropdown list={departments} name='department' label='Department' height={40} separatedBox={true} />
            <DateInput name='startDate' label='Start Date' errorMsg={startDateErrorMsg} yearsRangeMin={1923} yearsRangeMax={2023} roundYearHighlight={true} />
            <div className={classes.update_form_buttons}>   
                <Button text='Cancel' value='cancel' onClick={closeModal} />
                <Button text='Update' value='update' onClick={updateEmployee} />
            </div>
        </form>
    );
}

Button.propTypes = {
    closeModal: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired,
  }


export default UpdateForm;