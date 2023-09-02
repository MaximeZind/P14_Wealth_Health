import React from 'react';
import PropTypes from 'prop-types';

function Calendar({ color }) {
    const style = {fill: 'none', stroke:'#000', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth: '2px'};
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g id="_68.calendar" data-name="68.calendar">
                <rect style={style} x="1" y="3" width="22" height="20" rx="3" ry="3" />
                <line style={style} x1="1" y1="9" x2="23" y2="9" />
                <line style={style} x1="12" y1="5" x2="12" y2="1" />
                <line style={style} x1="6" y1="5" x2="6" y2="1" />
                <line style={style} x1="18" y1="5" x2="18" y2="1" />
                <line style={style} x1="5" y1="14" x2="7" y2="14" />
                <line style={style} x1="11" y1="14" x2="13" y2="14" />
                <line style={style} x1="17" y1="14" x2="19" y2="14" />
                <line style={style} x1="5" y1="18" x2="7" y2="18" />
                <line style={style} x1="11" y1="18" x2="13" y2="18" />
                <line style={style} x1="17" y1="18" x2="19" y2="18" />
            </g>
        </svg>
    );
}

Calendar.propTypes = {
    color: PropTypes.string,
}

export default Calendar;
