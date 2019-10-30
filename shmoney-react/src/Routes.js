import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import all routes here
import AppliedRoute from './components/util/AppliedRoute';
import Header from './components/Header';
import Profile from './containers/Profile';
import NotFound from './containers/NotFound';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NoPath from './components/NoPath';

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={NoPath} props={childProps} />
    <AppliedRoute path="/home" exact component={NoPath} props={childProps} />
    <AppliedRoute path="/signIn" exact component={SignIn} props={childProps} />
    <AppliedRoute path="/signUp" exact component={SignUp} props={childProps} />
    <AppliedRoute path="/profile" exact component={Profile} props={childProps} />
    {/* Finally, catch all unmounted routes */}
    <Route component={NotFound} props={childProps}/>
  </Switch>;