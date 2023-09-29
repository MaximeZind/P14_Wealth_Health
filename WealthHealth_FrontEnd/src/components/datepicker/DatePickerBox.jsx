import React, { useState, useRef, useEffect } from 'react';
import classes from './styles/DatePickerBox.module.css';
import PropTypes from 'prop-types';
import DoubleArrow from './icons/DoubleArrow';
import Arrow from './icons/Arrow';
import Span from '../Span';
import DateInputField from './DateInputField';

function DatePickerBox({ position, handleValues, handleClose, startingDay, startingMonth, startingYear, yearsRangeMin, yearsRangeMax, dateInputField, backgroundColor, fontColor, selectedDayFontColor, selectedMonthYearBackgroundColor, hoveredBackgroundColor, selectedDayBackgroundColor, todayBackgroundColor, previousNextMonthFontColor, iconColor }) {

    const navSpanSize = 25;
    // Date d'aujourd'hui
    const today = new Date();

    // Values used for navigation
    const [month, setMonth] = useState(startingMonth);
    const [year, setYear] = useState(startingYear);

    // Values returned
    const [selectedDay, setSelectedDay] = useState(startingDay);
    const [selectedMonth, setSelectedMonth] = useState(startingMonth);
    const [selectedYear, setSelectedYear] = useState(startingYear);

    // Input fields refs
    const monthInput = useRef(null);
    const dayInput = useRef(null);
    const yearInput = useRef(null);


    // Type d'array dans la grid: jours par défaut, mais peut être "months" ou "years";
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

    // Fonction pour envoyer la data vers le composant parent via "handleValues"
    function sendData(day, month, year, close) {
        setSelectedDay(day);
        if (month === 0) {
            setSelectedMonth(12);
            setSelectedYear(year - 1);
        } else if (month === 13) {
            setSelectedMonth(1);
            setSelectedYear(year + 1);
        } else if (month >= 1 && month <= 12) {
            setSelectedMonth(month);
            setSelectedYear(year);
        }

        let result = {
            day: day,
            month: month,
            year: year
        }
        handleValues(result);
        if (close) {
            handleClose();
        }
    }

    function getYearsArray() {
        const currentYear = today.getFullYear();
        let yearsArray = [];
        if ((yearsRangeMin && yearsRangeMax) && (yearsRangeMax > yearsRangeMin)) {
            yearsArray = Array.from({ length: yearsRangeMax - yearsRangeMin + 1 }, (_, index) => yearsRangeMin + index).reverse();
        } else if (!(yearsRangeMin && yearsRangeMax) || (yearsRangeMax > yearsRangeMin)) {
            // Array par défaut 100 ans avant et après aujourd'hui
            yearsArray = Array.from({ length: 201 }, (_, index) => currentYear - 100 + index).reverse();
        }

        return yearsArray;
    }

    // fonction qui sert à générer les arrays de jours qui figurent dans le tableau
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

    function handleSelectMonth(number) {
        setMonth(number);
        setSelectedMonth(number);
        sendData(selectedDay, number, selectedYear, false);
        setTimeout(() => {
            setArrayType('days');
        }, 30);
    }

    function handleSelectYear(number) {
        setYear(number);
        setSelectedYear(number);
        sendData(selectedDay, selectedMonth, number, false);
        setTimeout(() => {
            setArrayType('days');
        }, 30);
    }

    // Fonctions de navigations entre les mois
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

    // INPUT FIELDS //

    function selectInput(event) {
        const inputField = event.target;
        inputField.select();
    }

    function handleOnBlurMonth(event) {
        const value = Number(event.target.value);
        const inputField = event.target;
        if (value > 12) {
            setMonth(12);
            setSelectedMonth(12);
            sendData(selectedDay, 12, selectedYear, false);
            inputField.value = 12;
        } else if (value <= 12 && value > 0) {
            setMonth(value);
            setSelectedMonth(value);
            sendData(selectedDay, value, selectedYear, false);
        } else if (value <= 0) {
            setMonth(1);
            setSelectedMonth(1);
            sendData(selectedDay, 1, selectedYear, false);
            inputField.value = 1;
        }
        inputField.value = inputField.value.toString().padStart(2, '0');
    }

    function handleOnBlurDay(event) {
        const daysThisMonth = new Date(year, month, 0).getDate();
        const value = Number(event.target.value);
        const inputField = event.target;
        if (value > daysThisMonth) {
            setSelectedDay(daysThisMonth);
            sendData(daysThisMonth, selectedMonth, selectedYear, false);
            inputField.value = daysThisMonth;
        } else if (value <= daysThisMonth && value > 0) {
            setSelectedDay(value);
            sendData(value, selectedMonth, selectedYear, false);
        } else if (value <= 0) {
            setSelectedDay(1);
            sendData(1, selectedMonth, selectedYear, false);
            inputField.value = 1;
        }
        inputField.value = inputField.value.toString().padStart(2, '0');
    }

    function handleOnBlurYear(event) {
        const value = Number(event.target.value);
        const inputField = event.target;
        if (yearsRangeMax && value > yearsRangeMax) {
            setYear(Number(yearsRangeMax));
            setSelectedYear(Number(yearsRangeMax));
            sendData(selectedDay, selectedMonth, yearsRangeMax, false);
            inputField.value = yearsRangeMax;
        } else if (yearsRangeMax && yearsRangeMin && value <= yearsRangeMax && value > yearsRangeMin) {
            setYear(value);
            setSelectedYear(value);
            sendData(selectedDay, selectedMonth, value, false);
        } else if (yearsRangeMin && value <= yearsRangeMin) {
            setYear(Number(yearsRangeMin));
            setSelectedYear(Number(yearsRangeMin));
            sendData(selectedDay, selectedMonth, yearsRangeMin, false);
            inputField.value = yearsRangeMin;
        }
    }

    useEffect(() => {
        if (dayInput.current && monthInput.current && yearInput.current){
            dayInput.current.value = selectedDay.toString().padStart(2, '0');
            monthInput.current.value = selectedMonth.toString().padStart(2, '0');
            yearInput.current.value = selectedYear;
        }
    }, [selectedDay, selectedMonth, selectedYear]);

    return (
        <div className={classes.date_picker}
            style={{
                transform: position === 'above' && 'translateY(-355px)',
                backgroundColor: backgroundColor && backgroundColor,
                gap: dateInputField ? '5px' : '30px'
            }}>
            <header className={classes.date_picker_header}>
                <Span onClick={() => setYear(year - 1)}
                    hoveredBackgroundColor={hoveredBackgroundColor}
                    size={navSpanSize}
                    borderRadius='50%'>
                    <DoubleArrow rotate={90} color={iconColor && iconColor} size={18} />
                </Span>
                <Span onClick={handlePreviousMonth}
                    hoveredBackgroundColor={hoveredBackgroundColor}
                    size={navSpanSize}
                    borderRadius='50%'>
                    <Arrow rotate={90} color={iconColor && iconColor} size={11} />
                </Span>
                <div className={classes.date_picker_month_year}>
                    <Span text={monthMapping[month]}
                        onClick={() => arrayType === 'months' ? setArrayType('days') : setArrayType('months')}
                        fontColor={fontColor}
                        backgroundColor={arrayType === 'months' ? selectedMonthYearBackgroundColor : ''}
                        hoveredBackgroundColor={hoveredBackgroundColor}
                        padding={4}
                    />
                    <Span text={year}
                        onClick={() => arrayType === 'years' ? setArrayType('days') : setArrayType('years')}
                        fontColor={fontColor}
                        backgroundColor={arrayType === 'years' ? selectedMonthYearBackgroundColor : ''}
                        hoveredBackgroundColor={hoveredBackgroundColor}
                        padding={4}
                    />
                </div>
                <Span onClick={handleNextMonth}
                    hoveredBackgroundColor={hoveredBackgroundColor}
                    size={navSpanSize}
                    borderRadius='50%'>
                    <Arrow rotate={-90} color={iconColor && iconColor} size={11} />
                </Span>
                <Span onClick={() => setYear(year + 1)}
                    hoveredBackgroundColor={hoveredBackgroundColor}
                    size={navSpanSize}
                    borderRadius='50%'>
                    <DoubleArrow rotate={-90} color={iconColor && iconColor} size={18} />
                </Span>
            </header>
            {dateInputField &&
                <div className={classes.date_input_fields}
                style={{
                    color: fontColor,
                }}>
                    <DateInputField type="text"
                        characters={2}
                        elementRef={monthInput}
                        defaultValue={selectedMonth.toString().padStart(2, '0')}
                        onBlur={(event) => handleOnBlurMonth(event)}
                        onClick={(event) => selectInput(event)}
                        onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}
                        className={`${classes.date_input_fields_field} ${classes.month_input}`} 
                        fontColor={fontColor}/>
                    <p>/</p>
                    <DateInputField type="text"
                        characters={2}
                        elementRef={dayInput}
                        defaultValue={selectedDay.toString().padStart(2, '0')}
                        onBlur={(event) => handleOnBlurDay(event)}
                        onClick={(event) => selectInput(event)}
                        onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}
                        className={`${classes.date_input_fields_field} ${classes.day_input}`} 
                        fontColor={fontColor}/>
                    <p>/</p>
                    <DateInputField type="text"
                        characters={4}
                        elementRef={yearInput}
                        defaultValue={selectedYear}
                        onBlur={(event) => handleOnBlurYear(event)}
                        onClick={(event) => selectInput(event)}
                        onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}
                        className={`${classes.date_input_fields_field} ${classes.year_input}`} 
                        fontColor={fontColor}/>
                </div>}
            {arrayType === 'days' &&
                <div className={classes.date_picker_days}>
                    <header className={classes.date_picker_days_grid_header}>
                        {
                            week.map((gridDay) => {
                                return <p key={gridDay} style={{ color: fontColor && fontColor }}>{gridDay}</p>
                            })
                        }
                    </header>
                    <div className={classes.date_picker_days_grid}>
                        {
                            gridArray.previous.map((gridDay, index) => {
                                const previousMonth = month > 1 ? month - 1 : 12;
                                const updatedYear = month > 1 ? year : year - 1;
                                const isSelectedDay = ((gridDay === selectedDay) && (selectedMonth === previousMonth) && (selectedYear === updatedYear));
                                return <Span key={index}
                                    text={gridDay}
                                    onClick={() => sendData(gridDay, month - 1, year, true)}
                                    hoveredBackgroundColor={hoveredBackgroundColor}
                                    backgroundColor={isSelectedDay ? selectedDayBackgroundColor : ''}
                                    fontColor={isSelectedDay ? selectedDayFontColor : previousNextMonthFontColor} />
                            })
                        }
                        {
                            gridArray.current.map((gridDay, index) => {
                                const isToday = (today.getDate() === gridDay && today.getMonth() + 1 === month && today.getFullYear() === year);
                                const isSelectedDay = (gridDay === selectedDay) && (month === selectedMonth) && (year === selectedYear);
                                return <Span key={index}
                                    text={gridDay}
                                    onClick={() => sendData(gridDay, month, year, true)}
                                    hoveredBackgroundColor={isSelectedDay ? selectedDayBackgroundColor : (isToday ? todayBackgroundColor : hoveredBackgroundColor)}
                                    backgroundColor={isSelectedDay ? selectedDayBackgroundColor : (isToday ? todayBackgroundColor : '')}
                                    fontColor={isSelectedDay ? selectedDayFontColor : fontColor} />
                            })
                        }
                        {
                            gridArray.next.map((gridDay, index) => {
                                const nextMonth = month < 12 ? month + 1 : 1;
                                const updatedYear = month < 12 ? year : year + 1;
                                const isSelectedDay = ((gridDay === selectedDay) && (selectedMonth === nextMonth) && (selectedYear === updatedYear));
                                return <Span key={index}
                                    text={gridDay}
                                    onClick={() => sendData(gridDay, month + 1, year, true)}
                                    hoveredBackgroundColor={hoveredBackgroundColor}
                                    backgroundColor={isSelectedDay ? selectedDayBackgroundColor : ''}
                                    fontColor={isSelectedDay ? selectedDayFontColor : previousNextMonthFontColor} />
                            })
                        }
                    </div>
                </div>
            }{arrayType === 'months' &&
                <div className={classes.date_picker_months_grid}>
                    {
                        monthsArray.map((month, index) => {
                            return <Span key={index}
                                text={month}
                                onClick={() => handleSelectMonth(index + 1)}
                                hoveredBackgroundColor={hoveredBackgroundColor}
                                fontColor={fontColor}
                                lineHeight='inherit' />
                        })
                    }
                </div>
            }
            {arrayType === 'years' &&
                <div className={classes.date_picker_years_grid}>
                    {
                        yearsArray.map((year, index) => {
                            const isRoundYear = (year % 10 === 0);
                            return <Span key={index}
                                text={year}
                                onClick={() => handleSelectYear(year)}
                                fontColor={fontColor}
                                backgroundColor={isRoundYear ? selectedMonthYearBackgroundColor : ''}
                                hoveredBackgroundColor={hoveredBackgroundColor}
                                gridColumnStart={isRoundYear ? 1 : 'auto'}
                                gridColumnEnd={isRoundYear ? 4 : 'auto'}
                                fontSize={isRoundYear ? '1.5rem' : 'auto'}
                            />
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
    handleClose: PropTypes.func.isRequired,
    startingDay: PropTypes.number.isRequired,
    startingMonth: PropTypes.number.isRequired,
    startingYear: PropTypes.number.isRequired,
    yearsRangeMin: PropTypes.number,
    yearsRangeMax: PropTypes.number,
    dateInputField: PropTypes.bool,
    backgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    selectedMonthYearBackgroundColor: PropTypes.string,
    selectedDayFontColor: PropTypes.string,
    selectedDayBackgroundColor: PropTypes.string,
    todayBackgroundColor: PropTypes.string,
    previousNextMonthFontColor: PropTypes.string,
    iconColor: PropTypes.string,
}


export default DatePickerBox;