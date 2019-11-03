import React from 'react'
import NavBar from '../components/NavBar';
import "../styles/Profile.css"

import { withAuthorization, withAuthUserContext } from '../components/session'

class Profile extends React.Component {
    render() {
        const authUser = this.props.authUser;
        return (
            <div>
                <NavBar 
                    onLoad={this.props.onLoad}
                    onClickHome={this.props.onClickHome}
                    onClickLogout={this.props.onClickLogout}
                    onClickAvatar={this.props.onClickAvatar}
                    displayName="toBeFixed"
                />
                <div className="wrapper">
                    <div className="left">
                        {/* <WelcomeMessage /> */}
                        <h1>Welcome, {authUser.displayName}</h1>
                        <p>[House Name]</p>
                    </div>
    
                    <div className="right">
                        <div className="house_info">
                            <div className="data">
                                <h1> Bills due</h1>
                                <p>[Bills due]</p>
                            </div>
                            <div className="data">
                                <h1> House Members</h1>
                                <p>[House Members]</p>
                            </div>
                            <div className="data">
                                <h1> Recent payments</h1>
                                <p>[Recent Payments]</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const signedInRoute = true;

const profilePage = withAuthUserContext(Profile);

export default withAuthorization(signedInRoute)(profilePage)
