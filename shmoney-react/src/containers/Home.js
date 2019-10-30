import React from 'react';
import NavBar from '../components/NavBar';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      {this.props.authUser != null &&
        <NavBar 
        authUser={this.props.authUser}
        onLoad={this.props.onLoad}
        onClickHome={this.props.onClickHome}
        onClickLogout={this.props.onClickLogout}
        onClickAvatar={this.props.onClickAvatar}
        displayName="toBeFixed"
        />
      }
        {/* HomePage component */}
        <h1>Home Page</h1>
      </>
    );
  }
}