import React from 'react';
import '../styles/RootUnauth.css'
import './Home.jsx';
import { AuthUserContext } from './session'

export default class NoPath extends React.Component {  
  render() {
    return (
        <div className="page">
					<div className="title-text">
            Welcome to $hmoney, the new and easy way to split payments between friends
          </div>
          <AuthUserContext.Consumer>
            {authUser => authUser ? null :
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
            }
          </AuthUserContext.Consumer>
        </div>
    )
  }
}
