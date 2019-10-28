import React from 'react';
import Header from './components/Header';
import './styles/App.css';
import { withRouter } from 'react-router-dom';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Routes from './Routes';

class App extends React.Component {
  render() {
    this.childProps = {
      currPage: 'Home',
      message: 'Hi'
    }

    return(
      <Routes childProps={this.childProps} />
    );
  }
}

export default withRouter(App);
