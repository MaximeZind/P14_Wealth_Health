import React from 'react';
import classes from '../styles/EmployeeList.module.css';

function EmployeeList() {

    return (
        <main className={classes.main}>
            <div className={classes.title}>
                <h1>Current Employees</h1>
            </div>
            <div className={classes.container}>
            </div>
        </main>
    );
}

export default EmployeeList;