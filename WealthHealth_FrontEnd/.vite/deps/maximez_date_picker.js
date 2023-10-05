import {
  require_prop_types
} from "./chunk-PNSKILSM.js";
import "./chunk-4KLNKA2P.js";
import {
  require_react
} from "./chunk-ZAUFE7H7.js";
import {
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/maximez_date_picker/src/DateInput.jsx
var import_react8 = __toESM(require_react(), 1);
var import_prop_types7 = __toESM(require_prop_types(), 1);
var import_react9 = __toESM(require_react(), 1);
import classes3 from "C:/Users/max-z/Desktop/OpenClassrooms/P14/WealthHealth_FrontEnd/node_modules/maximez_date_picker/src/styles/DateInput.module.css";

// node_modules/maximez_date_picker/src/icons/Calendar.jsx
var import_react = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);
function Calendar({ color, height, width }) {
  const style = { fill: "none", stroke: color && color, strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2px" };
  return import_react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", color, style: { transition: "0.3s ease" }, height, width }, import_react.default.createElement("g", { id: "_68.calendar", "data-name": "68.calendar" }, import_react.default.createElement("rect", { style, x: "1", y: "3", width: "22", height: "20", rx: "3", ry: "3" }), import_react.default.createElement("line", { style, x1: "1", y1: "9", x2: "23", y2: "9" }), import_react.default.createElement("line", { style, x1: "12", y1: "5", x2: "12", y2: "1" }), import_react.default.createElement("line", { style, x1: "6", y1: "5", x2: "6", y2: "1" }), import_react.default.createElement("line", { style, x1: "18", y1: "5", x2: "18", y2: "1" }), import_react.default.createElement("line", { style, x1: "5", y1: "14", x2: "7", y2: "14" }), import_react.default.createElement("line", { style, x1: "11", y1: "14", x2: "13", y2: "14" }), import_react.default.createElement("line", { style, x1: "17", y1: "14", x2: "19", y2: "14" }), import_react.default.createElement("line", { style, x1: "5", y1: "18", x2: "7", y2: "18" }), import_react.default.createElement("line", { style, x1: "11", y1: "18", x2: "13", y2: "18" }), import_react.default.createElement("line", { style, x1: "17", y1: "18", x2: "19", y2: "18" })));
}
Calendar.propTypes = {
  color: import_prop_types.default.string,
  width: import_prop_types.default.number.isRequired,
  height: import_prop_types.default.number.isRequired
};
var Calendar_default = Calendar;

// node_modules/maximez_date_picker/src/DatePickerBox.jsx
var import_react7 = __toESM(require_react(), 1);
var import_prop_types6 = __toESM(require_prop_types(), 1);
import classes2 from "C:/Users/max-z/Desktop/OpenClassrooms/P14/WealthHealth_FrontEnd/node_modules/maximez_date_picker/src/styles/DatePickerBox.module.css";

// node_modules/maximez_date_picker/src/icons/DoubleArrow.jsx
var import_react2 = __toESM(require_react(), 1);
var import_prop_types2 = __toESM(require_prop_types(), 1);
function DoubleArrow({ color, rotate, size }) {
  return import_react2.default.createElement(
    "svg",
    {
      style: {
        transform: rotate && `rotate(${rotate}deg)`,
        height: `${size}px`,
        width: `${size}px`
      },
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      enableBackground: "new 0 0 32 32",
      version: "1.1",
      viewBox: "0 0 32 32",
      xmlSpace: "preserve"
    },
    import_react2.default.createElement("g", { id: "Double_Chevron_Down" }, import_react2.default.createElement(
      "path",
      {
        d: "M22.285,15.349L16,21.544l-6.285-6.196c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414   l6.999,6.899c0.379,0.375,1.048,0.377,1.429,0l6.999-6.9c0.394-0.39,0.394-1.024,0-1.414   C23.319,14.958,22.679,14.958,22.285,15.349z",
        fill: color
      }
    ), import_react2.default.createElement(
      "path",
      {
        d: "M15.286,16.662c0.379,0.375,1.048,0.377,1.429,0l6.999-6.899c0.394-0.391,0.394-1.024,0-1.414   c-0.394-0.391-1.034-0.391-1.428,0L16,14.544L9.715,8.349c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414   L15.286,16.662z",
        fill: color
      }
    )),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null)
  );
}
DoubleArrow.propTypes = {
  color: import_prop_types2.default.string,
  rotate: import_prop_types2.default.number,
  size: import_prop_types2.default.number
};
var DoubleArrow_default = DoubleArrow;

