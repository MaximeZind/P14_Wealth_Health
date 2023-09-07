import React from 'react';
import classes from '../../styles/DateInput.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import DoubleArrow from './icons/DoubleArrow';
import Arrow from './icons/Arrow';

function DatePickerBox({ position, handleValues }) {

    // Date d'aujourd'hui
    const today = new Date();

    //Values used for navigation
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());

    //Values returned
    const [selectedDay, setSelectedDay] = useState(today.getDate());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());

    const gridArray = getGridArray(year, month);
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    //Fonction pour envoyer la data vers le composant parent via "handleValues"
    function sendData(day){
        setSelectedDay(day);
        setSelectedMonth(month);
        setSelectedYear(year);

        let result = {
            day: day,
            month: month,
            year: year
        }
        handleValues(result);
    }

    //fonction qui sert à générer les arrays de jours qui figurent dans le tableau
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

    //Fonctions de navigations entre les mois
    function handleNextMonth() {
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else if (month < 12) {
            setMonth(month + 1);
        }
    }

    function handlePreviousMonth() {
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else if (month > 1) {
            setMonth(month - 1);
        }
    }

    //Fonctions qui gèrent les cliques sur des jours des mois précédents ou suivants (gris)
    function handleClickPreviousMonth(day) {
        setSelectedDay(day);
        if (month === 1) {
            setMonth(12);
            setSelectedMonth(12);
        } else if (month > 1) {
            setMonth(month - 1);
            setSelectedMonth(month - 1);
        }
    }

    function handleClickNextMonth(day) {
        setSelectedDay(day);
        if (month === 12) {
            setMonth(1);
            setSelectedMonth(1);
        } else if (month < 12) {
            setMonth(month + 1);
            setSelectedMonth(month + 1);
        }
    }
    return (
        <div className={classes.date_picker} style={position === 'above' ? { transform: 'translateY(-355px)' } : {}}>
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
                        return <span
                            style={(today.getDate() === gridDay && today.getMonth() + 1 === month && today.getFullYear() === year) ? { border: '1px solid rgba(147, 173, 24, 0.65)' } : {}}
                            className={((gridDay === selectedDay) && (month === selectedMonth) && (year === selectedYear)) ? `${classes.current} ${classes.selected_day}` : classes.current}
                            key={index}
                            onClick={() => sendData(gridDay)}>{gridDay}</span>
                    })}
                    {gridArray.next.map((gridDay, index) => {
                        return <span className={classes.next} key={index} onClick={() => handleClickNextMonth(gridDay)}>{gridDay}</span>
                    })}
                </div>
            </div>
        </div>
    );
}

DatePickerBox.propTypes = {
    position: PropTypes.string.isRequired,
    handleValues: PropTypes.func.isRequired
}


export default DatePickerBox; 