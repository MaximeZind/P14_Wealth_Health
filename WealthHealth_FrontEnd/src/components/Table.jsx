import React, { useState } from 'react';
import classes from '../styles/Table.module.css';
import Row from '../components/Row';

function Table({employeeList}) {

    const [list, setList] = useState(employeeList);
    console.log(employeeList);
    console.log(list);
    return (
            <table id='employee_table' className={classes.table}>
                <thead>
                    <tr role='row'>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Start Date</th>
                        <th>Department</th>
                        <th>Date of Birth</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>
                <tbody>
                {list.length > 0 && list.map((employee) => {
                        const index = list.indexOf(employee);
                        const type = index % 2 ? 'even' : 'odd';

                        return <Row key={index}
                                    type={type} 
                                    firstName={employee.firstName}
                                    lastName={employee.lastName}
                                    startDate={employee.startDate}
                                    department={employee.department}
                                    dateOfBirth={employee.dateOfBirth}
                                    street={employee.street}
                                    city={employee.city}
                                    state={employee.state}
                                    zipCode={employee.zipCode} />;
                    })}
                </tbody>
            </table>
    );
}

export default Table;