// node_modules/maximez_date_picker/src/icons/Arrow.jsx
var import_react3 = __toESM(require_react(), 1);
var import_prop_types3 = __toESM(require_prop_types(), 1);
function Arrow({ rotate, color, size }) {
  return import_react3.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1",
      viewBox: "0 0 129 129",
      enableBackground: "new 0 0 129 129",
      style: {
        transform: `rotate(${rotate}deg)`,
        transition: "transform 0.7s ease",
        height: `${size}px`,
        width: `${size}px`,
        fill: color && color
      }
    },
    import_react3.default.createElement("g", null, import_react3.default.createElement("path", { d: "m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" }))
  );
}
Arrow.propTypes = {
  rotate: import_prop_types3.default.number,
  color: import_prop_types3.default.string,
  size: import_prop_types3.default.number
};
var Arrow_default = Arrow;

// node_modules/maximez_date_picker/src/Span.jsx
var import_react4 = __toESM(require_react(), 1);
var import_prop_types4 = __toESM(require_prop_types(), 1);
var import_react5 = __toESM(require_react(), 1);
import classes from "C:/Users/max-z/Desktop/OpenClassrooms/P14/WealthHealth_FrontEnd/node_modules/maximez_date_picker/src/styles/Span.module.css";
function Span({ children, text, onClick, backgroundColor, hoveredBackgroundColor, fontColor, lineHeight, gridColumnStart, gridColumnEnd, fontSize, size, borderRadius, padding, position, top, right, zIndex }) {
  const [isHovered, setIsHovered] = (0, import_react5.useState)(false);
  return import_react4.default.createElement(
    "span",
    {
      className: classes.span,
      onClick,
      style: {
        backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor,
        color: fontColor && fontColor,
        lineHeight: lineHeight ? lineHeight : "normal",
        gridColumnStart: gridColumnStart && gridColumnStart,
        gridColumnEnd: gridColumnEnd && gridColumnEnd,
        fontSize: fontSize && fontSize,
        height: size && `${size}px`,
        width: size && `${size}px`,
        borderRadius: borderRadius && borderRadius,
        paddingLeft: padding && padding,
        paddingRight: padding && padding,
        position: position && position,
        top: top && `${top}px`,
        right: right && `${right}px`,
        zIndex: zIndex && zIndex
      },
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    },
    children && children,
    text && text
  );
}
Span.propTypes = {
  children: import_prop_types4.default.node,
  text: (0, import_prop_types4.oneOfType)([
    import_prop_types4.default.string,
    import_prop_types4.default.number
  ]),
  onClick: import_prop_types4.default.func,
  backgroundColor: import_prop_types4.default.string,
  hoveredBackgroundColor: import_prop_types4.default.string,
  fontColor: import_prop_types4.default.string,
  lineHeight: import_prop_types4.default.string,
  gridColumnStart: (0, import_prop_types4.oneOfType)([
    import_prop_types4.default.string,
    import_prop_types4.default.number
  ]),
  gridColumnEnd: (0, import_prop_types4.oneOfType)([
    import_prop_types4.default.string,
    import_prop_types4.default.number
  ]),
  fontSize: import_prop_types4.default.string,
  size: import_prop_types4.default.number,
  borderRadius: import_prop_types4.default.string,
  padding: import_prop_types4.default.number,
  position: import_prop_types4.default.string,
  top: import_prop_types4.default.number,
  right: import_prop_types4.default.number,
  zIndex: import_prop_types4.default.number
};
var Span_default = Span;

