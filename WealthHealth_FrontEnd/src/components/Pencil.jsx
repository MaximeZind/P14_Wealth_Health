import React from 'react';
import PropTypes from 'prop-types';

function Pencil({ color, height, width, onClick }) {
    return (
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        style={{ enableBackground: 'new 0 0 386.257 386.257', fill: 'none', stroke: color, strokeLinecap: 'round', strokeLinejoin: 'round', height: height, width: width }}
        onClick={onClick}>
            <title>pencil-2</title>
            <polygon  points="7 21.5 0.5 23.5 2.5 17 15.33 4.169 19.83 8.669 7 21.5" />
            <path d="M15.33,4.169l3.086-3.086a2.007,2.007,0,0,1,2.828,0l1.672,1.672a2,2,0,0,1,0,2.828L19.83,8.669" />
            <line x1="17.58" y1="6.419" x2="6" y2="18" />
            <polyline points="2.5 17 3.5 18 6 18 6 20.5 7 21.5" />
            <line x1="1.5" y1="20.5" x2="3.5" y2="22.5" />
            <line x1="16.83" y1="2.669" x2="21.33" y2="7.169" />
        </svg>
    );
}

Pencil.propTypes = {
    color: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
}

export default Pencil;
