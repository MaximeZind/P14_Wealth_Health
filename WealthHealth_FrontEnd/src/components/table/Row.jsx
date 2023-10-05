import React, { useState } from 'react';
import classes from './styles/Row.module.css';
import PropTypes from 'prop-types';
import Pencil from '../Pencil';
import GarbageBin from '../GarbageBin';

/**
 * Composant Row pour afficher les détails d'un employé dans un tableau.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.delay - Délai pour l'animation de la ligne.
 * @param {number} props.highlightedField - L'index du champ en surbrillance.
 * @param {string} props.type - Le type de la ligne (odd ou even).
 * @param {string} props.firstName - Le prénom de l'employé.
 * @param {string} props.lastName - Le nom de l'employé.
 * @param {string} props.startDate - La date de début de l'employé.
 * @param {string} props.department - Le département de l'employé.
 * @param {string} props.dateOfBirth - La date de naissance de l'employé.
 * @param {string} props.street - La rue de l'adresse de l'employé.
 * @param {string} props.city - La ville de l'adresse de l'employé.
 * @param {string} props.state - L'état de l'adresse de l'employé.
 * @param {string} props.zipCode - Le code postal de l'adresse de l'employé.
 * @param {function} props.handlePencilClick - La fonction à appeler lorsqu'un clic sur l'icône de crayon se produit.
 * @param {function} props.handleBinClick - La fonction à appeler lorsqu'un clic sur l'icône de poubelle se produit.
 * @param {string} props.backgroundColor - La couleur de fond de la ligne.
 * @param {string} props.hoveredBackgroundColor - La couleur de fond au survol de la ligne.
 * @param {string} props.fontColor - La couleur du texte de la ligne.
 * @param {string} props.hoveredFontColor - La couleur du texte au survol de la ligne.
 * @param {string} props.iconBoxBackgroundColor - La couleur de fond de la boîte d'icônes.
 * @param {string} props.iconColor - La couleur de l'icône.
 * @param {string} props.highlightedBackgroundColor - La couleur de fond en surbrillance.
 * @returns {JSX.Element} Le composant Row rendu.
 */


function Row({ delay, highlightedField, type, item, fields, handlePencilClick, handleBinClick, backgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, iconBoxBackgroundColor, iconColor, highlightedBackgroundColor }) {

    const [isHovered, setIsHovered] = useState(false);
    const animDelay = delay && `${delay / 20}s`;
    const trStyle = {
        animationDelay: delay && animDelay,
        backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor,
        color: isHovered ? hoveredFontColor && hoveredFontColor : fontColor && fontColor,
    };
    const className = type === 'odd' ? classes.odd : classes.even;


    return (
        <tr role='row'
            className={`${className} ${classes.myrow}`}
            style={trStyle}
            id='row'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {fields.map((field) => {
                return (fields.length === fields.indexOf(field) + 1 ?
                    <td key={field}
                        style={{
                            backgroundColor: fields.indexOf(field) === highlightedField ? highlightedBackgroundColor : '',
                        }}>
                        <div className={classes.last_container}>
                            <p>{item[field]}</p>
                            <div className={classes.icons}
                                style={{ backgroundColor: iconBoxBackgroundColor && iconBoxBackgroundColor }}>
                                <Pencil color={iconColor} height='15px' width='15px' onClick={handlePencilClick} />
                                <GarbageBin color={iconColor} height='15px' width='15px' onClick={handleBinClick} />
                            </div>
                        </div>
                    </td> :
                    <td key={field}
                        className={fields.indexOf(field) === highlightedField ? classes.highlighted : null}
                        style={{
                            backgroundColor: fields.indexOf(field) === highlightedField ? highlightedBackgroundColor : '',
                        }}>{item[field]}</td>
                )
            })}
        </tr>
    );
}

Row.propTypes = {
    delay: PropTypes.number.isRequired,
    highlightedField: PropTypes.number,
    type: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    handlePencilClick: PropTypes.func.isRequired,
    handleBinClick: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    hoveredBackgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    hoveredFontColor: PropTypes.string,
    iconBoxBackgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    highlightedBackgroundColor: PropTypes.string,
}

export default Row;