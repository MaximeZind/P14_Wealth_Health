import React from 'react';
import classes from '../styles/Button.module.css';

function Button({ value, text }) {
    return (
            <button className={classes.button} value={value}>{text}</button>
    );
}

export default Button;