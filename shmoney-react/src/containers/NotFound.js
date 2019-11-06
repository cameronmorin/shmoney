// Page rendered for unknown links (404 error page)
import React from 'react';
import NavBar from '../components/NavBar';
import Error404 from '../components/Error404';



export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <NavBar
          authUser={this.props.authUser}
          onLoad={this.props.onLoad}
          onClickHome={this.props.onClickHome}
          onClickLogout={this.props.onClickLogout}
          onClickAvatar={this.props.onClickAvatar}
        /> 
        <Error404
          onClickHome={this.props.onClickHome}
        />
      </>
    );
  }
}