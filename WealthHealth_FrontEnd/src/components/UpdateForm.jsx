import React, { useState } from 'react';
import classes from '../styles/UpdateForm.module.css';
import TextInput from '../components/TextInput';
import DateInput from '../components/datepicker/DateInput';
import Dropdown from '../components/dropdown/Dropdown';
import Button from './button';
import { getDepartments, getStates } from '../utils/fetchData';
import PropTypes from 'prop-types';
import Collapse from './Collapse';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../actions/employees.action';
import { validateEmployee } from '../utils/formValidation';


function UpdateForm({ closeModal, employee }) {

    const states = getStates();
    const departments = getDepartments();

    const dispatch = useDispatch();

    // Messages d'erreur
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('');
    const [dateOfBirthErrorMsg, setDateOfBirthErrorMsg] = useState('');
    const [startDateErrorMsg, setStartDateErrorMsg] = useState('');
    const [streetErrorMsg, setStreetErrorMsg] = useState('');
    const [cityErrorMsg, setCityErrorMsg] = useState('');
    const [zipCodeErrorMsg, setZipCodeErrorMsg] = useState('');

    function handleUpdate(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const employeeId = employee.id;
        const updatedFormJson = { ...formJson, id: employeeId};
        console.log(updatedFormJson);
        const formValidation = validateEmployee(updatedFormJson);
        if (formValidation.isValid === true) {
            dispatch(updateEmployee(updatedFormJson));
            closeModal();
        }
        handleErrorMsgs(formValidation.errorMsg);
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
        <form className={classes.update_form} onSubmit={handleUpdate}>
            <h2> Update Employee</h2>
            <div className={classes.form_sections}>
                <Collapse title={"Personnal Informations"}>
                    <div className={`${classes.personnal_informations} ${classes.form_section}`}>
                        <TextInput name='firstName' label='First Name' errorMsg={firstNameErrorMsg} defaultValue={employee.firstName} />
                        <TextInput name='lastName' label='Last Name' errorMsg={lastNameErrorMsg} defaultValue={employee.lastName} />
                        <DateInput name='dateOfBirth' label='Date of Birth' errorMsg={dateOfBirthErrorMsg} defaultValue={employee.dateOfBirth} yearsRangeMin={1923} yearsRangeMax={2023} roundYearHighlight={true} />
                    </div>
                </Collapse>
                <Collapse title={'Address'}>
                <div className={`${classes.address} ${classes.form_section}`}>
                    <TextInput name='street' label='Street' errorMsg={streetErrorMsg} defaultValue={employee.street} />
                    <TextInput name='city' label='City' errorMsg={cityErrorMsg} defaultValue={employee.city} />
                    <Dropdown list={states} name='state' label='State' height={40} separatedBox={true} searchBar={true} defaultValue={employee.state} />
                    <TextInput name='zipCode' label='Zip Code' errorMsg={zipCodeErrorMsg} defaultValue={employee.zipCode} />
                </div>
                </Collapse>
                <Collapse title={'Work Informations'}>
                <div className={`${classes.work_informations} ${classes.form_section}`}>
                    <h3>Work informations</h3>
                    <Dropdown list={departments} name='department' label='Department' height={40} separatedBox={true} defaultValue={employee.department} />
                    <DateInput name='startDate' label='Start Date' errorMsg={startDateErrorMsg} defaultValue={employee.startDate} yearsRangeMin={1923} yearsRangeMax={2023} roundYearHighlight={true} />
                </div>
                </Collapse>
            </div>
            <div className={classes.update_form_buttons}>
                <Button text='Cancel' value='cancel' onClick={closeModal} />
                <Button text='Update' value='submit' />
            </div>
        </form>
    );
}

UpdateForm.propTypes = {
    closeModal: PropTypes.func.isRequired,
    employee: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        dateOfBirth: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zipCode: PropTypes.string.isRequired,
    }).isRequired,
}


export default UpdateForm;