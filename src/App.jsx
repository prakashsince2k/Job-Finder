import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import JobDetails from './pages/JobDetails';
import Favorites from './pages/Favorites';

const App = () => {
  return (
    <div>

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs/:slug' element={<JobDetails />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>


    </div>
  )
}

export default App