// src/NavBar/NavBar.jsx
import { Link } from 'react-router-dom';

const NavBar = ({ user, handleSignout }) => {

    return (
        <>
            { user ? (
                <nav>
                    <ul>
                        <li><Link to="/">Home Page</Link></li>
                        <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
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

  