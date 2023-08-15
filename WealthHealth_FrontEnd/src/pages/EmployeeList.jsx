import React, { useState } from 'react';
import classes from '../styles/EmployeeList.module.css';
import { useSelector } from 'react-redux';

function EmployeeList() {

    const EmployeeList = useSelector((state) => state.employeesReducer);
    const [list, setList] = useState(EmployeeList);
    // console.log(EmployeeList);
    console.log(list);
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