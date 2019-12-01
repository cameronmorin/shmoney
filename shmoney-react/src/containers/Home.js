import React from 'react';
import NavBar from '../components/NavBar';
import HomeComponent from '../components/RootUnauth';


export default class Home extends React.Component {
  render() {
    return (
      <>
        {/* {this.props.authUser == null && */}
        <NavBar
          onClickHome={this.props.onClickHome}
          onClickMenu={this.props.onClickMenu}
          onClickLogout={this.props.onClickLogout}
          onClickAvatar={this.props.onClickAvatar}
          currPage="Home"
        />
        <HomeComponent 
          onClickButton={this.props.onClickButton}
        />
      </>
    );
  }
}