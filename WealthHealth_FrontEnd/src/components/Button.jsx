import React, { useState } from 'react';
import classes from '../styles/Button.module.css';
import PropTypes from 'prop-types';

function Button({ value, text, onClick, fontColor, hoveredFontColor, backgroundColor, hoveredBackgroundColor }) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <button className={classes.button}
      value={value}
      onClick={onClick}
      style={{color: isHovered ? hoveredFontColor && hoveredFontColor : fontColor && fontColor,
      backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor}}
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
}

export default Button;