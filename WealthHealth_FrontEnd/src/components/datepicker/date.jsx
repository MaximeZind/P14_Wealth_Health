import React from 'react';
import classes from '../styles/DateInput.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Calendar from './icons/Calendar';
import DoubleArrow from './icons/DoubleArrow';

function DateInput({ name, label, errorMsg }) {

    const today = new Date();
    const [day, setDay] = useState(today.getDate());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());
    const [isOpen, setIsOpen] = useState(false);

    const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
        <div className={classes.date_input_container}>
            <div className={classes.date_input} onClick={() => setIsOpen(!isOpen)}>
                <div className={classes.selected_date}>
                    <p>{month}</p>
                    <p>/</p>
                    <p>{day}</p>
                    <p>/</p>
                    <p>{year}</p>
                </div>
                <span className={classes.date_input_icon}>
                    <Calendar />
                </span>
            </div>
            <div className={classes.date_picker}>
                <header className={classes.date_picker_header}>
                    <div className={classes.date_picker_nav}>
                        <DoubleArrow rotate={-90} />
                    </div>
                    <div className={classes.date_picker_nav}></div>
                    <div className={classes.date_picker_month_year}>
                        <div className={classes.date_picker_month}></div>
                        <div className={classes.date_picker_year}></div>
                    </div>
                    <div className={classes.date_picker_nav}></div>
                    <div className={classes.date_picker_nav}>
                        <DoubleArrow rotate={90} />
                    </div>
                </header>
                <div className={classes.date_picker_days}>
                    <header className={classes.date_picker_days_grid}>
                        {week.map((day) => {
                            return <p key={day}>{day}</p>
                        })}
                    </header>
                    <div className={classes.date_picker_days_grid}>
                        {week.map((day) => {
                            return <p key={day}>{day}</p>
                        })}
                        {week.map((day) => {
                            return <p key={day}>{day}</p>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

DateInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    errorMsg: PropTypes.string,
}


export default DateInput; 