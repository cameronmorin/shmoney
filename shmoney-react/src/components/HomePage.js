import React from 'react';
import '../styles/HomeStyle.css'
import './Home.jsx';
import Home from './Home.jsx';


export default class HomePage extends React.Component {  
  render() {
    return (
        <div className = "HomeWrap" style = {{height: '100vh'}}>
            <div className = "NavBar">
                <div className = "Logo">
                    <h1>
                        $hmoney
                    </h1>
                </div>
            </div>
            <div className = "HomeBody" >
                <div className = "Msg">
                    <Home />
                </div>
            </div>
            <div className = "HomeButtons">
                <div className = "SignInButton">
                    <div className = "Block">
                        <h1>
                            Sign In
                        </h1>
                    </div> 
                </div>
                <div className = "SignUpButton:">
                    <div className = "Block">
                        <h1>
                            Sign Up
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}