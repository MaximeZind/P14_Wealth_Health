import React from 'react';
import classes from '../../styles/Modal.module.css';
import PropTypes from 'prop-types';
import CrossIcon from './icons/CrossIcon';

function Modal({ children, closeModal }) {

    return (
        <div className={classes.modal_background}>
            <div className={classes.modal}>
                {closeModal ? <span className={classes.cross_icon} onClick={closeModal}>
                    <CrossIcon height={25} width={25} />
                </span> : null}
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    closeModal: PropTypes.func,
}

export default Modal;