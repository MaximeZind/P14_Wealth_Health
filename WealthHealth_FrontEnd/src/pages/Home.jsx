import React, { useState } from 'react';
import classes from '../styles/Home.module.css';
import Form from '../components/Form';
import Modal from '../components/modal/Modal';

function Home() {

    const pageTitle = 'Create an employee';
    document.title =`Wealth Health HRnet - ${pageTitle}`;
    const [modalText, setModalText] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    function getModalText(text, isCorrect){
        setIsCorrect(isCorrect);
        setModalText(text);
    }
    return (
        <main className={classes.main}>
            {modalText ?
            <Modal modalText={modalText} getModalText={getModalText} isCorrect={isCorrect}/>
            :
            <div className={classes.container}>
                <h2>Create Employee</h2>
                <Form getModalText={getModalText}/>
            </div>}
        </main>
    );
}

export default Home;