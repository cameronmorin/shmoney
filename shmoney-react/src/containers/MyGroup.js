import React, { useState } from 'react';
import { compose } from 'recompose';

import NavBar from '../components/NavBar';
import '../styles/MyGroup.css';

import { ToggleButton, ToggleButtonGroup, Figure, Table, Accordion, Card, Button, Modal, InputGroup, FormControl, ListGroup, Media } from 'react-bootstrap';
import { withAuthorization, withAuthUserContext } from '../components/session';

import { withFirebase } from '../components/firebase';

import CreateGroup from '../components/CreateGroup';
import SearchUsers from '../components/SearchUsers';
import CreateBill from '../components/CreateBill';

const AddMembers = ({onGroupListUpdate, onLocalGroupListUpdate}) => {
	const [show, setShow] = useState(false);

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
						onLocalGroupListUpdate={onLocalGroupListUpdate} />
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
					{/* <InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text>$</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl aria-label="Amount (to the nearest dollar)" />
						<InputGroup.Append>
							<InputGroup.Text>.00</InputGroup.Text>
						</InputGroup.Append>
					</InputGroup> */}
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

const DeleteMembers = ({onChangeGroupId, onChangeGroupMembers, onChangeOwnerUid, firebase, onGroupListUpdate, onLocalGroupListUpdate}) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const removeUser = uid => {
		firebase.removeUserFromGroup(uid, onChangeGroupId).then(() => {
			firebase.getHouseGroupData().then(result => {
				const groupMembers = result.group_members;
				onGroupListUpdate(groupMembers);
				onLocalGroupListUpdate(groupMembers);
			});
		}).catch(error => {
			console.log(error);
		})
	}

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
						<ul>
							{onChangeGroupMembers.map((index, key) => (
								<div key={key}>
								{index.uid !== onChangeOwnerUid && <li key={key}>
									{index.username}
									<Button variant="outline-secondary" onClick={() => removeUser(index.uid)}>Delete</Button>
								</li>}
								</div>
							))}
						</ul>
						{/* <InputGroup.Append>
							<Button variant="outline-secondary">Delete</Button>
						</InputGroup.Append> */}
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

const DeleteGroup = ({ firebase, onChangeGroupId }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const deleteGroup = () => {
		firebase.deleteHouseGroup(onChangeGroupId).then(() => {
			window.location.reload();
		});
	}

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
					<Button variant="secondary" onClick={deleteGroup}>Confirm</Button>
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

const LeaveGroup = ({ firebase, onChangeGroupId, currentUser }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const leaveGroup = () => {
		firebase.removeUserFromGroup(currentUser.uid, onChangeGroupId).then(() => {
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

/*
const ViewLedger = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				View Ledger
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>View Ledger</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ListGroup>
						<ListGroup.Item variant="danger">Late - 01/01/2019 - $2000</ListGroup.Item>
						<ListGroup.Item>On Time - 02/01/2019 - $1000</ListGroup.Item>
						<ListGroup.Item>On Time - 03/01/2019 - $1000</ListGroup.Item>
						<ListGroup.Item>On Time - 04/01/2019 - $1000</ListGroup.Item>
						<ListGroup.Item variant="warning">On Time Overpaid - 05/01/2019 - $1005</ListGroup.Item>
					</ListGroup>
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
*/

const CreateGroupModal = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Create Group
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Create Group</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<CreateGroup />
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

const PaymentsTable = () => {
	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>House Name</th>
						<th>Payment Date</th>
						<th>Payment Amount</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Cool House</td>
						<td>11/11/19</td>
						<td>$1000</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Cool House</td>
						<td>12/11/19</td>
						<td>$1000</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Cool House</td>
						<td>1/11/20</td>
						<td>$1000</td>
					</tr>
				</tbody>
			</Table>
		</>
	);
};

const CurrentBillsTable = () => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const [value, setValue] = useState([1, 2]);

	/*
	 * The second argument that will be passed to
	 * `handleChange` from `ToggleButtonGroup`
	 * is the SyntheticEvent object, but we are
	 * not using it in this example so we will omit it.
	 */
	const handleChange = val => setValue(val);

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>House Name</th>
						<th>Due Date</th>
						<th>Bill Amount</th>
						<th>On Time?</th>
						<th>Verify Button</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Cool House</td>
						<td>11/11/19</td>
						<td>$1000</td>
						<td>Yes/No</td>
						<td><Button className="billsbtn" variant="warning" onClick={handleShow}>Verify</Button></td>
					</tr>
					<tr>
						<td>2</td>
						<td>Cool House</td>
						<td>12/11/19</td>
						<td>$1000</td>
						<td>Yes/No</td>
						<td><Button className="billsbtn" variant="warning" onClick={handleShow}>Verify</Button></td>
					</tr>
					<tr>
						<td>3</td>
						<td>Cool House</td>
						<td>1/11/20</td>
						<td>$1000</td>
						<td>Yes/No</td>
						<td><Button className="billsbtn" variant="warning" onClick={handleShow}>Verify</Button></td>
					</tr>
				</tbody>
			</Table>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Verify Payment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Paid on time?</p>
					<ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
						<ToggleButton value={1}>Yes</ToggleButton>
						<ToggleButton value={2}>No</ToggleButton>
					</ToggleButtonGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

const TransferOwnership = ({ groupMembers, currentOwnerID, firebase, groupId }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	var onlyMembers = groupMembers.filter(function notOwner(user) {
		return user.uid !== currentOwnerID;
	});

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
					{onlyMembers.length === 0 && <h5 style={{textAlign: "center", color: "gray"}}>No Group Member to Promote.</h5>}

					{onlyMembers.length > 0 && <ul className="list-group">{onlyMembers.map((item, key) => (
						<li className="list-group-item"key={key}>
							<Media>
								<Media.Body>
									<h5>{item.username}</h5>
									<Button variant="primary" onClick={() => firebase.updateGroupOwner(item.uid, item.username, groupId).then(event => {window.location.reload();})}>
										Make Owner
									</Button>
								</Media.Body>
							</Media>
						</li>
					))
					}</ul>}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
const RightInfo = ({ onChangeGroupMembers, onChangeCurrentBill }) => {
	return (
		<>
			<Accordion defaultActiveKey="0">
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							<h1>Group Members</h1>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							{onChangeGroupMembers &&
								onChangeGroupMembers.map((item, key) => <p key={key}>{item.username}</p>)}
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="1">
							<h1>View Current Bills</h1>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="1">
						<Card.Body>
							<div className="curBills">
								<CurrentBillsTable as={Button} />
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="2">
							<h1>Payment History</h1>
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

class MyGroupBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			groupMembers: null,
			groupName: null,
			isNotGroupMember: false,
			isGroupMember: false,
			isGroupOwner: false,
			groupId: null,
			ownerUid: null,
			currentBill: null
		};
	}
	componentDidMount() {
		const authUser = this.props.authUser;
		const groupState = this.props.groupState;
		//Ensures that if the groupState is delayed in being updated 
		//then it will be updated properly
		if(!groupState.groupName) {
			setTimeout(() => { //Start Timer
				const authUser = this.props.authUser;
				const groupState = this.props.groupState;
				const isGroupOwner = authUser.uid === groupState.ownerUid;
				
				this.updateCurrentBill(groupState.currentBillId, groupState.bills);

				this.setState({
					groupMembers: groupState.groupMembers,
					groupName: groupState.groupName,
					isNotGroupMember: groupState.isNotGroupMember,
					isGroupMember: groupState.isGroupMember,
					isGroupOwner,
					groupId: groupState.groupId,
					ownerUid: groupState.ownerUid,
				});
			}, 800);	
		} else {
			const isGroupOwner = authUser.uid === groupState.ownerUid;

			this.updateCurrentBill(groupState.currentBillId, groupState.bills);

			this.setState({
				groupMembers: groupState.groupMembers,
				groupName: groupState.groupName,
				isNotGroupMember: groupState.isNotGroupMember,
				isGroupMember: groupState.isGroupMember,
				isGroupOwner,
				groupId: groupState.groupId,
				ownerUid: groupState.ownerUid
			});
		}
	}
	updateCurrentBill = (currentBillId, bills) => {
    for(let item in bills) {
      if(bills[item].doc_id === currentBillId) {
        this.setState({currentBill: bills[item]});
      }
    }
  }
	updateMembersList = groupMembers => {
		//Update the group members list with updated list
		this.setState({groupMembers});
	}

	render() {
		const authUser = this.props.authUser;
		return (
			<div>
				<NavBar
					onLoad={this.props.onLoad}
					onClickHome={this.props.onClickHome}
					onClickLogout={this.props.onClickLogout}
					onClickAvatar={this.props.onClickAvatar}
					displayName={authUser.displayName}
				/>
				<div className="main-grid">
					<div className="left-grid">
						<h1>{this.state.groupName}</h1>
						<Figure>
							<Figure.Image
								rounded
								width={180}
								height={1}
								alt="user"
								src="https://img.icons8.com/bubbles/2x/home.png"
							/>
						</Figure>
						{this.state.isGroupMember && <AddBill />}
						{this.state.isGroupOwner && <AddMembers 
							onGroupListUpdate={this.props.groupState.onGroupListUpdate}
							onLocalGroupListUpdate={this.updateMembersList} />}
						{this.state.isGroupOwner && <DeleteMembers 
							onChangeGroupId={this.state.groupId} 
							onChangeGroupMembers={this.state.groupMembers} 
							onChangeOwnerUid={this.state.ownerUid} 
							firebase={this.props.firebase}
							onGroupListUpdate={this.props.groupState.onGroupListUpdate}
							onLocalGroupListUpdate={this.updateMembersList} />}
						
						{this.state.isNotGroupMember && <CreateGroupModal />}
						{this.state.isGroupOwner && <TransferOwnership 
							groupMembers={this.state.groupMembers}
							currentOwnerID={this.state.ownerUid}
							firebase={this.props.firebase} 
							groupId={this.state.groupId} />}
						{this.state.isGroupOwner && <DeleteGroup 
							firebase={this.props.firebase}
							onChangeGroupId={this.state.groupId} />}
						{this.state.isGroupMember && !this.state.isGroupOwner && <LeaveGroup 
							firebase={this.props.firebase}
							onChangeGroupId={this.state.groupId}
							currentUser={this.props.authUser} />}
					</div>
					

					<div className="right-grid">
						<RightInfo 
							onChangeGroupMembers={this.state.groupMembers}
							onChangeCurrentBill={this.state.currentBill} />
					</div>
				</div>
			</div>
		);
	}
}

const signedInRoute = true;

const MyGroup = compose(
	withFirebase,
	withAuthUserContext
)(MyGroupBase)

export default withAuthorization(signedInRoute)(MyGroup);