import React, { Component } from 'react'

import { withFirebase } from './firebase'
import { withAuthorization, withAuthUserContext } from './session'

class CreateGroup extends Component {
   constructor(props) {
      super(props)

      this.state = {
         houseName: '',

      }
   }
   onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
   }
   onSubmit = event => {
      event.preventDefault();

      let houseName = this.state.houseName;
      let authUser = this.props.authUser;

      this.props.firebase.createHouseGroup(houseName, authUser);
   }
   render() {
      const {houseName} = this.state;
      return (
         <div>
            <form onSubmit={this.onSubmit}>
               <input 
                  type="text"
                  name="houseName"
                  value={houseName}
                  onChange={this.onChange}
                  placeholder="House Name"
               />
            </form>
         </div>
      )
   }
}

const signedInRoute = true;

const CreateGroupPage = withAuthUserContext(CreateGroup);

export default withFirebase(withAuthorization(signedInRoute)(CreateGroupPage));

