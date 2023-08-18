import React from 'react';
import classes from '../styles/Button.module.css';

function Button({ value, text, onClick }) {
    return (
            <button className={classes.button} value={value} onClick={onClick}>{text}</button>
    );
}

export default Button;