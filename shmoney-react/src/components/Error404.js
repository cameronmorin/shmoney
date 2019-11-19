import React from 'react';
import House from '../images/house.svg';
import '../styles/NotFound.css'




export default class Error404 extends React.Component {
    render(){
        return (
            <div>
                <h1 align = "center">
                    This page isn't available
                </h1>
                <h2 align = "center">
                    The page you requested may be broken or it doesn't exist
                </h2>
<<<<<<< HEAD
                
                <img src={House} alt="ReturnHome" className="center" onClick={this.props.onClickHome}/>
=======
                {/* <img src= {SadShmurda} alt="GetShmoney" class = "center"/> */}

                <img src= {House} alt="ReturnHome" className= "center" onClick={this.props.onClickHome}/>
>>>>>>> master

                <h4 align = "center">
                    Click icon to return home
                </h4>              
            </div>
        )
    }

}