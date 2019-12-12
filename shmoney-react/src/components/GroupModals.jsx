import React, { useContext, useState, Component } from 'react'

import AuthUserContext from './session/context'
import FirebaseContext from './firebase/context'

import {
	ToggleButton,
	ToggleButtonGroup,
	Figure,
	Table,
	Accordion,
	Card,
	Button,
	Modal,
	InputGroup,
	Media,
} from 'react-bootstrap';
import '../styles/MyGroup.css';
import avatar from '../images/avatar.png';

import NavBar from './NavBar';
import CreateGroup from './CreateGroup';
import SearchUsers from './SearchUsers';
import CreateBill from './CreateBill';

const AddBill = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Add Bills
			</Button>
			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Add Bills</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CreateBill />
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

const AddMembers = () => {
	const [show, setShow] = useState(false);

	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;
	const onGroupListUpdate = authState.onGroupListUpdate;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Add Members
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Add Members</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<SearchUsers
						onGroupListUpdate={onGroupListUpdate}
					/>
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

const DeleteMembers = () => {
	const [show, setShow] = useState(false);

	const authContext = useContext(AuthUserContext);
	const firebase = useContext(FirebaseContext);
	const authState = authContext.state;

	const groupMembers = authState.groupMembers;
	const ownerUid = authState.ownerUid;
	const groupId = authState.groupId;
	const onGroupListUpdate = authState.onGroupListUpdate;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const removeUser = uid => {
		firebase.removeUserFromGroup(uid, groupId).then(() => {
			firebase.getHouseGroupData().then(result => {
				const groupMembers = result.group_members;
				onGroupListUpdate(groupMembers);
			});
		}).catch(error => {
			console.error(error);
		});
	};

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Delete Members
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Members</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<ul className="list-group">
							{groupMembers.map((index, key) => (
								<div key={key}>
									{index.uid !== ownerUid && 
									<li className="list-group-item" style={{ display: "flex", justifyContent: "space-between" }} key={key}>
										<span className="align-items-center mx-2" style={{ margin: "auto" }}>{index.username}</span>
										<Button variant="outline-secondary" onClick={() => removeUser(index.uid)}>Delete</Button>
									</li>}
								</div>
							))}
						</ul>
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

const TransferOwnership = () => {
	const [show, setShow] = useState(false);

	const authContext = useContext(AuthUserContext);
	const firebase = useContext(FirebaseContext);
	const authState = authContext.state;

	const groupMembers = authState.groupMembers;
	const ownerUid = authState.ownerUid;
	const groupId = authState.groupId;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onlyMembers = groupMembers.filter((user) => user.uid !== ownerUid);

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Transfer Ownership
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Pick New Owner</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{onlyMembers.length === 0 && (
						<h5 style={{ textAlign: 'center', color: 'gray' }}>No Group Member to Promote.</h5>
					)}

					{onlyMembers.length > 0 && (
						<ul className="list-group">
							{onlyMembers.map((item, key) => (
								<li className="list-group-item" key={key}>
									<Media>
										<Media.Body>
											<h5>{item.username}</h5>
											<Button
												variant="primary"
												onClick={() =>
													firebase
														.updateGroupOwner(item.uid, item.username, groupId)
														.then(() => {
															window.location.reload();
														})
														.catch(err => {
															alert('Error : ' + err);
															window.location.reload();
														})
												}
											>
												Make Owner
											</Button>
										</Media.Body>
									</Media>
								</li>
							))}
						</ul>
					)}
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

const DeleteGroup = () => {
	const [show, setShow] = useState(false);

	const authContext = useContext(AuthUserContext);
	const firebase = useContext(FirebaseContext);
	const authState = authContext.state;

	const groupId = authState.groupId;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const deleteGroup = () => {
		firebase.deleteHouseGroup(groupId).then(() => {
			window.location.reload();
		});
	};

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Delete Group
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Button variant="secondary" onClick={deleteGroup}>
						Confirm
					</Button>
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

const LeaveGroup = () => {
	const [show, setShow] = useState(false);

	const authContext = useContext(AuthUserContext);
	const firebase = useContext(FirebaseContext);
	const authState = authContext.state;

	const authUser = authState.authUser;
	const groupId = authState.groupId;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const leaveGroup = () => {
		firebase.removeUserFromGroup(authUser.uid, groupId).then(() => {
			window.location.reload();
		});
	};

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Leave Group
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Button variant="secondary" onClick={leaveGroup}>
						Confirm
					</Button>
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

export { 
	AddBill, 
	AddMembers, 
	DeleteMembers, 
	TransferOwnership, 
	DeleteGroup,
	LeaveGroup
};
