import React from 'react';
import '../styles/RootUnauth.css'
import './Home.jsx';
import { AuthUserContext } from './session'
import Dashboard from '../components/Root';

export default class NoPath extends React.Component {  
  render() {
    return (
        
          <AuthUserContext.Consumer>
            {authUser => authUser ? <Dashboard/> :
              <div className="page">
                <div className = "UnAuth">
                  <div className="title-text">
                    Welcome to $hmoney, the new and easy way to split payments between friends
                  </div>
                  <div className="home-buttons">
                    <div className="sign-in-button">
                      <div className="button" onClick={this.props.onClickButton}>
                        Sign In
                      </div> 
                    </div>
                    <div className="sign-up-button">
                      <div className="button" onClick={this.props.onClickButton}>
                        Sign Up
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </AuthUserContext.Consumer>
        
    )
  }
}
