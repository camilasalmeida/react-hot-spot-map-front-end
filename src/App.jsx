// src/App.jsx

import { useState, useTransition, createContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import { Link } from 'react-router-dom' 
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'
import * as authService from '../src/services/authService'
import SpotList from './components/SpotList/SpotList'
import * as spotService from'../src/services/spotService'                          // This syntax is a great way to import everything (*) from the module. Within src/App.jsx, individual functions can be called upon with dot notation through the spotService object.
import SpotDetails from './components/SpotDetails/SpotDetails'


const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [spots, setSpots] = useState([])                                        // State variable to store a list of spots from our backend.

useEffect(() => {                                                               // Use useEffect to trigger our index service function.
  const fetchAllSpots = async () => {
    const spotsData = await spotService.index()
    setSpots(spotsData)                                                         // SetSpots with the spotsData or the index containing a list of all Spots.
    //console.log('spotsData is: ', spotsData)
  }
  if (user) fetchAllSpots()
}, [user]);


const handleSignout = () => {
  authService.signout()
  setUser(null)
}

  return (
    <>
    <NavBar user={user} handleSignout={handleSignout} />
    <Routes>
      { user ? (
        // Protect Routes:
        <> 
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/spots" element={<SpotList spots={spots} />} />
        <Route path="/spots/:spotId" element={<SpotDetails />} />
        
        </>
      ) : (
        // Public Routes:
        <Route path="/" element={<Landing />} />
      )}

      <Route path="/signup" element={<SignupForm setUser={setUser} />} />
      <Route path="/signin" element={<SigninForm setUser={setUser} />} />
    </Routes>
    <h1>Hello World!🌍 </h1>
    </>
  )
}

export default App
