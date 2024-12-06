// src/App.jsx

import { useState, createContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
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
import SpotForm from './components/SpotForm/SpotForm'
import GuestForm from './components/GuestForm/GuestForm'

export const AuthedUserContext = createContext(null)


const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [spots, setSpots] = useState([])                                        // State variable to store a list of spots from our backend.

const navigate = useNavigate()

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

const handleAddSpot = async (spotFormData) => {
  const newSpot = await spotService.create(spotFormData)
  setSpots([newSpot, ...spots])
  console.log('spotFormData is:', spotFormData)
  navigate('/spots')
}

const handleDeleteSpot = async (spotId) => {
  //console.log('spotId to be deleted is:', spotId)
  const deletedSpot = await spotService.deleteSpot(spotId)
  setSpots(spots.filter((spot) => spot._id !== deletedSpot._id))                          // Remember, the Array.prototype.filter() method returns a shallow copy of the array, excluding all elements that do not pass the test implemented by the provided callback function. The filter() method returns only the spot objects whose _id values do not match the spotId.
  navigate('/spots')
}

const handleUpdateSpot = async (spotId, spotFormData) => {
  const updatedSpot = await spotService.updateSpot(spotId, spotFormData)
  setSpots(spots.map((spot) => (spotId === spot._id ? updatedSpot : spot)))
  //console.log('handleUpdate Id:', spotId, 'spotFormData UPDATE:', spotFormData)
  navigate(`/spots/${spotId}`)
}

console.log('User in App.jsx:', user);
//console.log('App Route params: ', { spotId, guestId })

  return (
    <>
    <AuthedUserContext.Provider value={user}>                                 
    <NavBar user={user} handleSignout={handleSignout} />
    <Routes>
      { user ? (
        // Protect Routes:
        <> 
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/spots" element={<SpotList spots={spots} />} />
        <Route path="/spots/:spotId" element={<SpotDetails handleDeleteSpot={handleDeleteSpot} />} />
        <Route path="/spots/new" element={<SpotForm handleAddSpot={handleAddSpot} />} />
        <Route path="/spots/:spotId/edit" element={<SpotForm handleUpdateSpot={handleUpdateSpot} />} />
        <Route path="/spots/:spotId/guests/:guestId/edit" element={<GuestForm />} />
        </>
      ) : (
        // Public Routes:
        <Route path="/" element={<Landing />} />
      )}
      <Route path="/signup" element={<SignupForm setUser={setUser} />} />
      <Route path="/signin" element={<SigninForm setUser={setUser} />} />
    </Routes>

    </AuthedUserContext.Provider>
    <h1>Hello World!🌍 </h1>
    </>
  )
}

export default App

// Don't forget to add that part, <AuthedUserContext.Provider value={user}> .