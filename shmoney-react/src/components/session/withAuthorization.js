import React from 'react'

import { withRouter } from 'react-router-dom'
import { withFirebase } from '../firebase'
import { compose } from 'recompose'

const withAuthorization = signedInRoute => Component => {
   class WithAuthorization extends React.Component {
      componentDidMount() {
         this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            //If the component is a signedInRoute the user must be logged in to
            //view it and is routed to home.
            if(signedInRoute) {
               if(!authUser) this.props.history.push('/');
            } else {
               if(authUser) this.props.history.push('/');
            }
         })
      }
      componentWillUnmount() {
         this.listener();
      }
      render() {
         return (<Component {...this.props} />)
      }
   }
   return compose(
      withRouter,
      withFirebase
   )(WithAuthorization);
}


export default withAuthorization