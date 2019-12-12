import React, { useContext } from 'react';

import AuthUserContext from './session/context';

import CurrentBillsAccordion from './CurrentBillsAccordion';
import PaymentsTable from './PaymentsTable';

import { Accordion, Card, Button, Media } from 'react-bootstrap';
import '../styles/MyGroup.css';
import avatar from '../images/avatar.png';

const RightInfo = (props) => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;

	const groupMembers = authState.groupMembers;

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
							{groupMembers &&
								<ul>{groupMembers.map((item, key) =>
									<li key={key}>
										<Media>
											<img
												width={64}
												height={64}
												className="mr-3"
												src={item.photo_url ? item.photo_url : avatar}
												alt="None"
											/>
											<Media.Body>
												<h1>{item.username}</h1>
												{console.log(item)}
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
								{<CurrentBillsAccordion as={Button} />}
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
							<PaymentsTable onChangePaymentHistory={props.onChangePaymentHistory} />
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
};

export default RightInfo;
