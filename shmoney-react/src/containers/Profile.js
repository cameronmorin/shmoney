import React from 'react'
import "../styles/Profile.css"

import { AuthUserContext } from '../components/session'

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

const Profile = () => {
    return (
        <div>
            <div className="fake-nav">
                <h1> delete dis l8er</h1>
            </div>

            <div className="wrapper">
                <div className="left">
                    <WelcomeMessage />
                    <HouseName />
                </div>

                <div className="right">
                    <div class="house_info">
                        <div class="data">
                            <h1> Bills due</h1>
                            <BillsDue />
                        </div>
                        <div class="data">
                            <h1> House Members</h1>
                            <HouseMembers/>
                        </div>
                        <div class="data">
                            <h1> Recent payments</h1>
                            <RecentPayments/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ProfilePage = () => {
    return (
        <div>
            <Profile />
        </div>
    )
}

export default ProfilePage