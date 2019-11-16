import React from 'react';
import NavBar from '../components/NavBar';
import "../styles/MyGroup.css";

import { withFirebase } from '../components/firebase';

import { withAuthorization, withAuthUserContext } from '../components/session';

class MyGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groupMembers: null,
            groupName: null,
        }
    }
    componentDidMount() {
        this.props.firebase.getHouseGroupData().then(result => {
            this.setState({
                groupMembers: result.group_members,
                groupName: result.group_name
            });
        }).catch(error => {
            console.log(error);
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
                        <h1>{this.state.groupName}</h1>
                        <button className="btn bill">Add bill</button>
                        <button className="btn add">Add members</button>
                        <button className="btn del">Delete members</button>
                        <button className="btn ledger">View ledger</button>
                    </div>

                    <div className="right-grid">
                        <h1>Group members </h1>
                        <ul>
                            {this.state.groupMembers && this.state.groupMembers.map((item, key) => (
                                <li key={key}>{item.username}</li>
                            ))}
                        </ul>
                        <h1>Bills due</h1>
                        <p>[Bills due]</p>
                        <h1>Payment History </h1>
                        <p> [list payments] </p>
                    </div>
                </div>
            </div>
        );
    }
}

const signedInRoute = true;
const myGroup = withAuthUserContext(MyGroup);

export default withFirebase(withAuthorization(signedInRoute)(myGroup));