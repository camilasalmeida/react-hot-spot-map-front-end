// src/NavBar/NavBar.jsx
import { Link } from 'react-router-dom';

const NavBar = ({ user, handleSignout }) => {

    return (
        <>
            { user ? (
                <nav>
                    <ul>
                        <li><Link to="/">HOME PAGE</Link></li>
                        <li><Link to="/spots">SPOTS</Link></li>
                        <li><Link to="" onClick={handleSignout}>LOG OUT</Link></li>
                    </ul>
                </nav>
            ) : ( 
                <nav>
                    <ul>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                    </ul>
                </nav>

            )}
        </>
    )
}


  export default NavBar

  