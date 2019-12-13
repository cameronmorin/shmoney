import React, { useState, useContext } from 'react';

import { Button, Modal, InputGroup } from 'react-bootstrap';
import '../styles/Profile.css';

import { AuthUserContext } from '../components/session';
import { FirebaseContext } from '../components/firebase';

import UploadImage from './UploadImage';

const UpdatePhotoModal = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Update Profile Image
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Update Profile Image</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<UploadImage />
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

const EditNameModal = () => {
	const [show, setShow] = useState(false);

	const authContext = useContext(AuthUserContext);
	const firebase = useContext(FirebaseContext);
	const authState = authContext.state;

	const groupId = authState.groupId;
	const groupMembers = authState.groupMembers;
	const isGroupOwner = authState.isGroupOwner;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [name, setName] = useState('');

	const onSubmit = event => {
		event.preventDefault();

		firebase.updateUsername(name, groupId, groupMembers, isGroupOwner).then(() => {
			window.location.reload();
		});
	};

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Update Username
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Update Username</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={onSubmit}>
						<input type="text" value={name} onChange={e => setName(e.target.value)} />
						<Button type="submit" variant="secondary">
							Update
						</Button>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export { UpdatePhotoModal, EditNameModal }
