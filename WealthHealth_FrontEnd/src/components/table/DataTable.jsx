import React, { useState } from 'react';
import classes from './styles/DataTable.module.css';
import Row from './Row';
import Arrow from './icons/Arrow';
import PropTypes from 'prop-types';
import {toCamelCase} from './utils/utils';

/**
 * DataTable component for rendering a table of data with sorting and pagination.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.list - The list of data items to display in the table.
 * @param {Array<string>} props.fields - The list of table fields.
 * @param {number} props.currentPage - The current page number for pagination.
 * @param {number} props.tableLength - The number of items to display per page.
 * @param {function} props.handleBinClick - Function to handle bin icon clicks.
 * @param {function} props.handlePencilClick - Function to handle pencil icon clicks.
 * @param {function} props.setList - Function to set the list of items.
 * @param {string} [props.tableBackgroundColor] - Background color of the table.
 * @param {string} [props.oddBackgroundColor] - Background color for odd rows.
 * @param {string} [props.evenBackgroundColor] - Background color for even rows.
 * @param {string} [props.hoveredBackgroundColor] - Background color for hovered rows.
 * @param {string} [props.fontColor] - Font color for table content.
 * @param {string} [props.hoveredFontColor] - Font color for hovered rows.
 * @param {string} [props.iconBoxBackgroundColor] - Background color for icon boxes.
 * @param {string} [props.iconColor] - Color of icons.
 * @param {string} [props.highlightedBackgroundColor] - Background color for highlighted rows.
 * @returns {JSX.Element} The rendered DataTable component.
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
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentPage: PropTypes.number.isRequired,
    tableLength: PropTypes.number.isRequired,
    handleBinClick: PropTypes.func.isRequired,
    handlePencilClick: PropTypes.func.isRequired,
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