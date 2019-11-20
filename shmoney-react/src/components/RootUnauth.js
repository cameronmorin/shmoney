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
                <div className = "top-box">
                  <div className="subject-text top">
                    <p>
                      $hmoney helps you <br></br>
                      keep track of your rent <br></br>
                      and stay organized.
                    </p>
                  </div>
                  <div className = "description-text top">
                    Form groups and divide rent among <br></br>
                    roommates to stay on track with <br></br>
                    due dates in an effective and <br></br>
                    efficient manner.
                  </div>
                  <div className="home-buttons">
                    <div className="sign-in-button">
                      <div className="button" onClick={this.props.onClickButton}>
                        Sign In
                      </div> 
                    </div>
                    <div className="get-started-button">
                      <div className="button" onClick={this.props.onClickButton}>
                        Get Started
                      </div>
                    </div>
                  </div>
                </div>
                <div className = "subject-text bottom">
                  Organize into groups
                </div>
                <div className = "description-text bottom">
                  Find and add other Shmoney members <br></br>
                  to your group to divide up the rent <br></br>
                  amongst group members.
                </div>
                <div className = "subject-text-right">
                  Information at a glance
                </div>
                <div className = "description-text-right">
                  Access data regarding your group such as <br></br>
                  who has/hasn't paid rent, due dates, previous<br></br>
                  bill history, and other statistical data.
                </div>
              </div>
            }
          </AuthUserContext.Consumer>
        
    )
  }
}
