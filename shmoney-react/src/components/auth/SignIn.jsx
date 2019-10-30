import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import SignInGoogle from './SignInGoogle'
import { SignUpLink } from './SignUp'
import { withFirebase } from '../firebase'

import '../../styles/SignInBox.css';

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null
}

class SignInFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}
	onSubmit = event => {
		event.preventDefault();

		const { email, password } = this.state;

		this.props.firebase.signInWithEmailAndPassword(email, password).then(() => {
			this.setState({ ...INITIAL_STATE });
		}).catch(error => {
			this.setState({ error });
		});
	}
	signOut = () => {
		this.props.firebase.signOut();
	}
	render() {
		const { email, password, error } = this.state;

		const isInvalid = email === '' || password === '';

		return(
			<form onSubmit={this.onSubmit}>
				<div className="input-field">
					<div className = "universal-padding-3">
						Email Address:
					</div>
					<input 
						type="email"
						name="email"
						value={email}
						onChange={this.onChange}
						placeholder=""
						id = "modified-input-box"
					/>
				</div>
				<div className="input-field">
					<div className = "universal-padding-3">
						Password:
					</div>
					<input 
						type="password"
						name="password"
						value={password}
						onChange={this.onChange}
						placeholder=""
						id = "modified-input-box"
					/>
				</div>
				<div className = "universal-padding-10"></div>
				<button type="submit" disabled={isInvalid}>Sign In</button>
				<button onClick	={this.signOut}>Sign Out</button>	
				<div className = "universal-padding-10"></div>

				{/* Handle Errors */}
				<div className="error-message">
					{error && <p>{error.message}</p>}
				</div>
			</form>
		);
	}
}

const SignInPage = () => {
	return(
		<div className = "signin-box">
		<div className = "sign-in-background">
			<h1>$ign In</h1>
			<SignInForm />
			<SignInGoogle />
			<SignUpLink />
		</div>
		</div>
	);
}

const SignInLink = () => {
	return(
		<p>
			Already have an account? <Link to='/signin'>Sign In</Link>
		</p>
	);
}

const SignInForm = compose(
	withRouter,
	withFirebase
)(SignInFormBase);

export default SignInPage

export { SignInForm, SignInLink };