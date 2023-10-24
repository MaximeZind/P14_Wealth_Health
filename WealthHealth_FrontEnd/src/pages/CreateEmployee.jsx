import React, { useState } from 'react';
import classes from '../styles/CreateEmployee.module.css';
import Form from '../components/Form';
import { Modal } from 'maximez_modal';
import NewEmployeeModalContent from '../components/modal_contents/NewEmployeeModalContent'
import ConfirmEmployeeActionModalContent from '../components/modal_contents/ConfirmEmployeeActionModalContent';
import { addEmployee, updateEmployee } from '../actions/employees.action';
import { useDispatch, useSelector } from 'react-redux';

function CreateEmployee() {

    // modification du titre de la page
    const pageTitle = 'Create an employee';
    document.title = `Wealth Health HRnet - ${pageTitle}`;

    // recuperation de la palette de couleurs
    const colorPalette = useSelector((state) => state.colorPaletteReducer);
    const dispatch = useDispatch();

    // Initialisation des states locaux
    // L'utilisateur a ete cree ou non
    const [isCorrect, setIsCorrect] = useState(false);
    // Nom de l'action (updated ou created)
    const [actionTaken, setActionTaken] = useState('');
    // Informations de l'employe a creer / mettre a jour
    const [employeeToConfirm, setEmployeeToConfirm] = useState(null);
    const [duplicates, setDuplicates] = useState(null);
    // Le modal est il ouvert ou non
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Fonction d'ouverture de la modale
    function openModal(possibleDuplicates, newEmployee) {
        setDuplicates(possibleDuplicates);
        if (possibleDuplicates.length > 0) {
            setIsCorrect(false);
        } else if (possibleDuplicates.length === 0) {
            setIsCorrect(true);
        }
        setActionTaken('created');
        if (!isCorrect && newEmployee) {
            setEmployeeToConfirm(newEmployee);
        }
        setIsModalOpen(true);
    }

    // Fonction de creation d'un employe dans le systeme
    // met a jour les states qui gerent le contenu de la modale
    function handleConfirmEmployeeCreation(newEmployee) {
        dispatch(addEmployee(newEmployee));
        setIsCorrect(true);
        setActionTaken('created');
        setEmployeeToConfirm(null);
    }

    // Fonction de mise a jour de l'employe
    // met aussi a jour le contenu de la modale
    function handleUpdateEmployee(newEmployee) {
        let updatedEmployee = {...newEmployee, id: duplicates[0].id}
        dispatch(updateEmployee(updatedEmployee));
        setActionTaken('updated');
        setIsCorrect(true);
    }

    // Fonction de fermeture du modal
    // reset tous les states qui ont a voir avec le contenu de la modale
    function closeModal() {
        setIsModalOpen(false);
        setIsCorrect(false);
        setActionTaken('');
        setEmployeeToConfirm(null);
    }
    return (
        <main className={classes.main}
            style={{ backgroundColor: colorPalette.primaryColor }}>
            {isModalOpen ?
                <Modal closeModal={closeModal}
                    maxWidth={600}
                    iconColor={colorPalette.tertiaryColor}
                    hoveredIconBackgroundColor={colorPalette.senaryColor}>
                    {isCorrect ?
                        <NewEmployeeModalContent isCorrect={isCorrect}
                            iconColor='rgb(0, 175, 95)'
                            iconBackgroundColor='rgb(0, 175, 95, 0.5)'
                            closeModal={closeModal}
                            text={`This employee was successfully ${actionTaken}.`}
                            colorPalette={colorPalette} /> : duplicates.length === 1 ?
                            <ConfirmEmployeeActionModalContent
                                closeModal={closeModal}
                                confirm={() => handleConfirmEmployeeCreation(employeeToConfirm)}
                                update={() => handleUpdateEmployee(employeeToConfirm)}
                                text={`An employee named ${employeeToConfirm.firstName} ${employeeToConfirm.lastName} 
                            and born on ${employeeToConfirm.dateOfBirth} already exists in the system. 
                            Would you like to create a new employee with this name or update the existing one?`}
                                colorPalette={colorPalette} /> :
                            <ConfirmEmployeeActionModalContent
                                closeModal={closeModal}
                                confirm={() => handleConfirmEmployeeCreation(employeeToConfirm)}
                                text={`Several employees named ${employeeToConfirm.firstName} ${employeeToConfirm.lastName} 
                            and born on ${employeeToConfirm.dateOfBirth} already exist in the system. 
                            Would you still like to create a new employee with this name?`}
                                colorPalette={colorPalette} />
                    }
                </Modal>
                :
                <div className={classes.container}>
                    <h2 style={{ color: colorPalette.tertiaryColor }}>Create Employee</h2>
                    <Form openModal={openModal} colorPalette={colorPalette} />
                </div>}
        </main>
    );
}

export default CreateEmployee;