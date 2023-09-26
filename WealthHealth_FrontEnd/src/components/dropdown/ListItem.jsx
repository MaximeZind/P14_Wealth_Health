import React, { useState } from 'react';
import classes from './styles/ListItem.module.css';
import PropTypes from 'prop-types';


function ListItem({ item, index, height, fontFamily, backgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, handleClick }) {

    const [isHovered, setIsHovered] = useState(false);
    return (
        item.abbreviation ?
            <span key={item.name ? item.name : index}
                className={classes.dropdown_option}
                value={item.abbreviation ? item.abbreviation : item}
                style={{
                    minHeight: `${height}px`, fontFamily: fontFamily && fontFamily,
                    backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor,
                    color: isHovered ? hoveredFontColor && hoveredFontColor : fontColor && fontColor
                }}
                onClick={() => handleClick(item.name ? item.name : item, item.abbreviation)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {item.name ? item.name : item}
            </span> :
            <span key={item.name ? item.name : index}
                className={classes.dropdown_option}
                value={item.name ? item.name : item}
                style={{
                    minHeight: `${height}px`, fontFamily: fontFamily && fontFamily,
                    backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor,
                    color: isHovered ? hoveredFontColor && hoveredFontColor : fontColor && fontColor
                }}
                onClick={() => handleClick(item.name ? item.name : item)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {item.name ? item.name : item}
            </span>

    );
}

ListItem.propTypes = {
    item: PropTypes.oneOfType([
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            abbreviation: PropTypes.string,
        }),
        PropTypes.string.isRequired,
        PropTypes.number.isRequired,
    ]).isRequired,
    index: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fontFamily: PropTypes.string,
    backgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    hoveredFontColor: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
}

export default ListItem;