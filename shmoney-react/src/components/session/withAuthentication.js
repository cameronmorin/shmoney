import React from 'react'

import AuthUserContext from './context'
import { withFirebase } from '../firebase'

//Provider component that can keep track of authUser status across all components
const withAuthentication = Component => {
   class WithAuthentication extends React.Component {
      constructor(props) {
         super(props)

         this.state = {
				authUser: null,
				groupMembers: null,
				groupName: null,
				isNotGroupMember: false,
				isGroupMember: false,
				groupId: null,
				ownerUid: null,
			};
      }
      componentDidMount() {
         this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            if(authUser) {
					this.props.firebase.getHouseGroupData().then(result => {
							let groupOwnerUid = result.owner_uid;
							this.setState({
                        authUser,
								groupMembers: result.group_members,
								groupName: result.group_name,
								isGroupMember: true,
								groupId: result.group_id,
								ownerUid: groupOwnerUid,
							});
						}).catch(error => {
							console.log(error.message);
							//If there is an error then they aren't part of a group
							//So they should see the Create Group button.
							this.setState({ isNotGroupMember: true });
						});
				} else {
               this.setState({
                  authUser: null,
                  groupMembers: null,
                  groupName: null,
                  isNotGroupMember: false,
                  isGroupMember: false,
                  isGroupOwner: false,
                  groupId: null,
                  ownerId: null,
				   });
            }
         }) 
      }
      componentWillUnmount() {
         this.listener();
      }
      render() {
         return(
            <AuthUserContext.Provider value={{state: this.state}}>
               <Component {...this.props}/>
            </AuthUserContext.Provider>
         )
      }
   }
   return withFirebase(WithAuthentication);
}

export default withAuthentication