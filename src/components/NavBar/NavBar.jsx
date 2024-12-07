// src/NavBar/NavBar.jsx
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';


const NavBar = ({ user, handleSignout }) => {

    return (
        <>
            { user ? (
                <nav className={styles.container}>
                    <ul>
                        <li><Link to="/">Home Page</Link></li>
                        <li><Link to="/spots">Spots</Link></li>
                        <li><Link to="/spots/new">New Spot</Link></li>
                        <li><Link to="" onClick={handleSignout}>Log Out</Link></li>
                    </ul>
                </nav>
            ) : ( 
                <nav className={styles.container}>
                    <ul>
                        <li><Link to="/signin">Login</Link></li>
                        <li><Link to="/signup">JOIN NOW</Link></li>
                    
                    </ul>
                </nav>

            )}
        </>
    )
}


  export default NavBar

  