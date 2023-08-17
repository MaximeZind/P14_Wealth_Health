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
        if (field === 'dateOfBirth' || field === 'startDate') {
            if (isAscending) {
                sortedList = sortedList.sort((b, a) => new Date(a[field]) - new Date(b[field]));
            } else if (!isAscending) {
                sortedList = sortedList.sort((a, b) => new Date(a[field]) - new Date(b[field]));
            }
        } else if (field !== 'dateOfBirth' && field !== 'startDate')
            if (isAscending) {
                sortedList = sortedList.sort((b, a) => a[field].localeCompare(b[field]));
            } else if (!isAscending) {
                sortedList = sortedList.sort((a, b) => a[field].localeCompare(b[field]));
            }
        setIsAscending(!isAscending);
        setList(sortedList);
    }
    let camelFields = []
    fields.map((field) => {
        camelFields.push(field.camelField);
    })
    const highlightedField = selectedField ? camelFields.indexOf(selectedField) : null;
    return (
        <table id='employee_table' className={classes.table}>
            <thead className={classes.table_header}>
                <tr role='row'>
                    {fields.map((field) => {
                        return (
                            <th className={field.camelField === selectedField && classes.selected_field} key={fields.indexOf(field)} onClick={() => sortBy(field.camelField)}>
                                <div className={classes.field}>{field.field}
                                    {selectedField !== field.camelField ?
                                        <div className={classes.icons}>
                                            <Arrow transform='rotate(180deg)' color='rgb(52,79,4,0.6)' />
                                            <Arrow transform='rotate(0deg)' color='rgb(52,79,4,0.6)' />
                                        </div> :
                                        <div className={classes.icons}>
                                            {isAscending ?
                                                <>
                                                    <Arrow transform='rotate(180deg)' color='#FFFFFF' />
                                                    <Arrow transform='rotate(0deg)' color='rgb(255, 255, 255, 0)' />
                                                </> :
                                                <>
                                                    <Arrow transform='rotate(180deg)' color='rgb(255, 255, 255, 0)' />
                                                    <Arrow transform='rotate(0deg)' color='#FFFFFF' />
                                                </>
                                            }
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
                    return <Row delay={index}
                        highlightedField={highlightedField}
                        key={index}
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