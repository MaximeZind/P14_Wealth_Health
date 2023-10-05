import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { search } from './utils/searchScript';
import classes from './styles/Table.module.css';
import TextInput from '../TextInput';
import Dropdown from '../dropdown/Dropdown';
import DataTable from './DataTable';

/**
 * Table component for displaying a data table with various options.
 *
 * @param {object} props - The component's props.
 * @param {array} props.itemsList - The list of items to display in the table.
 * @param {array} props.fields - The list of table fields.
 * @param {function} props.handleBinClick - Function to handle bin icon clicks.
 * @param {function} props.handlePencilClick - Function to handle pencil icon clicks.
 * @param {string} [props.tableBackgroundColor] - Background color of the table.
 * @param {string} [props.oddBackgroundColor] - Background color for odd rows.
 * @param {string} [props.evenBackgroundColor] - Background color for even rows.
 * @param {string} [props.hoveredBackgroundColor] - Background color for hovered rows.
 * @param {string} [props.fontColor] - Font color for table content.
 * @param {string} [props.hoveredFontColor] - Font color for hovered rows.
 * @param {string} [props.iconBoxBackgroundColor] - Background color for icon boxes.
 * @param {string} [props.iconColor] - Color of icons.
 * @param {string} [props.highlightedBackgroundColor] - Background color for highlighted rows.
 * @param {string} [props.dropdownLabelColor] - Label color for dropdowns.
 * @param {string} [props.dropdownFocusLabelColor] - Label color for focused dropdowns.
 * @param {string} [props.dropdownBackgroundColor] - Background color for dropdowns.
 * @param {string} [props.dropdownHoveredBackgroundColor] - Background color for hovered dropdown items.
 * @param {string} [props.dropdownFontColor] - Font color for dropdown items.
 * @param {string} [props.dropdownHoveredFontColor] - Font color for hovered dropdown items.
 * @param {string} [props.dropdownBorderBottomColor] - Border bottom color for dropdowns.
 * @param {string} [props.textInputLabelColor] - Label color for text inputs.
 * @param {string} [props.textInputFocusedLabelColor] - Label color for focused text inputs.
 * @param {string} [props.textInputBoxShadowColor] - Box shadow color for text inputs.
 * @param {string} [props.textInputFontColor] - Font color for text inputs.
 * @returns {JSX.Element} The rendered Table component.
 */

