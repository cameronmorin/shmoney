import React from 'react'
import NavBar from '../components/NavBar';
import "../styles/MyGroup.css"

import { withAuthorization, withAuthUserContext } from '../components/session'



class MyGroup extends React.Component {
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
                <div className="main-grp">
                    <div className="left-grp">
                        <h1>House Name</h1>
                        <button className="btn bill">Add bill</button>
                        <button className="btn add">Add members</button>
                        <button className="btn del">Delete members</button>
                        <button className="btn ledger">View ledger</button>
                    </div>

                    <div className="right-grp">
                        <h1>Group members </h1>
                        <p>[list group] </p>
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

export default withAuthorization(signedInRoute)(myGroup)