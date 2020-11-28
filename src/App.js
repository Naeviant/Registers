import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/login" component={ Login } />
      </Router>
    </div>
  );
}

export default App;
