import React from 'react';
import classes from '../styles/Dropdown.module.css';
import PropTypes from 'prop-types';

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

Dropdown.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            abbreviation: PropTypes.string,
        })
        ).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }

export default Dropdown;