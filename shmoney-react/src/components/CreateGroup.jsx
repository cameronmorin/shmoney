import React, { Component } from 'react'
import { compose } from 'recompose'

import { withFirebase } from './firebase'
import { withAuthorization, withAuthUserContext } from './session'

class CreateGroupBase extends Component {
   constructor(props) {
      super(props)

      this.state = {
         houseName: '',
         error: null
      }
   }
   onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
   }
   onSubmit = event => {
      event.preventDefault();

      let houseName = this.state.houseName;

      this.props.firebase.createHouseGroup(houseName).then();

      this.props.history.push('/');
   }
   render() {
      const {houseName, error} = this.state;
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
               <button type="submit">Create</button>

               <div className="error-message">
                  {error && <p>{error.message}</p>}
               </div>
            </form>
         </div>
      )
   }
}

const signedInRoute = true;

const CreateGroup = compose(
   withFirebase,
   withAuthUserContext
)(CreateGroupBase)

export default withAuthorization(signedInRoute)(CreateGroup);
