import React from 'react';
import classes from '../styles/Dropdown.module.css';

function Dropdown({ list, name, label }) {

    return (
        <div>
            <label className={classes.label} htmlFor={name}>{label}</label>
            <select className={classes.dropdown} name={name} id={name} >
                {list.map((item) => {
                    return item.abbreviation ?
                    <option className={classes.option} key={item.name} value={item.abbreviation}>{item.name}</option> :
                    <option className={classes.option} key={item.name} value={item.name}>{item.name}</option>
                })}
            </select>
        </div>
    );
}

export default Dropdown;