import app from 'firebase/app'
import 'firebase/auth'

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

		this.auth = app.auth();

		this.googleProvider = new app.auth.GoogleAuthProvider();
	}

	/* AUTH API */

	createUserWithEmailAndPassword = (email, password) => 
		this.auth.createUserWithEmailAndPassword(email, password);

	signInWithEmailAndPassword = (email, password) => 
		this.auth.signInWithEmailAndPassword(email, password);

	passwordReset = email => this.auth.sendPasswordResetEmail(email);

	passwordUpdate = password => this.auth.currentUser.updatePassword(password);

	signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

	signOut = () => this.auth.signOut();
}

export default Firebase;
