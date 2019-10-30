import React from 'react';
import '../styles/HomeStyle.css'



export default class HomePage extends React.Component {  
  render() {
    return (
        <div className = "HomeWrap" style = {{height: '100vh'}}>
            <div className = "NavBar">
                <h1>NavBarHere</h1>
            </div>
            <div className = "HomeBody" >
                <p1>
                    "I hope with CSS Grid we learn to break the mould that has become today’s front-end with most designers playing it safe and keeping to the same familiar layouts for every website they create. Flexbox and CSS Grid give designer/developers a much greater control and freedom over the layouts they create. As CSS Grid becomes further adopted I hope it will bring with it a far more creative landscape while still maintaining a high focus on UX."
                </p1>
            </div>
            <div className = "HomeButtons">
                <div className = "SignInButton">
                    <div className = "Button">
                        <h1>
                            Sign In
                        </h1>
                    </div> 
                </div>
                <div className = "SignUpButton:">
                    <div className = "Button">
                        <h1>
                            Sign Up
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}