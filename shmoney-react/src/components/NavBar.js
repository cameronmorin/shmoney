import React, { useContext, useState } from 'react'

import AuthUserContext from './session/context'

import { Navbar, Nav } from 'react-bootstrap';

import logo from '../images/box_logo.png';
import avatar from '../images/avatar.png';
import '../styles/NavBar.css';

export default function NavBar(props) {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;
	const authUser = authState.authUser;

	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand>
            <img className="logo" src={logo} alt="logo" onClick={props.onClickHome} />
          </Navbar.Brand>
					{authUser ? 
						<>
							<Navbar.Toggle aria-controls="responsive-navbar-nav" />
							<Navbar.Collapse id="responsive-navbar-nav">
								<Nav className="mr-auto">
									<Nav.Link onClick={props.onClickMenu}>Group</Nav.Link>
								</Nav>
								<Nav>
									<div className="nav-user">
                    {/* insert user info here if signed in, else signIn/Up links */}
                    <div className="user-msg">
                      <div className="welcome-msg">{authUser.displayName}</div>
                      <div className="logout-msg" onClick={props.onClickLogout}>Logout</div>
                    </div>
                    <img className="avatar" src={authUser.photoURL ? authUser.photoURL : avatar} alt="user" onClick={props.onClickAvatar} />
                  </div>
								</Nav>
							</Navbar.Collapse>
						</> : null
					}
        </Navbar>
		</>
	)
}
