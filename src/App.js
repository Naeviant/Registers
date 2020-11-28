import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Login from './components/Login'
import TakeRegister from './components/TakeRegister'

function App() {return (
    <div className="App">
      <Router>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ TakeRegister } />
      </Router>
    </div>
  );
}

export default App;
