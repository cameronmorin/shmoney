import React, { useContext } from 'react';

import { Card, Table, Accordion, Button } from 'react-bootstrap';
import '../styles/Profile.css';

import { AuthUserContext } from '../components/session';

const RightAccordion = () => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;

	const paymentHistory = authState.paymentHistory;
	let totalSpent = 0;

	for (let item in paymentHistory) {
		totalSpent += paymentHistory[item].payment_amount;
	}

	return (
		<>
			<Accordion defaultActiveKey="0">
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							<h1>Total Spent</h1>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							{' '}
							<h1>${totalSpent}</h1>{' '}
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

const PaymentsTable = () => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;

	const paymentHistory = authState.paymentHistory;

	if (!paymentHistory) return <></>;

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
				{paymentHistory.length > 0 && <tbody>
					<tr>
						<td>{paymentHistory[0].group_name}</td>
						<td>{paymentHistory[0].payment_time.toLocaleString()}</td>
						<td>{paymentHistory[0].payment_amount}</td>
					</tr>
				</tbody>}
			</Table>
		</>
	);
};

export default RightAccordion;
