import React, { Component } from 'react';
import './styles/App.css';
import { withRouter } from 'react-router-dom';
import { withAuthentication } from './components/session';
import { compose } from 'recompose';
import Routes from './Routes';

class App extends Component {
  onClickHome = event => {
    event.preventDefault();
    
    this.props.history.push('/');
  }

  onClickLogout = event => {
    event.preventDefault();

    this.props.firebase.signOut();
    this.props.history.push('/');
  }

  onClickAvatar = event => {
    event.preventDefault();

    if (window.location.pathname !== '/profile') {
      this.props.history.push('/profile');
    }
  }

  onClickMenu = event => {
    const currTarget = event.currentTarget.textContent;
    
    switch(currTarget) {
      case 'Home':
        if (window.location.pathname !== '/') this.props.history.push('/');
        break;
      case 'Group':
        if (window.location.pathname !== '/group') this.props.history.push('/group');
        break;
      case 'Rent':
        if (window.location.pathname !== '/myrent') this.props.history.push('/myrent');
        break;
      case 'Profile':
        if (window.location.pathname !== '/profile') this.props.history.push('/profile');
        break;
      default:
        break;
    }
  }

  onClickButton = event => {
    event.preventDefault();

    const action = event.currentTarget.textContent;
    
    switch(action) {
      case 'Sign In':
        this.props.history.push('/signIn');
        break;
      case 'Sign Up':
        this.props.history.push('/signUp');
        break;
      default:
        console.log('Unexpected action ID');
        break;
    }
  }

  render() {
    this.childProps = {
      authUser: null,
      onClickHome: this.onClickHome,
      onClickMenu: this.onClickMenu,
      onClickLogout: this.onClickLogout,
      onClickAvatar: this.onClickAvatar,
      onClickButton: this.onClickButton
    }

    return(
      <Routes childProps={this.childProps} />
    );
  }
}

//Allows our app to use router and track authentication
const MainApp = compose(
	withRouter,
	withAuthentication
)(App);

export default MainApp;
