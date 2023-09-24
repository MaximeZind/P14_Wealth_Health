import React, { useState } from 'react';
import classes from '../../styles/SeparatedBox.module.css';
import PropTypes from 'prop-types';
import MagnifyingGlass from './icons/MagnifyingGlass';
import { dropdownFilter } from '../../utils/searchScript';
import ListItem from './ListItem';

function SeparatedBox({ list, height, colorPalette, handleClick, searchBar }) {

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
                    <div className={classes.filter_items} style={{ minHeight: `${height}px`, backgroundColor: primaryColor && primaryColor }}>
                        <span className={classes.filter_items_icon}>
                            <MagnifyingGlass />
                        </span>
                        <input name='search_field' className={classes.filter_items_input} type='text' placeholder='Search...' onChange={handleFilter} />
                    </div> : null}
                <div className={classes.dropdown_options} style={{ maxHeight: `${height * 6}px`}}>
                    {newList.map((item, index) => {
                        return <ListItem key={item.name ? item.name : index} 
                        item={item} 
                        index={index} 
                        height={height}
                        colorPalette={colorPalette}
                        handleClick={handleClick}/>
                    })}
                </div>
            </div>
        </div>
    );
}

SeparatedBox.propTypes = {
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
    colorPalette: PropTypes.shape({
        primaryColor: PropTypes.string.isRequired,
        secondaryColor: PropTypes.string.isRequired,
        tertiaryColor: PropTypes.string.isRequired,
        quarternaryColor: PropTypes.string.isRequired,
        quinaryColor: PropTypes.string.isRequired,
    }).isRequired,
    handleClick: PropTypes.func.isRequired,
    searchBar: PropTypes.bool
}

export default SeparatedBox;