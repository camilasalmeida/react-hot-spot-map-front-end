// SigninForm

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'                           // Import the authservice.

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
    <main>
      <h1>Log In</h1>
      <p>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
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
        </div>
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
    </main>
  )
}

export default SigninForm
