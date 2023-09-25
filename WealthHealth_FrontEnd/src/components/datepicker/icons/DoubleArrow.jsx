import React from 'react';
import PropTypes from 'prop-types';

function DoubleArrow({ color, rotate, size }) {
    return (
        <svg style={{transform: rotate && `rotate(${rotate}deg)`, 
        height: `${size}px`, 
        width: `${size}px`,
        stroke: color && color}} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" >
            <g id="Double_Chevron_Down">
                <path d="M22.285,15.349L16,21.544l-6.285-6.196c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414   l6.999,6.899c0.379,0.375,1.048,0.377,1.429,0l6.999-6.9c0.394-0.39,0.394-1.024,0-1.414   C23.319,14.958,22.679,14.958,22.285,15.349z" fill="#121313" />
                <path d="M15.286,16.662c0.379,0.375,1.048,0.377,1.429,0l6.999-6.899c0.394-0.391,0.394-1.024,0-1.414   c-0.394-0.391-1.034-0.391-1.428,0L16,14.544L9.715,8.349c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414   L15.286,16.662z" fill="#121313" />
            </g>
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
        </svg>
    );
}

DoubleArrow.propTypes = {
    color: PropTypes.string,
    rotate: PropTypes.number,
    size: PropTypes.number,
}

export default DoubleArrow;
