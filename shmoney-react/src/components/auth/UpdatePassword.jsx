import React, { Component } from 'react'
import { withAuthUserContext, withAuthentication } from '../session'

class UpdatePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newPassword: ''
		}
	}
	onSubmit = event => {
		event.preventDefault();

		const {newPassword} = this.state;
		const authUser = this.props.authUser;

		authUser.updatePassword(newPassword);
	}
	render() {
		const {newPassword} = this.state;
		let isInvalid = newPassword === '';
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="universal-padding-3">
						New Password:
					</div>
					<input
						type="text"
						name="newPassword"
						value={newPassword}
						onChange={this.onChange}
						placeholder=""
						id="rounded-corner-input"
					/>

					<button type="submit" disabled={isInvalid}>Search</button>
				</form>
			</div>
		)
	}
}

const signedInRoute = true;

export default withAuthUserContext(withAuthentication(signedInRoute)(UpdatePassword));
