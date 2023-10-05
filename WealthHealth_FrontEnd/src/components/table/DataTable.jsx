import React, { useState } from 'react';
import classes from './styles/DataTable.module.css';
import Row from './Row';
import Arrow from '../Arrow';
import PropTypes from 'prop-types';
import {toCamelCase} from './utils/utils'

/**
 * Composant DataTable pour afficher une liste d'employés dans un tableau.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.list - La liste des employés à afficher.
 * @param {number} props.currentPage - Le numéro de la page actuelle.
 * @param {number} props.tableLength - Le nombre d'entrées à afficher par page.
 * @param {function} props.setList - La fonction pour définir la liste des employés.
 * @param {string} props.tableBackgroundColor - La couleur de fond de la table.
 * @param {string} props.oddBackgroundColor - La couleur de fond des lignes impaires.
 * @param {string} props.evenBackgroundColor - La couleur de fond des lignes paires.
 * @param {string} props.hoveredBackgroundColor - La couleur de fond au survol.
 * @param {string} props.fontColor - La couleur du texte.
 * @param {string} props.hoveredFontColor - La couleur du texte au survol.
 * @param {string} props.iconBoxBackgroundColor - La couleur de fond de la boîte d'icônes.
 * @param {string} props.iconColor - La couleur de l'icône.
 * @param {string} props.highlightedBackgroundColor - La couleur de fond en surbrillance.
 * @returns {JSX.Element} Le composant DataTable rendu.
 */


function DataTable({ list, fields, currentPage, tableLength, handleBinClick, handlePencilClick, setList, tableBackgroundColor, oddBackgroundColor, evenBackgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, iconBoxBackgroundColor, iconColor, highlightedBackgroundColor }) {

    // initialisation des States
    const [selectedField, setSelectedField] = useState(null);
    const [isAscending, setIsAscending] = useState(false);
    const [isHeaderHovered, setIsHeaderHovered] = useState(false);

    // On crée une array de fields en camelCase
    const camelFields = fields.map((field) => {
        return toCamelCase(field);
    });

    const combinedFields = fields.map((field) => {
        return {
            field: field,
            camelField: toCamelCase(field)
        }
    });
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

    return (
        <table id='table' className={classes.table} style={{ backgroundColor: tableBackgroundColor && tableBackgroundColor }}>
            <thead className={classes.table_header}
                onMouseEnter={() => setIsHeaderHovered(true)}
                onMouseLeave={() => setIsHeaderHovered(false)}>
                <tr role='row'
                    style={{
                        backgroundColor: isHeaderHovered ? hoveredBackgroundColor : '',
                    }}>
                    {combinedFields.map((field) => {
                        return (
                            <th className={field.camelField === selectedField ? classes.selected_field : ''}
                                key={combinedFields.indexOf(field)}
                                onClick={() => sortBy(field.camelField)}
                                style={{
                                    backgroundColor: field.camelField === selectedField ? hoveredBackgroundColor : '',
                                }}>
                                <div className={classes.field}
                                    style={{
                                        color: (field.camelField === selectedField) ? hoveredFontColor && hoveredFontColor : isHeaderHovered ? hoveredFontColor : fontColor,
                                        backgroundColor: field.camelField === selectedField ? highlightedBackgroundColor : ''
                                    }}
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
                {list.length > 0 && list.map((item, index) => {
                    const indexWithinPage = index % tableLength;
                    const type = index % 2 ? 'even' : 'odd';
                    const isOnCurrentPage = (index >= (currentPage - 1) * tableLength) && (index < currentPage * tableLength)
                    const rowBackgroundColor = type === 'odd' ? oddBackgroundColor : evenBackgroundColor;

                    if (isOnCurrentPage) {
                        return (<Row delay={indexWithinPage}
                            highlightedField={highlightedField}
                            key={index}
                            type={type}
                            item={item}
                            fields={camelFields}
                            handlePencilClick={() => handlePencilClick(item)}
                            handleBinClick={() => handleBinClick(item)}
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
    setList: PropTypes.func.isRequired,
    tableBackgroundColor: PropTypes.string,
    oddBackgroundColor: PropTypes.string,
    evenBackgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    hoveredFontColor: PropTypes.string,
    iconBoxBackgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    highlightedBackgroundColor: PropTypes.string,
}

export default DataTable;