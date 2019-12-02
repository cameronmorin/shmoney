import app from 'firebase/app'
import 'firebase'
import 'firebase/auth'
import 'firebase/firestore';
import firebaseConfig from './api';

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);

		/* Helper */
		this.fieldValue = app.firestore.FieldValue;

		this.auth = app.auth();
		this.db = app.firestore();

		/* Storage */
		this.storage = app.storage();
		this.storageRef = this.storage.ref();

		/* Google Auth Provider */
		this.googleProvider = new app.auth.GoogleAuthProvider();
	}

	/* AUTH API */
	createUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

	sendEmailVerification = () => this.auth.currentUser.sendEmailVerification();

	signInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	passwordReset = email => this.auth.sendPasswordResetEmail(email);

	passwordUpdate = password => this.auth.currentUser.updatePassword(password);

	updateUsername = async (newUsername, groupId, groupMembers, isGroupOwner) => {
		//Update user's username authUser then database
		this.auth.currentUser.updateProfile({
			displayName: newUsername
		});
		return this.user(this.auth.currentUser.uid).set({
				username: newUsername,
			},{merge: true}).then(() => {
				if (groupId) {
					//Update group username
					for (let item in groupMembers) {
						if (groupMembers[item].uid === this.auth.currentUser.uid) {
							groupMembers[item].username = newUsername;
						}
					}
					if (isGroupOwner) {
						return this.house_groups()
							.doc(groupId)
							.set({
								group_members: groupMembers,
								owner_username: newUsername,
							}, {
								merge: true
							});
					} else {
						return this.house_groups()
							.doc(groupId)
							.set({
								group_members: groupMembers,
							}, {
								merge: true
							});
					}
				}
			})
			.catch(error => {
				console.log(error.message);
			});
	};

	signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

	signOut = () => this.auth.signOut();

	/* Firestore API */
	user = uid => this.db.doc(`users/${uid}`);

	users = () => this.db.collection('users');

	house_groups = () => this.db.collection('house_groups');

	group_bills = groupId => this.house_groups().doc(groupId).collection('bills');

	/* Group Firestore Functions */

	/**
	 *	Create a house group document in firestore
	 *	@param houseName what the group_name is set to in group document with random doc.id
	 *	@return empty callback or error that can be caught
	 */
	createHouseGroup = async houseName => {
		let doc = this.house_groups().doc();
		doc.set({
			group_id: doc.id,
			group_name: houseName,
			owner_username: this.auth.currentUser.displayName,
			owner_uid: this.auth.currentUser.uid,
			group_members: [{
				uid: this.auth.currentUser.uid,
				username: this.auth.currentUser.displayName,
			}],
			group_members_uids: [this.auth.currentUser.uid]
		},{merge:true});
		return this.user(this.auth.currentUser.uid).set({
			group_id: doc.id,
		},{merge:true});
	};

	/**
	 *	Deletes the group document and set's each user's group_id to null
	 *	@param groupId id of group being deleted
	 *	@return empty callback or error that can be caught
	 */
	deleteHouseGroup = async groupId => {
		const groupDoc = this.house_groups().doc(groupId);
		return groupDoc.get().then(doc => {
			let groupMembers = doc.data().group_members;

			//Remove group_id from all member's document's
			groupMembers.map(item =>
				this.user(item.uid).set({
					group_id: null,
				},{merge:true})
			);

			return groupDoc.delete();
		});
	};

	/**
	 *	Searches for a user by their username via firestore query of user's collection
	 *	@param searchName username of
	 *	@return snapshot of user documents that match the given username or error that can be caught
	 */
	searchUser = async searchName => {
		return this.users().where('username', '==', searchName).get();
	};

	/**
	 *	Adds a user map to the group_members array of the group document in firestore
	 *	@param uid uid of user being added to the group
	 *	@param groupId id for group that user is being added to the group
	 *	@return empty callback or error that can be caught
	 */
	addUserToHouseGroup = async (uid, groupId) => {
		//Two Reads and Two Writes per call
		//Check if user is already in group so they are not added to multiple
		return this.user(uid)
			.get()
			.then(doc => {
				const userGroupId = doc.data().group_id;
				const username = doc.data().username;

				if (!userGroupId) {
					//Add user to house members list
					return this.house_groups().doc(groupId).set({
						group_members: this.fieldValue.arrayUnion({
							uid: uid,
							username: username,
						}),
						group_members_uids: this.fieldValue.arrayUnion(uid)
					},{merge:true}).then(() => {
						//Add group id to user's document
						return this.user(uid).set({
							group_id: groupId,
						}, {merge:true});
					});
				}
			});
	};

	/**
	 *	Removes a user from the group and sets group_id to null in user's document
	 *	@param uid uid of user being removed from the group
	 *	@param groupId id for group that user is being removed from the group
	 *	@return empty callback or error that can be caught
	 */
	removeUserFromGroup = async (uid, groupId) => {
		//let houseGroupDoc = this.house_groups().doc(groupId);
		return this.house_groups()
			.doc(groupId)
			.get()
			.then(doc => {
				//Get the array of house member objects
				let houseMembers = doc.data().group_members;
				let houseMembersUids = doc.data().group_members_uids
				let removed = false;
				//Find user object by uid and remove them from the array
				for (let i = 0; i < houseMembers.length; i++) {
					if (houseMembers[i].uid === uid) {
						houseMembers.splice(i, 1);
						//Remove uid from groupMembersUids array
						for (let j = 0; j < houseMembersUids.length; j++) {
							if (houseMembersUids[j] === uid) {
								houseMembersUids.splice(j, 1);

								removed = true;
							}
						}
					}
				}

				//Only need to update list if member was in the group
				if (removed) {
					this.house_groups().doc(groupId).set({
							group_members: houseMembers,
							group_members_uids: houseMembersUids
						},{merge:true});
					//Remove group_id from user's document
					return this.user(uid).set({
						group_id: null,
					},{merge:true});
				}
			});
	};

	/**
	 *	Check if the current user is owner of the group
	 *	@return true or false boolean or error that can be caught
	 */
	isHouseGroupOwner = async () => {
		return this.user(this.auth.currentUser.uid).get().then(doc => {
			let groupId = doc.data().group_id;
			return this.house_groups().doc(groupId).get().then(doc => {
				let owner_uid = doc.data().owner_uid;
				if (owner_uid === this.auth.currentUser.uid) {
					return true;
				} else {
					return false;
				}
			});
		});
	};

	/**
	 *	Change the owner_uid and owner_username to a different user
	 *	@param uid uid of the new owner of the group
	 *	@param username username of the new owner of the group
	 *	@param groupId groupId of the group whose owner is being updated
	 *	@return true or false boolean or error that can be caught
	 */
	updateGroupOwner = async (uid, username, groupId) => {
		return this.house_groups().doc(groupId).update({
			owner_uid: uid,
			owner_username: username
		});
	};

	/**
	 *	Get the house group data from the current user's group
	 *	@return returns data snapshot that can be used to access the document's data or error that can be caught
	 */
	getHouseGroupData = async () => {
		return this.user(this.auth.currentUser.uid).get().then(doc => {
			let groupId = doc.data().group_id;
			return this.house_groups().doc(groupId).get().then(doc => {
				return doc.data();
			});
		});
	};

	/* Bill Firestore Functions */

	/**
	 * Create a new bill
	 * @param groupId group id for document where bill is created
	 * @param groupMembers array of group members
	 * @param dueDate due date for the bill in M/D/Y-H:M:S format
	 * @param epoch due date for bill in epoch time (useful for sorting by date)
	 * @param rentTotal the rent total for the bill
	 * @return empty callback or error that can be caught
	 */
	createBill = async (groupId, groupMembers, dueDate, rentTotal) => {
		const groupDoc = this.house_groups().doc(groupId);
		const newBillDoc = this.group_bills(groupId).doc();
		
		return newBillDoc.set({
			due_date: dueDate,
			group_members: groupMembers,
			doc_id: newBillDoc.id,
			rent_total: rentTotal
		},{merge:true}).then(() => {
			return groupDoc.set({
				current_bill_id: newBillDoc.id,
				previous_rent_total: rentTotal
			},{merge:true});
		})
	}

	/**
	 * Gets all the bills within a group
	 * @param groupId group id for document where bills are
	 * @return snapshot of all documents in bills collection or error that can be caught
	 */
	getAllBills = async groupId => {
		const groupDoc = this.house_groups().doc(groupId);

		return groupDoc.collection('bills').get();
	};

	/**
	 * Create a new bill
	 * @param uid user id of user that paid
	 * @param groupName name of group
	 * @param groupId document id for group
	 * @param groupMembers array of group members
	 * @param paymentAmount amount that was paid by the user
	 * @param billId id for the bill
	 * @return empty callback or error that can be caught
	 */
	markPaid = async (uid, groupName, groupId, groupMembers, paymentAmount, billId) => {
		const newPaymentDoc = this.user(uid).collection('payment_history').doc();
		const groupDoc = this.house_groups().doc(groupId);

		return newPaymentDoc.set({
			group_name: groupName,
			owner_uid: uid,
			payment_time: new Date(),
			payment_amount: paymentAmount,
			doc_id: newPaymentDoc.id
		},{merge:true}).then(() => {
			groupDoc.collection('bills').doc(billId).set({
				group_members: groupMembers
			},{merge:true})
		})
	}

	/* MERGE AUTH AND FIRESTORE API */
	onAuthUserListener = (next, fallback) => {
		this.auth.onAuthStateChanged(authUser => {
			if (authUser) {
				this.user(authUser.uid)
					.get()
					.then(snapshot => {
						const dbUser = snapshot.data();
						//Merge auth and db user
						authUser = {
							uid: authUser.uid,
							email: authUser.email,
							emailVerified: authUser.emailVerified,
							providerData: authUser.providerData,
							...dbUser,
						};
						next(authUser);
					});
			} else {
				fallback();
			}
		});
	};

}

export default Firebase;
