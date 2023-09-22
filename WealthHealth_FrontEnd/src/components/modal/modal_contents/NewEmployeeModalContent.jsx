import React from 'react';
import classes from '../../../styles/NewEmployeeModalContent.module.css';
import PropTypes from 'prop-types';
import NewUserIcon from '../icons/NewUserIcon';
import Button from '../../button';
import WrongUserIcon from '../icons/WrongUserIcon';

function NewEmployeeModalContent({ isCorrect, iconColor, iconBackgroundColor, closeModal, text }) {

    const iconSize = '40px';
    return (
            <div className={classes.modal}>
                <div className={classes.modal_content}>
                    <span className={classes.icon_container} style={{backgroundColor: iconBackgroundColor}}>
                        {isCorrect ? < NewUserIcon color={iconColor} width={iconSize} height={iconSize} /> :
                            <WrongUserIcon color={iconColor} width={iconSize} height={iconSize} />}
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
    iconColor: PropTypes.string.isRequired,
    iconBackgroundColor: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
}

export default NewEmployeeModalContent;