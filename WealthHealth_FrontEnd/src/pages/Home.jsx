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
                    <NewEmployeeModalContent isCorrect={isCorrect} closeModal={closeModal} action='created'/>
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