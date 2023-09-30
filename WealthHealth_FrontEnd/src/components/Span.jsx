import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useState } from 'react';
import classes from '../styles/Span.module.css';

/**
 * Composant Span pour afficher du texte avec des styles personnalisables.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les éléments enfants à afficher dans le composant (peut être du texte ou d'autres composants React).
 * @param {string|number} props.text - Le texte à afficher s'il n'y a pas d'enfants.
 * @param {function} props.onClick - La fonction à appeler lorsque le composant est cliqué.
 * @param {string} props.backgroundColor - La couleur de fond du composant.
 * @param {string} props.hoveredBackgroundColor - La couleur de fond lorsque le composant est survolé.
 * @param {string} props.fontColor - La couleur du texte.
 * @param {string} props.lineHeight - La hauteur de ligne du texte.
 * @param {string|number} props.gridColumnStart - L'indice de la colonne de départ dans une grille CSS.
 * @param {string|number} props.gridColumnEnd - L'indice de la colonne de fin dans une grille CSS.
 * @param {string} props.fontSize - La taille de la police du texte.
 * @param {number} props.size - La taille en pixels du composant (hauteur et largeur).
 * @param {string} props.borderRadius - Le rayon de bordure du composant.
 * @param {number} props.padding - La valeur de marge intérieure du composant.
 * @param {string} props.position - La position du composant (par exemple, "relative", "absolute").
 * @param {number} props.top - La position verticale du composant (utilisé avec "position" pour le placer en haut).
 * @param {number} props.right - La position horizontale du composant (utilisé avec "position" pour le placer à droite).
 * @param {number} props.zIndex - L'index Z pour le rendu en couches.
 * @returns {JSX.Element} Le composant Span rendu.
 */


function Span({ children, text, onClick, backgroundColor, hoveredBackgroundColor, fontColor, lineHeight, gridColumnStart, gridColumnEnd, fontSize, size, borderRadius, padding, position, top, right, zIndex }) {

    const [isHovered, setIsHovered] = useState(false);
    return (
        <span className={classes.span}
            onClick={onClick}
            style={{
                backgroundColor: isHovered ? (hoveredBackgroundColor && hoveredBackgroundColor) : (backgroundColor && backgroundColor),
                color: fontColor && fontColor,
                lineHeight: lineHeight ? lineHeight : 'normal',
                gridColumnStart: gridColumnStart && gridColumnStart,
                gridColumnEnd: gridColumnEnd && gridColumnEnd,
                fontSize: fontSize && fontSize,
                height: size && `${size}px`,
                width: size && `${size}px`,
                borderRadius: borderRadius && borderRadius,
                paddingLeft: padding && padding,
                paddingRight: padding && padding,
                position: position && position,
                top: top && `${top}px`,
                right: right && `${right}px`,
                zIndex: zIndex && zIndex,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {children && children}
            {text && text}
        </span>

    );
}

Span.propTypes = {
    children: PropTypes.node,
    text: oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    onClick: PropTypes.func,
    backgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    lineHeight: PropTypes.string,
    gridColumnStart: oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    gridColumnEnd: oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    fontSize: PropTypes.string,
    size: PropTypes.number,
    borderRadius: PropTypes.string,
    padding: PropTypes.number,
    position: PropTypes.string,
    top: PropTypes.number,
    right: PropTypes.number,
    zIndex: PropTypes.number,
}


export default Span;