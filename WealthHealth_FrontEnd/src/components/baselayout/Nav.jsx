import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../../styles/Nav.module.css';
import logo from '../../assets/health_wealth_logo.jpg';
import { useSelector } from 'react-redux';

function Nav() {

    const colorPalette = useSelector((state) => state.colorPaletteReducer);
    return (
        <header className={classes.header}
        style={{backgroundColor: colorPalette.secondaryColor,
        borderBottom: `1px solid ${colorPalette.quinaryColor}`}}>
            <NavLink to="/">
                <img src={logo} className={classes.header_logo} alt='logo de Health Wealth'></img>
            </NavLink>
            <nav className={classes.header_nav}>
                <NavLink to="/" style={({ isActive }) => {
                    return {
                        color: colorPalette.quarternaryColor,
                        display: isActive ? `none` : 'block',
                    };
                }}>Add an employee</NavLink>
                <NavLink to="/employeeslist" style={({ isActive }) => {
                    return {
                        color: colorPalette.quarternaryColor,
                        display: isActive ? `none` : 'block',
                    };
                }}>View employees list</NavLink>
            </nav>
        </header>
    );
}

export default Nav;