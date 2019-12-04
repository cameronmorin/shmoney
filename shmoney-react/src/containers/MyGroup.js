import React, { useState } from 'react';
import { compose } from 'recompose';

import avatar from '../images/avatar.png';

import NavBar from '../components/NavBar';
import '../styles/MyGroup.css';

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
	FormControl,
	ListGroup,
	Media,
	Alert,
	ButtonGroup
} from 'react-bootstrap';
import { withAuthorization, withAuthUserContext } from '../components/session';

import { withFirebase } from '../components/firebase';

import CreateGroup from '../components/CreateGroup';
import SearchUsers from '../components/SearchUsers';
import CreateBill from '../components/CreateBill';

const AddMembers = ({ onGroupListUpdate, onLocalGroupListUpdate }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Add Members
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header className="header-styling button-spacing" closeButton>
					<Modal.Title className="universal-font">Add Members</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<SearchUsers
						onGroupListUpdate={onGroupListUpdate}
						onLocalGroupListUpdate={onLocalGroupListUpdate}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" id="button-styling" onClick={handleClose}>
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
				<Modal.Header className="header-styling button-spacing" closeButton>
					<Modal.Title className="universal-font">Add Bills</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CreateBill />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" id="button-styling" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

const DeleteMembers = ({
	onChangeGroupId,
	onChangeGroupMembers,
	onChangeOwnerUid,
	firebase,
	onGroupListUpdate,
	onLocalGroupListUpdate,
}) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const removeUser = uid => {
		firebase
			.removeUserFromGroup(uid, onChangeGroupId)
			.then(() => {
				firebase.getHouseGroupData().then(result => {
					const groupMembers = result.group_members;
					onGroupListUpdate(groupMembers);
					onLocalGroupListUpdate(groupMembers);
				});
			})
			.catch(error => {
				console.error(error);
			});
	};

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Delete Members
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header className="header-styling button-spacing" closeButton>
					<Modal.Title className="universal-font">Delete Members</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<ul className="list-group">
							{onChangeGroupMembers.map((index, key) => (
								<div key={key}>
									{index.uid !== onChangeOwnerUid && <li className="list-group-item" style={{display: "flex", justifyContent: "space-between"}} key={key}>
										<span className="align-items-center mx-2" style={{margin: "auto"}}>{index.username}</span>
										<Button variant="outline-secondary" id="button-styling" onClick={() => removeUser(index.uid)}>Delete</Button>
									</li>}
								</div>
							))}
						</ul>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" id="button-styling" onClick={handleClose}>
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
	};

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Delete Group
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header className="header-styling" closeButton>
					<Modal.Title className="universal-font">Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Button variant="secondary" id="button-styling" onClick={deleteGroup}>
						Confirm
					</Button>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" id="button-styling" onClick={handleClose}>
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
				<Modal.Header className="header-styling" closeButton>
					<Modal.Title className="universal-font">Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Button variant="secondary" id="button-styling" onClick={leaveGroup}>
						Confirm
					</Button>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" id="button-styling" onClick={handleClose}>
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
				<Modal.Header closeButton className="header-styling">
					<Modal.Title className="universal-font" variant="secondary">
						Create Group
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="universal-font">House Name:</div>
					<InputGroup className="mb-3">
						<CreateGroup />
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" id="button-styling" onClick={handleClose}>
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
				{onChangePaymentHistory && <tbody>{onChangePaymentHistory.map((item, key) => (
					<tr key={key}>
						<td>{item.group_name}</td>
						<td>{item.payment_time.toLocaleString()}</td>
						<td>{item.payment_amount}</td>
					</tr>
				))
				}</tbody>}
			</Table>
		</>
	);
};

const NotPaid = () => {
  return(
    <Alert variant="danger">
      Not Paid
    </Alert>
  );
};

const Paid = () => {
  return(
    <Alert variant="success">
      Paid
    </Alert>
  );
};

