import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../images/logo.png';
import avatar from '../images/avatar.svg';
import '../styles/NavBar.css';

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
          {this.props.authUser != null &&
          <>
            <div className="nav-pages">
              {/* insert page links here */}
              <NavLink to="/group" className="link" activeClassName="active-link">My Group</NavLink>
              <NavLink to="/myrent" className="link" activeClassName="active-link">Pay Rent</NavLink>
            </div>
            <div className="nav-user">
              {/* insert user info here if signed in, else signIn/Up links */}
              <div className="user-msg">
                <div className="welcome-msg">
                  {this.props.displayName}
                  {/* {this.props.authUser.displayName}  => should be correct when authUser is setup */}
                </div>
                <div className="logout-msg" onClick={this.props.onClickLogout}>Logout</div>
              </div>
              <img className="avatar" src={avatar} alt="user" onClick={this.props.onClickAvatar} />
            </div>
          </>
          }
        </div>
      </>
    );
  }
}