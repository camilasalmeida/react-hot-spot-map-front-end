// SignupForm.jsx

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

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
        const newUserResponse = await authService.signup(formData)                    // The signup function from authService.js is called. It sends the formData { username, email, password, passwordConf } to our backend API. The response from the backend API is assigned to the newUserResponse variable. This response typically contains the created user details and possibly a token.
        props.setUser(newUserResponse.user)                                           // That will modify the state in the App component. By calling props.setUser, the user information is stored in the parent component’s state. This typically updates the app’s global user state to reflect that a user is now signed in.
        navigate('/')
        console.log('Form submitted successfully:', formData)                       // This line will print the form data to the console
    } catch (error) {
        updateMessage(error.message)
    }
  }

  const { username, email, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf)
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
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
    </main>
  )
}

export default SignupForm
