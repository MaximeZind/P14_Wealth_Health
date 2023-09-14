import React from 'react';
import classes from '../../styles/Modal.module.css';
import PropTypes from 'prop-types';
import NewUserIcon from './icons/NewUserIcon';
import Button from '../button';
import WrongUserIcon from './icons/WrongUserIcon';
import CrossIcon from './icons/CrossIcon';

function Modal({ modalText, getModalText, isCorrect }) {

    const iconSize = '40px';

    return (
        <div className={classes.modal_background}>
            <div className={classes.modal}>
                <span className={classes.cross_icon} onClick={() => getModalText(null, false)}>
                    <CrossIcon height={25} width={25} />
                </span>
                <div className={classes.modal_content}>
                    <span className={isCorrect ? `${classes.icon_container} ${classes.correct}` : `${classes.icon_container} ${classes.incorrect}`}>
                        {isCorrect ? < NewUserIcon color={'rgb(0, 175, 95)'} width={iconSize} height={iconSize} /> :
                            <WrongUserIcon color={'rgb(255, 0, 0)'} width={iconSize} height={iconSize} />}
                    </span>
                    <p className={classes.text}>{modalText}</p>
                </div>
                <footer className={classes.modal_footer}>
                    <Button value='close' text='Close' onClick={() => getModalText(null, false)} />
                </footer>
            </div>
        </div>
    );
}

Modal.propTypes = {
    modalText: PropTypes.string.isRequired,
    getModalText: PropTypes.func.isRequired,
    isCorrect: PropTypes.bool.isRequired
}

export default Modal;