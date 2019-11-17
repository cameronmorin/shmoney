import app from 'firebase/app'
import 'firebase'
import 'firebase/auth'
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyBmOBXj6X0pPNLnIZKBaV_RszLpmy5fXas",
	authDomain: "shmoney-617ec.firebaseapp.com",
	databaseURL: "https://shmoney-617ec.firebaseio.com",
	projectId: "shmoney-617ec",
	storageBucket: "shmoney-617ec.appspot.com",
	messagingSenderId: "123891123896",
	appId: "1:123891123896:web:9a17a4c90e12c452c7964d",
	measurementId: "G-70DJ7C1469"
};

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

		this.googleProvider = new app.auth.GoogleAuthProvider();
	}

	/* AUTH API */
	createUserWithEmailAndPassword = (email, password) => 
		this.auth.createUserWithEmailAndPassword(email, password);

	sendEmailVerification = () => 
		this.auth.currentUser.sendEmailVerification()

	signInWithEmailAndPassword = (email, password) => 
		this.auth.signInWithEmailAndPassword(email, password);

	passwordReset = email => this.auth.sendPasswordResetEmail(email);

	passwordUpdate = password => this.auth.currentUser.updatePassword(password);

	signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

	signOut = () => this.auth.signOut();

	/* Firestore API */
	user = uid => this.db.doc(`users/${uid}`);

	users = () => this.db.collection('users');

	house_groups = () => this.db.collection('house_groups');

	/* Firestore Functions */
	createHouseGroup = async (houseName) => {
		let doc = this.house_groups().doc();
		doc.set({
			group_id: doc.id,
			group_name: houseName,
			owner_username: this.auth.currentUser.displayName,
			owner_uid: this.auth.currentUser.uid,
			group_members: [{
				uid: this.auth.currentUser.uid,
				username: this.auth.currentUser.displayName,
				
			}]
		});
		return this.user(this.auth.currentUser.uid).set({
			group_id: doc.id
		},{merge:true});
	}

	deleteHouseGroup = async (groupId) => {
		const groupDoc = this.house_groups().doc(groupId); 
		return groupDoc.get().then(doc => {
			let groupMembers = doc.data().group_members;

			//Remove group_id from all member's document's
			groupMembers.map(item => {
				this.user(item.uid).set({
					group_id: null,
				})
			})

			return groupDoc.delete();
		})
	}

	addUserToHouseGroup = async (uid, username, houseGroupId) => {
		console.log(`Adding User ${username} to House Group`);
		//Two Reads and Two Writes per call
		//Check if user is already in group so they are not added to multiple
		return this.user(uid).get().then(doc => {
			let userGroupId = doc.data().group_id;

			if(!userGroupId) {
				//Add user to house members list
				this.house_groups().doc(houseGroupId).set({
					group_members: this.fieldValue.arrayUnion({
						uid: uid,
						username: username
					})
				},{merge:true});

				//Add group id to user's document
				return this.user(uid).set({
					group_id: houseGroupId
				},{merge:true})
			}
		})
	}

	removeUserFromGroup = async (uid) => {
		return this.user(this.auth.currentUser.uid).get().then(doc => {
			let houseGroupId = doc.data().group_id;
			return this.house_groups().doc(houseGroupId).get().then(doc => {
				//Get the array of house member objects
				let houseMembers = doc.data.group_members;
				let removed = false;
				//Find user object by uid and remove them from the array
				for(let i = 0; i < houseMembers.size; i++) {
					if(houseMembers[i].uid === uid) {
						houseMembers.splice(i, 1);
						removed = true;
					}
				}
				//Only need to update list if member was in the group
				if(removed) {
					doc.set({
						group_members: houseMembers
					},{merge: true})
					//Remove group_id from user's document
					this.user(uid).set({
						group_id: null
					},{merge:true})
				}
			})
		})
	}

	isHouseGroupOwner = async () => {
		return this.user(this.auth.currentUser.uid).get().then(doc => {
			let houseGroupId = doc.data().group_id;
			return this.house_groups().doc(houseGroupId).get().then(doc => {
				let owner_uid = doc.data().owner_uid;
				if(owner_uid === this.auth.currentUser.uid) {
					return true;
				} else {
					return false;
				}
			});
		});
	}

	getHouseGroupData = async () => {
		return this.user(this.auth.currentUser.uid).get().then(doc => {
			let houseGroupId = doc.data().group_id;
			return this.house_groups().doc(houseGroupId).get().then(doc => {
				return doc.data();
			})
		});
	}

	/* MERGE AUTH AND FIRESTORE API */
	onAuthUserListener = (next, fallback) => {
		this.auth.onAuthStateChanged(authUser => {
			if(authUser) {
				this.user(authUser.uid).get().then(snapshot => {
					const dbUser = snapshot.data();
					//Merge auth and db user
					authUser = {
						uid: authUser.uid,
						email: authUser.email,
						emailVerified: authUser.emailVerified,
						providerData: authUser.providerData,
						...dbUser,
					}
					next(authUser);
				});
			} else {
				fallback();
			}
		})
	}
}

export default Firebase;