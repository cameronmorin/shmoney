import React from 'react';
import { AuthUserContext } from './session'

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import logo from '../images/box_logo.png';
import avatar from '../images/avatar.png';
import '../styles/NavBar.css';

export default class CustomNavBar extends React.Component {
  render() {
    return(
      <>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand>
            <img className="logo" src={logo} alt="logo" onClick={this.props.onClickHome} />
          </Navbar.Brand>
          <AuthUserContext.Consumer>
            {context => context.state.authUser ?
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
                      <div className="welcome-msg">{context.state.authUser.displayName}</div>
                      <div className="logout-msg" onClick={this.props.onClickLogout}>Logout</div>
                    </div>
                    <img className="avatar" src={context.state.authUser.photoURL ? context.state.authUser.photoURL : avatar} alt="user" onClick={this.props.onClickAvatar} />
                  </div>
                  </Nav>
                </Navbar.Collapse>
              </> : null //REPLACE NULL WITH SIGNIN/SIGNUP BUTTONS
            }
          </AuthUserContext.Consumer>
        </Navbar>
      </>
    );
  }
}