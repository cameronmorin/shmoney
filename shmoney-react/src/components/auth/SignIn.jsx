import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { SignUpLink } from './SignUp'
import { withFirebase } from '../firebase'

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

		}).catch(error => {
			this.setState({ error });
		});
	}
	render() {
		const { email, password, error } = this.state;

		const isInvalid = email === '' || password === '';

		return(
			<form onSubmit={this.onSubmit}>
				<div className="input-field">
					<input 
						type="email"
						name="email"
						value={email}
						onChange={this.onChange}
						placeholder="Email Address"
					/>
				</div>
				<div className="input-field">
					<input 
						type="password"
						name="password"
						value={password}
						onChange={this.onChange}
						placeholder="Password"
					/>
				</div>
				<div className="sign-up-buttons">
					<button type="submit" disabled={isInvalid}>Sign In</button>
					<button type="button" onClick={this.googleSignIn}>Google</button>
				</div>

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
		<div>
			<h1>Sign In</h1>
			<SignInForm/>
			<SignUpLink/>
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