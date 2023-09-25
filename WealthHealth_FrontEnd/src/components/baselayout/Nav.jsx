import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../../styles/Nav.module.css';
import logo from '../../assets/health_wealth_logo.jpg';
import { useSelector } from 'react-redux';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';
import AddUserIcon from './icons/AddUserIcon';
import TableIcon from './icons/TableIcon';

function Nav() {

    const iconSize = 25;
    const [isDarkModeOn, setIsDarkModeOn] = useState(false);
    const colorPalette = useSelector((state) => state.colorPaletteReducer);
    return (
        <header className={classes.header}
            style={{
                backgroundColor: colorPalette.secondaryColor,
                borderBottom: `1px solid ${colorPalette.quinaryColor}`
            }}>
            <NavLink to="/">
                <img src={logo} className={classes.header_logo} alt='logo de Health Wealth'></img>
            </NavLink>
            <nav className={classes.header_nav}>
                <div className={classes.light_dark_mode_icons}>
                    {isDarkModeOn ?
                        <span className={`${classes.light_dark_mode_icons_icon} ${classes.dark_mode}`}
                            onClick={() => setIsDarkModeOn(!isDarkModeOn)}>
                            <MoonIcon color={'rgb(0, 123, 255)'}
                                height={iconSize}
                                width={iconSize} />
                        </span> :
                        <span className={`${classes.light_dark_mode_icons_icon} ${classes.light_mode}`}
                            onClick={() => setIsDarkModeOn(!isDarkModeOn)}>
                            <SunIcon color={'rgb(255, 215, 0)'}
                                height={iconSize}
                                width={iconSize} />
                        </span>}
                </div>
                <NavLink to="/" >
                    {({ isActive }) => (
                        isActive ?
                            <span className={classes.add_employee_icon}
                            style={{backgroundColor: 'rgb(140, 139, 139, 0.5)'}}>
                                <AddUserIcon color={'rgb(140, 139, 139)'}
                                    height={iconSize}
                                    width={iconSize} />
                            </span> :
                            <span className={classes.add_employee_icon}>
                                <AddUserIcon color={'rgb(140, 139, 139)'}
                                    height={iconSize}
                                    width={iconSize} />
                            </span>
                    )}
                </NavLink>
                <NavLink to="/employeeslist" >
                {({ isActive }) => (
                        isActive ?
                            <span className={classes.table_icon}
                            style={{backgroundColor: 'rgb(140, 139, 139, 0.5)'}}>
                                <TableIcon color={'rgb(140, 139, 139)'}
                                    height={iconSize-3}
                                    width={iconSize-3} />
                            </span> :
                            <span className={classes.table_icon}>
                                <TableIcon color={'rgb(140, 139, 139)'}
                                    height={iconSize-3}
                                    width={iconSize-3} />
                            </span>
                    )}
                </NavLink>
            </nav>
        </header>
    );
}

export default Nav;