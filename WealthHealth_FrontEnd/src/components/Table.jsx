import React, { useState } from 'react';
import classes from '../styles/Table.module.css';
import Row from '../components/Row';
import fields from '../data/fields.json';
import Arrow from './Arrow';

function Table({ employeeList }) {

    const [list, setList] = useState([...employeeList]);
    const [selectedField, setSelectedField] = useState(null);
    const [isAscending, setIsAscending] = useState(false);

    function sortBy(field) {
        if (selectedField !== field) {
            setIsAscending(false);
        }
        setSelectedField(field);
        let sortedList = [...list];
        if (field === 'dateOfBirth' || field === 'startDate'){
            if (isAscending){
                sortedList = sortedList.sort((b, a) => new Date(a[field]) - new Date(b[field]));
            } else if (!isAscending){
                sortedList = sortedList.sort((a, b) => new Date(a[field]) - new Date(b[field]));
            }
        } else if (field !== 'dateOfBirth' && field !== 'startDate')
        if (isAscending){
            sortedList = sortedList.sort((b, a) => a[field].localeCompare(b[field]));
        } else if (!isAscending){
            sortedList = sortedList.sort((a, b) => a[field].localeCompare(b[field]));
        }
        setIsAscending(!isAscending);
        setList(sortedList);
    }


    return (
        <table id='employee_table' className={classes.table}>
            <thead>
                <tr role='row'>
                    {fields.map((field) => {
                        return (
                            <th key={fields.indexOf(field)} onClick={() => sortBy(field.camelField)}>
                                <div className={classes.field}>{field.field}
                                    {selectedField !== field.camelField ?
                                        <div className={classes.icons}>
                                            {/* <img style={{ transform: 'rotate(180deg)' }} className={classes.icon} src={arrow} alt="arrow" />
                                            <img style={{fill:'red'}} className={classes.icon} src={arrow} alt="arrow" /> */}
                                            <Arrow transform='rotate(180deg)' color='#ddd'/>
                                            <Arrow transform='rotate(0deg)' color='#ddd'/>
                                        </div> :
                                        <div className={classes.icons}>
                                            {isAscending ? 
                                            <><Arrow transform='rotate(180deg)' color='#000000'/>
                                            <Arrow transform='rotate(0deg)' color='#ddd'/></> :
                                             <><Arrow transform='rotate(180deg)' color='#ddd'/>
                                             <Arrow transform='rotate(0deg)' color='#000000'/></>}
                                        </div>
                                    }
                                </div>
                            </th>)
                    })}
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