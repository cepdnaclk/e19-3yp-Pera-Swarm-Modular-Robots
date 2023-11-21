// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Docs from './pages/Docs';
import Design from './pages/Design';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/docs"element={<Docs />} /> 
          <Route path="/design"element={<Design />} /> 
          <Route path="/about"element={<About />} /> 
      
        </Routes>
      </div>
    </Router>
  );
}

export default App;

