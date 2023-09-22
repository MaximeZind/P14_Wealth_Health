import React, { useState } from 'react';
import classes from '../../styles/SeparatedBox.module.css';
import PropTypes from 'prop-types';
import MagnifyingGlass from './icons/MagnifyingGlass';
import { dropdownFilter } from '../../utils/searchScript';

function SeparatedBox({ list, height, handleClick, searchBar }) {

    const [newList, setNewList] = useState(list);

    // Fonction pour filtrer les options en fonction de l'input
    function handleFilter(event) {
        const keywords = event.target.value.split(/[, ]+/).filter(item => item !== '');
        const updatedList = dropdownFilter(keywords, list);
        setNewList(updatedList);
    }

    return (
        <div className={classes.dropdown_content} style={{ maxHeight: `${height * 7}px`, transform: `translateY(${height + 2}px)`, right:'0' }}>
            <div className={classes.animation_box} style={{ width: '100%' }}>
                {searchBar === true ?
                    <div className={classes.filter_items} style={{ minHeight: `${height}px` }}>
                        <span className={classes.filter_items_icon}>
                            <MagnifyingGlass />
                        </span>
                        <input name='search_field' className={classes.filter_items_input} type='text' placeholder='Search...' onChange={handleFilter} />
                    </div> : null}
                <div className={classes.dropdown_options} style={{ maxHeight: `${height * 6}px`}}>
                    {newList.map((item, index) => {
                        return item.abbreviation ?
                            <span key={item.name ? item.name : index} className={classes.dropdown_option} value={item.abbreviation ? item.abbreviation : item} style={{ minHeight: `${height}px` }} onClick={() => handleClick(item.name ? item.name : item, item.abbreviation)}>{item.name ? item.name : item}</span> :
                            <span key={item.name ? item.name : index} className={classes.dropdown_option} value={item.name ? item.name : item} onClick={() => handleClick(item.name ? item.name : item)}>{item.name ? item.name : item}</span>
                    })}
                </div>
            </div>
        </div>
    );
}

SeparatedBox.propTypes = {
    // list: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         name: PropTypes.string.isRequired,
    //         abbreviation: PropTypes.string,
    //     })
    // ).isRequired,
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
    height: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    searchBar: PropTypes.bool
}

export default SeparatedBox;