import React from 'react';
import classes from '../../../styles/ConfirmEmployeeDeletionModalContent.module.css';
import PropTypes from 'prop-types';
import Button from '../../button';

function ConfirmEmployeeActionModalContent({ closeModal, confirm, update, text }) {

    const iconSize = '40px';

    return (
            <div className={classes.modal}>
                <div className={classes.modal_content}>
                    <span className={classes.icon_container} style={{backgroundColor: 'rgb(65, 105, 225, 0.5)'}}>
                        <p className={classes.interrogation_point} style={{color: 'rgb(65, 105, 225)', fontSize: iconSize}}>
                            ?
                        </p>
                    </span>
                    <p className={classes.text}>{text}</p>
                </div>
                <footer className={classes.modal_footer}>
                    <Button value='close' text='Close' onClick={closeModal} />
                    <Button value='confirm' text='Confirm' onClick={confirm} />
                    { update && <Button value='update' text='Update' onClick={update}/>}
                </footer>
            </div>
    );
}

ConfirmEmployeeActionModalContent.propTypes = {
    closeModal: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    update: PropTypes.func,
    text: PropTypes.string.isRequired
}

export default ConfirmEmployeeActionModalContent;