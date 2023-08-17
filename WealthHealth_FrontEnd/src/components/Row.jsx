import React from 'react';
import classes from '../styles/Row.module.css';

function Row({ delay, highlightedField, type, firstName, lastName, startDate, department, dateOfBirth, street, city, state, zipCode }) {

    const animDelay = `${delay/20}s`;
    const trStyle = {
        animationDelay: animDelay,
    };
    const className = type === 'odd' ? classes.odd : classes.even;
    return (
        <tr role='row' className={`${className} ${classes.myrow}`}  style={trStyle} id='row'>
            {highlightedField === 0 ? <td className={classes.highlighted}>{firstName}</td> : <td>{firstName}</td>}
            {highlightedField === 1 ? <td className={classes.highlighted}>{lastName}</td> : <td>{lastName}</td>}
            {highlightedField === 2 ? <td className={classes.highlighted}>{startDate}</td> : <td>{startDate}</td>}
            {highlightedField === 3 ? <td className={classes.highlighted}>{department}</td> : <td>{department}</td>}
            {highlightedField === 4 ? <td className={classes.highlighted}>{dateOfBirth}</td> : <td>{dateOfBirth}</td>}
            {highlightedField === 5 ? <td className={classes.highlighted}>{street}</td> : <td>{street}</td>}
            {highlightedField === 6 ? <td className={classes.highlighted}>{city}</td> : <td>{city}</td>}
            {highlightedField === 7 ? <td className={classes.highlighted}>{state}</td> : <td>{state}</td>}
            {highlightedField === 8 ? <td className={classes.highlighted}>{zipCode}</td> : <td>{zipCode}</td>}
        </tr>
    );
}

export default Row;