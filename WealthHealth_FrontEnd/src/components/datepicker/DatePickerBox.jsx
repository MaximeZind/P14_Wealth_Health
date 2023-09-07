import React from 'react';
import classes from '../../styles/DatePickerBox.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import DoubleArrow from './icons/DoubleArrow';
import Arrow from './icons/Arrow';

function DatePickerBox({ position, handleValues, handleClose, startingDay, startingMonth, startingYear }) {

    // Date d'aujourd'hui
    const today = new Date();

    console.log(startingDay);
    console.log(startingMonth);
    console.log(startingYear);
    //Values used for navigation
    const [month, setMonth] = useState(startingMonth);
    const [year, setYear] = useState(startingYear);

    //Values returned
    const [selectedDay, setSelectedDay] = useState(startingDay);
    const [selectedMonth, setSelectedMonth] = useState(startingMonth);
    const [selectedYear, setSelectedYear] = useState(startingYear);

    //Type d'array dans la grid: jours par défaut, mais peut être "months" ou "years";
    const [arrayType, setArrayType] = useState('days');

    const gridArray = getGridArray(year, month);
    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const yearsArray = getYearsArray();

    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    //Fonction pour envoyer la data vers le composant parent via "handleValues"
    function sendData(day, month, year) {
        setSelectedDay(day);
        if (month === 0){
            setSelectedMonth(12);
            setSelectedYear(year-1);
        } else if (month === 13){
            setSelectedMonth(1);
            setSelectedYear(year+1);
        } else if (month >= 1 && month <= 12){
            setSelectedMonth(month);
            setSelectedYear(year);
        }

        let result = {
            day: day,
            month: month,
            year: year
        }
        handleValues(result);
        handleClose();
    }

    function getYearsArray() {
        const currentYear = today.getFullYear();
        const numberArray = Array.from({ length: 201 }, (_, index) => currentYear - 100 + index);
        return numberArray;
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

    function handleSelectMonth(number){
        setMonth(number);
        setTimeout(() => {
            setArrayType('days');
        }, 30);
    }

    function handleSelectYear(number){
        setYear(number);
        setTimeout(() => {
            setArrayType('days');
        }, 30);
    }

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
                    <div className={arrayType === 'months' ? `${classes.date_picker_month} ${classes.selected}` : classes.date_picker_month} onClick={() => arrayType === 'months' ? setArrayType('days') : setArrayType('months')}>
                        <p>{monthMapping[month]}</p>
                    </div>
                    <div className={arrayType === 'years' ? `${classes.date_picker_year} ${classes.selected}` : classes.date_picker_year} onClick={() => arrayType === 'years' ? setArrayType('days') : setArrayType('years')}>
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
            {arrayType === 'days' &&
                <div className={classes.date_picker_days}>
                    <header className={classes.date_picker_days_grid_header}>
                        {week.map((gridDay) => {
                            return <p key={gridDay}>{gridDay}</p>
                        })}
                    </header>
                    <div className={classes.date_picker_days_grid}>
                        {gridArray.previous.map((gridDay, index) => {
                            return <span className={classes.previous} key={index} onClick={() => sendData(gridDay, month-1, year)}>{gridDay}</span>
                        })}
                        {gridArray.current.map((gridDay, index) => {
                            return <span
                                style={(today.getDate() === gridDay && today.getMonth() + 1 === month && today.getFullYear() === year) ? { border: '1px solid rgba(147, 173, 24, 0.65)' } : {}}
                                className={((gridDay === selectedDay) && (month === selectedMonth) && (year === selectedYear)) ? `${classes.current} ${classes.selected_day}` : classes.current}
                                key={index}
                                onClick={() => sendData(gridDay, month, year)}>{gridDay}</span>
                        })}
                        {gridArray.next.map((gridDay, index) => {
                            return <span className={classes.next} key={index} onClick={() => sendData(gridDay, month+1, year)}>{gridDay}</span>
                        })}
                    </div>
                </div>
            }{arrayType === 'months' &&
                <div className={classes.date_picker_months_grid}>
                    {
                        monthsArray.map((month, index) => {
                            return <span key={index} className={classes.months_grid_month} onClick={() => handleSelectMonth(index+1)}>{month}</span>
                        })
                    }
                </div>
            }
            {arrayType === 'years' &&
            <div className={classes.date_picker_years_grid}>
                {
                    yearsArray.map((year, index) => {
                        return <span key={index} className={classes.years_grid_year} onClick={() => handleSelectYear(year)}>{year}</span>
                    })
                }
            </div>
        }
        </div>
    );
}

DatePickerBox.propTypes = {
    position: PropTypes.string.isRequired,
    handleValues: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}


export default DatePickerBox; 