import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../firebase'
import { compose } from 'recompose';

class SignInGoogleBase extends Component {
	constructor(props) {
		super(props);

		this.state = { error: null };
	}
	onSubmit = event => {
		event.preventDefault();

		this.props.firebase.signInWithGoogle().then(result => {
			let authUser = result.user;
			let isNewUser = result.additionalUserInfo.isNewUser;
			//Check if new user before creating firestore document
			return this.props.firebase.user(authUser.uid).set({
				username: authUser.displayName,
				email: authUser.email,
				roles: {},
			},{ merge:true })
		}).then(() => {
			this.setState({ error: null });
			this.props.history.push('/home');
		}).catch(error => {
			this.setState({ error })
		});
	}
	render() {
		const { error } = this.state
		return (
			<form onSubmit={this.onSubmit}>
				<button type="submit">Sign In with Google</button>

				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const SignInGoogle = compose(
	withRouter,
	withFirebase
)(SignInGoogleBase)

export default SignInGoogle;
