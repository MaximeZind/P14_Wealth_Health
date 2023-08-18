import React, { useState } from 'react';
import classes from '../styles/Home.module.css';
import Form from '../components/Form';
import Modal from '../components/Modal';

function Home() {

    const [modalText, setModalText] = useState(null);
    function getModalText(text){
        setModalText(text);
    }
    return (
        <main className={classes.main}>
            {modalText ? 
            < Modal modalText={modalText} getModalText={getModalText}/>
            :
            <div className={classes.container}>
                <h2>Create Employee</h2>
                <Form getModalText={getModalText}/>
            </div>}
        </main>
    );
}

export default Home;