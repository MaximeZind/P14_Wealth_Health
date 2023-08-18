import React from 'react';
import classes from '../styles/DateInput.module.css';

function DateInput({name, label, errorMsg}) {

    return (
        <div>
            <label className={classes.label} htmlFor={name}>{label}</label>
            <input className={classes.input} type="date" id={name} name={name} />
            {errorMsg ? <p className={classes.error_msg}>{errorMsg}</p> : null}
        </div>
    );
}

export default DateInput; 