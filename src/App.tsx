import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import NavbarApp from "./NavbarApp";
import PositionsList from "./PositionsList";
import ComparePositions from "./ComparePositions";

function App() {
  return (
      <Router>
        <div className="App">
          <NavbarApp></NavbarApp>
            <br/>
            <br/>
            <br/>
          <Routes>
              <Route path="/" element={<PositionsList/>}/>
              <Route path="/compare" element={<ComparePositions/>}/>

          </Routes>
        </div>
      </Router>
  );
}

export default App;
