import React from "react";
import PropTypes from 'prop-types';

function DateInputField({ type, characters, elementRef, defaultValue, onBlur, onClick, onKeyDown, className, fontColor }) {

    return (
        <input type={type}
            ref={elementRef}
            defaultValue={defaultValue}
            style={{ 
                width: `${characters}ch`,
            color: fontColor && fontColor }}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            className={className} />
    )
}

DateInputField.propTypes = {
    type: PropTypes.string.isRequired,
    elementRef: PropTypes.object.isRequired,
    defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    onBlur: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    fontColor: PropTypes.string,
}

export default DateInputField;