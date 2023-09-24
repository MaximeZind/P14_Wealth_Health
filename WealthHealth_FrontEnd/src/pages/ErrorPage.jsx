import React from 'react';
import classes from '../styles/ErrorPage.module.css';
import { useLocation, Navigate } from 'react-router-dom';
import UpdateForm from '../components/UpdateForm';
import Modal from '../components/modal/Modal';


function ErrorPage() {

    let location = useLocation()
    const pageTitle = 'Error 404';
    document.title = `Wealth Health HRnet - ${pageTitle}`;

    return (
        (location.pathname === '/404') ?
            <main className={classes.main}
            style={{backgroundColor: colorPalette.primaryColor}}>
                <Modal>
                    <UpdateForm />
                </Modal>
            </main> : <Navigate to={'/404'} />
    );
}

export default ErrorPage;