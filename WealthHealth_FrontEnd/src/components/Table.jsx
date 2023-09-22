import React, { useEffect, useState } from 'react';
import classes from '../styles/Table.module.css';
import Row from '../components/Row';
import fields from '../data/fields.json';
import Arrow from './Arrow';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import { search } from '../utils/searchScript';
import Modal from './modal/Modal';
import UpdateForm from './UpdateForm';
import { getEmployeeById } from '../utils/utils';
import NewEmployeeModalContent from './modal/modal_contents/NewEmployeeModalContent';
import Dropdown from './dropdown/Dropdown';

function Table({ employeesList }) {

    // initialisation des States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
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
    const tableLengths = ['10', '25', '50', '100'];

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

    function handlePencilClick(employeeId) {
        const employee = getEmployeeById(employeeId, employeesList);
        setEmployeeToUpdate(employee);
        setIsModalOpen(true);
        setIsFormOpen(true)
    }

    function handleUpdateClick() {
        setIsFormOpen(false);
        setIsConfirmationOpen(true);
    }

    function handleCloseModal() {
        setEmployeeToUpdate(null);
        setIsModalOpen(false);
        setIsFormOpen(false);
        setIsConfirmationOpen(false);
    }

    return (
        employeesList &&
        <section className={classes.table_section}>
            <div className={classes.table_filters}>
                <Dropdown label='Entries'
                    list={tableLengths}
                    height={40}
                    maxWidth={100}
                    name='employees_table_length'
                    id='employees_table_length'
                    defaultValue={tableLengths[0]}
                    onChange={handleSelect} separatedBox={true} />
                <TextInput name='search' label='Search: ' onChange={handleSearch} />
            </div>
            <table id='employee_table' className={classes.table}>
                <thead className={classes.table_header}>
                    <tr role='row'>
                        {fields.map((field) => {
                            return (
                                <th className={field.camelField === selectedField ? classes.selected_field : ''} key={fields.indexOf(field)} onClick={() => sortBy(field.camelField)}>
                                    <div className={classes.field}>{field.field}
                                        {selectedField !== field.camelField ?
                                            <div className={classes.icons}>
                                                <Arrow transform='rotate(180deg)' color='rgb(52,79,4,0.6)' />
                                                <Arrow transform='rotate(0deg)' color='rgb(52,79,4,0.6)' />
                                            </div> :
                                            <div className={classes.icons}>
                                                {isAscending ?
                                                    <div className={classes.icons}>
                                                        <Arrow transform='rotate(180deg)' color='#FFFFFF' />
                                                        <Arrow transform='rotate(0deg)' color='rgb(255, 255, 255, 0)' />
                                                    </div> :
                                                    <div className={classes.icons}>
                                                        <Arrow transform='rotate(180deg)' color='rgb(255, 255, 255, 0)' />
                                                        <Arrow transform='rotate(0deg)' color='#FFFFFF' />
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {list.length > 0 && list.map((employee) => {
                        const index = list.indexOf(employee);
                        const type = index % 2 ? 'even' : 'odd';
                        if ((index >= (currentPage - 1) * tableLength) && (index < currentPage * tableLength)) {
                            return (<Row delay={index}
                                highlightedField={highlightedField}
                                key={index}
                                type={type}
                                firstName={employee.firstName}
                                lastName={employee.lastName}
                                startDate={employee.startDate}
                                department={employee.department}
                                dateOfBirth={employee.dateOfBirth}
                                street={employee.street}
                                city={employee.city}
                                state={employee.state}
                                zipCode={employee.zipCode}
                                employeeId={employee.id}
                                handlePencilClick={() => handlePencilClick(employee.id)}
                            />)
                        } else if (index >= tableLength) {
                            return null;
                        }
                    })}
                </tbody>
            </table>
            <div className={classes.table_navigation}>
                <p> Showing {list.length === 0 ? 0 : (currentPage - 1) * tableLength + 1} to {currentPage * tableLength <= list.length ? currentPage * tableLength : list.length} of {list.length} entries</p>
                {pages > 1 ? <div className={classes.pages}>
                    {currentPage > 1 ? <p onClick={() => setCurrentPage(currentPage - 1)}>Previous</p> : null}
                    {Array.from(Array(pages).keys()).map((key) => {
                        return <p className={(key + 1) === currentPage ? classes.active : null} onClick={() => setCurrentPage(key + 1)} key={key}>{key + 1}</p>
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
                            employee={employeeToUpdate} />}
                    {isConfirmationOpen &&
                        <NewEmployeeModalContent isCorrect={true} closeModal={handleCloseModal} action='updated' />
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
}

export default Table;