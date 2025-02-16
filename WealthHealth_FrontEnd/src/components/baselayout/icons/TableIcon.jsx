import React from 'react';
import PropTypes from 'prop-types';

function TableIcon({ color, width, height }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            height={height}
            width={width}
            version="1.1"
            stroke={color}
            fill={color}
            x="0px" y="0px"
            viewBox="0 0 50 50"
            xmlSpace="preserve">
            <g id="Layer_1">
                <path d="M49,1H1v48h48V1z M47,3v9H3V3H47z M18,40v-5h14v5H18z M32,42v5H18v-5H32z M18,26v-5h14v5H18z M32,28v5H18v-5H32z M18,19v-5   h14v5H18z M16,19H3v-5h13V19z M16,21v5H3v-5H16z M16,28v5H3v-5H16z M16,35v5H3v-5H16z M34,35h13v5H34V35z M34,33v-5h13v5H34z    M34,26v-5h13v5H34z M34,19v-5h13v5H34z M3,42h13v5H3V42z M34,47v-5h13v5H34z" />
            </g>
            <g>
            </g>
        </svg>
    );
}

TableIcon.propTypes = {
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
}

export default TableIcon;
