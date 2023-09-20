import React from 'react';
import classes from '../../../styles/NewEmployeeModalContent.module.css';
import PropTypes from 'prop-types';
import NewUserIcon from '../icons/NewUserIcon';
import Button from '../../button';
import WrongUserIcon from '../icons/WrongUserIcon';
// import CrossIcon from '../icons/CrossIcon';

function NewEmployeeModalContent({ isCorrect, closeModal }) {

    const iconSize = '40px';
    const text = isCorrect ? 'This employee was successfully created!' : 'Error found: This employee already exists.';

    return (
            <div className={classes.modal}>
                <div className={classes.modal_content}>
                    <span className={isCorrect ? `${classes.icon_container} ${classes.correct}` : `${classes.icon_container} ${classes.incorrect}`}>
                        {isCorrect ? < NewUserIcon color={'rgb(0, 175, 95)'} width={iconSize} height={iconSize} /> :
                            <WrongUserIcon color={'rgb(255, 0, 0)'} width={iconSize} height={iconSize} />}
                    </span>
                    <p className={classes.text}>{text}</p>
                </div>
                <footer className={classes.modal_footer}>
                    <Button value='close' text='Close' onClick={closeModal} />
                </footer>
            </div>
    );
}

NewEmployeeModalContent.propTypes = {
    isCorrect: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default NewEmployeeModalContent;