import React from 'react';
import PropTypes from 'prop-types';

function NewUserIcon({ color, width, height }) {
    return (
        <svg color={color} width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <polyline points="17 11 19 13 23 9" />
        </svg>
    );
}

NewUserIcon.propTypes = {
    color: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
}

export default NewUserIcon;