import React from 'react';
import ReactDOM from 'react-dom';
import mainApp from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<mainApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
