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
	createHouseGroup = (houseName, authUser) => {
		let doc = this.house_groups().doc();
		doc.set({
			group_name: houseName,
			owner_username: this.auth.currentUser.displayName,
			owner_uid: this.auth.currentUser.uid
		});
		this.user(authUser.uid).set({
			group_id: doc.id
		},{merge:true});
	}

	addUserToHouseGroup = async (uid, username, authUser) => {
		//Take in other user's uid and username, and group owner as authUser.
		return this.user(authUser.uid).get().then(doc => {
			let houseGroupId = doc.data().group_id;
			//Add user to house members list
			this.house_groups().doc(houseGroupId).set({
				house_members: this.fieldValue.arrayUnion(username)
			},{merge:true});
			//Add group id to user's document
			this.user(uid).set({
				group_id: houseGroupId
			},{merge:true})
		});
	}

	isHouseGroupOwner = async (authUser) => {
		return this.user(authUser.uid).get().then(doc => {
			let houseGroupId = doc.data().group_id;
			return this.house_groups().doc(houseGroupId).get().then(doc => {
				let owner_uid = doc.data().owner_uid;
				if(owner_uid === authUser.uid) {
					return true;
				} else {
					return false;
				}
			});
		});
	}

	getHouseGroupData = async (authUser) => {
		return this.user(authUser.uid).get().then(doc => {
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