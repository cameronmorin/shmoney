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

const RightInfo = () => {
	const authContext = useContext(AuthUserContext);
	const firebase = useContext(FirebaseContext);
	const authState = authContext.state;

	const groupMembers = authState.groupMembers;
	const authUser = authState.authUser;
	const groupId = authState.groupId;

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
								{/* {<CurrentBillsAccordion as={Button} />} */}
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

