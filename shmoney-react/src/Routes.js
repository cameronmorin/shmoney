import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import all routes here
import AppliedRoute from './components/util/AppliedRoute';
import Header from './components/Header';
import NotFound from './containers/NotFound';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import HomePage from './components/HomePage';

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={HomePage} props={childProps} />
    <AppliedRoute path="/signIn" exact component={SignIn} props={childProps} />
    <AppliedRoute path="/signUp" exact component={SignUp} props={childProps} />
    {/* Finally, catch all unmounted routes */}
    <Route component={NotFound} props={childProps}/>
  </Switch>;