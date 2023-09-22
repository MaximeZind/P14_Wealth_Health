import React, { useState } from 'react';
import classes from '../styles/Home.module.css';
import Form from '../components/Form';
import Modal from '../components/modal/Modal';
import NewEmployeeModalContent from '../components/modal/modal_contents/NewEmployeeModalContent'

function Home() {

    const pageTitle = 'Create an employee';
    document.title = `Wealth Health HRnet - ${pageTitle}`;

    // L'utilisateur a ete cree ou non
    const [isCorrect, setIsCorrect] = useState(false);
    // Le modal est il ouvert ou non
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fonction de fermeture du modal
    function openModal(isCorrect) {
        setIsCorrect(isCorrect);
        setIsModalOpen(true);
    }

    // Fonction d'ouverture du modal
    function closeModal(){
        setIsModalOpen(false);
    }
    return (
        <main className={classes.main}>
            {isModalOpen ?
                <Modal closeModal={closeModal}>
                    {isCorrect ?
                    <NewEmployeeModalContent isCorrect={isCorrect} iconColor='rgb(0, 175, 95)' iconBackgroundColor='rgb(0, 175, 95, 0.5)' closeModal={closeModal} text='This employee was successfully created'/> :
                    <NewEmployeeModalContent isCorrect={isCorrect} iconColor='rgb(255, 0, 0)' iconBackgroundColor='rgb(255, 0, 0, 0.5)' closeModal={closeModal} text='This employee already exists in the system'/>
                    }
                </Modal>
                :
                <div className={classes.container}>
                    <h2>Create Employee</h2>
                    <Form openModal={openModal} />
                </div>}
        </main>
    );
}

export default Home;