import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useState } from 'react';
import classes from '../styles/Span.module.css';


function Span({ children, text, onClick, backgroundColor, hoveredBackgroundColor, fontColor, lineHeight, gridColumnStart, gridColumnEnd, fontSize, size, borderRadius }) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <span className={classes.span}
            onClick={onClick}
            style={{
                backgroundColor: isHovered ? (hoveredBackgroundColor && hoveredBackgroundColor) : (backgroundColor && backgroundColor),
                color: fontColor && fontColor,
                lineHeight: lineHeight ? lineHeight : 'normal',
                gridColumnStart: gridColumnStart && gridColumnStart,
                gridColumnEnd: gridColumnEnd && gridColumnEnd,
                fontSize: fontSize && fontSize,
                height: size && `${size}px`,
                width: size && `${size}px`,
                borderRadius: borderRadius && borderRadius,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {children && children}
            {text && text}
        </span>

    );
}

Span.propTypes = {
    children: PropTypes.node,
    text: oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    backgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    lineHeight: PropTypes.string,
    gridColumnStart: oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    gridColumnEnd: oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    fontSize: PropTypes.string,
    size: PropTypes.number,
    borderRadius: PropTypes.string,
}


export default Span;