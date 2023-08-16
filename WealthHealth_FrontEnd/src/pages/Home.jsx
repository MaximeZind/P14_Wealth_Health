import React from 'react';
import classes from '../styles/Home.module.css';
import Form from '../components/Form';

function Home() {

    return (
        <main className={classes.main}>
            <div className={classes.title}>
                <h1>HRnet</h1>
            </div>
            <div className={classes.container}>
                <h2>Create Employee</h2>
                <Form />
            </div>
        </main>
    );
}

export default Home;