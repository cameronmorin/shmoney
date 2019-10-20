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
	handleSubmit = (e) => {
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
		}).catch(err => {
			//TODO Output the error message on screen for user to see
			let errorCode = err.code;
			let errorMessage = err.message;
			console.log(errorCode, errorMessage);
		})
	}
	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
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
			</div>
		)
	}
}

export default SignUp