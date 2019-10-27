// Page rendered for unknown links (404 error page)
import React from 'react';
import Header from '../components/Header';

export default class NotFound extends React.Component {
  render() {
    return (
      <h1>Wrong url, plz try again :)</h1>
    );
  }
}