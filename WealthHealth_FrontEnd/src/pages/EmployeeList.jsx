import React from 'react';
import classes from '../styles/EmployeeList.module.css';
import { useSelector } from 'react-redux';
import Table from '../components/Table';

function EmployeeList() {

    const employeeList = useSelector((state) => state.employeesReducer);
    return (
        <main className={classes.main}>
            {/* <div className={classes.title}> */}
                {/* <h1>Current Employees</h1> */}
            {/* </div> */}
            <Table employeeList={employeeList}/>
        </main>
    );
}

export default EmployeeList;