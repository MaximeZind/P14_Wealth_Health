import React from 'react';
import classes from '../styles/Button.module.css';
import PropTypes from 'prop-types';

function Button({ value, text, onClick }) {

    return (
            <button className={classes.button} value={value} onClick={onClick}>{text}</button>
    );
}

Button.propTypes = {
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }

export default Button;