// node_modules/maximez_date_picker/src/DateInputField.jsx
var import_react6 = __toESM(require_react(), 1);
var import_prop_types5 = __toESM(require_prop_types(), 1);
function DateInputField({ type, characters, elementRef, defaultValue, onBlur, onClick, onKeyDown, className, fontColor }) {
  function handleInputChange(event) {
    const numericValue = event.target.value.replace(/\D/g, "");
    const limitedValue = numericValue.slice(0, characters);
    elementRef.current.value = limitedValue;
  }
  return import_react6.default.createElement(
    "input",
    {
      type,
      ref: elementRef,
      defaultValue,
      style: {
        width: `${characters}ch`,
        color: fontColor && fontColor
      },
      onBlur,
      onClick,
      onChange: handleInputChange,
      onKeyDown,
      className
    }
  );
}
DateInputField.propTypes = {
  type: import_prop_types5.default.string.isRequired,
  elementRef: import_prop_types5.default.object.isRequired,
  defaultValue: import_prop_types5.default.oneOfType([
    import_prop_types5.default.number,
    import_prop_types5.default.string
  ]).isRequired,
  onBlur: import_prop_types5.default.func.isRequired,
  onClick: import_prop_types5.default.func.isRequired,
  onKeyDown: import_prop_types5.default.func.isRequired,
  className: import_prop_types5.default.string.isRequired,
  fontColor: import_prop_types5.default.string
};
var DateInputField_default = DateInputField;

