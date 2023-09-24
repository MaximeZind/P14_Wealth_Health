import React from 'react';
import classes from '../../../styles/ConfirmEmployeeDeletionModalContent.module.css';
import PropTypes from 'prop-types';
import Button from '../../Button';

function ConfirmEmployeeActionModalContent({ closeModal, confirm, update, text, colorPalette }) {

    const iconSize = '40px';

    return (
        <div className={classes.modal}>
            <div className={classes.modal_content}>
                <span className={classes.icon_container} style={{ backgroundColor: 'rgb(65, 105, 225, 0.5)' }}>
                    <p className={classes.interrogation_point} style={{ color: 'rgb(65, 105, 225)', fontSize: iconSize }}>
                        ?
                    </p>
                </span>
                <p className={classes.text}>{text}</p>
            </div>
            <footer className={classes.modal_footer} 
            style={{background: colorPalette.senaryColor}}>
                <Button value='close'
                    text='Close'
                    onClick={closeModal}
                    fontColor={colorPalette.secondaryColor}
                    hoveredFontColor={colorPalette.quarternaryColor}
                    backgroundColor={colorPalette.quarternaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor} />
                <Button value='confirm'
                    text='Confirm'
                    onClick={confirm}
                    fontColor={colorPalette.secondaryColor}
                    hoveredFontColor={colorPalette.quarternaryColor}
                    backgroundColor={colorPalette.quarternaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor} />
                {update && <Button value='update'
                    text='Update'
                    onClick={update}
                    fontColor={colorPalette.secondaryColor}
                    hoveredFontColor={colorPalette.quarternaryColor}
                    backgroundColor={colorPalette.quarternaryColor}
                    hoveredBackgroundColor={colorPalette.primaryColor} />}
            </footer>
        </div>
    );
}

ConfirmEmployeeActionModalContent.propTypes = {
    closeModal: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    update: PropTypes.func,
    text: PropTypes.string.isRequired,
    colorPalette: PropTypes.shape({
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        tertiaryColor: PropTypes.string,
        quarternaryColor: PropTypes.string,
        quinaryColor: PropTypes.string,
    }),
}

export default ConfirmEmployeeActionModalContent;