// src/App.jsx

import { useState, useTransition } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'


const App = () => {
  const [user, setUser] = useState(null)



  return (
    <>
    <NavBar user={user}/>
    <Routes>
      { user ? (
        <Route path="/" element={<Dashboard />} />
      ) : (
        <Route path="/" element={<Landing />} />

      )}
    </Routes>
    <h1>Hello World!🌍 </h1>
    
    </>
  )











}

export default App
