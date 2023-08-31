import React, { useState } from 'react';
import classes from '../../styles/Dropdown.module.css';
import PropTypes from 'prop-types';
import DropdownArrow from './icons/DropdownArrow';
import MagnifyingGlass from './icons/MagnifyingGlass';
import { dropdownFilter } from '../../utils/searchScript';

function Dropdown({ list, name, label }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedName, setSelectedName] = useState(list[0].name);
    const [selectedValue, setSelectedValue] = useState(list[0].abbreviation ? list[0].abbreviation : list[0].name);
    const [newList, setNewList] = useState(list);

    function handleClick(name, value) {
        setSelectedName(name);
        if (value) {
            setSelectedValue(value);
        } else if (!value) {
            setSelectedValue(name);
        }
    }

    function handleFilter(event) {
        const keywords = event.target.value.split(/[, ]+/).filter(item => item !== '');
        const updatedList = dropdownFilter(keywords, list);
        setNewList(updatedList);
    }

    return (
        <div style={{ height: "40px" }}>
            <label className={classes.label} htmlFor={name}>{label}</label>
            <div className={classes.dropdown_container} style={!isOpen ? { height: '40px' } : { height: '320px', backgroundColor: '#FFFFFF' }} >
                <div className={classes.dropdown_header}>
                    <span className={classes.selected_item}>{selectedName}</span>
                    <span className={classes.dropdown_header_icon} onClick={() => setIsOpen(!isOpen)}>
                        <DropdownArrow transform={isOpen && 'rotate(180deg)'}/>
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
    );
}

Dropdown.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            abbreviation: PropTypes.string,
        })
    ).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

export default Dropdown;