import React from 'react'
import "../styles/Profile.css"

export default class Profile extends React.Component {
    render() {
        return (
            <>
                <div className="fake-nav">
                    <h1> delete dis l8er</h1>
                </div>

                <div className="wrapper">
                    <div className="left">
                        <h1> Welcome, [Name]</h1>
                        <p> [House Name]</p>
                    </div>

                    <div className="right">
                        <div class="house_info">
                            <div class="data">
                                <h1> Bills due</h1>
                                <p>[insert cur bills]</p>
                            </div>
                            <div class="data">
                                <h1> House Members</h1>
                                <p> [List of users]</p>
                            </div>
                            <div class="data">
                                <h1> Recent payments</h1>
                                <p> [List of payments]</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}