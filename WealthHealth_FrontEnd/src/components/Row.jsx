import React, { useRef, useState } from 'react';
import classes from '../styles/Row.module.css';
import PropTypes from 'prop-types';
import Pencil from './Pencil';
import GarbageBin from './GarbageBin';
import { deleteEmployee } from '../actions/employees.action';
import { useDispatch } from 'react-redux';

function Row({ delay, highlightedField, type, firstName, lastName, startDate, department, dateOfBirth, street, city, state, zipCode, employeeId }) {

    const [isFormOpened, setIsFormOpened] = useState(false);
    const zipCodeRef = useRef();
    const dispatch = useDispatch();
    const animDelay = `${delay / 20}s`;
    const trStyle = {
        animationDelay: animDelay,
    };
    const className = type === 'odd' ? classes.odd : classes.even;

    function handlePencilClick() {
        setIsFormOpened(true);
    }

    function handleChange(event){
        console.log(`${event.target.id}: ${event.target.value}`);
        console.log(zipCodeRef.current.value);
    }

    function handleDelete() {
        dispatch(deleteEmployee(employeeId));
      };

    return (
        !isFormOpened ?
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
            </tr> :
            <tr role='row' className={`${className} ${classes.myrow}`} style={trStyle} id='row'>
                <td className={highlightedField === 0 ? classes.highlighted : null}><input className={classes.inputfield} defaultValue={firstName} id='firstName' onChange={handleChange}/></td>
                <td className={highlightedField === 1 ? classes.highlighted : null}><input className={classes.inputfield} defaultValue={lastName} id='lastName' onChange={handleChange}/></td>
                <td className={highlightedField === 2 ? classes.highlighted : null}><input className={classes.inputfield} defaultValue={startDate} id='startDate' onChange={handleChange}/></td>
                <td className={highlightedField === 3 ? classes.highlighted : null}><input className={classes.inputfield} defaultValue={department} id='department' onChange={handleChange}/></td>
                <td className={highlightedField === 4 ? classes.highlighted : null}><input className={classes.inputfield} defaultValue={dateOfBirth} id='dateOfBirth' onChange={handleChange}/></td>
                <td className={highlightedField === 5 ? classes.highlighted : null}><input className={classes.inputfield} defaultValue={street} id='street' onChange={handleChange}/></td>
                <td className={highlightedField === 6 ? classes.highlighted : null}><input className={classes.inputfield} defaultValue={city} id='city' onChange={handleChange}/></td>
                <td className={highlightedField === 7 ? classes.highlighted : null}><input className={classes.inputfield} defaultValue={state} id='state' onChange={handleChange}/></td>
                <td className={highlightedField === 8 ? classes.highlighted : null}>
                    <div className={classes.zipcode}>
                        <input className={classes.inputfield} ref={zipCodeRef} defaultValue={zipCode} id='zipCode' onChange={handleChange} />
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
}

export default Row;