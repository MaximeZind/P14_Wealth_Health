import React from 'react';
import PropTypes from 'prop-types';

function Arrow({transform, color, size}) {
  return (
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 386.257 386.257"
        style={{ enableBackground: 'new 0 0 386.257 386.257', transform: transform, fill: color }}
        xmlSpace="preserve"
        width={size ? `${size}px` : '10px'}
        height={size ?`${size}px` : '10px'}
      >
        <polygon points="0,96.879 193.129,289.379 386.257,96.879" />
      </svg>
  );
}

Arrow.propTypes = {
  transform: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number
}

export default Arrow;
