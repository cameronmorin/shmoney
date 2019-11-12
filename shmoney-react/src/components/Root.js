import React from 'react';
import '../styles/RootStyle.css'
import './Home.jsx';
import { Link, withRouter } from 'react-router-dom'



export default class NoPath extends React.Component {  
  render() {
    return (
        <div className = "PageWrap" style = {{height: '100vh'}}>
            <div className = "TempNavBar">

            </div>
            <div className = "HomeBody" >
                <div className = "Msg">
                    Welcome to $hmoney, the new and easy way to split payments between friends
                </div>
            </div>
            <div className = "HomeButtons">
                <div className = "SignInButton">
                    <div className = "Button">
                        <Link to='/signin'>Sign In</Link>
                    </div> 
                </div>
                <div className = "OrDisplay">
                    <div className = "Msg">
                        Or
                    </div>
                </div>
                <div className = "SignUpButton:">
                    <div className = "Button">
                        <Link to='/signup'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}