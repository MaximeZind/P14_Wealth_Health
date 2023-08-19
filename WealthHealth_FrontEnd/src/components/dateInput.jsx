import React from 'react';
import classes from '../styles/DateInput.module.css';
import PropTypes from 'prop-types';

function DateInput({name, label, errorMsg}) {

    return (
        <div>
            <label className={classes.label} htmlFor={name}>{label}</label>
            <input className={classes.input} type="date" id={name} name={name} />
            {errorMsg ? <p className={classes.error_msg}>{errorMsg}</p> : null}
        </div>
    );
}

DateInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    errorMsg: PropTypes.string,
  }


export default DateInput; 