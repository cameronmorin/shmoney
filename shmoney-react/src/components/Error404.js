import React from 'react';
import SadShmurda from '../images/sad.svg';
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
                <img src= {SadShmurda} alt="GetShmoney" class = "center"/>
            </div>
        )
    }

}