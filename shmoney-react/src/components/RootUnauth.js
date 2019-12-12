import React from 'react';
import '../styles/RootUnauth.css'
import './Home.jsx';
import { AuthUserContext } from './session'
import Dashboard from '../containers/Dashboard';
import DashboardImage from '../images/DashboardImage.png';
import GroupPageImage from '../images/GroupPageImage.png';

export default class NoPath extends React.Component {  
  render() {
    return (
        
          <AuthUserContext.Consumer>
            {context => context.state.authUser ? <Dashboard/> : context.state.loaded ?
              <div className="page">
                <div className = "top-box">
                  <div className="subject-text top">
                    <div>
                      Shmoney helps you <br></br>
                      keep track of your rent <br></br>
                      and stay organized.
                    </div>
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
                    <div className="sign-up-button">
                      <div className="button" onClick={this.props.onClickButton}>
                        Sign Up
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className = "insert-image-2">
                    <img src={GroupPageImage} className="image"/>
                  </div>
                  <div className = "subject-text bottom">
                    Organize into groups
                  </div>
                  <div className = "description-text bottom">
                    Find and add other Shmoney members <br></br>
                    to your group to divide up the rent <br></br>
                    amongst group members.
                  </div>
                </div>
                <div>
                  <div className="insert-image-3">
                    <img src={DashboardImage} className="image"/>
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
              </div>
              : <></>
            }
          </AuthUserContext.Consumer>
        
    )
  }
}
