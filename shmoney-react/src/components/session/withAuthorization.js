import React from 'react'

import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import AuthUserContext from './context'
import { withFirebase } from '../firebase'

const withAuthorization = Component => {
   class WithAuthorization extends React.Component {
      componentDidMount() {
         this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            if(!authUser) {
               this.props.history.push('/');
            }
         })
      }
      componentWillUnmount() {
         this.listener();
      }
      render() {
         return (
            <AuthUserContext.Consumer>
               {authUser => 
                  authUser ? <Component {...this.props} /> : null
               }
            </AuthUserContext.Consumer>
         )
      }
   }
   return compose(
      withRouter,
      withFirebase
   )(WithAuthorization);
}


export default withAuthorization