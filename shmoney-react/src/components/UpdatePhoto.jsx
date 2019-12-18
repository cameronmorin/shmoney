import React, { useState, useContext } from 'react';

import { AuthUserContext } from './session';
import { FirebaseContext } from '../components/firebase';

const UploadImage = () => {
	const [image, setImage] = useState(null);
	const [imageSelectFailure, setImageSelectFailure] = useState(false);
	const [error, setError] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');

	const authContext = useContext(AuthUserContext);
	const firebase = useContext(FirebaseContext)
	const authState = authContext.state;

	const authUser = authState.authUser;

	const handleChange = event => {
		const maxAllowedSize = 1 * 1024 * 1024;
		const file = event.target.files[0];

		if (file && file.size <= maxAllowedSize) {
			setImage(file);
			setImageSelectFailure(false);
		}
		if (file && file.size > maxAllowedSize) {
			const errorMessage = 'Picture too large. (Max 1024x1024)';
			setErrorMessage(errorMessage);
			setImageSelectFailure(true);
		}
	}

	const handleUpload = () => {
		firebase.storageRef.child(`profilePictures/${authUser.uid}`).put(image).then(() => {
			firebase.storageRef.child(`profilePictures/${authUser.uid}`).getDownloadURL().then(url => {
				authUser.updateProfile({ photoURL: url });
				authUser.photoURL = url;

				return firebase.user(authUser.uid).set({
					photoURL: url
				},{merge:true}).then(() => {
					authState.onAuthUserUpdate(authUser);
					props.closeModal();
				});
			}).catch(error => {
				setError(error);
			});
		}).catch(error => {
			setError(error);
		});
	}

	return (
		<div className="upload-image">
			<input 
				type="file" 
				className="picture-select"
				onChange={handleChange}
				accept="image/x-png,image/jpeg"
			/>
			{imageSelectFailure &&
				<div className="image-select-failure-div">
					<p className="image-select-failture-message">
						{errorMessage}
					</p>
				</div>
			}
			<button 
				className="upload-image-button"
				onClick={handleUpload}
				disabled={!image}
			>
				Upload Image
			</button>
			<div className="error-message">
				{error && <p>{error.message}</p>}
			</div>
		</div>
	)
}

export default UploadImage;
