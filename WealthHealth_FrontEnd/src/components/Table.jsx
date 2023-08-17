import React, { useState } from 'react';
import classes from '../styles/Table.module.css';
import Row from '../components/Row';
import fields from '../data/fields.json';
import Arrow from './Arrow';

function Table({ employeeList }) {

    const [list, setList] = useState([...employeeList]);
    const [selectedField, setSelectedField] = useState(null);
    const [isAscending, setIsAscending] = useState(false);
    const [tableLength, setTableLength] = useState(10);

    //Fonction pour trier par champ cliqué
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

    function handleSelect(event){
        setTableLength(event.target.value);
    }

    //On crée une array de fields en camelCase
    let camelFields = []
    fields.map((field) => {
        camelFields.push(field.camelField);
    })

    //... Pour savoir lequel est sélectionné
    const highlightedField = selectedField ? camelFields.indexOf(selectedField) : null;

    // array de longueurs possible de tableau
    const tableLengths = [10, 25, 50, 100];
    return (
        employeeList &&
        <section className={classes.table_section}>
            <div className={classes.table_filters}>
                <label>
                    Show
                    <select className={classes.dropdown} name='employees_table_length' id='employees_table_length' onChange={(event) => handleSelect(event)}>
                        {tableLengths.map((length) => {
                            return <option className={classes.option} key={length} value={length}>{length}</option>
                        })}
                    </select>
                    entries
                </label>
            </div>
            <table id='employee_table' className={classes.table}>
                <thead className={classes.table_header}>
                    <tr role='row'>
                        {fields.map((field) => {
                            return (
                                <th className={field.camelField === selectedField ? classes.selected_field : ''} key={fields.indexOf(field)} onClick={() => sortBy(field.camelField)}>
                                    <div className={classes.field}>{field.field}
                                        {selectedField !== field.camelField ?
                                            <div className={classes.icons}>
                                                <Arrow transform='rotate(180deg)' color='rgb(52,79,4,0.6)' />
                                                <Arrow transform='rotate(0deg)' color='rgb(52,79,4,0.6)' />
                                            </div> :
                                            <div className={classes.icons}>
                                                {isAscending ?
                                                    <div className={classes.icons}>
                                                        <Arrow transform='rotate(180deg)' color='#FFFFFF' />
                                                        <Arrow transform='rotate(0deg)' color='rgb(255, 255, 255, 0)' />
                                                    </div> :
                                                    <div className={classes.icons}>
                                                        <Arrow transform='rotate(180deg)' color='rgb(255, 255, 255, 0)' />
                                                        <Arrow transform='rotate(0deg)' color='#FFFFFF' />
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {list.length > 0 && list.map((employee) => {
                        const index = list.indexOf(employee);
                        const type = index % 2 ? 'even' : 'odd';
                        if (index < tableLength){
                            return (<Row delay={index}
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
                            zipCode={employee.zipCode} />)
                        } else if (index >= tableLength){
                            return null;
                        }
                    })}
                </tbody>
            </table>
        </section>
    );
}

export default Table;