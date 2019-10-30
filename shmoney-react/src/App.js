import React from 'react';
import './styles/App.css';
import { withRouter } from 'react-router-dom';
import { withAuthentication } from './components/session'
import { compose } from 'recompose';
import Routes from './Routes';

class App extends React.Component {
  onClickHome = async event => {
    event.preventDefault();
    
    if (window.location.pathname != "/") {
      this.props.history.push("/");
    }
  }

  onClickLogout = async event => {
    event.preventDefault();

    this.props.firebase.logout();
  }

  onClickAvatar = async event => {
    event.preventDefault();

    // const userPath = '/' + authUser.displayName;
    if (window.location.pathname != '/user') {
      // this.props.history.push(userPath);
      this.props.history.push('/profile');
    }
  }

  render() {
    this.childProps = {
      currPage: 'Home',
      message: 'Hi',
      authUser: null,
      onClickHome: this.onClickHome,
      onClickLogout: this.onClickLogout,
      onClickAvatar: this.onClickAvatar
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
