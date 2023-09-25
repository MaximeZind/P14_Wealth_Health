import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useState } from 'react';
import classes from '../styles/Span.module.css';


function Span({ children, text, onClick, backgroundColor, hoveredBackgroundColor, fontColor, lineHeight, gridColumnStart, gridColumnEnd, fontSize, size, borderRadius, padding, position, top, right, zIndex }) {

    const [isHovered, setIsHovered] = useState(false);
    console.log(hoveredBackgroundColor);
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
                paddingLeft: padding && padding,
                paddingRight: padding && padding,
                position: position && position,
                top: top && `${top}px`,
                right: right && `${right}px`,
                zIndex: zIndex && zIndex,
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
    padding: PropTypes.number,
    position: PropTypes.string,
    top: PropTypes.number,
    right: PropTypes.number,
    zIndex: PropTypes.number,
}


export default Span;