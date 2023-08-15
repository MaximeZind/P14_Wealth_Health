import React from 'react';
import classes from '../styles/Row.module.css';

function EmployeeList({ type, firstName, lastName, startDate, department, dateOfBirth, street, city, state, zipCode }) {

    const className = type === 'odd' ? classes.odd : classes.even;
    return (
        <tr role='row' className={className}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{startDate}</td>
            <td>{department}</td>
            <td>{dateOfBirth}</td>
            <td>{street}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td>{zipCode}</td>
        </tr>
    );
}

export default EmployeeList;