import { useState } from 'react'

import './App.css'
import Home from './pages/home'
import List from './pages/list'
import About from './pages/about'
import { BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom'

function App(){
  return(
    <Router>
      <nav>
         <Link to="/"> Homie! </Link>
         <Link to="/List"> List </Link>
         <Link to="/About"> About </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/List" element={<List/>}/>
        <Route path="/About" element={<About/>}/>
      </Routes>
    </Router>
    
  );
}
export default App;