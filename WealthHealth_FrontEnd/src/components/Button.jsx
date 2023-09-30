import React, { useState } from 'react';
import classes from '../styles/Button.module.css';
import PropTypes from 'prop-types';

/**
 * Composant Button pour afficher un bouton interactif.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.value - La valeur associée au bouton.
 * @param {string} props.text - Le texte à afficher sur le bouton.
 * @param {function} props.onClick - La fonction à appeler lors du clic sur le bouton (facultatif).
 * @param {string} props.fontColor - La couleur du texte du bouton.
 * @param {string} props.hoveredFontColor - La couleur du texte du bouton au survol.
 * @param {string} props.backgroundColor - La couleur de fond du bouton.
 * @param {string} props.hoveredBackgroundColor - La couleur de fond du bouton au survol.
 * @param {string} props.borderColor - La couleur de la bordure du bouton.
 * @param {string} props.hoveredBorderColor - La couleur de la bordure du bouton au survol.
 * @returns {JSX.Element} Le composant Button rendu.
 */

function Button({ value, text, onClick, fontColor, hoveredFontColor, backgroundColor, hoveredBackgroundColor, borderColor, hoveredBorderColor }) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <button className={classes.button}
      value={value}
      onClick={onClick}
      style={{
        color: isHovered ? hoveredFontColor && hoveredFontColor : fontColor && fontColor,
        backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor,
        borderColor: isHovered ? hoveredBorderColor && hoveredBorderColor : borderColor && borderColor
      }}

      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  fontColor: PropTypes.string,
  hoveredFontColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  hoveredBackgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  hoveredBorderColor: PropTypes.string,
}

export default Button;