// node_modules/maximez_date_picker/src/DatePickerBox.jsx
function DatePickerBox({ elementRef, position, handleValues, handleClose, startingDay, startingMonth, startingYear, yearsRangeMin, yearsRangeMax, dateInputField, backgroundColor, fontColor, selectedDayFontColor, selectedMonthYearBackgroundColor, hoveredBackgroundColor, selectedDayBackgroundColor, todayBackgroundColor, previousNextMonthFontColor, iconColor }) {
  const navSpanSize = 25;
  const today = /* @__PURE__ */ new Date();
  const [month, setMonth] = (0, import_react7.useState)(startingMonth);
  const [year, setYear] = (0, import_react7.useState)(startingYear);
  const [selectedDay, setSelectedDay] = (0, import_react7.useState)(startingDay);
  const [selectedMonth, setSelectedMonth] = (0, import_react7.useState)(startingMonth);
  const [selectedYear, setSelectedYear] = (0, import_react7.useState)(startingYear);
  const monthInput = (0, import_react7.useRef)(null);
  const dayInput = (0, import_react7.useRef)(null);
  const yearInput = (0, import_react7.useRef)(null);
  const [arrayType, setArrayType] = (0, import_react7.useState)("days");
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
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function sendData(day, month2, year2, close) {
    setSelectedDay(day);
    if (month2 === 0) {
      setSelectedMonth(12);
      setSelectedYear(year2 - 1);
    } else if (month2 === 13) {
      setSelectedMonth(1);
      setSelectedYear(year2 + 1);
    } else if (month2 >= 1 && month2 <= 12) {
      setSelectedMonth(month2);
      setSelectedYear(year2);
    }
    let result = {
      day,
      month: month2,
      year: year2
    };
    handleValues(result);
    if (close) {
      handleClose();
    }
  }
  function getYearsArray() {
    const currentYear = today.getFullYear();
    let yearsArray2 = [];
    if (yearsRangeMin && yearsRangeMax && yearsRangeMax > yearsRangeMin) {
      yearsArray2 = Array.from({ length: yearsRangeMax - yearsRangeMin + 1 }, (_, index) => yearsRangeMin + index).reverse();
    } else if (!(yearsRangeMin && yearsRangeMax) || yearsRangeMax > yearsRangeMin) {
      yearsArray2 = Array.from({ length: 201 }, (_, index) => currentYear - 100 + index).reverse();
    }
    return yearsArray2;
  }
  function getGridArray(year2, month2) {
    const firstDay = new Date(year2, month2 - 1, 1).getDay();
    const amountOfDays = new Date(year2, month2, 0).getDate();
    const amountOfDaysPrevious = new Date(year2, month2 - 1, 0).getDate();
    const amountOfDaysNext = new Date(year2, month2 + 1, 0).getDate();
    let previousArray = Array.from(Array(amountOfDaysPrevious).keys()).map((x) => x + 1);
    const array = Array.from(Array(amountOfDays).keys()).map((x) => x + 1);
    let nextArray = Array.from(Array(amountOfDaysNext).keys()).map((x) => x + 1);
    previousArray = firstDay === 0 ? [] : previousArray.slice(-firstDay);
    const daysLeft = (previousArray.length + array.length) % 7;
    nextArray = daysLeft === 0 ? [] : nextArray.slice(0, 7 - (previousArray.length + array.length) % 7);
    const result = {
      previous: previousArray,
      current: array,
      next: nextArray
    };
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
      setArrayType("days");
    }, 30);
  }
  function handleSelectYear(number) {
    setYear(number);
    setSelectedYear(number);
    sendData(selectedDay, selectedMonth, number, false);
    setTimeout(() => {
      setArrayType("days");
    }, 30);
  }
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
    inputField.value = inputField.value.toString().padStart(2, "0");
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
    inputField.value = inputField.value.toString().padStart(2, "0");
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
  (0, import_react7.useEffect)(() => {
    if (dayInput.current && monthInput.current && yearInput.current) {
      dayInput.current.value = selectedDay.toString().padStart(2, "0");
      monthInput.current.value = selectedMonth.toString().padStart(2, "0");
      yearInput.current.value = selectedYear;
    }
  }, [selectedDay, selectedMonth, selectedYear]);
  return import_react7.default.createElement(
    "div",
    {
      className: classes2.date_picker,
      ref: elementRef,
      style: {
        transform: `translateY(${position}px)`,
        backgroundColor: backgroundColor && backgroundColor,
        gap: dateInputField ? "5px" : "30px"
      }
    },
    import_react7.default.createElement("header", { className: classes2.date_picker_header }, import_react7.default.createElement(
      Span_default,
      {
        onClick: () => setYear(year - 1),
        hoveredBackgroundColor,
        size: navSpanSize,
        borderRadius: "50%"
      },
      import_react7.default.createElement(DoubleArrow_default, { rotate: 90, color: iconColor && iconColor, size: 18 })
    ), import_react7.default.createElement(
      Span_default,
      {
        onClick: handlePreviousMonth,
        hoveredBackgroundColor,
        size: navSpanSize,
        borderRadius: "50%"
      },
      import_react7.default.createElement(Arrow_default, { rotate: 90, color: iconColor && iconColor, size: 11 })
    ), import_react7.default.createElement("div", { className: classes2.date_picker_month_year }, import_react7.default.createElement(
      Span_default,
      {
        text: monthMapping[month],
        onClick: () => arrayType === "months" ? setArrayType("days") : setArrayType("months"),
        fontColor,
        backgroundColor: arrayType === "months" ? selectedMonthYearBackgroundColor : "",
        hoveredBackgroundColor,
        padding: 4
      }
    ), import_react7.default.createElement(
      Span_default,
      {
        text: year,
        onClick: () => arrayType === "years" ? setArrayType("days") : setArrayType("years"),
        fontColor,
        backgroundColor: arrayType === "years" ? selectedMonthYearBackgroundColor : "",
        hoveredBackgroundColor,
        padding: 4
      }
    )), import_react7.default.createElement(
      Span_default,
      {
        onClick: handleNextMonth,
        hoveredBackgroundColor,
        size: navSpanSize,
        borderRadius: "50%"
      },
      import_react7.default.createElement(Arrow_default, { rotate: -90, color: iconColor && iconColor, size: 11 })
    ), import_react7.default.createElement(
      Span_default,
      {
        onClick: () => setYear(year + 1),
        hoveredBackgroundColor,
        size: navSpanSize,
        borderRadius: "50%"
      },
      import_react7.default.createElement(DoubleArrow_default, { rotate: -90, color: iconColor && iconColor, size: 18 })
    )),
    dateInputField && import_react7.default.createElement(
      "div",
      {
        className: classes2.date_input_fields,
        style: {
          color: fontColor
        }
      },
      import_react7.default.createElement(
        DateInputField_default,
        {
          type: "text",
          characters: 2,
          elementRef: monthInput,
          defaultValue: selectedMonth.toString().padStart(2, "0"),
          onBlur: (event) => handleOnBlurMonth(event),
          onClick: (event) => selectInput(event),
          onKeyDown: (event) => event.key === "Enter" && event.preventDefault(),
          className: `${classes2.date_input_fields_field} ${classes2.month_input}`,
          fontColor
        }
      ),
      import_react7.default.createElement("p", null, "/"),
      import_react7.default.createElement(
        DateInputField_default,
        {
          type: "text",
          characters: 2,
          elementRef: dayInput,
          defaultValue: selectedDay.toString().padStart(2, "0"),
          onBlur: (event) => handleOnBlurDay(event),
          onClick: (event) => selectInput(event),
          onKeyDown: (event) => event.key === "Enter" && event.preventDefault(),
          className: `${classes2.date_input_fields_field} ${classes2.day_input}`,
          fontColor
        }
      ),
      import_react7.default.createElement("p", null, "/"),
      import_react7.default.createElement(
        DateInputField_default,
        {
          type: "text",
          characters: 4,
          elementRef: yearInput,
          defaultValue: selectedYear,
          onBlur: (event) => handleOnBlurYear(event),
          onClick: (event) => selectInput(event),
          onKeyDown: (event) => event.key === "Enter" && event.preventDefault(),
          className: `${classes2.date_input_fields_field} ${classes2.year_input}`,
          fontColor
        }
      )
    ),
    arrayType === "days" && import_react7.default.createElement("div", { className: classes2.date_picker_days }, import_react7.default.createElement("header", { className: classes2.date_picker_days_grid_header }, week.map((gridDay) => {
      return import_react7.default.createElement("p", { key: gridDay, style: { color: fontColor && fontColor } }, gridDay);
    })), import_react7.default.createElement("div", { className: classes2.date_picker_days_grid }, gridArray.previous.map((gridDay, index) => {
      const previousMonth = month > 1 ? month - 1 : 12;
      const updatedYear = month > 1 ? year : year - 1;
      const isSelectedDay = gridDay === selectedDay && selectedMonth === previousMonth && selectedYear === updatedYear;
      return import_react7.default.createElement(
        Span_default,
        {
          key: index,
          text: gridDay,
          onClick: () => sendData(gridDay, month - 1, year, true),
          hoveredBackgroundColor,
          backgroundColor: isSelectedDay ? selectedDayBackgroundColor : "",
          fontColor: isSelectedDay ? selectedDayFontColor : previousNextMonthFontColor
        }
      );
    }), gridArray.current.map((gridDay, index) => {
      const isToday = today.getDate() === gridDay && today.getMonth() + 1 === month && today.getFullYear() === year;
      const isSelectedDay = gridDay === selectedDay && month === selectedMonth && year === selectedYear;
      return import_react7.default.createElement(
        Span_default,
        {
          key: index,
          text: gridDay,
          onClick: () => sendData(gridDay, month, year, true),
          hoveredBackgroundColor: isSelectedDay ? selectedDayBackgroundColor : isToday ? todayBackgroundColor : hoveredBackgroundColor,
          backgroundColor: isSelectedDay ? selectedDayBackgroundColor : isToday ? todayBackgroundColor : "",
          fontColor: isSelectedDay ? selectedDayFontColor : fontColor
        }
      );
    }), gridArray.next.map((gridDay, index) => {
      const nextMonth = month < 12 ? month + 1 : 1;
      const updatedYear = month < 12 ? year : year + 1;
      const isSelectedDay = gridDay === selectedDay && selectedMonth === nextMonth && selectedYear === updatedYear;
      return import_react7.default.createElement(
        Span_default,
        {
          key: index,
          text: gridDay,
          onClick: () => sendData(gridDay, month + 1, year, true),
          hoveredBackgroundColor,
          backgroundColor: isSelectedDay ? selectedDayBackgroundColor : "",
          fontColor: isSelectedDay ? selectedDayFontColor : previousNextMonthFontColor
        }
      );
    }))),
    arrayType === "months" && import_react7.default.createElement("div", { className: classes2.date_picker_months_grid }, monthsArray.map((month2, index) => {
      return import_react7.default.createElement(
        Span_default,
        {
          key: index,
          text: month2,
          onClick: () => handleSelectMonth(index + 1),
          hoveredBackgroundColor,
          fontColor,
          lineHeight: "inherit"
        }
      );
    })),
    arrayType === "years" && import_react7.default.createElement("div", { className: classes2.date_picker_years_grid }, yearsArray.map((year2, index) => {
      const isRoundYear = year2 % 10 === 0;
      return import_react7.default.createElement(
        Span_default,
        {
          key: index,
          text: year2,
          onClick: () => handleSelectYear(year2),
          fontColor,
          backgroundColor: isRoundYear ? selectedMonthYearBackgroundColor : "",
          hoveredBackgroundColor,
          gridColumnStart: isRoundYear ? 1 : "auto",
          gridColumnEnd: isRoundYear ? 4 : "auto",
          fontSize: isRoundYear ? "1.5rem" : "auto"
        }
      );
    }))
  );
}
DatePickerBox.propTypes = {
  elementRef: import_prop_types6.default.object.isRequired,
  position: import_prop_types6.default.number.isRequired,
  handleValues: import_prop_types6.default.func.isRequired,
  handleClose: import_prop_types6.default.func.isRequired,
  startingDay: import_prop_types6.default.number.isRequired,
  startingMonth: import_prop_types6.default.number.isRequired,
  startingYear: import_prop_types6.default.number.isRequired,
  yearsRangeMin: import_prop_types6.default.number,
  yearsRangeMax: import_prop_types6.default.number,
  dateInputField: import_prop_types6.default.bool,
  backgroundColor: import_prop_types6.default.string,
  fontColor: import_prop_types6.default.string,
  hoveredBackgroundColor: import_prop_types6.default.string,
  selectedMonthYearBackgroundColor: import_prop_types6.default.string,
  selectedDayFontColor: import_prop_types6.default.string,
  selectedDayBackgroundColor: import_prop_types6.default.string,
  todayBackgroundColor: import_prop_types6.default.string,
  previousNextMonthFontColor: import_prop_types6.default.string,
  iconColor: import_prop_types6.default.string
};
var DatePickerBox_default = DatePickerBox;

