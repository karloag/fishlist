import { useState } from 'react'

import './App.css'
import Home from './pages/home'
import List from './pages/list'
import About from './pages/about'
import { BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom'

function App(){
  return(
    <Router>
 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </Router>
    
  );
}
export default App;