import React from 'react';
import classes from '../styles/Home.module.css';
import Form from '../components/Form';

function Home() {

    return (
        <main className={classes.main}>
            <div class={classes.title}>
                <h1>HRnet</h1>
            </div>
            <div className={classes.container}>
                <a href="employee-list.html">View Current Employees</a>
                <h2>Create Employee</h2>
                <Form />
            </div>
        </main>
    );
}

export default Home;