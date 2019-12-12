import React, { useContext, useState } from 'react'

import AuthUserContext from './session/context'
import FirebaseContext from './firebase/context'

import { Table, Button, ButtonGroup, Modal, Alert } from 'react-bootstrap';
import '../styles/MyGroup.css';

const CurrentBills = (props) => {

	// const [show, setShow] = useState(false);
	// const handleShow = () => setShow(true);
	const [currentUser, setUser] = useState(null);
	const [paidStatus, setPaidStatus] = useState(null);

	const authContext = useContext(AuthUserContext);
	const firebase = useContext(FirebaseContext);
	const authState = authContext.state;

	const groupName = authState.groupName;
	const groupId = authState.groupId;
	const billMembers = props.billMembers;
	const billId = props.billId;

	const isGroupOwner = authState.isGroupOwner;

	const handleCancel = () => setUser(null);
	const handleClose = () => {
		// use the radios to set a value, and use that value to determine whether onTime or late
		if (paidStatus === null) {
			alert('Please declare payment status.');
		}
		else {
			//Update billMembers status
			let paymentAmount = 0;
			for (let item in billMembers) {
				if (billMembers[item].uid === currentUser) {
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
						<Button variant="primary" id="button-styling" className="mx-1" onClick={() => setPaidStatus('yes')}>Yes</Button>
						<Button variant="primary" id="button-styling" className="mx-1" onClick={() => setPaidStatus('no')}>No</Button>
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

const NotPaid = () => {
	return (
		<Alert variant="danger">
			Not Paid
    </Alert>
	);
};

const Paid = () => {
	return (
		<Alert variant="success">
			Paid
    </Alert>
	);
};

export default CurrentBills;
