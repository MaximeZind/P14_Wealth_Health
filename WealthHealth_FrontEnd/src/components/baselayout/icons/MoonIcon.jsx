import React from 'react';
import PropTypes from 'prop-types';

function MoonIcon({ color, width, height }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            stroke={color}
            fill={color}
            width={`${width}px`}
            height={`${height}px`}
            version="1.1" id="Icons" x="0px" y="0px"
            viewBox="0 0 32 32">
            <path d="M17,5c-0.27,0-0.54,0.02-0.8,0.04C19.05,6.55,21,9.55,21,13c0,4.97-4.03,9-9,9c-2.74,0-5.19-1.23-6.85-3.17  C6.04,24.59,11,29,17,29c6.63,0,12-5.37,12-12S23.63,5,17,5z" />
            <g>
                <path  d="M11,9c-2.58,0.62-3.38,1.42-4,4c-0.62-2.58-1.42-3.38-4-4c2.58-0.62,3.38-1.42,4-4C7.62,7.58,8.42,8.38,11,9z" />
            </g>
            <line x1="12" y1="14" x2="12" y2="16" />
            <line x1="11" y1="15" x2="13" y2="15" />
        </svg>
    );
}

MoonIcon.propTypes = {
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
}

export default MoonIcon;
