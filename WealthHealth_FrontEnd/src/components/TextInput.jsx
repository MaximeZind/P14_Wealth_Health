import React, { useRef } from 'react';
import classes from '../styles/TextInput.module.css';
import PropTypes from 'prop-types';

function TextInput({ name, label, errorMsg, onChange }) {

    const input = useRef(null);
    const container = useRef(null);

    // Focus l'input, et ajout la classe "focused" au conteneur
    function handleClick() {
        input.current.focus();
        container.current.classList.add(classes.focused);
    }

    // Pour que le focus s'enlève lorsque l'utilisateur clique en dehors
    document.addEventListener('click', handleClickOutside);
    function handleClickOutside(event) {
        if (container.current && !container.current.contains(event.target)) {
            if (input.current.value === "") {
                container.current.classList.remove(classes.focused);
            } else if (input.current.value !== "") {

            }
        }
    }

    // Ajouter la classe focused lors d'une modification de la value dans l'input
    function handleOnChange(){
        if (input.current.value !== "") {
            container.current.classList.add(classes.focused);
        } else if (input.current.value === ""){
            container.current.classList.remove(classes.focused);
        }
    }

    return (
        <div ref={container} className={classes.text_input} onClick={handleClick}>
            <label className={classes.label} htmlFor={name} style={{ top: '10px' }}>{label}</label>
            <input ref={input} style={{ height: '40px' }} className={classes.input} type="text" id={name} name={name} onChange={onChange ? onChange : handleOnChange} />
            {errorMsg ? <p className={classes.error_msg}>{errorMsg}</p> : null}
        </div>
    );
}

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    errorMsg: PropTypes.string,
    onChange: PropTypes.func,
}

export default TextInput;