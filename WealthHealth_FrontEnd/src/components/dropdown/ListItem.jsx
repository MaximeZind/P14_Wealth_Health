import React, { useState } from 'react';
import classes from './styles/ListItem.module.css';
import PropTypes from 'prop-types';

/**
 * Composant ListItem pour afficher un élément de la liste déroulante.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {(Object|string|number)} props.item - L'élément à afficher. Peut être un objet avec des propriétés 'name' et 'abbreviation', une chaîne de caractères ou un nombre.
 * @param {number} props.index - L'indice de l'élément dans la liste.
 * @param {number} props.height - La hauteur de l'élément de liste.
 * @param {string} [props.fontFamily] - La famille de polices à appliquer au texte.
 * @param {string} [props.backgroundColor] - La couleur de fond de l'élément.
 * @param {string} [props.hoveredBackgroundColor] - La couleur de fond lorsque l'élément est survolé.
 * @param {string} [props.fontColor] - La couleur du texte de l'élément.
 * @param {string} [props.hoveredFontColor] - La couleur du texte lorsque l'élément est survolé.
 * @param {function} props.handleClick - Fonction de rappel appelée lorsque l'utilisateur clique sur l'élément.
 * @returns {JSX.Element} Le composant ListItem rendu.
 */


function ListItem({ item, index, height, fontFamily, backgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, handleClick }) {

    const [isHovered, setIsHovered] = useState(false);
    return (
        item.abbreviation ?
            <span key={item.name ? item.name : index}
                className={classes.dropdown_option}
                value={item.abbreviation ? item.abbreviation : item}
                style={{
                    minHeight: `${height}px`, fontFamily: fontFamily && fontFamily,
                    backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor,
                    color: isHovered ? hoveredFontColor && hoveredFontColor : fontColor && fontColor
                }}
                onClick={() => handleClick(item.name ? item.name : item, item.abbreviation)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {item.name ? item.name : item}
            </span> :
            <span key={item.name ? item.name : index}
                className={classes.dropdown_option}
                value={item.name ? item.name : item}
                style={{
                    minHeight: `${height}px`, fontFamily: fontFamily && fontFamily,
                    backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor,
                    color: isHovered ? hoveredFontColor && hoveredFontColor : fontColor && fontColor
                }}
                onClick={() => handleClick(item.name ? item.name : item)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {item.name ? item.name : item}
            </span>

    );
}

ListItem.propTypes = {
    item: PropTypes.oneOfType([
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            abbreviation: PropTypes.string,
        }),
        PropTypes.string.isRequired,
        PropTypes.number.isRequired,
    ]).isRequired,
    index: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fontFamily: PropTypes.string,
    backgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    hoveredFontColor: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
}

export default ListItem;