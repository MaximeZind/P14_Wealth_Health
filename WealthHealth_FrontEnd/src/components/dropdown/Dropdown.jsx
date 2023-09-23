import React, { useRef, useState, useEffect } from 'react';
import classes from '../../styles/Dropdown.module.css';
import PropTypes from 'prop-types';
import DropdownArrow from './icons/DropdownArrow';
import SeparatedBox from './SeparatedBox';
import NormalBox from './NormalBox';

function Dropdown({ list, label, name, height, maxWidth, separatedBox, searchBar, defaultValue, defaultName, onChange }) {


    const [isOpen, setIsOpen] = useState(false);
    const [dropdownStatus, setDropdownStatus] = useState('closed')
    const [selectedName, setSelectedName] = defaultName ? useState(defaultName) : useState(defaultValue ? defaultValue : '');
    const [selectedValue, setSelectedValue] = defaultValue ? useState(defaultValue) : useState(list[0].abbreviation ? list[0].abbreviation : list[0].name);
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
        <div className={`${classes.component_container} ${classes[dropdownStatus]}`} style={{maxWidth: `${maxWidth}px`}}>
            <label className={(isOpen || selectedName !== '') ? `${classes.label} ${classes.focused}` : classes.label} htmlFor={name} >{label}</label>
            <input className={classes.hidden} name={name} id={name} value={selectedValue} readOnly={true} />
            <div style={{ height: `${height}px` }}>
                <div ref={dropdownMenu}
                    className={separatedBox ? `${classes.dropdown_container} ${classes.separated}` : `${classes.dropdown_container} ${classes.normal}`}
                    style={!separatedBox ? ((dropdownStatus === `closed`) || (dropdownStatus === `closing`)) ? { height: `${height}px` } : { height: `${height * 8}px` } : { height: `${height}px` }} >
                    <div className={classes.dropdown_header} style={{ minHeight: `${height}px` }}  onClick={() => isOpen ? handleClose() : handleOpen()}>
                        <span className={classes.selected_item}>{selectedName}</span>
                        <span className={classes.dropdown_header_icon}>
                            <DropdownArrow transform={isOpen ? 'rotate(180deg)' : ''} />
                        </span>
                    </div>
                    {(separatedBox && isOpen) ? <SeparatedBox list={list} height={height} handleClick={handleClick} searchBar={searchBar} /> : null}
                    {!separatedBox ? <NormalBox list={list} height={height} handleClick={handleClick} searchBar={searchBar} /> : null}
                </div>
            </div>
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
    placeholder: PropTypes.string,
    height: PropTypes.number.isRequired,
    maxWidth: PropTypes.number,
    separatedBox: PropTypes.bool.isRequired,
    searchBar: PropTypes.bool,
    defaultValue: PropTypes.string,
    defaultName: PropTypes.string,
    onChange: PropTypes.func,
}

export default Dropdown;