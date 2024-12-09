// SignupForm.jsx

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'
import styles from './SignupForm.module.css';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  })

  const updateMessage = (msg) => {
    setMessage(msg)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isFormInvalid()) {
        updateMessage('Please fill out all fields correctly.')
        return
      }
    try{
        const newUserResponse = await authService.signup(formData)                  
        props.setUser(newUserResponse.user)                                           
        navigate('/')
        console.log('Form submitted successfully:', formData)                       
    } catch (error) {
        updateMessage(error.message)
    }
  }

  const { username, email, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf)
  }

  return (
    <main className={styles.container}>
        <div className={styles.header}>  
      <h1 style={{ paddingBottom: '5px'}}>Welcome to HotSpotMap!</h1>
      <p styles={{ opacity:1, marginTop: '10px'}}>Enter your username and email to continue exploring</p>
      </div>
      {message && (
        <div className={styles.message}>
          <p>{message}</p>
        </div>
      )}
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="passwordConf">Confirm Password:</label>
          <input
            type="password"
            id="passwordConf"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>
        
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <Link to="/">
            <button type="button">Cancel</button>
          </Link>
        </div>
      </form>
     
      <p style={{ color: 'white', textAlign: 'center', marginTop: '30px', marginBottom: '50px' }}>
        By continuing you agree to HotSpotMap's Terms and Privacy Policy.
      </p>

      <p style={{ color: 'white', opacity: 1, textAlign: 'center', marginTop: '7px' }}>
          Already have an account? <Link to="/signin" style={{ color: 'white', textDecoration: 'underline' }}>Log in</Link>
      </p>

      <footer className={styles.footer}>
        <p>&copy; 2024 HotSpotMap. All rights reserved.</p>
      </footer>
    </main>
  )
}

export default SignupForm
