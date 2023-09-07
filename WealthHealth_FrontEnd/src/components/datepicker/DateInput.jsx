import React, { useEffect } from 'react';
import classes from '../../styles/DateInput.module.css';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import Calendar from './icons/Calendar';
import DatePickerBox from './DatePickerBox';

function DateInput({ name, label, errorMsg }) {

    const today = new Date();

    const [day, setDay] = useState(today.getDate());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());

    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState('below');

    const datePicker = useRef(null);
    const input = useRef(null);
    const selectedValue = `${month}/${day}/${year}`;

    function handleValues(values){
        setDay(values.day);
        setMonth(values.month);
        setYear(values.year);
    }

    //useEffect pour déterminer si le module doit se mettre au dessus ou en dessous
    useEffect(() => {
        const inputRect = input.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const spaceAboveInput = inputRect.top;
        const spaceBelowInput = viewportHeight - inputRect.bottom;
        if (spaceAboveInput > spaceBelowInput){
            setPosition('above');
        } else if (spaceAboveInput < spaceBelowInput){
            setPosition('below');
        }

    },[isOpen]);

    //Pour que le datepicker se ferme lorsque l'utilisateur clique en dehors
    document.addEventListener('click', handleClickOutside);
    function handleClickOutside(event) {
        if (isOpen && datePicker.current && !datePicker.current.contains(event.target)) {
            console.log(event.target);
            console.log(datePicker.current);
            setIsOpen(false);
        }
    }

    return (
        <div className={classes.date_input_container} ref={datePicker}>
            <label className={classes.label} htmlFor={name}>{label}</label>
            <input className={classes.hidden} name={name} id={name} value={selectedValue} readOnly={true} />
            <div ref={input} className={classes.date_input} onClick={() => setIsOpen(!isOpen)}>
                <p className={classes.selected_date}>{selectedValue}</p>
                <span className={classes.date_input_icon}>
                    <Calendar />
                </span>
            </div>
            {isOpen ?
                <DatePickerBox position={position} handleValues={handleValues} /> : null
            }
            {errorMsg ? <p className={classes.error_msg}>{errorMsg}</p> : null}
        </div>
    );
}

DateInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    errorMsg: PropTypes.string,
}


export default DateInput; 