function Table({ itemsList, fields, handleBinClick, handlePencilClick, tableBackgroundColor, oddBackgroundColor, evenBackgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, iconBoxBackgroundColor, iconColor, highlightedBackgroundColor, dropdownLabelColor, dropdownFocusLabelColor, dropdownBackgroundColor, dropdownHoveredBackgroundColor, dropdownFontColor,
    dropdownHoveredFontColor, dropdownBorderBottomColor, textInputLabelColor, textInputFocusedLabelColor, textInputBoxShadowColor, textInputFontColor }) {

    const [list, setList] = useState([...itemsList]);
    const [tableLength, setTableLength] = useState(10);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // On crée une array de fields en camelCase
    let camelFields = []
    fields.map((field) => {
        camelFields.push(field.camelField);
    })

    // array de longueurs possible de tableau
    const tableLengths = [10, 25, 50, 100];

    // On utilise useEffect pour re render le tableau lorsque la liste change
    useEffect(() => {
        setList([...itemsList]);
    }, [itemsList]);

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

    // fonction qui gère la valeur reçue par le menu déroulant
    function handleSelect(value) {
        setTableLength(value);
    }

    // Fonction qui gère le champ de recherche du tableau
    function handleSearch(event) {
        let array = event.target.value.split(' ');
        const newList = search(array, itemsList);
        setList(newList);
        setCurrentPage(1);
    }

    return (
        itemsList &&
        <section className={classes.table_section}
            style={{
                backgroundColor: tableBackgroundColor,
                borderColor: hoveredBackgroundColor
            }}>
            <div className={classes.table_filters}>
                <Dropdown label='Entries'
                    list={tableLengths}
                    height={40}
                    maxWidth={100}
                    labelColor={dropdownLabelColor}
                    focusedLabelColor={dropdownFocusLabelColor}
                    backgroundColor={dropdownBackgroundColor}
                    hoveredBackgroundColor={dropdownHoveredBackgroundColor}
                    fontColor={dropdownFontColor}
                    hoveredFontColor={dropdownHoveredFontColor}
                    borderBottomColor={dropdownBorderBottomColor}
                    name='items_table_length'
                    id='items_table_length'
                    defaultValue={tableLengths[0]}
                    onChange={handleSelect}
                    separatedBox={true} />
                <TextInput name='search'
                    label='Search: '
                    onChange={handleSearch}
                    labelColor={textInputLabelColor}
                    focusedLabelColor={textInputFocusedLabelColor}
                    boxShadowColor={textInputBoxShadowColor}
                    fontColor={textInputFontColor} />
            </div>
            <DataTable list={list}
                fields={fields}
                currentPage={currentPage}
                tableLength={tableLength}
                handlePencilClick={handlePencilClick}
                handleBinClick={handleBinClick}
                setList={setList}
                tableBackgroundColor={tableBackgroundColor}
                oddBackgroundColor={oddBackgroundColor}
                evenBackgroundColor={evenBackgroundColor}
                hoveredBackgroundColor={hoveredBackgroundColor}
                fontColor={fontColor}
                hoveredFontColor={hoveredFontColor}
                iconBoxBackgroundColor={iconBoxBackgroundColor}
                iconColor={iconColor}
                highlightedBackgroundColor={highlightedBackgroundColor}
            />
            <div className={classes.table_navigation}>
                <p style={{
                    color: fontColor
                }}>
                    Showing {list.length === 0 ? 0 : (currentPage - 1) * tableLength + 1} to {currentPage * tableLength <= list.length ? currentPage * tableLength : list.length} of {list.length} entries
                </p>
                {pages > 1 ? <div className={classes.pages}>
                    {currentPage > 1 ? <p onClick={() => setCurrentPage(currentPage - 1)}
                        style={{
                            color: fontColor
                        }}>
                        Previous
                    </p> : null}
                    {Array.from(Array(pages).keys()).map((key) => {
                        return <p className={(key + 1) === currentPage ? classes.active : null}
                            onClick={() => setCurrentPage(key + 1)}
                            key={key}
                            style={{
                                backgroundColor: (key + 1) === currentPage && hoveredBackgroundColor,
                                color: (key + 1) === currentPage ? hoveredFontColor : fontColor
                            }}>
                            {key + 1}
                        </p>
                    })}
                    {currentPage < pages ? <p onClick={() => setCurrentPage(currentPage + 1)}
                        style={{
                            color: fontColor
                        }}>
                        Next
                    </p> : null}
                </div> : null}
            </div>
        </section>
    )
}

Table.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    handleBinClick: PropTypes.func.isRequired,
    handlePencilClick: PropTypes.func.isRequired,
    tableBackgroundColor: PropTypes.string,
    oddBackgroundColor: PropTypes.string,
    evenBackgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    hoveredFontColor: PropTypes.string,
    iconBoxBackgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    highlightedBackgroundColor: PropTypes.string,
    dropdownLabelColor: PropTypes.string,
    dropdownFocusLabelColor: PropTypes.string,
    dropdownBackgroundColor: PropTypes.string,
    dropdownHoveredBackgroundColor: PropTypes.string,
    dropdownFontColor: PropTypes.string,
    dropdownHoveredFontColor: PropTypes.string,
    dropdownBorderBottomColor: PropTypes.string,
    textInputLabelColor: PropTypes.string,
    textInputFocusedLabelColor: PropTypes.string,
    textInputBoxShadowColor: PropTypes.string,
    textInputFontColor: PropTypes.string,
};

export default Table;