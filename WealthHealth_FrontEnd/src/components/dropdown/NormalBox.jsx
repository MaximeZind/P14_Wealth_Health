import React, { useState } from 'react';
import classes from './styles/NormalBox.module.css';
import PropTypes from 'prop-types';
import MagnifyingGlass from './icons/MagnifyingGlass';
import { dropdownFilter } from './scripts'
import ListItem from './ListItem';


function NormalBox({ list, height, backgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, handleClick, searchBar }) {

    const [newList, setNewList] = useState(list);

    // Fonction pour filtrer les options en fonction de l'input
    function handleFilter(event) {
        const keywords = event.target.value.split(/[, ]+/).filter(item => item !== '');
        const updatedList = dropdownFilter(keywords, list);
        setNewList(updatedList);
    }

    return (
        <div className={classes.dropdown_content}
            style={{
                maxHeight: `${height * 7}px`,
                minHeight: `${height * 7}px`,
                backgroundColor: backgroundColor && backgroundColor,
            }}>
            {searchBar === true ?
                <div className={classes.filter_items}
                    style={{
                        minHeight: `${height}px`,
                        backgroundColor: hoveredBackgroundColor && hoveredBackgroundColor,
                    }}>
                    <span className={classes.filter_items_icon}>
                        <MagnifyingGlass color={fontColor} />
                    </span>
                    <input name='search_field'
                        style={{
                            color: fontColor,
                        }}
                        className={classes.filter_items_input}
                        type='text'
                        placeholder='Search...'
                        onChange={handleFilter} />
                </div> : null}
            <div className={classes.dropdown_options}
                style={{
                    minHeight: `${height * 6}px`,
                    backgroundColor: backgroundColor && backgroundColor,
                }}>
                {newList.map((item, index) => {
                    return <ListItem key={item.name ? item.name : index}
                        item={item}
                        index={index}
                        height={height}
                        backgroundColor={backgroundColor}
                        hoveredBackgroundColor={hoveredBackgroundColor}
                        fontColor={fontColor}
                        hoveredFontColor={hoveredFontColor}
                        handleClick={handleClick} />
                })}
                {/* {newList.map((item) => {
                    return item.abbreviation ?
                        <span key={item.name} className={classes.dropdown_option} value={item.abbreviation} style={{ minHeight: `${height}px` }} onClick={() => handleClick(item.name, item.abbreviation)}>{item.name}</span> :
                        <span key={item.name} className={classes.dropdown_option} value={item.name} onClick={() => handleClick(item.name)}>{item.name}</span>
                })} */}
            </div>
        </div>
    );
}

NormalBox.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            abbreviation: PropTypes.string,
        })
    ).isRequired,
    height: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    hoveredFontColor: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
    searchBar: PropTypes.bool
}

export default NormalBox;