import React, { useEffect } from 'react';
import classes from './styles/DateInput.module.css';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import Calendar from './icons/Calendar';
import DatePickerBox from './DatePickerBox';

/**
 * Un composant d'entrée de date personnalisable avec un sélecteur de date qui s'ouvre et se ferme.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.name - L'attribut "name" de l'entrée de date.
 * @param {string} props.label - Le texte d'étiquette de l'entrée de date.
 * @param {string} [props.errorMsg] - Le message d'erreur à afficher.
 * @param {number} [props.yearsRangeMax] - L'année maximale disponible dans le sélecteur de date.
 * @param {number} [props.yearsRangeMin] - L'année minimale disponible dans le sélecteur de date.
 * @param {boolean} [props.roundYearHighlight] - Indique si l'année doit être arrondie dans le sélecteur de date.
 * @param {string} [props.defaultValue] - La valeur par défaut pour l'entrée au format "MM/JJ/AAAA".
 * @param {string} props.labelColor - La couleur de l'étiquette.
 * @param {string} props.focusedLabelColor - La couleur de l'étiquette lorsqu'elle est en focus.
 * @param {string} props.boxShadowColor - La couleur de l'ombre de la boîte de l'entrée.
 * @param {string} props.fontColor - La couleur du texte de l'entrée.
 * @param {string} props.selectedDayFontColor - La couleur du jour sélectionné dans le sélecteur de date.
 * @param {string} props.previousNextMonthFontColor - La couleur des jours du mois précédent/suivant dans le sélecteur de date.
 * @param {string} props.iconColor - La couleur de l'icône du calendrier.
 * @param {string} props.backgroundColor - La couleur de fond du conteneur de l'entrée.
 * @param {string} props.hoveredBackgroundColor - La couleur de fond lors du survol.
 * @param {string} props.selectedDayBackgroundColor - La couleur de fond du jour sélectionné dans le sélecteur de date.
 * @param {string} props.selectedMonthYearBackgroundColor - La couleur de fond du mois/année sélectionné dans le sélecteur de date.
 * @param {string} props.todayBackgroundColor - La couleur de fond de la date d'aujourd'hui dans le sélecteur de date.
 * @returns {JSX.Element} Le composant DateInput rendu.
 */

function DateInput({ name, label, errorMsg, yearsRangeMin, yearsRangeMax, roundYearHighlight, defaultValue, dateInputField, labelColor, focusedLabelColor, boxShadowColor, fontColor, selectedDayFontColor, previousNextMonthFontColor, iconColor, backgroundColor, hoveredBackgroundColor, selectedDayBackgroundColor, todayBackgroundColor, selectedMonthYearBackgroundColor }) {

    const defaultDate = new Date(defaultValue);
    const [day, setDay] = useState((defaultValue && defaultDate) ? defaultDate.getDate() : 'DD');
    const [month, setMonth] = useState((defaultValue && defaultDate) ? defaultDate.getMonth() + 1 : 'MM');
    const [year, setYear] = useState((defaultValue && defaultDate) ? defaultDate.getFullYear() : 'YYYY');

    // On définit les valeurs des départ pour le composant datePickerBox
    const today = new Date();
    const [startingDay, setStartingDay] = useState((defaultValue && defaultDate) ? defaultDate.getDate() : today.getDate());
    const [startingMonth, setStartingMonth] = useState((defaultValue && defaultDate) ? defaultDate.getMonth() + 1 : today.getMonth() + 1);
    const [startingYear, setStartingYear] = useState((defaultValue && defaultDate) ? defaultDate.getFullYear() : today.getFullYear());

    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState(0);

    const datePicker = useRef(null);
    const input = useRef(null);
    const hiddenInput = useRef(null);
    const datePickerBox = useRef(null);
    const selectedValue = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

    function handleClose() {
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
        if (datePickerBox.current && input.current){
        const inputRect = input.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const spaceAboveInput = inputRect.top;
        const spaceBelowInput = viewportHeight - inputRect.bottom;
        const datePickerBoxHeight = datePickerBox.current.getBoundingClientRect().height;
        const translateY = datePickerBoxHeight + 50;
        if (spaceAboveInput > spaceBelowInput) {
            setPosition(-translateY);
        } else if (spaceAboveInput < spaceBelowInput) {
            setPosition(0);
        }
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
            if (isOpen) {
                setIsFocused(true);
            } else if (!isOpen) {
                setIsFocused(false);
            }
        }
    }

    return (
        <div className={isFocused ? `${classes.date_input_container} ${classes.focused}` : classes.date_input_container}
            ref={datePicker}>
            <label style={{ color: isFocused ? focusedLabelColor && focusedLabelColor : labelColor && labelColor }}
                className={classes.label} htmlFor={name} onClick={() => setIsOpen(!isOpen)}>
                {label}
            </label>
            <input ref={hiddenInput} className={classes.hidden} name={name} id={name} value={selectedValue} onChange={handleOnChange} />
            <div ref={input}
                className={classes.date_input}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    boxShadow: boxShadowColor && `0 1px 0 0 ${boxShadowColor}`,
                    color: fontColor && fontColor
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <p className={classes.selected_date}>{selectedValue}</p>
                <span className={classes.date_input_icon}
                    style={{ backgroundColor: (isHovered || isOpen) ? hoveredBackgroundColor && hoveredBackgroundColor : '' }}>
                    <Calendar width={20} height={20} color={iconColor && iconColor} />
                </span>
            </div>
            {isOpen ?
                <DatePickerBox
                elementRef={datePickerBox}
                    position={position}
                    handleValues={handleValues}
                    handleClose={handleClose}
                    startingDay={startingDay}
                    startingMonth={startingMonth}
                    startingYear={startingYear}
                    yearsRangeMin={yearsRangeMin}
                    yearsRangeMax={yearsRangeMax}
                    dateInputField={dateInputField}
                    roundYearHighlight={roundYearHighlight}
                    backgroundColor={backgroundColor}
                    fontColor={fontColor}
                    selectedDayFontColor={selectedDayFontColor}
                    selectedMonthYearBackgroundColor={selectedMonthYearBackgroundColor}
                    hoveredBackgroundColor={hoveredBackgroundColor}
                    selectedDayBackgroundColor={selectedDayBackgroundColor}
                    todayBackgroundColor={todayBackgroundColor}
                    previousNextMonthFontColor={previousNextMonthFontColor}
                    iconColor={iconColor} /> : null
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
    labelColor: PropTypes.string,
    focusedLabelColor: PropTypes.string,
    boxShadowColor: PropTypes.string,
    fontColor: PropTypes.string,
    selectedDayFontColor: PropTypes.string,
    previousNextMonthFontColor: PropTypes.string,
    iconColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    selectedDayBackgroundColor: PropTypes.string,
    selectedMonthYearBackgroundColor: PropTypes.string,
    todayBackgroundColor: PropTypes.string,
}


export default DateInput;