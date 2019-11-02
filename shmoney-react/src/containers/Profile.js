import React from 'react'
import NavBar from '../components/NavBar';
import "../styles/Profile.css"

import { AuthUserContext, withAuthorization } from '../components/session'

const WelcomeMessage = () => {
    return (
        <div>
            <AuthUserContext.Consumer>
                {authUser => authUser ? <h1> Welcome, {authUser.displayName}</h1> : <h1></h1>}
            </AuthUserContext.Consumer>
        </div>
    )
}

const HouseName = () => {
    return (
        <div>
            <AuthUserContext.Consumer>
                {authUser => authUser ? <p> [House name] </p> : <p></p>}
            </AuthUserContext.Consumer>
        </div>
    )
}

const BillsDue = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser => authUser ? <p> [Bills Due]</p> : <p></p>}
        </AuthUserContext.Consumer>
    )
}

const HouseMembers = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser => authUser ? <p> [House members]</p> : <p></p>}
        </AuthUserContext.Consumer>
    )
}

const RecentPayments = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser => authUser ? <p> [Recent payments] </p> : <p></p>}
        </AuthUserContext.Consumer>
    )
}

class Profile extends React.Component {
    render() {
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
                        <WelcomeMessage />
                        <HouseName />
                    </div>
    
                    <div className="right">
                        <div className="house_info">
                            <div className="data">
                                <h1> Bills due</h1>
                                <BillsDue />
                            </div>
                            <div className="data">
                                <h1> House Members</h1>
                                <HouseMembers/>
                            </div>
                            <div className="data">
                                <h1> Recent payments</h1>
                                <RecentPayments/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuthorization(Profile)
