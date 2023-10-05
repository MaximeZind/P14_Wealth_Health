import React, { useState } from 'react';
import classes from './styles/Row.module.css';
import PropTypes from 'prop-types';
import Pencil from '../Pencil';
import GarbageBin from '../GarbageBin';

/**
 * Row component for rendering a row in a data table.
 *
 * @param {object} props - The component's props.
 * @param {number} props.delay - Delay for animation in milliseconds.
 * @param {number} [props.highlightedField] - Index of the highlighted field.
 * @param {string} props.type - Type of row ('odd' or 'even').
 * @param {object} props.item - Data item to display in the row.
 * @param {Array<string>} props.fields - List of table fields.
 * @param {function} props.handlePencilClick - Function to handle pencil icon clicks.
 * @param {function} props.handleBinClick - Function to handle bin icon clicks.
 * @param {string} [props.backgroundColor] - Background color for the row.
 * @param {string} [props.hoveredBackgroundColor] - Background color for hovered row.
 * @param {string} [props.fontColor] - Font color for the row.
 * @param {string} [props.hoveredFontColor] - Font color for hovered row.
 * @param {string} [props.iconBoxBackgroundColor] - Background color for icon box.
 * @param {string} [props.iconColor] - Color of icons.
 * @param {string} [props.highlightedBackgroundColor] - Background color for the highlighted row.
 * @returns {JSX.Element} The rendered Row component.
 */

function Row({ delay, highlightedField, type, item, fields, handlePencilClick, handleBinClick, backgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, iconBoxBackgroundColor, iconColor, highlightedBackgroundColor }) {

    const [isHovered, setIsHovered] = useState(false);
    const animDelay = delay && `${delay / 20}s`;
    const trStyle = {
        animationDelay: delay && animDelay,
        backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor,
        color: isHovered ? hoveredFontColor && hoveredFontColor : fontColor && fontColor,
    };
    const className = type === 'odd' ? classes.odd : classes.even;


    return (
        <tr role='row'
            className={`${className} ${classes.myrow}`}
            style={trStyle}
            id='row'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {fields.map((field) => {
                return (fields.length === fields.indexOf(field) + 1 ?
                    <td key={field}
                        style={{
                            backgroundColor: fields.indexOf(field) === highlightedField ? highlightedBackgroundColor : '',
                        }}>
                        <div className={classes.last_container}>
                            <p>{item[field]}</p>
                            <div className={classes.icons}
                                style={{ backgroundColor: iconBoxBackgroundColor && iconBoxBackgroundColor }}>
                                <Pencil color={iconColor} height='15px' width='15px' onClick={handlePencilClick} />
                                <GarbageBin color={iconColor} height='15px' width='15px' onClick={handleBinClick} />
                            </div>
                        </div>
                    </td> :
                    <td key={field}
                        className={fields.indexOf(field) === highlightedField ? classes.highlighted : null}
                        style={{
                            backgroundColor: fields.indexOf(field) === highlightedField ? highlightedBackgroundColor : '',
                        }}>{item[field]}</td>
                )
            })}
        </tr>
    );
}

Row.propTypes = {
    delay: PropTypes.number.isRequired,
    highlightedField: PropTypes.number,
    type: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    handlePencilClick: PropTypes.func.isRequired,
    handleBinClick: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    hoveredFontColor: PropTypes.string,
    iconBoxBackgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    highlightedBackgroundColor: PropTypes.string,
}

export default Row;