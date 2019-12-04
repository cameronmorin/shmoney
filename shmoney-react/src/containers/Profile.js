import React, { useState, useInput } from 'react';
import NavBar from '../components/NavBar';
import { Card, Table, Accordion, Figure, Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import avatar from '../images/avatar.png';
import '../styles/Profile.css';
import { withAuthorization, withAuthUserContext } from '../components/session';
import { withFirebase } from '../components/firebase';

import UploadImage from '../components/UploadImage';
import CreateBill from '../components/CreateBill';

const EditName = ({ firebase, onChangeGroupId, onChangeGroupMembers, onChangeIsGroupOwner }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [name, setName] = useState('');

	const onSubmit = event => {
		event.preventDefault();

		firebase.updateUsername(name, onChangeGroupId, onChangeGroupMembers, onChangeIsGroupOwner).then(() => {
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

const UpdatePhoto = () => {
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

const PaymentsTable = ({onChangePaymentHistory}) => {
	if(!onChangePaymentHistory) return <></>;

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>House Name</th>
						<th>Payment Date</th>
						<th>Payment Amount</th>
					</tr>
				</thead>
				{onChangePaymentHistory.length > 0 && <tbody>
					<tr>
						<td>{onChangePaymentHistory[0].group_name}</td>
						<td>{onChangePaymentHistory[0].payment_time.toLocaleString()}</td>
						<td>{onChangePaymentHistory[0].payment_amount}</td>
					</tr>
				</tbody>}
			</Table>
		</>
	);
};

const RightAccordion = ({ onChangeGroupMembers }) => {
	return (
		<>
			<Accordion defaultActiveKey="0">
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							<h1>Total spent in 2019</h1>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							{' '}
							<h1>$12000</h1>{' '}
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="1">
							<h1>Current House Members</h1>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="1">
						<Card.Body>
							{onChangeGroupMembers &&
								onChangeGroupMembers.map((item, key) => <p key={key}>{item.username}</p>)}
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="2">
							<h1>Last Payment Made</h1>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="2">
						<Card.Body>
							<PaymentsTable />
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
};

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			groupMembers: null,
			groupName: null,
			groupId: null,
			isNotGroupMember: false,
			isGroupMember: false,
			isGroupOwner: false,
		};
	}
	componentDidMount() {
		const authUser = this.props.authUser;
		const groupState = this.props.groupState;
		//Ensures that if the groupState is delayed in being updated
		//then it will be updated properly
		if (!groupState.groupName) {
			setTimeout(() => {
				//Start Timer
				const authUser = this.props.authUser;
				const groupState = this.props.groupState;
				const isGroupOwner = authUser.uid === groupState.ownerUid;

				this.setState({
					groupMembers: groupState.groupMembers,
					groupName: groupState.groupName,
					isNotGroupMember: groupState.isNotGroupMember,
					isGroupMember: groupState.isGroupMember,
					isGroupOwner,
					groupId: groupState.groupId,
					ownerUid: groupState.ownerUid,
				});
			}, 700);
		} else {
			const isGroupOwner = authUser.uid === groupState.ownerUid;

			this.setState({
				groupMembers: groupState.groupMembers,
				groupName: groupState.groupName,
				groupId: groupState.groupId,
				isNotGroupMember: groupState.isNotGroupMember,
				isGroupMember: groupState.isGroupMember,
				isGroupOwner,
			});
		}
	}
	render() {
		const authUser = this.props.authUser;

		return (
			<div>
				<NavBar
					onClickHome={this.props.onClickHome}
					onClickMenu={this.props.onClickMenu}
					onClickLogout={this.props.onClickLogout}
					onClickAvatar={this.props.onClickAvatar}
					currPage="Profile"
				/>
				<div className="main-grid">
					<div className="left-grid">
						<h1>Welcome, {authUser.displayName}</h1>
						<Figure>
							<Figure.Image
								rounded
								width={140}
								height={1}
								alt="user"
								src={authUser.photoURL ? authUser.photoURL : avatar}
							/>
						</Figure>
						<UpdatePhoto />
						<EditName
							firebase={this.props.firebase}
							onChangeGroupId={this.state.groupId}
							onChangeGroupMembers={this.state.groupMembers}
							onChangeIsGroupOwner={this.state.isGroupOwner}
						/>
					</div>

					<div className="right-grid">
						<RightAccordion onChangeGroupMembers={this.state.groupMembers} />
					</div>
				</div>
			</div>
		);
	}
}

const signedInRoute = true;

const profilePage = withAuthUserContext(Profile);

export default withFirebase(withAuthorization(signedInRoute)(profilePage));
