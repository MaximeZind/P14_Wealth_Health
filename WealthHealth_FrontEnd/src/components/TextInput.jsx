import React from 'react';
import classes from '../styles/TextInput.module.css';

function TextInput({name, label, errorMsg}) {

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input className={classes.input} type="text" id={name} name={name} />
            {errorMsg ? <p className={classes.error_msg}>{errorMsg}</p> : null}
        </>
    );
}

export default TextInput;