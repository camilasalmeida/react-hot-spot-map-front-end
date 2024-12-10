// SigninForm

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'
import styles from './SigninForm.module.css';



const SigninForm = (props) => {
  const navigate = useNavigate();                                                  // Add this for navigation purposes.
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  }

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData)                         // TODO build signin service function

      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>  
      <h1 style={{ paddingBottom: '10px'}}>Welcome to HotSpotMap!</h1>
      <p styles={{ opacity:1, marginTop: '10px'}}>Enter your username and email to continue exploring</p>
      </div>
      {message && (
        <div className={styles.message}>
          <p>{message}</p>
        </div>
      )}
     
      <form className={styles.signinForm} autoComplete="off" onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div> */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            autoComplete="off"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <div>
          <button type="submit">Log In</button>
          <Link to="/">
            <button type="button">Cancel</button>
          </Link>
        </div>
      </form>

      <p style={{ color: 'white', textAlign: 'center', marginTop: '30px', marginBottom: '50px' }}>
        By continuing you agree to HotSpotMap's Terms and Privacy Policy.
      </p>

      <p style={{ color: 'white', textAlign: 'center', opacity: 1 }}>
        Don’t have an account? <Link to="/signup" style={{ color: 'white', textDecoration: 'underline'}}>Sign up</Link>
      </p>

      <footer className={styles.footer}>
        <p>&copy; 2024 HotSpotMap. All rights reserved.</p>
      </footer>
    </main>
  )
}

export default SigninForm
