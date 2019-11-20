import React from 'react';
import './styles/App.css';
import { withRouter } from 'react-router-dom';
import { withAuthentication } from './components/session';
import { compose } from 'recompose';
import Routes from './Routes';

class App extends React.Component {
  onClickHome = async event => {
    event.preventDefault();
    
    if (window.location.pathname !== "/") {
      this.props.history.push("/");
    }
  }

  onClickLogout = async event => {
    event.preventDefault();

    this.props.firebase.signOut();
    this.props.history.push("/");
  }

  onClickAvatar = async event => {
    event.preventDefault();

    // const userPath = '/' + authUser.displayName;
    if (window.location.pathname !== '/profile') {
      // this.props.history.push(userPath);
      this.props.history.push('/profile');
    }
  }

  onClickMenu = async event => {
    const currTarget = event.currentTarget.textContent;
    
    switch(currTarget) {
      case 'Home':
        if (window.location.pathname != '/') this.props.history.push('/');
        break;
      case 'Group':
          if (window.location.pathname != '/mygroup') this.props.history.push('/mygroup');
        break;
      case 'Rent':
          if (window.location.pathname != '/myrent') this.props.history.push('/myrent');
        break;
      case 'Profile':
          if (window.location.pathname != '/profile') this.props.history.push('/profile');
      default:
        break;
    }
  }

  onClickButton = async event => {
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
const mainApp = compose(
	withRouter,
	withAuthentication
)(App);

export default mainApp;
