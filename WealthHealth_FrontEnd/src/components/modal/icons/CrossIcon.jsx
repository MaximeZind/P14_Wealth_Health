import React from 'react';
import PropTypes from 'prop-types';

function CrossIcon({ color, width, height }) {
    return (
        <svg fill={color} width={width} height={height} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 11 11">
            <path d="M2.2,1.19l3.3,3.3L8.8,1.2C8.9314,1.0663,9.1127,0.9938,9.3,1C9.6761,1.0243,9.9757,1.3239,10,1.7&#10;&#9;c0.0018,0.1806-0.0705,0.3541-0.2,0.48L6.49,5.5L9.8,8.82C9.9295,8.9459,10.0018,9.1194,10,9.3C9.9757,9.6761,9.6761,9.9757,9.3,10&#10;&#9;c-0.1873,0.0062-0.3686-0.0663-0.5-0.2L5.5,6.51L2.21,9.8c-0.1314,0.1337-0.3127,0.2062-0.5,0.2C1.3265,9.98,1.02,9.6735,1,9.29&#10;&#9;C0.9982,9.1094,1.0705,8.9359,1.2,8.81L4.51,5.5L1.19,2.18C1.0641,2.0524,0.9955,1.8792,1,1.7C1.0243,1.3239,1.3239,1.0243,1.7,1&#10;&#9;C1.8858,0.9912,2.0669,1.06,2.2,1.19z" />
        </svg>
    );
}

CrossIcon.propTypes = {
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
}

export default CrossIcon;
