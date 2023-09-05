import React, { useEffect } from 'react';
import classes from '../../styles/DateInput.module.css';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import Calendar from './icons/Calendar';
import DoubleArrow from './icons/DoubleArrow';
import Arrow from './icons/Arrow';

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
    const gridArray = getGridArray(year, month);

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
            setIsOpen(false);
        }
    }

    function getGridArray(year, month) {

        const firstDay = new Date(year, month - 1, 1).getDay();
        const amountOfDays = new Date(year, month, 0).getDate();
        const amountOfDaysPrevious = new Date(year, month - 1, 0).getDate();
        const amountOfDaysNext = new Date(year, month + 1, 0).getDate();

        let previousArray = Array.from(Array(amountOfDaysPrevious).keys()).map(x => x + 1);
        const array = Array.from(Array(amountOfDays).keys()).map(x => x + 1);
        let nextArray = Array.from(Array(amountOfDaysNext).keys()).map(x => x + 1);
        previousArray = firstDay === 0 ? [] : previousArray.slice(-(firstDay));
        const daysLeft = (previousArray.length + array.length) % 7;
        nextArray = daysLeft === 0 ? [] : nextArray.slice(0, 7 - ((previousArray.length + array.length) % 7))
        const result = {
            previous: previousArray,
            current: array,
            next: nextArray
        }
        return result;
    }

    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const monthMapping = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };

    // if (input.current){
    //     console.log(input.current.clientHeight)
    // }

    //Fonctions de navigations entre les mois
    function handleNextMonth() {
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else if (month < 12) {
            setMonth(month + 1);
        }

        const test = new Date(`${year}-${month+1}-${day}`);
        if (test.getDate() !== day){
            setDay(day - 1);
        }
    }

    function handlePreviousMonth() {
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else if (month > 1) {
            setMonth(month - 1)
        }
        const test = new Date(`${year}-${month+1}-${day}`);
        if (test.getDate() !== day){
            setDay(day - 1);
        }
    }

    function handleClickPreviousMonth(day) {
        setDay(day);
        if (month === 1){
            setMonth(12);
        } else if (month > 1){
            setMonth(month - 1);
        }
    }

    function handleClickNextMonth(day) {
        setDay(day);
        setMonth(month + 1);
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
            {isOpen &&
                <div className={classes.date_picker} style={position === 'above' ?{marginTop: '-375px'} : {}}>
                    <header className={classes.date_picker_header}>
                        <div className={classes.date_picker_nav} onClick={() => setYear(year - 1)}>
                            <DoubleArrow rotate={90} />
                        </div>
                        <div className={classes.date_picker_nav} onClick={handlePreviousMonth}>
                            <Arrow rotate={90} />
                        </div>
                        <div className={classes.date_picker_month_year}>
                            <div className={classes.date_picker_month}>
                                <p>{monthMapping[month]}</p>
                            </div>
                            <div className={classes.date_picker_year}>
                                <p>{year}</p>
                            </div>
                        </div>
                        <div className={classes.date_picker_nav} onClick={handleNextMonth}>
                            <Arrow rotate={-90} />
                        </div>
                        <div className={classes.date_picker_nav} onClick={() => setYear(year + 1)}>
                            <DoubleArrow rotate={-90} />
                        </div>
                    </header>
                    <div className={classes.date_picker_days}>
                        <header className={classes.date_picker_days_grid_header}>
                            {week.map((gridDay) => {
                                return <p key={gridDay}>{gridDay}</p>
                            })}
                        </header>
                        <div className={classes.date_picker_days_grid}>
                            {gridArray.previous.map((gridDay, index) => {
                                return <span className={classes.previous} key={index} onClick={() => handleClickPreviousMonth(gridDay)}>{gridDay}</span>
                            })}
                            {gridArray.current.map((gridDay, index) => {
                                return <span style={(today.getDate() === gridDay && today.getMonth() + 1 === month && today.getFullYear() === year) ? { border: '1px solid rgba(147, 173, 24, 0.65)' } : {}} className={gridDay === day ? `${classes.current} ${classes.selected_day}` :classes.current} key={index} onClick={() => setDay(gridDay)}>{gridDay}</span>
                            })}
                            {gridArray.next.map((gridDay, index) => {
                                return <span className={classes.next} key={index} onClick={() => handleClickNextMonth(gridDay)}>{gridDay}</span>
                            })}
                        </div>
                    </div>
                </div>
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