import React, { useState } from 'react';
import classes from './styles/Row.module.css';
import PropTypes from 'prop-types';
import Pencil from '../Pencil';
import GarbageBin from '../GarbageBin';

function Row({ delay, highlightedField, type, firstName, lastName, startDate, department, dateOfBirth, street, city, state, zipCode, handlePencilClick, handleBinClick, backgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, iconBoxBackgroundColor, iconColor, highlightedBackgroundColor }) {

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
            <td className={highlightedField === 0 ? classes.highlighted : null}
                style={{
                    backgroundColor: highlightedField === 0 ? highlightedBackgroundColor : '',
                }}>
                {firstName}
            </td>
            <td className={highlightedField === 1 ? classes.highlighted : null}
                style={{
                    backgroundColor: highlightedField === 1 ? highlightedBackgroundColor : '',
                }}>
                {lastName}
            </td>
            <td className={highlightedField === 2 ? classes.highlighted : null}
                style={{
                    backgroundColor: highlightedField === 2 ? highlightedBackgroundColor : '',
                }}>
                {startDate}
            </td>
            <td className={highlightedField === 3 ? classes.highlighted : null}
                style={{
                    backgroundColor: highlightedField === 3 ? highlightedBackgroundColor : '',
                }}>
                {department}
            </td>
            <td className={highlightedField === 4 ? classes.highlighted : null}
                style={{
                    backgroundColor: highlightedField === 4 ? highlightedBackgroundColor : '',
                }}>
                {dateOfBirth}
            </td>
            <td className={highlightedField === 5 ? classes.highlighted : null}
                style={{
                    backgroundColor: highlightedField === 5 ? highlightedBackgroundColor : '',
                }}>
                {street}
            </td>
            <td className={highlightedField === 6 ? classes.highlighted : null}
                style={{
                    backgroundColor: highlightedField === 6 ? highlightedBackgroundColor : '',
                }}>
                {city}
            </td>
            <td className={highlightedField === 7 ? classes.highlighted : null}
                style={{
                    backgroundColor: highlightedField === 7 ? highlightedBackgroundColor : '',
                }}>
                {state}
            </td>
            <td className={highlightedField === 8 ? classes.highlighted : null}
                style={{
                    backgroundColor: highlightedField === 8 ? highlightedBackgroundColor : '',
                }}>
                <div className={classes.zipcode_container}>
                    <p>{zipCode}</p>
                    <div className={classes.icons}
                        style={{ backgroundColor: iconBoxBackgroundColor && iconBoxBackgroundColor }}>
                        <Pencil color={iconColor} height='15px' width='15px' onClick={handlePencilClick} />
                        <GarbageBin color={iconColor} height='15px' width='15px' onClick={handleBinClick} />
                    </div>
                </div>
            </td>
        </tr>
    );
}

Row.propTypes = {
    delay: PropTypes.number.isRequired,
    highlightedField: PropTypes.number,
    type: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
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