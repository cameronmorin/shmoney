import React, { useContext } from 'react';

import AuthUserContext from './session/context';

import CurrentBills from './CurrentBills';

import { Accordion, Card, Button} from 'react-bootstrap';
import '../styles/MyGroup.css';

const CurrentBillsAccordion = () => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;

	const bills = authState.bills;

	return (
		<Accordion defaultActiveKey="0">
			{(bills && bills.length > 0) &&
				<>
					{bills.map((item, key) => (
						<Card key={key}>
							<Card.Header>
								<Accordion.Toggle as={Button} variant="link" eventKey={item.doc_id}>
									<h1>
										Bill due: {item.due_date.toDate().toLocaleDateString()}
									</h1> {/*fix underline issue later */}
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey={item.doc_id}>
								<Card.Body>
									<CurrentBills as={Button} billMembers={item.group_members} billId={item.doc_id} />
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					))}
				</>
			}
		</Accordion>
	);
};

export default CurrentBillsAccordion;
