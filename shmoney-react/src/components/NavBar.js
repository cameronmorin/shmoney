import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthUserContext } from './session'

import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import logo from '../images/logo.png';
import avatar from '../images/avatar.svg';
import '../styles/NavBar.css';

export default class CustomNavBar extends React.Component {
  onClick = eventKey => {
    switch(eventKey) {
      case 'Home':
        if (this.window.location.pathname != '/') this.props.history.push('/');
        break;
      case 'My Group':
          if (this.window.location.pathname != '/group') this.props.history.push('/group');
        break;
      case 'Pay Rent':
          if (this.window.location.pathname != '/myrent') this.props.history.push('/myrent');
        break;
      case 'Profile':
          if (this.window.location.pathname != '/profile') this.props.history.push('/profile');
      default:
        break;
    }
  }
  
  render() {
    const currPage = this.props.currPage;
    return(
      <>
        <nav bg="light" expand="lg">
          <NavBar.Brand className="brand"><img className="logo" src={logo} alt="logo" /></NavBar.Brand>
          <Nav className="mr-auto nav-links">
            <Nav.Item className={'on-hover ' + ((currPage === 'Group')? 'active-link' : 'link')}>Group</Nav.Item>
            <Nav.Item className={'on-hover ' + ((currPage === 'Rent')? 'active-link' : 'link')}>Rent</Nav.Item>
          </Nav>
        </nav>
      </>
    );
  }
}

// <div className="nav-grid">
//           <div className="nav-logo">
//             {/* display logo here */}
//             <img className="logo" src={logo} alt="logo" onClick={this.props.onClickHome}/>
//           </div>
//           <>
//             {/* Check authUser status and render nav-pages and nav-user if they are logged in
//             Can change null to whatever needs to be rendered when authUser is logged out */}
//             <AuthUserContext.Consumer>
//             {authUser => authUser ? 
//               <>
//                 <div className="nav-pages">
//                   {/* insert page links here */}
//                   <NavLink to="/group" className="link" activeClassName="active-link">My Group</NavLink>
//                   <NavLink to="/myrent" className="link" activeClassName="active-link">Pay Rent</NavLink>
//                 </div>
//                 <div className="nav-user">
//                   {/* insert user info here if signed in, else signIn/Up links */}
//                   <div className="user-msg">
//                     <div className="welcome-msg">{authUser.displayName}</div>
//                     <div className="logout-msg" onClick={this.props.onClickLogout}>Logout</div>
//                   </div>
//                   <img className="avatar" src={authUser.photoURL ? authUser.photoURL : avatar} alt="user" onClick={this.props.onClickAvatar} />
//                 </div>
//               </> : null
//             }
//             </AuthUserContext.Consumer>
//           </>
//         </div>