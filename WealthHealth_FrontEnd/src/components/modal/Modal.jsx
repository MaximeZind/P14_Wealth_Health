import React from 'react';
import classes from './styles/Modal.module.css';
import PropTypes from 'prop-types';
import CrossIcon from './icons/CrossIcon';
import Span from '../Span';

function Modal({ children, closeModal, maxWidth, modalBackgroundColor, iconColor, hoveredIconBackgroundColor }) {

    return (
        <div className={classes.modal_background}
        style={{
            backgroundColor: modalBackgroundColor === 'rgb(255,255,255)' ? 'rgb(255,255,255, 0.6)' : 'rgb(0,0,0, 0.7)',
        }}>
            <div className={classes.modal}
                style={{
                    maxWidth: maxWidth &&  `${maxWidth}px`,
                    backgroundColor: modalBackgroundColor && modalBackgroundColor,
                }}>
                {closeModal &&
                    <Span borderRadius={'50%'}
                        onClick={closeModal}
                        hoveredBackgroundColor={hoveredIconBackgroundColor}
                        size={40}
                        position={'absolute'}
                        top={10}
                        right={10}
                        zIndex={999}>
                        <CrossIcon color={iconColor} height={25} width={25} />
                    </Span>
                }
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    closeModal: PropTypes.func,
    maxWidth: PropTypes.number,
    modalBackgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    hoveredIconBackgroundColor: PropTypes.string,
}

export default Modal;