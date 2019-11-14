import React, { Component } from 'react'

import { withFirebase } from './firebase'
import { withAuthorization, withAuthUserContext } from './session'

class CreateGroup extends Component {
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
      let authUser = this.props.authUser;

      this.props.firebase.createHouseGroup(houseName, authUser).then(() => {
         //TODO push to group page
         this.props.history.push('/');
      }).catch(error => {
         this.setState({error});
      });
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

const CreateGroupPage = withAuthUserContext(CreateGroup);

export default withFirebase(withAuthorization(signedInRoute)(CreateGroupPage));
