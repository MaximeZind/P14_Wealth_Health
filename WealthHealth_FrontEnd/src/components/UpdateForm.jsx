import React, { useState } from 'react';
import classes from '../styles/UpdateForm.module.css';
import TextInput from '../components/TextInput';
import {DateInput} from 'maximez_date_picker';
import {Dropdown} from 'maximez_dropdown';
import Button from './Button';
import { getDepartments, getStates } from '../utils/fetchData';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../actions/employees.action';
import { validateEmployee } from '../utils/formValidation';
import { doesEmployeeExist, haveEmployeeInformationsChanged } from '../utils/utils';

/**
 * Composant UpdateForm pour mettre à jour les informations d'un employé.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {function} props.closeModal - La fonction pour fermer la modale de mise à jour.
 * @param {Object} props.employee - Les informations de l'employé à mettre à jour.
 * @param {Array} props.employeesList - La liste des employés existants.
 * @param {function} props.handleUpdateClick - La fonction à appeler lorsque la mise à jour est effectuée.
 * @param {Object} props.colorPalette - La palette de couleurs pour le style.
 * @returns {JSX.Element} Le composant UpdateForm rendu.
 */


function UpdateForm({ closeModal, employee, employeesList, handleUpdateClick, colorPalette }) {

    // On recupere les states et les departements
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

    // Fonction appelee lors de la mise a jour des informations d'un employe
    function handleUpdate(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        // On rajoute son id a l'employe
        const employeeId = employee.id;
        const updatedFormJson = { ...formJson, id: employeeId };

        // Validation
        const formValidation = validateEmployee(updatedFormJson);
        if (formValidation.isValid === true) {
            const updatedEmployee = formValidation.data
            let possibleDuplicates = doesEmployeeExist(employeesList, updatedEmployee);
            possibleDuplicates = possibleDuplicates.filter((employee) => employee.id !== updatedEmployee.id);
            const areEmployeeInformationsUpdated = haveEmployeeInformationsChanged(employee, updatedEmployee);
            if (!areEmployeeInformationsUpdated){
                dispatch(updateEmployee(updatedEmployee));
                handleUpdateClick(updatedEmployee, []);
            } else if (areEmployeeInformationsUpdated){
                if ((possibleDuplicates.length === 0)) {
                    dispatch(updateEmployee(updatedEmployee));
                    handleUpdateClick(updatedEmployee, possibleDuplicates);
                } else if (possibleDuplicates.length > 0) {
                    handleUpdateClick(updatedEmployee, possibleDuplicates);
                }
            }
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
        <form className={classes.update_form}
            onSubmit={handleUpdate}
            style={{ backgroundColor: colorPalette.secondaryColor }}>
            <h2 style={{ color: colorPalette.tertiaryColor }}> Update Employee</h2>
            <div className={classes.form_sections}>
                    <div className={`${classes.personnal_informations} ${classes.form_section}`}>
                        <TextInput name='firstName'
                            label='First Name'
                            errorMsg={firstNameErrorMsg}
                            defaultValue={employee.firstName}
                            height={40}
                            labelColor={colorPalette.quinaryColor}
                            focusedLabelColor={colorPalette.tertiaryColor}
                            boxShadowColor={colorPalette.senaryColor}
                            fontColor={colorPalette.tertiaryColor}
                            borderBottomColor={colorPalette.senaryColor} />
                        <TextInput name='lastName'
                            label='Last Name'
                            errorMsg={lastNameErrorMsg}
                            defaultValue={employee.lastName}
                            height={40}
                            labelColor={colorPalette.quinaryColor}
                            focusedLabelColor={colorPalette.tertiaryColor}
                            boxShadowColor={colorPalette.senaryColor}
                            fontColor={colorPalette.tertiaryColor}
                            borderBottomColor={colorPalette.senaryColor} />
                        <DateInput name='dateOfBirth'
                            label='Date of Birth'
                            errorMsg={dateOfBirthErrorMsg}
                            defaultValue={employee.dateOfBirth}
                            yearsRangeMin={1923}
                            yearsRangeMax={2023}
                            dateInputField={true}
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
                            borderBottomColor={colorPalette.senaryColor} />
                    </div>
                    <div className={`${classes.address} ${classes.form_section}`}>
                        <TextInput name='street'
                            label='Street'
                            errorMsg={streetErrorMsg}
                            defaultValue={employee.street}
                            height={40}
                            labelColor={colorPalette.quinaryColor}
                            focusedLabelColor={colorPalette.tertiaryColor}
                            boxShadowColor={colorPalette.senaryColor}
                            fontColor={colorPalette.tertiaryColor}
                            borderBottomColor={colorPalette.senaryColor} />
                        <TextInput name='city'
                            label='City'
                            errorMsg={cityErrorMsg}
                            defaultValue={employee.city}
                            height={40}
                            labelColor={colorPalette.quinaryColor}
                            focusedLabelColor={colorPalette.tertiaryColor}
                            boxShadowColor={colorPalette.senaryColor}
                            fontColor={colorPalette.tertiaryColor}
                            borderBottomColor={colorPalette.senaryColor} />
                        <Dropdown
                            list={states}
                            name='state'
                            label='State'
                            height={40}
                            labelColor={colorPalette.quinaryColor}
                            focusedLabelColor={colorPalette.tertiaryColor}
                            backgroundColor={colorPalette.secondaryColor}
                            hoveredBackgroundColor={colorPalette.primaryColor}
                            fontColor={colorPalette.tertiaryColor}
                            hoveredFontColor={colorPalette.tertiaryColor}
                            borderBottomColor={colorPalette.senaryColor}
                            separatedBox={true}
                            searchBar={true}
                            defaultValue={states.find((state) => state.abbreviation === employee.state).abbreviation}
                            defaultName={states.find((state) => state.abbreviation === employee.state).name} />
                        <TextInput name='zipCode'
                            label='Zip Code'
                            errorMsg={zipCodeErrorMsg}
                            defaultValue={employee.zipCode}
                            labelColor={colorPalette.quinaryColor}
                            focusedLabelColor={colorPalette.tertiaryColor}
                            boxShadowColor={colorPalette.senaryColor}
                            fontColor={colorPalette.tertiaryColor}
                            borderBottomColor={colorPalette.senaryColor} />
                    </div>
                    <div className={`${classes.work_informations} ${classes.form_section}`}>
                        <Dropdown list={departments}
                            name='department'
                            label='Department'
                            height={40}
                            labelColor={colorPalette.quinaryColor}
                            focusedLabelColor={colorPalette.tertiaryColor}
                            backgroundColor={colorPalette.secondaryColor}
                            hoveredBackgroundColor={colorPalette.primaryColor}
                            fontColor={colorPalette.tertiaryColor}
                            hoveredFontColor={colorPalette.tertiaryColor}
                            borderBottomColor={colorPalette.senaryColor}
                            separatedBox={true}
                            defaultValue={employee.department} />
                        <DateInput name='startDate'
                            label='Start Date'
                            errorMsg={startDateErrorMsg}
                            defaultValue={employee.startDate}
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
                            borderBottomColor={colorPalette.senaryColor} />
                    </div>
            </div>
            <div className={classes.update_form_buttons}
                style={{ backgroundColor: colorPalette.senaryColor }}>
                <Button text='Cancel'
                    value='cancel'
                    onClick={closeModal}
                    fontColor={colorPalette.secondaryColor}
                    hoveredFontColor={colorPalette.quarternaryColor}
                    backgroundColor={colorPalette.quarternaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}
                    borderColor={colorPalette.quarternaryColor}
                    hoveredBorderColor={colorPalette.quarternaryColor} />
                <Button text='Update'
                    value='submit'
                    fontColor={colorPalette.secondaryColor}
                    hoveredFontColor={colorPalette.quarternaryColor}
                    backgroundColor={colorPalette.quarternaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}
                    borderColor={colorPalette.quarternaryColor}
                    hoveredBorderColor={colorPalette.quarternaryColor} />
            </div>
        </form>
    );
}

UpdateForm.propTypes = {
    closeModal: PropTypes.func.isRequired,
    employee: PropTypes.shape({
        id: PropTypes.number.isRequired,
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
    employeesList: PropTypes.arrayOf(
        PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
            department: PropTypes.string.isRequired,
            dateOfBirth: PropTypes.string.isRequired,
            street: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            zipCode: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleUpdateClick: PropTypes.func.isRequired,
    colorPalette: PropTypes.shape({
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        tertiaryColor: PropTypes.string,
        quarternaryColor: PropTypes.string,
        quinaryColor: PropTypes.string,
        senaryColor: PropTypes.string,
    }).isRequired,
}


export default UpdateForm;