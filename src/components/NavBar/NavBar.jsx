import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import noBuffer from '../../assets/images/noBuffer.png'

const NavBar = ({ user, handleSignout }) => {

    return (
        <>
          { user ? (
                <nav className={styles.container}>
                    <Link to='/'><img src={noBuffer} alt="fire"/></Link>
                    <ul>
                        <li><Link to="/">Home Page</Link></li>
                        <li><Link to="/spots">Spots</Link></li>
                        <li><Link to="/spots/new">New Spot</Link></li>
                        <li><Link to="" onClick={handleSignout}>Log Out</Link></li>
                    </ul>
                </nav>
            ) : ( 
                <nav className={styles.container}>
                    <img src={noBuffer} alt="fire"/>
                    <ul>
                        <li><Link to="/signin">Login</Link></li>
                        <li><Link to="/signup" className={styles.joinButton}>JOIN</Link></li>
                    </ul>
                </nav>
            )}
        </>
    )
}

  export default NavBar

  