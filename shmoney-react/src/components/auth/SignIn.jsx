import React, { Component } from 'react'
import firebase from './firebase'

class SignIn extends Component {
	state = {
		email: '',
		password: '',
	}
	handleChange = (e) => {
		this.setState({
			//Using id from HTML, updates value of email/password
			[e.target.id]: e.target.value
		})
	}
	emailSignIn = (e) => {
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;

		firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
			//TODO Route to home page
		}).catch(error => {
			//Todo Handle errors
			let errorCode = error.code;
			let errorMessage = error.message;
			console.log(errorCode, errorMessage);
		})
	}
	googleSignIn = () => {
		//Get instance of google provider object
		let provider = new firebase.auth.GoogleAuthProvider();

		//Sign in using google popup
		firebase.auth().signInWithPopup(provider).then((result) => {
			// The signed-in user info.
			let user = result.user;
			//Create document with user info from google if the user is new, updates info otherwise
			firebase.firestore().collection("users").doc(user.uid).set({
				name: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
			})
			//TODO Route to home page
		}).catch(error => {
			// TODO Handle errors
			let errorCode = error.code;
			let errorMessage = error.message;
			// The email of the user's account used.
			let email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			let credential = error.credential;

			console.log(errorCode, errorMessage, email, credential);
		});
	}
	render() {
		return (
			<div className="container">
				<form onSubmit={this.emailSignIn} className="white">
					<h5 className="signInH5">Sign In</h5>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange}/>
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange}/>
					</div>
					<div className="input-field">
						<button className="button">Login</button>
					</div>
				</form>
				<button onClick={this.googleSignIn} className="button">Google</button>
			</div>
		)
	}
}

export default SignIn
