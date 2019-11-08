import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose';
import { withFirebase } from '../firebase';

import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';

class ResetPasswordBase extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			visible: false,
			error: null,
			successMessage: ''
		}
	}
	toggleModal = () => {
		this.setState({email: '', visible: !this.state.visible, error: null});
	}
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}
	onSubmit = event => {
		event.preventDefault();
		const email = this.state.email;

		this.props.firebase.passwordReset(email).then(() => {
			console.log(`Password Reset Sent To: ${email}`);
			this.setState({ successMessage: `Password Reset Sent To: ${email}`});
		}).catch(error => {
			this.setState({error})
		});
	}
	render() {
		const {email, error, successMessage} = this.state;
		
		return (
			<div>
				<Button variant="link" onClick={this.toggleModal}>Forgot Password</Button>
				<Modal show={this.state.visible}>
					<Modal.Header>Send Password Reset Email</Modal.Header>
					<ModalBody>
						<div className="input-field">
							<input
								type="email"
								className="email"
								value={email}
								onChange={this.onChange}
								placeholder="email"
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<div className="error-message">
							{error && <p>{error.message}</p>}
						</div>
						<div>
							{successMessage && <p>{successMessage}</p>}
						</div>
						<Button className="cancel-button" variant="danger" onClick={this.toggleModal}>Cancel</Button>
						<Button className="reset-password-button" variant="dark" onClick={this.onSubmit}>Reset Password</Button>
					</ModalFooter>
				</Modal>
			</div>

		);
	}
}

const ResetPassword = compose(
	withFirebase,
	withRouter
)(ResetPasswordBase)

export default ResetPassword;
