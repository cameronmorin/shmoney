import React from 'react';
import NavBar from '../components/NavBar';
import HomeComponent from '../components/RootUnauth';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {/* {this.props.authUser == null && */}
        <NavBar
          onClickHome={this.props.onClickHome}
          onClickLogout={this.props.onClickLogout}
          onClickAvatar={this.props.onClickAvatar}
        />
        <HomeComponent 
          onClickButton={this.props.onClickButton}
        />
      </>
    );
  }
}