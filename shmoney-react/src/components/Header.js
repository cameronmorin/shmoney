import React from 'react';

class Header extends React.Component {
  state = {
    currPage: this.props.currPage
  }
  
  render() {
    return (
      <h1>Hello World!</h1>
    )
  }
}

export default Header;