import React from 'react';
import classes from '../styles/Modal.module.css';
import PropTypes from 'prop-types';

function Modal({ modalText, getModalText }) {

    return (
        <div className={classes.modal_background}>
            <div className={classes.modal}>
                <p className={classes.text}>{modalText}</p>
                <p className={classes.close} onClick={() => getModalText(null)}>Close</p>
            </div>
        </div>
    );
}

Modal.propTypes = {
    modalText: PropTypes.string.isRequired,
    getModalText: PropTypes.func.isRequired,
}

export default Modal;