// node_modules/maximez_date_picker/src/DateInput.jsx
function DateInput({ name, label, errorMsg, yearsRangeMin, yearsRangeMax, defaultValue, dateInputField, labelColor, focusedLabelColor, boxShadowColor, fontColor, selectedDayFontColor, previousNextMonthFontColor, iconColor, backgroundColor, hoveredBackgroundColor, selectedDayBackgroundColor, todayBackgroundColor, selectedMonthYearBackgroundColor }) {
  const defaultDate = new Date(defaultValue);
  const [day, setDay] = (0, import_react9.useState)(defaultValue && defaultDate ? defaultDate.getDate() : "DD");
  const [month, setMonth] = (0, import_react9.useState)(defaultValue && defaultDate ? defaultDate.getMonth() + 1 : "MM");
  const [year, setYear] = (0, import_react9.useState)(defaultValue && defaultDate ? defaultDate.getFullYear() : "YYYY");
  const today = /* @__PURE__ */ new Date();
  const [startingDay, setStartingDay] = (0, import_react9.useState)(defaultValue && defaultDate ? defaultDate.getDate() : today.getDate());
  const [startingMonth, setStartingMonth] = (0, import_react9.useState)(defaultValue && defaultDate ? defaultDate.getMonth() + 1 : today.getMonth() + 1);
  const [startingYear, setStartingYear] = (0, import_react9.useState)(defaultValue && defaultDate ? defaultDate.getFullYear() : today.getFullYear());
  const [isOpen, setIsOpen] = (0, import_react9.useState)(false);
  const [isFocused, setIsFocused] = (0, import_react9.useState)(false);
  const [isHovered, setIsHovered] = (0, import_react9.useState)(false);
  const [position, setPosition] = (0, import_react9.useState)(0);
  const datePicker = (0, import_react9.useRef)(null);
  const input = (0, import_react9.useRef)(null);
  const hiddenInput = (0, import_react9.useRef)(null);
  const datePickerBox = (0, import_react9.useRef)(null);
  const selectedValue = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;
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
  (0, import_react8.useEffect)(() => {
    if (datePickerBox.current && input.current) {
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
  document.addEventListener("click", handleClickOutside);
  function handleClickOutside(event) {
    if (isOpen && datePicker.current && !datePicker.current.contains(event.target)) {
      setIsOpen(false);
    }
  }
  (0, import_react8.useEffect)(() => {
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
  return import_react8.default.createElement(
    "div",
    {
      className: isFocused ? `${classes3.date_input_container} ${classes3.focused}` : classes3.date_input_container,
      ref: datePicker
    },
    import_react8.default.createElement(
      "label",
      {
        style: { color: isFocused ? focusedLabelColor && focusedLabelColor : labelColor && labelColor },
        className: classes3.label,
        htmlFor: name,
        onClick: () => setIsOpen(!isOpen)
      },
      label
    ),
    import_react8.default.createElement("input", { ref: hiddenInput, className: classes3.hidden, name, id: name, value: selectedValue, onChange: handleOnChange }),
    import_react8.default.createElement(
      "div",
      {
        ref: input,
        className: classes3.date_input,
        onClick: () => setIsOpen(!isOpen),
        style: {
          boxShadow: boxShadowColor && `0 1px 0 0 ${boxShadowColor}`,
          color: fontColor && fontColor
        },
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false)
      },
      import_react8.default.createElement("p", { className: classes3.selected_date }, selectedValue),
      import_react8.default.createElement(
        "span",
        {
          className: classes3.date_input_icon,
          style: { backgroundColor: isHovered || isOpen ? hoveredBackgroundColor && hoveredBackgroundColor : "" }
        },
        import_react8.default.createElement(Calendar_default, { width: 20, height: 20, color: iconColor && iconColor })
      )
    ),
    isOpen ? import_react8.default.createElement(
      DatePickerBox_default,
      {
        elementRef: datePickerBox,
        position,
        handleValues,
        handleClose,
        startingDay,
        startingMonth,
        startingYear,
        yearsRangeMin,
        yearsRangeMax,
        dateInputField,
        backgroundColor,
        fontColor,
        selectedDayFontColor,
        selectedMonthYearBackgroundColor,
        hoveredBackgroundColor,
        selectedDayBackgroundColor,
        todayBackgroundColor,
        previousNextMonthFontColor,
        iconColor
      }
    ) : null,
    errorMsg ? import_react8.default.createElement("p", { className: classes3.error_msg }, errorMsg) : null
  );
}
DateInput.propTypes = {
  name: import_prop_types7.default.string.isRequired,
  label: import_prop_types7.default.string,
  errorMsg: import_prop_types7.default.string,
  yearsRangeMax: import_prop_types7.default.number,
  yearsRangeMin: import_prop_types7.default.number,
  defaultValue: import_prop_types7.default.string,
  labelColor: import_prop_types7.default.string,
  focusedLabelColor: import_prop_types7.default.string,
  boxShadowColor: import_prop_types7.default.string,
  fontColor: import_prop_types7.default.string,
  selectedDayFontColor: import_prop_types7.default.string,
  previousNextMonthFontColor: import_prop_types7.default.string,
  iconColor: import_prop_types7.default.string,
  backgroundColor: import_prop_types7.default.string,
  hoveredBackgroundColor: import_prop_types7.default.string,
  selectedDayBackgroundColor: import_prop_types7.default.string,
  selectedMonthYearBackgroundColor: import_prop_types7.default.string,
  todayBackgroundColor: import_prop_types7.default.string
};
var DateInput_default = DateInput;
export {
  DateInput_default as DateInput
};
//# sourceMappingURL=maximez_date_picker.js.map
