import React from 'react';
import classes from '../styles/Form.module.css';

function Form() {

    function saveEmployee(event){
        event.preventDefault();
        console.log(event);
    }

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
                        <select name="state" id="state" style={{ display: 'none' }}>
                            {/* ...options */}
                        </select>
                        <span
                            tabIndex="0"
                            id="state-button"
                            role="combobox"
                            aria-expanded="false"
                            aria-autocomplete="list"
                            aria-owns="state-menu"
                            aria-haspopup="true"
                            className={`ui-selectmenu-button ui-selectmenu-button-closed ui-corner-all ui-button ui-widget ${classes.uiSelectmenuButton}`}
                        >
                            {/* ... */}
                        </span>

                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" />
                    </fieldset>

                    <label htmlFor="department-button">Department</label>
                    <select name="department" id="department" style={{ display: 'none' }}>
                        {/* ...options */}
                    </select>
                    <span
                        tabIndex="0"
                        id="department-button"
                        role="combobox"
                        aria-expanded="false"
                        aria-autocomplete="list"
                        aria-owns="department-menu"
                        aria-haspopup="true"
                        className={`ui-selectmenu-button ui-selectmenu-button-closed ui-corner-all ui-button ui-widget ${classes.uiSelectmenuButton}`}
                    >
                        {/* ... */}
                    </span>
                    <button>Save</button>
                </form>
    );
}

export default Form;