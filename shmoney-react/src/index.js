import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router } from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/firebase';
import MainApp from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <FirebaseContext.Provider value={ new Firebase() }>
    <Router>
      <MainApp />
    </Router>
  </FirebaseContext.Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
