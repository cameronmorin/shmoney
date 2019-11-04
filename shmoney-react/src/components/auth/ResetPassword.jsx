import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose';
import { withFirebase } from '../firebase';

class ResetPasswordBase extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: ''
		}
	}
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}
	onSubmit = event => {
		event.preventDefault();
		const email = this.state.email;

		this.props.firebase.passwordReset(email).then(() => {
			console.log(`Password reset sent to ${email}`);
			this.props.history.push('/signIn');
		}).catch(error => {
			console.log(error);
		});
	}
	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div className="input-field">
					<input
						type="email"
						name="email"
						value={email}
						onChange={this.onChange}
						placeholder="email"
					/>
				</div>
				<div className="reset-password-button">
					<button type="submit">Reset Password</button>
				</div>
			</form>
		);
	}
}

const ResetPassword = compose(
	withFirebase,
	withRouter
)(ResetPasswordBase)

export default ResetPassword;
