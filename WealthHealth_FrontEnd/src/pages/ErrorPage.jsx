import React from 'react';
import classes from '../styles/ErrorPage.module.css';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function ErrorPage() {

    let location = useLocation()
    const pageTitle = 'Error 404';
    document.title = `Wealth Health HRnet - ${pageTitle}`;
    const colorPalette = useSelector((state) => state.colorPaletteReducer);
    const errorText = `Oups! Cette page n'existe pas.`;
    const linkText = `Retourner sur la page d'accueil`;

    return (
        (location.pathname === '/404') ?
            <main className={classes.main}
                style={{ backgroundColor: colorPalette.primaryColor }}>
                <h1 className={classes.error_name}
                    style={{
                        color: colorPalette.tertiaryColor,
                    }}>
                    404
                </h1>
                <p className={classes.error_text}
                    style={{
                        color: colorPalette.tertiaryColor,
                    }}>
                    {errorText}
                </p>
            </main> : <Navigate to={'/404'} />
    );
}

export default ErrorPage;