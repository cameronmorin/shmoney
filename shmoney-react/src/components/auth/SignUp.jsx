import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose';

import { SignInLink } from './SignIn'
import { withFirebase } from '../firebase'

const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null,
};

class SignUpFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}
	onSubmit = event => {
		event.preventDefault();

		const { username, email, passwordOne } = this.state;

		this.props.firebase.createUserWithEmailAndPassword(email, passwordOne).then(credential => {
			//Get authUser from credential
			let authUser = credential.user;
			//Update authUser displayName with username
			authUser.updateProfile({displayName: username});
			//Send varification email
			authUser.sendEmailVerification().then(() => {
				//TODO: Display message that user needs to check email to verify
				console.log('Verification Email Sent');
			}).catch(error => {
				this.setState({ error });
			});
			this.setState({ ...INITIAL_STATE });
			this.props.history.push('/home');
		}).catch(error => {
			this.setState({ error });
		});
	}
	googleSignIn = () => {
		this.props.firebase.signInWithGoogle().then(result => {
			let authUser = result.user;
			let isNewUser = result.additionalUserInfo.isNewUser;
			//Check if new user before creating firestore document
			if(isNewUser) {
				//TODO: Update database
			}
			this.setState({ ...INITIAL_STATE });
			this.props.history.push('/home');
		}).catch(error => {
			this.setState({ error })
		});
	}
	render() {
		const {
			username,
			email,
			passwordOne,
			passwordTwo,
			error
		} = this.state;

		const isInvalid = //True if any fields are invalid
			username === '' || email === '' || 
			passwordOne !== passwordTwo || passwordOne === '';

		return (
			<form onSubmit={this.onSubmit}>
				<div className="input-field">
					<input 
						type="text"
						name="username"
						value={username}
						onChange={this.onChange}
						placeholder="Username"
					/>
				</div>
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
						name="passwordOne"
						value={passwordOne}
						onChange={this.onChange}
						placeholder="Password"
					/>
				</div>
				<div className="input-field">
					<input 
						type="password"
						name="passwordTwo"
						value={passwordTwo}
						onChange={this.onChange}
						placeholder="Confirm Password"
					/>
				</div>
				<div className="sign-up-buttons">
					<button type="submit" disabled={isInvalid}>Sign Up</button>
					<button type="button" onClick={this.googleSignIn}>Google</button>
				</div>

				{/* Handle Errors */}
				<div className="error-message">
					{error && <p>{error.message}</p>}
				</div>
			</form>
		)
	}
}

const SignUpPage = () => {
	return(
		<div>
			<h1>Sign Up</h1>
			<SignUpForm/>
			<SignInLink/>
		</div>
	);
};

const SignUpLink = () => {
	return(
		<p>
			Don't have an account? <Link to='/signup'>Sign Up</Link>
		</p>
	);
};

//Make component a FirebaseContext Consumer and Router Consumer
const SignUpForm = compose(
	withRouter,
	withFirebase
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink }
