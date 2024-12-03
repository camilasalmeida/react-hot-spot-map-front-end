// src/App.jsx

import { useState, useTransition } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

const App = () => {
  const [user, setUser] = useState(null)



  return (
    <>
    <NavBar user={user}/>
    <h1>Hello World!🌍 </h1>
    
    </>
  )











}

export default App
