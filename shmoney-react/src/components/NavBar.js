import React from 'react';
import { AuthUserContext } from './session'

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import logo from '../images/box_logo.png';
import avatar from '../images/avatar.svg';
import '../styles/NavBar.css';

export default class CustomNavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand>
            <img className="logo" src={logo} alt="logo" onClick={this.props.onClickHome} />
          </Navbar.Brand>
          <AuthUserContext.Consumer>
            {authUser => authUser ?
              <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link onClick={this.props.onClickMenu}>Group</Nav.Link>
                    {/* <Nav.Link className={((this.props.currPage === 'Rent')? 'active-link' : '')} href="/rent">Rent</Nav.Link> */}
                  </Nav>
                  <Nav>
                  <div className="nav-user">
                    {/* insert user info here if signed in, else signIn/Up links */}
                    <div className="user-msg">
                      <div className="welcome-msg">{authUser.displayName}</div>
                      <div className="logout-msg" onClick={this.props.onClickLogout}>Logout</div>
                    </div>
                    <img className="avatar" src={authUser.photoURL ? authUser.photoURL : avatar} alt="user" onClick={this.props.onClickAvatar} />
                  </div>
                  </Nav>
                </Navbar.Collapse>
              </> : null
            }
          </AuthUserContext.Consumer>
        </Navbar>
      </>
    );
  }
}