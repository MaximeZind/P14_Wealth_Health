import React, { useState } from 'react';
import classes from '../styles/Home.module.css';
import Form from '../components/Form';
import Modal from '../components/modal/Modal';
import NewEmployeeModalContent from '../components/modal/modal_contents/NewEmployeeModalContent';
import ConfirmEmployeeActionModalContent from '../components/modal/modal_contents/ConfirmEmployeeActionModalContent';
import { addEmployee, updateEmployee } from '../actions/employees.action';
import { useDispatch } from 'react-redux';

function Home() {

    const pageTitle = 'Create an employee';
    document.title = `Wealth Health HRnet - ${pageTitle}`;

    const dispatch = useDispatch();
    // L'utilisateur a ete cree ou non
    const [isCorrect, setIsCorrect] = useState(false);
    // Nom de l'action (updated ou created)
    const [actionTaken, setActionTaken] = useState('');
    // Informations de l'employe a creer / mettre a jour
    const [employeeToConfirm, setEmployeeToConfirm] = useState(null);
    // Le modal est il ouvert ou non
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fonction de fermeture du modal
    function openModal(isCorrect, newEmployee) {
        setIsCorrect(isCorrect);
        setActionTaken('created');
        if (!isCorrect && newEmployee){
            setEmployeeToConfirm(newEmployee);
        }
        setIsModalOpen(true);
    }

    // Fonction de creation d'un employe dans le systeme
    // met a jour les states qui gerent le contenu du modal
    function handleConfirmEmployeeCreation(newEmployee){
        dispatch(addEmployee(newEmployee));
        setIsCorrect(true);
        setActionTaken('created');
        setEmployeeToConfirm(null);
    }

    // Fonction de mise a jour de l'employe
    // met aussi a jour le contenu du modal
    function handleUpdateEmployee(newEmployee){
        dispatch(updateEmployee(newEmployee));
        setActionTaken('updated');
        setIsCorrect(true);
    }

    // Fonction de fermeture du modal
    // reset tous les states qui ont a voir avec le contenu du modal
    function closeModal(){
        setIsModalOpen(false);
        setIsCorrect(false);
        setActionTaken('');
        setEmployeeToConfirm(null);
    }
    return (
        <main className={classes.main}>
            {isModalOpen ?
                <Modal closeModal={closeModal} maxWidth={600}>
                    {isCorrect ?
                    <NewEmployeeModalContent isCorrect={isCorrect} iconColor='rgb(0, 175, 95)' iconBackgroundColor='rgb(0, 175, 95, 0.5)' closeModal={closeModal} text={`This employee was successfully ${actionTaken}.`}/> :
                    // <NewEmployeeModalContent isCorrect={isCorrect} iconColor='rgb(255, 0, 0)' iconBackgroundColor='rgb(255, 0, 0, 0.5)' closeModal={closeModal} text='This employee already exists in the system'/>
                    <ConfirmEmployeeActionModalContent
                            closeModal={closeModal}
                            confirm={() => handleConfirmEmployeeCreation(employeeToConfirm)}
                            update={() => handleUpdateEmployee(employeeToConfirm)}
                            text={`An employee named ${employeeToConfirm.firstName} ${employeeToConfirm.lastName} and born on ${employeeToConfirm.dateOfBirth} already exists in the system. Would you like to create a new employee with this name or update the existing one?`} />
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