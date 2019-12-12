import React, { useContext } from 'react';

import { Card, Alert } from 'react-bootstrap';

import AuthUserContext from './session/context';

const BillCard = () => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;

	const authUser = authState.authUser;
	const currentBill = authState.currentBill;

	if (!currentBill || !authUser) return <></>;

	const billMembers = currentBill.group_members;
	const dueDate = currentBill.due_date;
	let amountDue = null;
	let paidStatus = false;

	for (let item in billMembers) {
		if (billMembers[item].uid === authUser.uid) {
			amountDue = billMembers[item].amount_owed;
			paidStatus = billMembers[item].paid_status;
		}
	}

	return (
		<Card className="mb-4" text="dark">
			<Card.Header>
				<p>Current Bill</p>
			</Card.Header>
			<Card.Body>
				<Card.Title><p>Due: {dueDate.toDate().toLocaleDateString()}</p></Card.Title>
				<Card.Text>
					Amount: ${amountDue}
				</Card.Text>
				{paidStatus ? <Paid /> : <NotPaid />}
			</Card.Body>
		</Card>
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

export default BillCard;

export { Paid, NotPaid };
