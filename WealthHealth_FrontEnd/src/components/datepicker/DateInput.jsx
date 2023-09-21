import React, { useEffect } from 'react';
import classes from '../../styles/DateInput.module.css';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import Calendar from './icons/Calendar';
import DatePickerBox from './DatePickerBox';

function DateInput({ name, label, errorMsg, yearsRangeMin, yearsRangeMax, roundYearHighlight, defaultValue }) {

    const defaultDate = new Date(defaultValue);
    const [day, setDay] = useState((defaultValue && defaultDate) ? defaultDate.getDate() : 'DD');
    const [month, setMonth] = useState((defaultValue && defaultDate) ? defaultDate.getMonth()+1 : 'MM');
    const [year, setYear] = useState((defaultValue && defaultDate) ? defaultDate.getFullYear() : 'YYYY');

    // On définit les valeurs des départ pour le composant datePickerBox
    const today = new Date();
    const [startingDay, setStartingDay] = useState(today.getDate());
    const [startingMonth, setStartingMonth] = useState(today.getMonth() + 1);
    const [startingYear, setStartingYear] = useState(today.getFullYear());

    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState('below');

    const datePicker = useRef(null);
    const input = useRef(null);
    const hiddenInput = useRef(null);
    const selectedValue = `${month}/${day}/${year}`;

    function handleClose(){
        setIsOpen(false);
    }

    function handleValues(values) {
        setDay(values.day);
        setMonth(values.month);
        setYear(values.year);
        setStartingDay(values.day);
        setStartingMonth(values.month);
        setStartingYear(values.year);
    }

    // useEffect pour déterminer si le module doit se mettre au dessus ou en dessous
    useEffect(() => {
        const inputRect = input.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const spaceAboveInput = inputRect.top;
        const spaceBelowInput = viewportHeight - inputRect.bottom;
        if (spaceAboveInput > spaceBelowInput) {
            setPosition('above');
        } else if (spaceAboveInput < spaceBelowInput) {
            setPosition('below');
        }

    }, [isOpen]);

    // Pour que le datepicker se ferme lorsque l'utilisateur clique en dehors
    document.addEventListener('click', handleClickOutside);
    function handleClickOutside(event) {
        if (isOpen && datePicker.current && !datePicker.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    // Ajouter la classe focused lors d'une modification de la value dans l'input

    useEffect(() => {
        handleOnChange();
      }, [selectedValue, isOpen]);

    function handleOnChange() {
        if (hiddenInput.current.value !== "MM/DD/YYYY") {
            setIsFocused(true);
        } else if (hiddenInput.current.value === "MM/DD/YYYY") {
            if (isOpen){
                setIsFocused(true);
            } else if (!isOpen){
                setIsFocused(false);
            }
        }
    }

    return (
        <div className={isFocused ? `${classes.date_input_container} ${classes.focused}` : classes.date_input_container} ref={datePicker}>
            <label style={{ top: '20px' }} className={classes.label} htmlFor={name} onClick={() => setIsOpen(!isOpen)}>{label}</label>
            <input ref={hiddenInput} className={classes.hidden} name={name} id={name} value={selectedValue} onChange={handleOnChange}/>
            <div ref={input} className={classes.date_input} onClick={() => setIsOpen(!isOpen)}>
                <p className={classes.selected_date}>{selectedValue}</p>
                <span className={classes.date_input_icon}>
                    <Calendar width={20} height={20} />
                </span>
            </div>
            {isOpen ?
                <DatePickerBox
                position={position}
                handleValues={handleValues}
                handleClose={handleClose}
                startingDay={startingDay}
                startingMonth={startingMonth}
                startingYear={startingYear}
                yearsRangeMin={yearsRangeMin}
                yearsRangeMax={yearsRangeMax}
                roundYearHighlight={roundYearHighlight} /> : null
            }
            {errorMsg ? <p className={classes.error_msg}>{errorMsg}</p> : null}
        </div>
    );
}

DateInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    errorMsg: PropTypes.string,
    yearsRangeMax: PropTypes.number,
    yearsRangeMin: PropTypes.number,
    roundYearHighlight: PropTypes.bool,
    defaultValue: PropTypes.string,
}


export default DateInput;