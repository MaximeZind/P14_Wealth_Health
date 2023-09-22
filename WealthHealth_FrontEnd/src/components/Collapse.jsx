import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from '../styles/Collapse.module.css';
import Arrow from './Arrow';

function Collapse({ title, children }) {

    const [isOpen, setOpenClose] = useState(false);

    return (
        <div className={classes.dropdown}>
            <header className={classes.dropdown_header} onClick={() => setOpenClose(!isOpen)} >
                <h2>
                    {title}
                </h2>
                <Arrow size={20} />
            </header>
            <div className={isOpen ? `${classes.dropdown_content}` : `${classes.dropdown_content} ${classes.hidden}`}>
                {children}
            </div>
        </div>
    );
}

Collapse.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Collapse;