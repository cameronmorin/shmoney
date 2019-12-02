import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { withFirebase } from './firebase'
import { compose } from 'recompose';
import { withAuthorization, withAuthUserContext } from './session';

class UploadImageBase extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image: null,
			imageSelectFailure: false,
			errorMessage: '',
			url: '',
			error: null
		}
	}
	componentDidUpdate() {
		const {url} = this.state;
		if(url) window.location.reload();
	}
	handleChange = event => {
		const maxAllowedSize = 1 * 1024 * 1024;
		const file = event.target.files[0];
		if(file && file.size <= maxAllowedSize) {
			const image = file;
			this.setState({ image: image, imageSelectFailure: false });
		}
		if(file && file.size > maxAllowedSize) {
			const errorMessage = 'Picture too large. (Max 1024x1024)'
			this.setState({ imageSelectFailure: true, errorMessage: errorMessage})
		}
	}
	handleUpload = () => {
		let authUser = this.props.authUser;
		const {image} = this.state;

		this.props.firebase.storageRef.child(`profilePictures/${authUser.uid}`).put(image).then(() => {
			this.props.firebase.storageRef.child(`profilePictures/${authUser.uid}`).getDownloadURL().then(url => {
				//Update the authUser's photo url
				authUser.updateProfile({photoURL: url});
				//Update photoURL in user's firestore document
				return this.props.firebase.user(authUser.uid).set({
					photoURL: url
				},{merge:true}).then(() => {
					this.setState({url: url});
				});
			}).catch(error => {
				this.setState({error});
			});
		}).catch(error => {
			this.setState({error});
		});
	}
	render() {
		const {image, imageSelectFailure, errorMessage, error} = this.state;
		return (
			<div className ="upload-image">
				<input className="picture-select" onChange={this.handleChange} type="file" accept="image/x-png,image/jpeg" />
				{imageSelectFailure ? 
					<div className="image-select-failure-div">
						<p className="image-select-failure-message">{errorMessage}</p> 
					</div>
					: null
				}
				<button className="upload-image-button" onClick={this.handleUpload} disabled={!image}>Upload Image</button>
				<div className="error-message">
					{error && <p>{error.message}</p>}
				</div>
			</div>
		);
	}
}

const UploadImage = compose(
	withFirebase,
	withAuthUserContext,
	withRouter
)(UploadImageBase)

const signInRoute = true;

export default withAuthorization(signInRoute)(UploadImage);
