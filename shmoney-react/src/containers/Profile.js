import React from 'react'
import NavBar from '../components/NavBar';
import "../styles/Profile.css"

import { withAuthorization, withAuthUserContext } from '../components/session'
import { withFirebase } from '../components/firebase'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            houseName: '...',
            houseMembers: null
        }
    }
    componentDidMount() {
        this.props.firebase.getHouseGroupData().then(result => {
            let houseName = result.group_name;
            let houseMembers = result.group_members;
            this.setState({houseName, houseMembers});
        });
    }
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
                <div className="main-grid">
                    <div className="left-grid">
                        <h1>Welcome, {authUser.displayName}</h1>
                        <p>{this.state.houseName}</p>
                    </div>

                    <div className="right-grid">
                        <h1> Bills due</h1>
                        <p>[Bills due]</p>
                        <h1> House Members</h1>
                        <div className="house-members-list">
                            <ul>
                            {this.state.houseMembers && this.state.houseMembers.map((item, key) => (
                                <li key={key}>{item.username}</li>
                            ))}
                            </ul>
                        </div>
                        <h1> Recent payments</h1>
                        <p>[Recent Payments]</p>
                    </div>
                </div>
            </div>
        );
    }
}

const signedInRoute = true;

const profilePage = withAuthUserContext(Profile);

export default withFirebase(withAuthorization(signedInRoute)(profilePage));
