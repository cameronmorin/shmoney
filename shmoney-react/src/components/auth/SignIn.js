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
	handleSubmit = (e) => {
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;

		firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
			//Todo Output the error message on screen for user to see
			let errorCode = err.code;
			let errorMessage = err.message;
			console.log(errorCode, errorMessage);
		})
	}
	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
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
				
			</div>
		)
	}
}

export default SignIn
