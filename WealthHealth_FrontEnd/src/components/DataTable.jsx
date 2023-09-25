import React, { useState } from 'react';
import classes from '../styles/DataTable.module.css';
import Row from '../components/Row';
import fields from '../data/fields.json';
import Arrow from './Arrow';
import PropTypes from 'prop-types';

function DataTable({ list, currentPage, tableLength, setEmployeeToUpdate, setIsModalOpen, setIsFormOpen, setemployeeToDelete, setList, tableBackgroundColor, oddBackgroundColor, evenBackgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, ArrowColor, iconBoxBackgroundColor, iconColor, highlightedBackgroundColor }) {

    // initialisation des States

    const [selectedField, setSelectedField] = useState(null);
    const [isAscending, setIsAscending] = useState(false);
    const [isHeaderHovered, setIsHeaderHovered] = useState(false);

    // On crée une array de fields en camelCase
    let camelFields = []
    fields.map((field) => {
        camelFields.push(field.camelField);
    })
    // ... Pour savoir lequel est sélectionné
    const highlightedField = selectedField ? camelFields.indexOf(selectedField) : null;

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

    // Fonction appelee lors du clic sur le "crayon" d'une ligne
    // Ouvre le formulaire de mise a jour des infos de l'employe
    function handlePencilClick(employee) {
        setEmployeeToUpdate(employee);
        setIsModalOpen(true);
        setIsFormOpen(true)
    }

    // Fonction appelee lors du clic sur la "poubelle" d'une ligne
    // Ouvre la modale de demande de validation de suppression de l'employe du systeme
    function handleBinClick(employee) {
        setemployeeToDelete(employee);
        setIsModalOpen(true);
    }

    return (
        <table id='employee_table' className={classes.table} style={{ backgroundColor: tableBackgroundColor && tableBackgroundColor }}>
            <thead className={classes.table_header}
                onMouseEnter={() => setIsHeaderHovered(true)}
                onMouseLeave={() => setIsHeaderHovered(false)}>
                <tr role='row'
                    style={{
                        backgroundColor: isHeaderHovered ? hoveredBackgroundColor : '',
                    }}>
                    {fields.map((field) => {
                        return (
                            <th className={field.camelField === selectedField ? classes.selected_field : ''} 
                            key={fields.indexOf(field)} 
                            onClick={() => sortBy(field.camelField)}
                            style={{
                                backgroundColor: field.camelField === selectedField ? hoveredBackgroundColor : '',
                            }}>
                                <div className={classes.field}
                                    style={{ color: (field.camelField === selectedField) ? hoveredFontColor && hoveredFontColor : isHeaderHovered ?  hoveredFontColor : fontColor,
                                    backgroundColor: field.camelField === selectedField ? highlightedBackgroundColor : '' }}
                                >
                                    {field.field}
                                    {selectedField !== field.camelField ?
                                        <div className={classes.icons}>
                                            <Arrow transform='rotate(180deg)' 
                                            color={isHeaderHovered ? hoveredFontColor : fontColor} />
                                            <Arrow transform='rotate(0deg)' 
                                            color={isHeaderHovered ? hoveredFontColor : fontColor} />
                                        </div> :
                                        <div className={classes.icons}>
                                            {isAscending ?
                                                <div className={classes.icons}>
                                                    <Arrow transform='rotate(180deg)' 
                                                    color={fontColor} />
                                                    <Arrow transform='rotate(0deg)' 
                                                    color='rgb(255, 255, 255, 0)' />
                                                </div> :
                                                <div className={classes.icons}>
                                                    <Arrow transform='rotate(180deg)' 
                                                    color='rgb(255, 255, 255, 0)' />
                                                    <Arrow transform='rotate(0deg)' 
                                                    color={fontColor} />
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
                {list.length > 0 && list.map((employee, index) => {
                    const indexWithinPage = index % tableLength;
                    const type = index % 2 ? 'even' : 'odd';
                    const isOnCurrentPage = (index >= (currentPage - 1) * tableLength) && (index < currentPage * tableLength)
                    const rowBackgroundColor = type === 'odd' ? oddBackgroundColor : evenBackgroundColor;

                    if (isOnCurrentPage) {
                        return (<Row delay={indexWithinPage}
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
                            handlePencilClick={() => handlePencilClick(employee)}
                            handleBinClick={() => handleBinClick(employee)}
                            backgroundColor={rowBackgroundColor}
                            hoveredBackgroundColor={hoveredBackgroundColor}
                            fontColor={fontColor}
                            hoveredFontColor={hoveredFontColor}
                            iconBoxBackgroundColor={iconBoxBackgroundColor}
                            iconColor={iconColor}
                            highlightedBackgroundColor={highlightedBackgroundColor}
                        />)
                    } else if (index >= tableLength) {
                        return null;
                    }
                })}
            </tbody>
        </table>
    )
}

DataTable.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
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
    currentPage: PropTypes.number.isRequired,
    tableLength: PropTypes.number.isRequired,
    setEmployeeToUpdate: PropTypes.func.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
    setIsFormOpen: PropTypes.func.isRequired,
    setemployeeToDelete: PropTypes.func.isRequired,
    setList: PropTypes.func.isRequired,
    tableBackgroundColor: PropTypes.string,
    oddBackgroundColor: PropTypes.string,
    evenBackgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    hoveredFontColor: PropTypes.string,
    ArrowColor: PropTypes.string,
    iconBoxBackgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    highlightedBackgroundColor: PropTypes.string,
}

export default DataTable;