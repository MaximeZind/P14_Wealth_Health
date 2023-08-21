import React, { useRef, useState } from 'react';
import classes from '../styles/Row.module.css';
import PropTypes from 'prop-types';
import Pencil from './Pencil';
import GarbageBin from './GarbageBin';

function Row({ delay, highlightedField, type, firstName, lastName, startDate, department, dateOfBirth, street, city, state, zipCode }) {

    const [isFormOpened, setIsFormOpened] = useState(false);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newStartDate, setNewStartDate] = useState(startDate);
    const [newDepartment, setNewDepartment] = useState(department);
    const [newDateofBirth, setNewDateofBirth] = useState(dateOfBirth);
    const [newStreet, setNewStreet] = useState(street);
    const [newCity, setNewCity] = useState(city);
    const [newState, setNewState] = useState(state);
    const [newZipCode, setNewZipCode] = useState(zipCode);

    const zipCodeRef = useRef();

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
    return (
        !isFormOpened ?
            <tr role='row' className={`${className} ${classes.myrow}`} style={trStyle} id='row'>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{startDate}</td>
                <td>{department}</td>
                <td>{dateOfBirth}</td>
                <td>{street}</td>
                <td>{city}</td>
                <td>{state}</td>
                <td>
                    <div className={classes.test}>
                        <p>{zipCode}</p>
                        <div className={classes.icons}>
                            <Pencil color='#000000' height='15px' width='15px' onClick={handlePencilClick} />
                            <GarbageBin color='#000000' height='15px' width='15px' />
                        </div>
                    </div>
                </td>
            </tr> :
            <tr role='row' className={`${className} ${classes.myrow}`} style={trStyle} id='row'>
                <td><input defaultValue={firstName} id='firstName' onChange={handleChange}/></td>
                <td><input defaultValue={lastName} id='lastName' onChange={handleChange}/></td>
                <td><input defaultValue={startDate} id='startDate' onChange={handleChange}/></td>
                <td><input defaultValue={department} id='department' onChange={handleChange}/></td>
                <td><input defaultValue={dateOfBirth} id='dateOfBirth' onChange={handleChange}/></td>
                <td><input defaultValue={street} id='street' onChange={handleChange}/></td>
                <td><input defaultValue={city} id='city' onChange={handleChange}/></td>
                <td><input defaultValue={state} id='state' onChange={handleChange}/></td>
                <td>
                    <div className={classes.zipcode}>
                        <input ref={zipCodeRef} value={zipCode} id='zipCode' onChange={handleChange}/>
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