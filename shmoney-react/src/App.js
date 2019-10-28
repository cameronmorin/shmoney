import React from 'react';
import './styles/App.css';
import { withRouter } from 'react-router-dom';
import { withAuthentication } from './components/session'
import { compose } from 'recompose';
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

//Allows our app to use router and track authentication
const mainApp = compose(
	withRouter,
	withAuthentication
)(App);

export default mainApp;
