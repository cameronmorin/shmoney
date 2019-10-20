import React, { Component } from 'react'
import firebase from './firebase'

class SignUp extends Component {
	state = {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	}
	handleChange = (e) => {
		this.setState({
			//Using id from HTML, updates value of email/password
			[e.target.id]: e.target.value
		})
	}
	emailSignUp = (e) => {
		e.preventDefault();
		//Get user information
		const email = this.state.email;
		const password = this.state.password;
		const firstName = this.state.firstName;
		const lastName = this.state.lastName;
		
		//Create new user
		firebase.auth().createUserWithEmailAndPassword(email, password).then(credential => {
			firebase.firestore().collection("users").doc(credential.user.uid).set({
				firstName: firstName,
				lastName: lastName,
				email: email,
			})
		}).catch(error => {
			//TODO Output the error message on screen for user to see
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
			
			console.log(user)
			//TODO Route to home page
		}).catch(function(error) {
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
				<form onSubmit={this.emailSignUp} className="white">
					<h5 className="signUpH5">Sign Up</h5>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange}/>
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange}/>
					</div>
					<div className="input-field">
						<label htmlFor="firstName">First Name</label>
						<input type="text" id="firstName" onChange={this.handleChange}/>
					</div>
					<div className="input-field">
						<label htmlFor="lastName">Last Name</label>
						<input type="text" id="lastName" onChange={this.handleChange}/>
					</div>
					<div className="input-field">
						<button className="button">Sign Up</button>
					</div>
				</form>
				<button onClick={this.googleSignIn} className="button">Google</button>
			</div>
		)
	}
}

export default SignUp