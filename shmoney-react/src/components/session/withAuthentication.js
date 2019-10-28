import React from 'react'

import AuthUserContext from './context'
import { withFirebase } from '../firebase'

//Provider component that can keep track of authUser status across all components
const withAuthentication = Component => {
   class withAuthentication extends React.Component {
      constructor(props) {
         super(props)

         this.state = {
            authUser: null
         }
      }
      componentDidMount() {
         this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
               authUser ? this.setState({ authUser }) : this.setState({ authUser: null })
               console.log(authUser)
            }
         )
      }
      componentWillUnmount() {
         this.listener();
      }
      render() {
         return(
            <AuthUserContext.Provider value={this.state.authUser}>
               <Component {...this.props}/>
            </AuthUserContext.Provider>
         )
      }
   }
   return withFirebase(withAuthentication);
}

export default withAuthentication