import React from 'react';
import classes from '../../../styles/ConfirmEmployeeDeletionModalContent.module.css';
import PropTypes from 'prop-types';
import Button from '../../button';

function ConfirmEmployeeDeletionModalContent({ closeModal, confirm, employee }) {

    const iconSize = '40px';
    const text = `Are you sure that you wish to remove ${employee.firstName} ${employee.lastName} from the system?` ;

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
                </footer>
            </div>
    );
}

ConfirmEmployeeDeletionModalContent.propTypes = {
    closeModal: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    employee: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        dateOfBirth: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zipCode: PropTypes.string.isRequired,
    })
}

export default ConfirmEmployeeDeletionModalContent;