import React, { useRef, useState } from 'react';
import classes from '../../styles/Dropdown.module.css';
import PropTypes from 'prop-types';
import DropdownArrow from './icons/DropdownArrow';
import MagnifyingGlass from './icons/MagnifyingGlass';
import { dropdownFilter } from '../../utils/searchScript';

function Dropdown({ list, label, name }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedName, setSelectedName] = useState('Select a state');
    const [selectedValue, setSelectedValue] = useState(list[0].abbreviation ? list[0].abbreviation : list[0].name);
    const [newList, setNewList] = useState(list);
    const dropdownMenu = useRef(null);

    //Pour que le dropdown se ferme lorsque l'utilisateur clique en dehors
    document.addEventListener('click', handleClickOutside);
    function handleClickOutside(event){
        if (isOpen && dropdownMenu.current && !dropdownMenu.current.contains(event.target)){
            setIsOpen(false);
        }
}

    //Fonction pour gérer le clique sur une des options
    function handleClick(name, value) {
        setSelectedName(name);
        if (value) {
            setSelectedValue(value);
        } else if (!value) {
            setSelectedValue(name);
        }
        setIsOpen(!isOpen);
    }

    //Fonction pour filtrer les options en fonction de l'input
    function handleFilter(event) {
        const keywords = event.target.value.split(/[, ]+/).filter(item => item !== '');
        const updatedList = dropdownFilter(keywords, list);
        setNewList(updatedList);
    }

    return (
        <div>
            <label className={classes.label} htmlFor={name}>{label}</label>
            <input className={classes.hidden} name={name} id={name} value={selectedValue} readOnly={true} />
            <div style={{ height: "40px" }}>
                <div ref={dropdownMenu} className={classes.dropdown_container} style={!isOpen ? { height: '40px' } : { height: '320px', backgroundColor: '#FFFFFF' }} >
                    <div className={classes.dropdown_header}>
                        <span className={classes.selected_item}>{selectedName}</span>
                        <span className={classes.dropdown_header_icon} onClick={() => setIsOpen(!isOpen)}>
                            <DropdownArrow transform={isOpen ? 'rotate(180deg)' : ''} />
                        </span>
                    </div>
                    <div className={classes.filter_items}>
                        <span className={classes.filter_items_icon}>
                            <MagnifyingGlass />
                        </span>
                        <input className={classes.filter_items_input} type='text' placeholder='Search...' onChange={handleFilter} />
                    </div>
                    <div className={classes.dropdown_options}>
                        {newList.map((item) => {
                            return item.abbreviation ?
                                <span key={item.name} className={classes.dropdown_option} value={item.abbreviation} onClick={() => handleClick(item.name, item.abbreviation)}>{item.name}</span> :
                                <span key={item.name} className={classes.dropdown_option} value={item.name} onClick={() => handleClick(item.name)}>{item.name}</span>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

Dropdown.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            abbreviation: PropTypes.string,
        })
    ).isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default Dropdown;