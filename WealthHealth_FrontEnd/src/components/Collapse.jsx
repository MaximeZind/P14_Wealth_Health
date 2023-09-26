import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from '../styles/Collapse.module.css';
import Arrow from './Arrow';

function Collapse({ title, children, headerBackgroundColor, fontColor, iconColor }) {

    const [isOpen, setOpenClose] = useState(false);

    return (
        <div className={classes.dropdown}>
            <header className={classes.dropdown_header}
                onClick={() => setOpenClose(!isOpen)}
                style={{
                    backgroundColor: headerBackgroundColor && headerBackgroundColor,
                    color: fontColor && fontColor,
                }} >
                <h2>
                    {title}
                </h2>
                <Arrow size={20} color={iconColor} />
            </header>
            <div className={isOpen ? `${classes.dropdown_content}` : `${classes.dropdown_content} ${classes.hidden}`}>
                {children}
            </div>
        </div>
    );
}

Collapse.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    headerBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    iconColor: PropTypes.string,
};

export default Collapse;