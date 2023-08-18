import React from 'react';
import classes from '../styles/Modal.module.css';
import Button from './button';

function Modal({modalText, getModalText}) {

    return (
            <div className={classes.modal}>
                <p className={classes.text}>{modalText}</p>
                <p className={classes.close} onClick={() => getModalText(null)}>Close</p>
            </div>
    );
}

export default Modal;