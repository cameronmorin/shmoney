import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../images/logo.png';
import avatar from '../images/avatar.svg';
import '../styles/NavBar.css';

import { AuthUserContext } from './session'

export default class NavBar extends React.Component {
  render() {
    return(
      <>
        <div className="nav-grid">
          <div className="nav-logo">
            {/* display logo here */}
            <img className="logo" src={logo} alt="logo" onClick={this.props.onClickHome}/>
          </div>
          <>
            {/* Check authUser status and render nav-pages and nav-user if they are logged in
            Can change null to whatever needs to be rendered when authUser is logged out */}
            <AuthUserContext.Consumer>
            {authUser => authUser ? 
              <>
                <div className="nav-pages">
                  {/* insert page links here */}
                  <NavLink to="/group" className="link" activeClassName="active-link">My Group</NavLink>
                  <NavLink to="/myrent" className="link" activeClassName="active-link">Pay Rent</NavLink>
                </div>
                <div className="nav-user">
                  {/* insert user info here if signed in, else signIn/Up links */}
                  <div className="user-msg">
                    <div className="welcome-msg">{authUser.displayName}</div>
                    <div className="logout-msg" onClick={this.props.onClickLogout}>Logout</div>
                  </div>
                  <img className="avatar" src={authUser.photoURL ? authUser.photoURL : avatar} alt="user" onClick={this.props.onClickAvatar} />
                </div>
              </> : null
            }
            </AuthUserContext.Consumer>
          </>
        </div>
      </>
    );
  }
}
