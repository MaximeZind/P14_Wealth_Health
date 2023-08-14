import React from 'react';
import classes from '../styles/Form.module.css';
import { getDepartments, getStates } from '../utils/fetchData';
import { addEmployee } from '../actions/employees.action';

function Form() {

    async function saveEmployee(event){
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        if (formJson){
            addEmployee(formJson);
        }
    }

    const departments = getDepartments();
    const states = getStates();

    return (
                <form onSubmit={saveEmployee} action="#" id="create_employee">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name='firstName'/>

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName"/>

                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input id="dateOfBirth" type="date" name='dateOfBirth'/>

                    <label htmlFor="startDate">Start Date</label>
                    <input id="startDate" type="date" name='startDate'/>

                    <fieldset className={classes.address}>
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" name='street'/>

                        <label htmlFor="city">City</label>
                        <input id="city" type="text" name='city'/>

                        <label htmlFor="state">State</label>
                        <select name="state" id="state" >
                            {states.map((state) =>{
                                return <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                            })}
                        </select>
                        

                        <label htmlFor="zipCode">Zip Code</label>
                        <input id="zipCode" type="number" name='zipCode'/>
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <select name="department" id="department">
                        {departments.map((department) => {
                            return <option key={department} value={department}>{department}</option>
                        })}
                    </select>
                    <button>Save</button>
                </form>
    );
}

export default Form;