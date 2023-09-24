import React, { useEffect, useState } from 'react';
import classes from '../styles/Table.module.css';
import fields from '../data/fields.json';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import { search } from '../utils/searchScript';
import Modal from './modal/Modal';
import UpdateForm from './UpdateForm';
import NewEmployeeModalContent from './modal/modal_contents/NewEmployeeModalContent';
import Dropdown from './dropdown/Dropdown';
import ConfirmEmployeeActionModalContent from './modal/modal_contents/ConfirmEmployeeActionModalContent';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../actions/employees.action';
import DataTable from './DataTable';

function Table({ employeesList, colorPalette }) {

    const dispatch = useDispatch();
    // initialisation des States
    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Contenu du modal
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isConfirmationOfUpdateOpen, setIsConfirmationOfUpdateOpen] = useState(false);
    const [isConfirmationOfDeletionOpen, setIsConfirmationOfDeletionOpen] = useState(false);

    const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
    const [employeeToDelete, setemployeeToDelete] = useState(null);

    const [list, setList] = useState([...employeesList]);
    const [selectedField, setSelectedField] = useState(null);
    const [isAscending, setIsAscending] = useState(false);
    const [tableLength, setTableLength] = useState(10);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // On crée une array de fields en camelCase
    let camelFields = []
    fields.map((field) => {
        camelFields.push(field.camelField);
    })
    // ... Pour savoir lequel est sélectionné
    const highlightedField = selectedField ? camelFields.indexOf(selectedField) : null;
    // array de longueurs possible de tableau
    const tableLengths = [10, 25, 50, 100];

    // On utilise useEffect pour re render le tableau lorsque la liste change
    useEffect(() => {
        setList([...employeesList]);
    }, [employeesList]);

    useEffect(() => {
        // Mise en place du nombre de pages
        let updatedPages = Math.ceil(list.length / tableLength);
        updatedPages = updatedPages < 1 ? 1 : updatedPages;
        setPages(updatedPages);
        // Si la page actuelle est trop élevée, on lui attribue la valeur maximale
        if ((currentPage * tableLength) > list.length) {
            setCurrentPage(updatedPages)
        }
    }, [list, tableLength, currentPage]);

    // Fonction pour trier par champ cliqué
    function sortBy(field) {
        if (selectedField !== field) {
            setIsAscending(false);
        }
        setSelectedField(field);
        let sortedList = [...list];
        if (field === 'dateOfBirth' || field === 'startDate') {
            if (isAscending) {
                sortedList = sortedList.sort((b, a) => new Date(a[field]) - new Date(b[field]));
            } else if (!isAscending) {
                sortedList = sortedList.sort((a, b) => new Date(a[field]) - new Date(b[field]));
            }
        } else if (field !== 'dateOfBirth' && field !== 'startDate')
            if (isAscending) {
                sortedList = sortedList.sort((b, a) => a[field].localeCompare(b[field]));
            } else if (!isAscending) {
                sortedList = sortedList.sort((a, b) => a[field].localeCompare(b[field]));
            }
        setIsAscending(!isAscending);
        setList(sortedList);
    }

    // fonction qui gère la valeur reçue par le menu déroulant
    function handleSelect(value) {
        setTableLength(value);
    }

    // Fonction qui gère le champ de recherche du tableau
    function handleSearch(event) {
        let array = event.target.value.split(' ');
        const newList = search(array, employeesList);
        setList(newList);
        setCurrentPage(1);
    }

    // Gestion du modal //

    // Fonction qui est appelee une fois que lq mise a jour des infos de l'employe est faite
    // ouvre la modale de confirmation de mise a jour
    function handleUpdateClick() {
        setIsFormOpen(false);
        setIsConfirmationOfUpdateOpen(true);
    }

    // Fonction appelee lorsque la deletion est validee par l'utilisateur
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
        setIsModalOpen(false);
        setIsFormOpen(false);
        setIsConfirmationOfUpdateOpen(false);
        setIsConfirmationOfDeletionOpen(false);
    }

    return (
        employeesList &&
        <section className={classes.table_section}
        style={{backgroundColor: colorPalette.secondaryColor}}>
            <div className={classes.table_filters}>
                <Dropdown label='Entries'
                    list={tableLengths}
                    height={40}
                    maxWidth={100}
                    primaryColor={colorPalette.primaryColor}
                    secondaryColor={colorPalette.secondaryColor}
                    tertiaryColor={colorPalette.tertiaryColor}
                    name='employees_table_length'
                    id='employees_table_length'
                    defaultValue={tableLengths[0]}
                    onChange={handleSelect} separatedBox={true} />
                <TextInput name='search'
                    label='Search: '
                    onChange={handleSearch}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor} />
            </div>
            <DataTable list={list}
                currentPage={currentPage}
                tableLength={tableLength}
                setEmployeeToUpdate={setEmployeeToUpdate}
                setIsModalOpen={setIsModalOpen}
                setIsFormOpen={setIsFormOpen}
                setemployeeToDelete={setemployeeToDelete}
                tableBackgroundColor={colorPalette.secondaryColor}
                oddBackgroundColor={colorPalette.primaryColor}
                evenBackgroundColor={colorPalette.secondaryColor}
                hoveredBackgroundColor={colorPalette.quarternaryColor}
                fontColor={colorPalette.tertiaryColor}
                hoveredFontColor={colorPalette.secondaryColor}
                ArrowColor={colorPalette.quarternaryColor}
            />
            <div className={classes.table_navigation}>
                <p style={{ color: colorPalette.tertiaryColor }}> Showing {list.length === 0 ? 0 : (currentPage - 1) * tableLength + 1} to {currentPage * tableLength <= list.length ? currentPage * tableLength : list.length} of {list.length} entries</p>
                {pages > 1 ? <div className={classes.pages}>
                    {currentPage > 1 ? <p onClick={() => setCurrentPage(currentPage - 1)}>Previous</p> : null}
                    {Array.from(Array(pages).keys()).map((key) => {
                        return <p className={(key + 1) === currentPage ? classes.active : null}
                            onClick={() => setCurrentPage(key + 1)}
                            key={key}
                            style={{
                                backgroundColor: (key + 1) === currentPage && colorPalette.quarternaryColor,
                                color: (key + 1) === currentPage ? colorPalette.secondaryColor : colorPalette.tertiaryColor
                            }}>
                            {key + 1}
                        </p>
                    })}
                    {currentPage < pages ? <p onClick={() => setCurrentPage(currentPage + 1)}>Next</p> : null}
                </div> : null}
            </div>
            {isModalOpen ?
                <Modal closeModal={handleCloseModal}>
                    {isFormOpen &&
                        <UpdateForm
                            closeModal={handleCloseModal}
                            handleUpdateClick={handleUpdateClick}
                            employee={employeeToUpdate}
                            colorPalette={colorPalette} />}
                    {isConfirmationOfUpdateOpen &&
                        <NewEmployeeModalContent isCorrect={true}
                            iconColor='rgb(0, 175, 95)'
                            iconBackgroundColor='rgb(0, 175, 95, 0.5)'
                            closeModal={handleCloseModal}
                            text='This employee was successfully updated' 
                            colorPalette={colorPalette}/>}
                    {employeeToDelete &&
                        <ConfirmEmployeeActionModalContent
                            closeModal={handleCloseModal}
                            confirm={() => handleDelete(employeeToDelete.id)}
                            text={`Are you sure that you wish to remove ${employeeToDelete.firstName} ${employeeToDelete.lastName} from the system?`} 
                            colorPalette={colorPalette}/>}
                    {isConfirmationOfDeletionOpen &&
                        <NewEmployeeModalContent isCorrect={false}
                            iconColor='rgb(0, 175, 95)'
                            iconBackgroundColor='rgb(0, 175, 95, 0.5)'
                            closeModal={handleCloseModal}
                            text='This employee was successfully removed from the system' 
                            colorPalette={colorPalette}/>
                    }
                </Modal> : null}
        </section>
    )
}

Table.propTypes = {
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
    colorPalette: PropTypes.shape({
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        tertiaryColor: PropTypes.string,
        quarternaryColor: PropTypes.string,
        quinaryColor: PropTypes.string,
    }),
}

export default Table;