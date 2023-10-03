import React from 'react';
import classes from '../../styles/NewEmployeeModalContent.module.css';
import PropTypes from 'prop-types';
import NewUserIcon from './icons/NewUserIcon';
import Button from '../Button';
import WrongUserIcon from './icons/WrongUserIcon';

function NewEmployeeModalContent({ isCorrect, iconColor, iconBackgroundColor, closeModal, text, colorPalette }) {

    const iconSize = '40px';
    return (
        <div className={classes.modal}>
            <div className={classes.modal_content}
            style={{backgroundColor: colorPalette.secondaryColor}}>
                <span className={classes.icon_container} style={{ backgroundColor: iconBackgroundColor }}>
                    {isCorrect ? < NewUserIcon color={iconColor} width={iconSize} height={iconSize} /> :
                        <WrongUserIcon color={iconColor} width={iconSize} height={iconSize} />}
                </span>
                <p className={classes.text}
                style={{
                    color: colorPalette.tertiaryColor,
                }}>{text}</p>
            </div>
            <footer className={classes.modal_footer}
                style={{ backgroundColor: colorPalette.senaryColor }}>
                <Button value='close'
                    text='Close'
                    onClick={closeModal}
                    fontColor={colorPalette.secondaryColor}
                    hoveredFontColor={colorPalette.quarternaryColor}
                    backgroundColor={colorPalette.quarternaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor}
                    borderColor={colorPalette.quarternaryColor}
                    hoveredBorderColor={colorPalette.quarternaryColor} />
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
    colorPalette: PropTypes.shape({
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        tertiaryColor: PropTypes.string,
        quarternaryColor: PropTypes.string,
        quinaryColor: PropTypes.string,
        senaryColor: PropTypes.string,
    }),
}

export default NewEmployeeModalContent;