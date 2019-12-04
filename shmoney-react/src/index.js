import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
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

serviceWorker.unregister();
