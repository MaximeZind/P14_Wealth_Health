import React, { useState } from 'react';
import classes from '../styles/ErrorPage.module.css';
import { useLocation, Navigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import DateInput from '../components/datepicker/DateInput';
import Dropdown from '../components/dropdown/Dropdown';
import { getDepartments, getStates } from '../utils/fetchData';
import UpdateForm from '../components/UpdateForm';
import Modal from '../components/modal/Modal';


function ErrorPage() {

    let location = useLocation()
    const pageTitle = 'Error 404';
    document.title = `Wealth Health HRnet - ${pageTitle}`;

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
        (location.pathname === '/404') ?
            <main className={classes.main}>
                <Modal>
                    <UpdateForm />
                </Modal>
            </main> : <Navigate to={'/404'} />
    );
}

export default ErrorPage;