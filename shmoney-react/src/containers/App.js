import React from 'react';
import Header from '../components/Header';
import '../styles/App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';

function App() {
  return (
    <div className="App">
      {/* Anything outside of Router is displayed on all pages */}
      <Header currPage='Home'/>
      {/* Router used to display components based on the url */}
      <Router>
        <Route path='/signup' component={SignUp}/>
        <Route path='/signin' component={SignIn}/>
      </Router>
    </div>
  );
}

export default App;
