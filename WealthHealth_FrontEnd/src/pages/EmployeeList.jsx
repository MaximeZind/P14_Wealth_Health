import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../styles/EmployeeList.module.css';
import { Table } from 'maximez_table';
import { Modal } from 'maximez_modal';
import UpdateForm from '../components/UpdateForm';
import ConfirmEmployeeActionModalContent from '../components/modal_contents/ConfirmEmployeeActionModalContent';
import NewEmployeeModalContent from '../components/modal_contents/NewEmployeeModalContent';
import { deleteEmployee, updateEmployee } from '../actions/employees.action';
import fields from '../data/fields.json';


function EmployeeList() {

    // modification du titre de la page
    const pageTitle = 'Employees list';
    document.title = `Wealth Health HRnet - ${pageTitle}`;

    // recuperation de la liste et de la palette de couleurs
    const employeesList = useSelector((state) => state.employeesReducer);
    const colorPalette = useSelector((state) => state.colorPaletteReducer);

    const dispatch = useDispatch();
    // initialisation des States
    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Contenu du modal
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [needForConfirmationToUpdate, setNeedForConfirmationToUpdate] = useState(false);
    const [isConfirmationOfUpdateOpen, setIsConfirmationOfUpdateOpen] = useState(false);
    const [isConfirmationOfDeletionOpen, setIsConfirmationOfDeletionOpen] = useState(false);

    const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
    const [employeeToDelete, setemployeeToDelete] = useState(null);
    const [employeeToConfirm, setEmployeeToConfirm] = useState(null);

    // Gestion de la modale //

    // Fonction qui est appelee une fois que la mise a jour des infos de l'employe est faite
    // ouvre la modale de confirmation de mise a jour
    function handleUpdateClick(updatedEmployee, possibleDuplicates) {
        if (possibleDuplicates.length === 0) {
            setIsFormOpen(false);
            setIsConfirmationOfUpdateOpen(true);
        } else if (possibleDuplicates.length > 0) {
            setIsFormOpen(false);
            setNeedForConfirmationToUpdate(true);
            setEmployeeToConfirm(updatedEmployee);
        }
    }

    // Fonction qui est appelee lorsque l'utilisateur confirme la mise a jour
    // modifie le state redux et appelle la fonction de femreture de la modale
    function handleConfirmUpdate(updatedEmployee) {
        dispatch(updateEmployee(updatedEmployee));
        handleCloseModal();
    }

    // Fonction appelee lorsque la suppression est validee par l'utilisateur
    // met a jour le state redux, puis ouvre la modale de confirmation de suppression
    function handleDelete(employeeId) {
        dispatch(deleteEmployee(employeeId));
        setemployeeToDelete(null);
        setIsConfirmationOfDeletionOpen(true);
    };

    // Fonction qui sert a fermer la modale, et reset tous les states qui ont a voir avec la modale.
    function handleCloseModal() {
        setEmployeeToUpdate(null);
        setemployeeToDelete(null);
        setEmployeeToConfirm(null);
        setIsModalOpen(false);
        setIsFormOpen(false);
        setIsConfirmationOfUpdateOpen(false);
        setIsConfirmationOfDeletionOpen(false);
        setNeedForConfirmationToUpdate(false);
    }

    // Fonction appelee lorsque l'utilisateur clique sur le crayon
    function handlePencilClick(employee) {
        setEmployeeToUpdate(employee);
        setIsModalOpen(true);
        setIsFormOpen(true)
    }

    // Fonction appelee lorsque l'utilisateur clique sur la poubelle
    function handleBinClick(employee) {
        setemployeeToDelete(employee);
        setIsModalOpen(true);
    }
    return (
        <main className={classes.main}
            style={{ backgroundColor: colorPalette.primaryColor }}>
            <Table itemsList={employeesList}
                fields={fields}
                allowEditDelete={true}
                handleBinClick={handleBinClick}
                handlePencilClick={handlePencilClick}
                tableBackgroundColor={colorPalette.secondaryColor}
                oddBackgroundColor={colorPalette.primaryColor}
                evenBackgroundColor={colorPalette.secondaryColor}
                hoveredBackgroundColor={colorPalette.quarternaryColor}
                fontColor={colorPalette.tertiaryColor}
                hoveredFontColor={colorPalette.secondaryColor}
                ArrowColor={colorPalette.quarternaryColor}
                iconBoxBackgroundColor={colorPalette.secondaryColor}
                iconColor={colorPalette.tertiaryColor}
                highlightedBackgroundColor={colorPalette.senaryColor}
                
                dropdownLabelColor={colorPalette.quinaryColor}
                dropdownFocusedLabelColor={colorPalette.tertiaryColor}
                dropdownBackgroundColor={colorPalette.secondaryColor}
                dropdownHoveredBackgroundColor={colorPalette.primaryColor}
                dropdownFontColor={colorPalette.tertiaryColor}
                dropdownHoveredFontColor={colorPalette.tertiaryColor}
                dropdownBorderBottomColor={colorPalette.senaryColor}
                
                textInputLabelColor={colorPalette.quinaryColor}
                textInputFocusedLabelColor={colorPalette.tertiaryColor}
                textInputBoxShadowColor={colorPalette.senaryColor}
                textInputFontColor={colorPalette.tertiaryColor}/>
            {isModalOpen ?
                <Modal closeModal={handleCloseModal}
                    modalBackgroundColor={colorPalette.secondaryColor}
                    hoveredIconBackgroundColor={colorPalette.primaryColor}
                    iconColor={colorPalette.tertiaryColor}>
                    {isFormOpen &&
                        <UpdateForm
                            closeModal={handleCloseModal}
                            handleUpdateClick={handleUpdateClick}
                            employee={employeeToUpdate}
                            employeesList={employeesList}
                            colorPalette={colorPalette} />}
                    {needForConfirmationToUpdate &&
                        <ConfirmEmployeeActionModalContent
                            closeModal={handleCloseModal}
                            confirm={() => handleConfirmUpdate(employeeToConfirm)}
                            text={`One or several employees named ${employeeToConfirm.firstName} ${employeeToConfirm.lastName} 
                            and born on ${employeeToConfirm.dateOfBirth} already exist in the system. 
                            Would you still like to update this employee with this name and date of birth?`}
                            colorPalette={colorPalette} />}
                    {isConfirmationOfUpdateOpen &&
                        <NewEmployeeModalContent isCorrect={true}
                            iconColor='rgb(0, 175, 95)'
                            iconBackgroundColor='rgb(0, 175, 95, 0.5)'
                            closeModal={handleCloseModal}
                            text='This employee was successfully updated'
                            colorPalette={colorPalette} />}
                    {employeeToDelete &&
                        <ConfirmEmployeeActionModalContent
                            closeModal={handleCloseModal}
                            confirm={() => handleDelete(employeeToDelete.id)}
                            text={`Are you sure that you wish to remove ${employeeToDelete.firstName} ${employeeToDelete.lastName} from the system?`}
                            colorPalette={colorPalette} />}
                    {isConfirmationOfDeletionOpen &&
                        <NewEmployeeModalContent isCorrect={false}
                            iconColor='rgb(0, 175, 95)'
                            iconBackgroundColor='rgb(0, 175, 95, 0.5)'
                            closeModal={handleCloseModal}
                            text='This employee was successfully removed from the system'
                            colorPalette={colorPalette} />
                    }
                </Modal> : null}
        </main>
    );
}

export default EmployeeList;