import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
	apiKey: "AIzaSyBmOBXj6X0pPNLnIZKBaV_RszLpmy5fXas",
	authDomain: "shmoney-617ec.firebaseapp.com",
	databaseURL: "https://shmoney-617ec.firebaseio.com",
	projectId: "shmoney-617ec",
	storageBucket: "shmoney-617ec.appspot.com",
	messagingSenderId: "123891123896",
	appId: "1:123891123896:web:9a17a4c90e12c452c7964d",
	measurementId: "G-70DJ7C1469"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Function listens for whenever the auth state changes
//When user is not logged in user == null
firebase.auth().onAuthStateChanged((user) => {
	if(user != null) {
		console.log("Logged In as:", user.displayName);
		console.log("User Object:", user)
	} else {
		console.log("Logged Out");
	}
})

export default firebase;