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
            onGroupListUpdate: null,
            previousRentTotal: null,
            currentBill: null,
            bills: null,
            loaded: false
			};
      }
      componentDidMount() {
         this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            if(authUser) {
               this.setState({authUser});
					this.props.firebase.getHouseGroupData().then(result => {
                     const groupOwnerUid = result.owner_uid;
                     const currentBillId = result.current_bill_id;

							this.setState({
								groupMembers: result.group_members,
								groupName: result.group_name,
								isGroupMember: true,
								groupId: result.group_id,
								ownerUid: groupOwnerUid,
                        onGroupListUpdate: this.updateGroupMembers,
                        previousRentTotal: result.previous_rent_total
                     });
                     
                     return this.props.firebase.getAllBills(this.state.groupId).then(snapshot => {
                     	let bills = [];
                     	snapshot.forEach(doc => {
                     		bills.push(doc.data());
                        });

                        this.updateCurrentBill(currentBillId, bills);

                        this.setState({bills, loaded: true});
                     });
						}).catch(error => {
							console.error(error);
							//If there is an error then they aren't part of a group
							//So they should see the Create Group button.
							this.setState({isNotGroupMember: true, loaded: true });
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
                  previousRentTotal: null,
                  loaded: true
				   });
            }
         }) 
      }
      componentWillUnmount() {
         this.listener();
      }
      updateGroupMembers = groupMembers => {
         this.setState({groupMembers});
      }
      updateCurrentBill = (currentBillId, bills) => {
		for (let item in bills) {
			if (bills[item].doc_id === currentBillId) {
				this.setState({ currentBill: bills[item] });
			}
		}
	};
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