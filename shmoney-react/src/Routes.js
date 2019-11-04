import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import all routes here
import AppliedRoute from './components/util/AppliedRoute';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Profile from './containers/Profile';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
<<<<<<< HEAD
import Root from './components/Root';
import Home from './components/Home';

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Root} props={childProps} />
    <AppliedRoute path="/home" exact component={Home} props={childProps} />
=======

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
>>>>>>> master
    <AppliedRoute path="/signIn" exact component={SignIn} props={childProps} />
    <AppliedRoute path="/signUp" exact component={SignUp} props={childProps} />
    <AppliedRoute path="/profile" exact component={Profile} props={childProps} />
    {/* Finally, catch all unmounted routes */}
    <Route component={NotFound} props={childProps}/>
  </Switch>;