const CurrentBillsTableOwner = ({ isGroupOwner, groupId, billId, billMembers, groupName, firebase }) => {

	// const [show, setShow] = useState(false);
	// const handleShow = () => setShow(true);
	const [currentUser, setUser] = useState(null);
	const [paidStatus, setPaidStatus] = useState(null);
	const handleCancel = () => setUser(null);
	const handleClose = () => {
		// use the radios to set a value, and use that value to determine whether onTime or late
		if (paidStatus === null) {
			alert('Please declare payment status.');
		}
		else {
			//Update billMembers status
			let paymentAmount = 0;
			for(let item in billMembers) {
				if(billMembers[item].uid === currentUser) {
					billMembers[item].paid_status = true;
					paymentAmount = billMembers[item].amount_owed;
					break;
				}
			}

			console.log(currentUser, groupId, billId, billMembers, groupName, paymentAmount);

			firebase.verifyPayment(currentUser, groupId, billId, billMembers, groupName, paymentAmount)
				.then(() => {
					window.location.reload();
				}).catch(err => {
					console.error(err);
				})
		}
	}

	return (
		<>
			{(billMembers && billMembers.length > 0) && 
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Member Name</th>
							<th>Bill Amount</th>
							<th>Paid Status</th>
							{isGroupOwner && 
							<th>Verify Payment</th>
							}
							</tr>
					</thead>
					<tbody>
						{(billMembers && billMembers.length > 0) && 
							<>
								{billMembers.map((item, key) => (
									<tr key={key}>
										<td>{item.username}</td>
										<td>{item.amount_owed}</td>
										<td>{item.paid_status ? <Paid /> : <NotPaid />}</td>
										{isGroupOwner && 
											<td>
												{!item.paid_status &&
													// <Button className="billsbtn" variant="warning" onClick={() => setUser(item.uid).then(handleShow)}>													<Button className="billsbtn" variant="warning" onClick={() => setUser(item.uid).then(handleShow)}>
													<Button className="billsbtn" variant="warning" onClick={() => setUser(item.uid)}>
														Verify
													</Button>
												}
											</td>
										}
									</tr>
								))}
							</>
						}
					</tbody>
				</Table>
			}
			{!billMembers || billMembers.length === 0 && 
				<h1>No Members Attached to Bill</h1>
			}

			<Modal show={currentUser} onHide={handleCancel} animation={false}>
				<Modal.Header className="header-styling" closeButton>
					<Modal.Title className="universal-font">Verify Payment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Paid on time?</p>
					{/* <ToggleButtonGroup type="radio" name="verify-radios" value={value} onChange={handleChange}>
						<ToggleButton value={1}>Yes</ToggleButton>
						<ToggleButton value={2}>No</ToggleButton>
					</ToggleButtonGroup> */}
					<ButtonGroup>
						<Button variant="primary" id="button-styling" onClick={() => setPaidStatus('yes')}>Yes</Button>
						<div className="button-spacing"></div>
						<Button variant="primary" id="button-styling" onClick={() => setPaidStatus('no')}>No</Button>
					</ButtonGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" id="button-styling" onClick={handleClose}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
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
						<th>Member Name</th>
						<th>Due Date</th>
						<th>Bill Amount</th>
						<th>Paid/Not Paid</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>notowner</td>
						<td>11/11/19</td>
						<td>$1000</td>
						<td>Yes/No</td>
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
const CurrentBillsAccordion = () => {
	return (
		<>
	<Accordion defaultActiveKey="0">
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							<h1>Bill due 11/11/2019</h1>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							<CurrentBillsTable as={Button}/>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="1">
							<h1>Bill Due 12/11/2019</h1>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="1">
						<Card.Body>
								<CurrentBillsTable as={Button} />
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="2">
							<h1>Bill Due 01/11/2020</h1>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="2">
						<Card.Body>
								<CurrentBillsTable as={Button} />
						</Card.Body>
					</Accordion.Collapse>
				</Card>
	</Accordion>
	</>
	);
};

const CurrentBillsAccordionOwner = ({ isGroupOwner, billArray, groupId, firebase, groupName, billId  }) => {
	return (
		<Accordion defaultActiveKey="0">
			{(billArray && billArray.length > 0) && 
				<>
					{billArray.map((item, key) => (
						<Card key={key}>
							<Card.Header>
								<Accordion.Toggle as={Button} variant="link" eventKey={item.doc_id}>
									<h1>Bill due: {item.due_date.toDate().toLocaleDateString()}</h1> {/*fix underline issue later */}
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey={item.doc_id}>
								<Card.Body>
									<CurrentBillsTableOwner as={Button} isGroupOwner={isGroupOwner} billMembers={item.group_members} billId={item.doc_id} groupName={groupName} groupId={groupId} firebase={firebase}/>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					))}
				</>
			}
		</Accordion>
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
				<Modal.Header className="header-styling" closeButton>
					<Modal.Title className="universal-font">Pick New Owner</Modal.Title>
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
														.then(event => {
															window.location.reload();
														})
														.catch(err => {
															alert('Error : ' + err);
															window.location.reload();
														})
												}
												id="button-styling"
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
					<Button variant="secondary" id="button-styling" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

const RightInfoOwner = ({ onChangeGroupMembers, onChangeCurrentBill, onChangePaymentHistory, isGroupOwner, billArray, groupId, firebase, groupName }) => {
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
							<ul>{onChangeGroupMembers.map((item, key) => (
									<li key={key}>
										<Media>
											<img
												width={64}
												height={64}
												className="mr-3"
												src={item.photo_url ? item.photo_url : avatar }
												alt="None"
											/>
											<Media.Body>
												<h1>{item.username}</h1>
											</Media.Body>
										</Media>
									</li>
								))}
								</ul>}
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="1">
							<h1>View Bills</h1>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="1">
						<Card.Body>
							<div className="curBills">
								<CurrentBillsAccordionOwner as={Button} isGroupOwner={isGroupOwner} billArray={billArray} groupId={groupId} firebase={firebase} groupName={groupName} />
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
							<PaymentsTable onChangePaymentHistory={onChangePaymentHistory} />
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
};

const RightInfo = ({ onChangeGroupMembers, onChangeCurrentBill, onChangePaymentHistory }) => {
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
								<ul>{onChangeGroupMembers.map((item, key) => 
									<li key={key}>
										<Media>
											<img
												width={64}
												height={64}
												className="mr-3"
												src={item.photo_url ? item.photo_url : avatar }
												alt="None"
											/>
											<Media.Body>
												<h5>{item.username}</h5>
											</Media.Body>
										</Media>
									</li>
								)}
								</ul>}
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
								<CurrentBillsAccordion as={Button} />
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
							<PaymentsTable onChangePaymentHistory={onChangePaymentHistory} />
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
			currentBill: null,
			paymentHistory: null
		};
	}
	componentDidMount() {
		const authUser = this.props.authUser;
		const groupState = this.props.groupState;

		this.setState({isNotGroupMember: groupState.isNotGroupMember});
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
					currentBill: groupState.currentBill,
					paymentHistory: groupState.paymentHistory
				});
			}, 1000);
		} else {
			const isGroupOwner = authUser.uid === groupState.ownerUid;

			this.setState({
				groupMembers: groupState.groupMembers,
				groupName: groupState.groupName,
				isNotGroupMember: groupState.isNotGroupMember,
				isGroupMember: groupState.isGroupMember,
				isGroupOwner,
				groupId: groupState.groupId,
				ownerUid: groupState.ownerUid,
				currentBill: groupState.currentBill,
				paymentHistory: groupState.paymentHistory
			});
		}
	}
	updateMembersList = groupMembers => {
		//Update the group members list with updated list
		this.setState({ groupMembers });
	};

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
						{this.state.isGroupOwner && (
							<AddMembers
								onGroupListUpdate={this.props.groupState.onGroupListUpdate}
								onLocalGroupListUpdate={this.updateMembersList}
							/>
						)}
						{this.state.isGroupOwner && (
							<DeleteMembers
								onChangeGroupId={this.state.groupId}
								onChangeGroupMembers={this.state.groupMembers}
								onChangeOwnerUid={this.state.ownerUid}
								firebase={this.props.firebase}
								onGroupListUpdate={this.props.groupState.onGroupListUpdate}
								onLocalGroupListUpdate={this.updateMembersList}
							/>
						)}

						{this.state.isNotGroupMember && <CreateGroupModal />}
						{this.state.isGroupOwner && (
							<TransferOwnership
								groupMembers={this.state.groupMembers}
								currentOwnerID={this.state.ownerUid}
								firebase={this.props.firebase}
								groupId={this.state.groupId}
							/>
						)}
						{this.state.isGroupOwner && (
							<DeleteGroup firebase={this.props.firebase} onChangeGroupId={this.state.groupId} />
						)}
						{this.state.isGroupMember && !this.state.isGroupOwner && (
							<LeaveGroup
								firebase={this.props.firebase}
								onChangeGroupId={this.state.groupId}
								currentUser={this.props.authUser}
							/>
						)}
					</div>
					<div className="right-grid">
						{/* {this.state.isGroupMember && !this.state.isGroupOwner && <RightInfo 
													onChangeGroupMembers={this.state.groupMembers}
													onChangeCurrentBill={this.state.currentBill}
													onChangePaymentHistory={this.state.paymentHistory}/>} */}
						{this.state.isGroupMember && <RightInfoOwner 
													onChangeGroupMembers={this.state.groupMembers}
													onChangeCurrentBill={this.state.currentBill}
													isGroupOwner={this.state.isGroupOwner}
													billArray={this.props.groupState.bills}
													groupId={this.state.groupId}
													firebase={this.props.firebase}
													groupName={this.state.groupName}
													onChangePaymentHistory={this.state.paymentHistory}/>}
						{/* <RightInfo 
							onChangeGroupMembers={this.state.groupMembers}
							onChangeCurrentBill={this.state.currentBill} /> */}
					</div>
				</div>
			</div>
		);
	}
}

const signedInRoute = true;

const MyGroup = compose(withFirebase, withAuthUserContext)(MyGroupBase);

export default withAuthorization(signedInRoute)(MyGroup);
