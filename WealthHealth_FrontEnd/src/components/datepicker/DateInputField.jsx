import React from "react";
import PropTypes from 'prop-types';

/**
 * Un composant d'entrée de date personnalisable.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.type - Le type d'entrée de date (par exemple, "text").
 * @param {number} props.characters - Le nombre maximum de caractères autorisés dans l'entrée.
 * @param {object} props.elementRef - Une référence React pour l'élément d'entrée.
 * @param {string|number} props.defaultValue - La valeur par défaut de l'entrée.
 * @param {function} props.onBlur - La fonction de rappel déclenchée lors de la perte de focus de l'entrée.
 * @param {function} props.onClick - La fonction de rappel déclenchée lorsqu'un clic se produit sur l'entrée.
 * @param {function} props.onKeyDown - La fonction de rappel déclenchée lorsqu'une touche du clavier est enfoncée.
 * @param {string} [props.className] - Les classes CSS personnalisées pour l'élément d'entrée.
 * @param {string} [props.fontColor] - La couleur du texte de l'entrée.
 * @returns {JSX.Element} Le composant DateInputField rendu.
 */

function DateInputField({ type, characters, elementRef, defaultValue, onBlur, onClick, onKeyDown, className, fontColor }) {

    function handleInputChange(event) {
        //on empeche tout ce qui n'est pas un numero, et on limite le nombre de caracteres
        const numericValue = event.target.value.replace(/\D/g, "");
        const limitedValue = numericValue.slice(0, characters);
        elementRef.current.value = limitedValue;
    }

    return (
        <input type={type}
            ref={elementRef}
            defaultValue={defaultValue}
            style={{
                width: `${characters}ch`,
                color: fontColor && fontColor
            }}
            onBlur={onBlur}
            onClick={onClick}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            className={className} />
    )
}

DateInputField.propTypes = {
    type: PropTypes.string.isRequired,
    elementRef: PropTypes.object.isRequired,
    defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    onBlur: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    fontColor: PropTypes.string,
}

export default DateInputField;