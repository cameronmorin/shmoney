import app from 'firebase/app'
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

	/* USER API */
	user = uid => this.db.doc(`users/${uid}`);

	users = () => this.db.collection('users');

	/* MERGE AUTH AND FIRESTORE API */
	onAuthUserListener = (next, fallback) => {
		this.auth.onAuthStateChanged(authUser => {
			if(authUser) {
				this.user(authUser.uid).get().then(snapshot => {
					const dbUser = snapshot.data();

					//Default empty roles
					if(!dbUser.roles) {
						dbUser.roles = {}
					}

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