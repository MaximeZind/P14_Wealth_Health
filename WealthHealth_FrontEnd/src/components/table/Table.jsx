import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { search } from './utils/searchScript';
import classes from './styles/Table.module.css';
import TextInput from '../TextInput';
import Dropdown from '../dropdown/Dropdown';
import DataTable from './DataTable';

/**
 * Composant Table pour afficher une liste d'employés dans un tableau.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.itemsList - La liste des employés à afficher.
 * @param {Object} props.colorPalette - La palette de couleurs personnalisée pour le composant.
 * @returns {JSX.Element} Le composant Table rendu.
 */

function Table({ itemsList, fields, handleBinClick, handlePencilClick, colorPalette }) {

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
                backgroundColor: colorPalette.secondaryColor,
                borderColor: colorPalette.quarternaryColor
            }}>
            <div className={classes.table_filters}>
                <Dropdown label='Entries'
                    list={tableLengths}
                    height={40}
                    maxWidth={100}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    backgroundColor={colorPalette.secondaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}
                    fontColor={colorPalette.tertiaryColor}
                    hoveredFontColor={colorPalette.tertiaryColor}
                    borderBottomColor={colorPalette.senaryColor}
                    name='items_table_length'
                    id='items_table_length'
                    defaultValue={tableLengths[0]}
                    onChange={handleSelect}
                    separatedBox={true} />
                <TextInput name='search'
                    label='Search: '
                    onChange={handleSearch}
                    labelColor={colorPalette.quinaryColor}
                    focusedLabelColor={colorPalette.tertiaryColor}
                    boxShadowColor={colorPalette.senaryColor}
                    fontColor={colorPalette.tertiaryColor} />
            </div>
            <DataTable list={list}
                fields={fields}
                currentPage={currentPage}
                tableLength={tableLength}
                handlePencilClick={handlePencilClick}
                handleBinClick={handleBinClick}
                setList={setList}
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
            />
            <div className={classes.table_navigation}>
                <p style={{ color: colorPalette.tertiaryColor }}> Showing {list.length === 0 ? 0 : (currentPage - 1) * tableLength + 1} to {currentPage * tableLength <= list.length ? currentPage * tableLength : list.length} of {list.length} entries</p>
                {pages > 1 ? <div className={classes.pages}>
                    {currentPage > 1 ? <p onClick={() => setCurrentPage(currentPage - 1)}
                        style={{ color: colorPalette.tertiaryColor }}>
                        Previous
                    </p> : null}
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
                    {currentPage < pages ? <p onClick={() => setCurrentPage(currentPage + 1)}
                        style={{ color: colorPalette.tertiaryColor }}>
                        Next
                    </p> : null}
                </div> : null}
            </div>
        </section>
    )
}

Table.propTypes = {
    itemsList: PropTypes.arrayOf(
        PropTypes.object,
    ).isRequired,
    colorPalette: PropTypes.shape({
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        tertiaryColor: PropTypes.string,
        quarternaryColor: PropTypes.string,
        quinaryColor: PropTypes.string,
        senaryColor: PropTypes.string,
    }).isRequired,
}

export default Table;