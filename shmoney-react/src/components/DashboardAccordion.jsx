import React, { useContext } from 'react';

import { Table, Button, Accordion, Card } from 'react-bootstrap';

import AuthUserContext from './session/context';
import { Paid, NotPaid } from './BillCard';


const DashboardAccordion = () => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;

	const currentBill = authState.currentBill;

	if (!currentBill) return <h2 style={{ display: "block", textAlign: "center" }}>No Bills Yet</h2>;

	return (
		<>
			<Accordion defaultActiveKey="0">
				<Card text="dark" border="light">
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							<h1>Group Info</h1>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="0">
						<Card.Body >
							<MemberTable />
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
			<br />
		</>
	);
};

const MemberTable = () => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;

	const currentBill = authState.currentBill;
	const billMembers = currentBill.group_members;

	return (
		<Table striped bordered hover responsive>
			<thead>
				<tr>
					<th>Room #</th>
					<th>Username</th>
					<th>Rent Amount $</th>
					<th>Payment Status</th>
				</tr>
			</thead>
			{billMembers && <tbody>{billMembers.map((item, key) => (
				<tr key={key}>
					<td>{key + 1}</td>
					<td>{item.username}</td>
					<td>{item.amount_owed}</td>
					<td>{item.paid_status ? <Paid /> : <NotPaid />}</td>
				</tr>
			))
			}</tbody>}
		</Table>
	);
};

export default DashboardAccordion;