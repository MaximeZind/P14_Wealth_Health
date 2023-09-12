import React, { useRef, useState } from 'react';
import classes from '../../styles/Dropdown.module.css';
import PropTypes from 'prop-types';
import MagnifyingGlass from './icons/MagnifyingGlass';
import { dropdownFilter } from '../../utils/searchScript';


function Dropdown({ list, height, handleClick }) {

    // const [isOpen, setIsOpen] = useState(false);
    // const [selectedName, setSelectedName] = useState(placeholder ? placeholder : list[0].name);
    // const [selectedValue, setSelectedValue] = useState(list[0].abbreviation ? list[0].abbreviation : list[0].name);
    const [newList, setNewList] = useState(list);
    // const dropdownMenu = useRef(null);

    //Pour que le dropdown se ferme lorsque l'utilisateur clique en dehors
    // document.addEventListener('click', handleClickOutside);
    // function handleClickOutside(event) {
    //     if (isOpen && dropdownMenu.current && !dropdownMenu.current.contains(event.target)) {
    //         setIsOpen(false);
    //     }
    // }

    // //Fonction pour gérer le clique sur une des options
    // function handleClick(name, value) {
    //     setSelectedName(name);
    //     if (value) {
    //         setSelectedValue(value);
    //     } else if (!value) {
    //         setSelectedValue(name);
    //     }
    //     setIsOpen(!isOpen);
    // }

    //Fonction pour filtrer les options en fonction de l'input
    function handleFilter(event) {
        const keywords = event.target.value.split(/[, ]+/).filter(item => item !== '');
        const updatedList = dropdownFilter(keywords, list);
        setNewList(updatedList);
    }

    return (
        <div className={classes.dropdown_content} style={{ maxHeight: `${height * 7}px`, minHeight: `${height * 7}px`}}>
            {/* <div className={classes.animation_box} style={{ width: '100%' }}> */}
                <div className={classes.filter_items} style={{ minHeight: `${height}px` }}>
                    <span className={classes.filter_items_icon}>
                        <MagnifyingGlass />
                    </span>
                    <input className={classes.filter_items_input} type='text' placeholder='Search...' onChange={handleFilter} />
                </div>
                <div className={classes.dropdown_options} style={{ maxHeight: `${height * 6}px`, minHeight: `${height * 6}px` }}>
                    {newList.map((item) => {
                        return item.abbreviation ?
                            <span key={item.name} className={classes.dropdown_option} value={item.abbreviation} style={{ minHeight: `${height}px` }} onClick={() => handleClick(item.name, item.abbreviation)}>{item.name}</span> :
                            <span key={item.name} className={classes.dropdown_option} value={item.name} onClick={() => handleClick(item.name)}>{item.name}</span>
                    })}
                </div>
            {/* </div> */}
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
    height: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
}

export default Dropdown;