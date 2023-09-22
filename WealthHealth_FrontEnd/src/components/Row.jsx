import React from 'react';
import classes from '../styles/Row.module.css';
import PropTypes from 'prop-types';
import Pencil from './Pencil';
import GarbageBin from './GarbageBin';
import { deleteEmployee } from '../actions/employees.action';
import { useDispatch } from 'react-redux';


function Row({ delay, highlightedField, type, firstName, lastName, startDate, department, dateOfBirth, street, city, state, zipCode, employeeId, handlePencilClick }) {

    const dispatch = useDispatch();
    const animDelay = `${delay / 20}s`;
    const trStyle = {
        animationDelay: animDelay,
    };
    const className = type === 'odd' ? classes.odd : classes.even;
    function handleDelete() {
        dispatch(deleteEmployee(employeeId));
    };

    return (
        <tr role='row' className={`${className} ${classes.myrow}`} style={trStyle} id='row'>
            <td className={highlightedField === 0 ? classes.highlighted : null}>{firstName}</td>
            <td className={highlightedField === 1 ? classes.highlighted : null}>{lastName}</td>
            <td className={highlightedField === 2 ? classes.highlighted : null}>{startDate}</td>
            <td className={highlightedField === 3 ? classes.highlighted : null}>{department}</td>
            <td className={highlightedField === 4 ? classes.highlighted : null}>{dateOfBirth}</td>
            <td className={highlightedField === 5 ? classes.highlighted : null}>{street}</td>
            <td className={highlightedField === 6 ? classes.highlighted : null}>{city}</td>
            <td className={highlightedField === 7 ? classes.highlighted : null}>{state}</td>
            <td className={highlightedField === 8 ? classes.highlighted : null}>
                <div className={classes.zipcode_container}>
                    <p>{zipCode}</p>
                    <div className={classes.icons}>
                        <Pencil color='#000000' height='15px' width='15px' onClick={handlePencilClick} />
                        <GarbageBin color='#000000' height='15px' width='15px' onClick={handleDelete} />
                    </div>
                </div>
            </td>
        </tr>
    );
}

Row.propTypes = {
    delay: PropTypes.number.isRequired,
    highlightedField: PropTypes.number,
    type: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    employeeId: PropTypes.number.isRequired,
    handlePencilClick: PropTypes.func.isRequired,
}

export default Row;