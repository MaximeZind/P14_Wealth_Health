import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../../styles/Nav.module.css';
import logo from '../../assets/health_wealth_logo.jpg';

function Nav() {

    return (
        <header className={classes.header}>
            <NavLink to="/">
                <img src={logo} className={classes.header_logo} alt='logo de Health Wealth'></img>
            </NavLink>
            <nav className={classes.header_nav}>
                <NavLink to="/" style={({ isActive }) => {
                    return {
                        display: isActive ? `none` : 'block',
                    };
                }}>Add an employee</NavLink>
                <NavLink to="/employeeslist" style={({ isActive }) => {
                    return {
                        display: isActive ? `none` : 'block',
                    };
                }}>View employees list</NavLink>
            </nav>
        </header>
    );
}

export default Nav;