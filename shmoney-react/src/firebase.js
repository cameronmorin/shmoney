import firebase from "firebase"

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

export default firebase;