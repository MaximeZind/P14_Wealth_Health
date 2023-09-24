import React from 'react';
import classes from '../styles/EmployeeList.module.css';
import { useSelector } from 'react-redux';
import Table from '../components/Table';

function EmployeeList() {

    const pageTitle = 'Employees list';
    document.title =`Wealth Health HRnet - ${pageTitle}`;
    const employeesList = useSelector((state) => state.employeesReducer);
    const colorPalette = useSelector((state) => state.colorPaletteReducer);
    console.log(colorPalette);
    return (
        <main className={classes.main}
        style={{backgroundColor: colorPalette.primaryColor}}>
            <Table employeesList={employeesList} colorPalette={colorPalette}/>
        </main>
    );
}

export default EmployeeList;