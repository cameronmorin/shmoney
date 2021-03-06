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

		const defaultPhotoUrl = 'https://firebasestorage.googleapis.com/v0/b/shmoney-617ec.appspot.com/o/profilePictures%2FDefault-Profile.png?alt=media&token=a16fcc18-d04c-43d4-a64c-7f676a089889';

		this.props.firebase.signInWithGoogle().then(result => {
			let authUser = result.user;
			//Update authUser with default photoURL if they don't have one
			authUser.updateProfile({ photoURL: authUser.photoURL ? authUser.photoURL : defaultPhotoUrl });
			let isNewUser = result.additionalUserInfo.isNewUser;
			//Check if new user before creating firestore document
			if(isNewUser) {
				return this.props.firebase.user(authUser.uid).set({
					username: authUser.displayName,
					email: authUser.email,
					uid: authUser.uid,
					photoURL: authUser.photoURL ? authUser.photoURL : defaultPhotoUrl,
					group_id: null
				},{ merge:true })
			} else {
				return
			}
			
		}).then(() => {
			this.setState({ error: null });
			this.props.history.push('/');
		}).catch(error => {
			this.setState({ error })
		});
	}
	render() {
		const {error} = this.state
		return (
			<form onSubmit={this.onSubmit}>
				<div className="google-sign-in-button">
					<button type="submit">Sign In with Google</button>
				</div>
				<div className="error-message">
					{error && <p>{error.message}</p>}
				</div>
			</form>
		);
	}
}

const SignInGoogle = compose(
	withRouter,
	withFirebase
)(SignInGoogleBase)

export default SignInGoogle;
