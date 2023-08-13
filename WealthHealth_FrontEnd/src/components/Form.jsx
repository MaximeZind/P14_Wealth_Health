import React from 'react';
import classes from '../styles/Form.module.css';
import { getDepartments, getStates } from '../utils/fetchData';

function Form() {

    function saveEmployee(event){
        event.preventDefault();
        console.log(event);
    }

    const departments = getDepartments();
    const states = getStates();

    return (
                <form onSubmit={saveEmployee} action="#" id="create-employee">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input id="date-of-birth" type="text" />

                    <label htmlFor="start-date">Start Date</label>
                    <input id="start-date" type="text" />

                    <fieldset className={classes.address}>
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" />

                        <label htmlFor="city">City</label>
                        <input id="city" type="text" />

                        <label htmlFor="state-button">State</label>
                        <select name="state" id="state" >
                            {states.map((state) =>{
                                return <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                            })}
                        </select>
                        

                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" />
                    </fieldset>

                    <label htmlFor="department-button">Department</label>
                    <select name="department" id="department" >
                        {departments.map((department) => {
                            return <option key={department} value={department}>{department}</option>
                        })}
                    </select>
                    <button>Save</button>
                </form>
    );
}

export default Form;