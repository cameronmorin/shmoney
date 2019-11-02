import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../images/logo.png';
import avatar from '../images/avatar.svg';
import '../styles/NavBar.css';

import { AuthUserContext } from './session'

{/* Displays username */}
const DisplayUsername = () => {
  return(
    <div className="welcome-msg">
      <AuthUserContext.Consumer>
        {authUser => authUser ? authUser.displayName : null}
      </AuthUserContext.Consumer>
    </div>
  )
}

export default class NavBar extends React.Component {
  componentWillMount = async event => {
    // Add logic here to reset avatar to picture from DB rather than default pic
  }
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
                    <DisplayUsername />
                    <div className="logout-msg" onClick={this.props.onClickLogout}>Logout</div>
                  </div>
                  <img className="avatar" src={avatar} alt="user" onClick={this.props.onClickAvatar} />
                </div>
              </> : null
            }
            </AuthUserContext.Consumer>
          </>
          {/* } */}
        </div>
      </>
    );
  }
}
