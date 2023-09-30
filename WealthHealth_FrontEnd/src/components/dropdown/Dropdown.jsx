import React, { useRef, useState, useEffect } from 'react';
import classes from './styles/Dropdown.module.css';
import PropTypes from 'prop-types';
import DropdownArrow from './icons/DropdownArrow';
import SeparatedBox from './SeparatedBox';
import NormalBox from './NormalBox';

/**
 * Composant Dropdown pour la sélection d'éléments dans une liste déroulante personnalisée. 
 * On peut choisir le type de liste déroulante.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.list - La liste des éléments à afficher dans la liste déroulante.
 * @param {string} props.label - L'étiquette associée à la liste déroulante.
 * @param {string} props.name - Le nom de la liste déroulante.
 * @param {string} [props.errorMsg] - Message d'erreur à afficher en cas de problème.
 * @param {boolean} [props.separatedBox] - Indique si la liste déroulante utilise une boîte séparée pour les options.
 * @param {boolean} [props.searchBar] - Indique si une barre de recherche est affichée pour filtrer les options.
 * @param {string} [props.defaultValue] - La valeur par défaut sélectionnée.
 * @param {string} [props.defaultName] - Le nom par défaut sélectionné.
 * @param {function} [props.onChange] - Fonction de rappel appelée lorsque la sélection change.
 * @param {number} props.height - La hauteur de la liste déroulante.
 * @param {number} [props.maxWidth] - La largeur maximale de la liste déroulante.
 * @param {string} [props.labelColor] - Couleur du texte de l'étiquette.
 * @param {string} [props.focusedLabelColor] - Couleur du texte de l'étiquette lorsque la liste est ouverte ou une valeur est sélectionnée.
 * @param {string} [props.backgroundColor] - Couleur de fond de la liste déroulante.
 * @param {string} [props.hoveredBackgroundColor] - Couleur de fond lorsqu'un élément est survolé.
 * @param {string} [props.fontColor] - Couleur du texte dans la liste déroulante.
 * @param {string} [props.hoveredFontColor] - Couleur du texte lorsque l'élément est survolé.
 * @param {string} [props.fontFamily] - Police de caractères à utiliser pour le texte.
 * @param {string} [props.borderBottomColor] - Couleur de la bordure inférieure de la liste déroulante.
 * @param {string} [props.boxShadowColor] - Couleur de l'ombre de la liste déroulante.
 * @returns {JSX.Element} Le composant Dropdown rendu.
 */


function Dropdown({ list, label, name, errorMsg, separatedBox, searchBar, defaultValue, defaultName, onChange, height, maxWidth, labelColor, focusedLabelColor, backgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, fontFamily, borderBottomColor, boxShadowColor}) {

    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [dropdownStatus, setDropdownStatus] = useState('closed')
    const [selectedName, setSelectedName] = defaultName ? useState(defaultName) : useState(defaultValue ? defaultValue : '');
    const [selectedValue, setSelectedValue] = defaultValue ? useState(defaultValue) : useState('');
    const dropdownMenu = useRef(null);

    // Pour que le dropdown se ferme lorsque l'utilisateur clique en dehors
    // document.addEventListener('click', handleClickOutside);
    function handleClickOutside(event) {
        if (isOpen && dropdownMenu.current && !dropdownMenu.current.contains(event.target)) {
            if (dropdownStatus === `opened`) {
                handleClose();
            }
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, dropdownStatus]);

    // Pour le cas ou on souhaite utiliser le dropdown sur un "onChange"
    // plutot qu'au submit du formulaire
    useEffect(() => {
        onChange && onChange(selectedValue);
    }, [selectedValue]);

    // Fonction pour gérer le clique sur une des options
    function handleClick(name, value) {
        setSelectedName(name);
        if (value) {
            setSelectedValue(value);
        } else if (!value) {
            setSelectedValue(name);
        }
        handleClose();
    }

    function handleClose() {
        setDropdownStatus(`closing`);
        setIsOpen(false);
        setTimeout(() => {
            setDropdownStatus(`closed`);
        }, 300)
    }

    function handleOpen() {
        setDropdownStatus(`opening`);
        setIsOpen(true);
        setTimeout(() => {
            setDropdownStatus(`opened`);
        }, 300)
    }
    return (
        <div className={`${classes.component_container} ${classes[dropdownStatus]}`}
            style={{ maxWidth: `${maxWidth}px` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <label className={(isOpen || selectedName !== '') ? `${classes.label} ${classes.focused}` : classes.label}
                htmlFor={name}
                style={{color: (isOpen || selectedName !== '') ? focusedLabelColor : labelColor}}
            >
                {label}
            </label>
            <input className={classes.hidden} name={name} id={name} value={selectedValue} readOnly={true} />
            <div style={{ height: `${height}px` }}>
                <div ref={dropdownMenu}
                    className={separatedBox ? `${classes.dropdown_container} ${classes.separated}` : `${classes.dropdown_container} ${classes.normal}`}
                    style={{
                        height: !separatedBox ? ((dropdownStatus === `closed`) || (dropdownStatus === `closing`)) ? `${height}px` : `${height * 8}px` : `${height}px`,
                        boxShadow: `0 1px 0 0 ${borderBottomColor}`
                    }}>
                    <div className={classes.dropdown_header} style={{ minHeight: `${height}px` }} onClick={() => isOpen ? handleClose() : handleOpen()}>
                        <span className={classes.selected_item}
                            style={{ color: fontColor && fontColor }}>{selectedName}</span>
                        <span className={classes.dropdown_header_icon} style={{ backgroundColor: ((isHovered || isOpen) && hoveredBackgroundColor) && hoveredBackgroundColor }}>
                            <DropdownArrow transform={isOpen ? 'rotate(180deg)' : ''}
                                color={fontColor} />
                        </span>
                    </div>
                    {(separatedBox && isOpen) ?
                        <SeparatedBox list={list}
                            height={height}
                            backgroundColor={backgroundColor}
                            hoveredBackgroundColor={hoveredBackgroundColor}
                            fontColor={fontColor}
                            hoveredFontColor={hoveredFontColor}
                            fontFamily={fontFamily}
                            boxShadowColor={boxShadowColor}
                            handleClick={handleClick}
                            searchBar={searchBar} /> : null}
                    {!separatedBox ?
                        <NormalBox list={list}
                            height={height}
                            backgroundColor={backgroundColor}
                            hoveredBackgroundColor={hoveredBackgroundColor}
                            fontColor={fontColor}
                            hoveredFontColor={hoveredFontColor}
                            handleClick={handleClick}
                            searchBar={searchBar} /> : null}
                </div>
            </div>
            {errorMsg ? <p className={classes.error_msg}>{errorMsg}</p> : null}
        </div>
    );
}

Dropdown.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                abbreviation: PropTypes.string,
            }),
            PropTypes.number,
            PropTypes.string,
        ])
    ).isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    errorMsg: PropTypes.string,
    placeholder: PropTypes.string,
    height: PropTypes.number.isRequired,
    maxWidth: PropTypes.number,
    labelColor: PropTypes.string,
    focusedLabelColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    hoveredFontColor: PropTypes.string,
    fontFamily: PropTypes.string,
    borderBottomColor: PropTypes.string,
    boxShadowColor: PropTypes.string,
    separatedBox: PropTypes.bool.isRequired,
    searchBar: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    defaultName: PropTypes.string,
    onChange: PropTypes.func,
}

export default Dropdown;