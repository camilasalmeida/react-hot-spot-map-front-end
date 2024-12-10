// src/components/Dashboard.jsx
import { Link } from 'react-router-dom';
import styles from '../Dashboard/Dashboard.module.css'

const Dashboard = ({ user }) => {

    return (
        <main className={styles.container}>
            <section className={styles.splash}>
            <h1>Welcome, {user.username.toUpperCase()}!</h1>
            </section>

            <section className={styles.about}>
            <p>
            This is the dashboard page where you, and only you, can see a list
            of all of your secrets Spots. 🗝️
            </p>
            </section>

        </main>
    )
}


export default Dashboard