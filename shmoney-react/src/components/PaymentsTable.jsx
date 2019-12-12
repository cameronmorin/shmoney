import React from 'react';

import { Table } from 'react-bootstrap';

const PaymentsTable = (props) => {
	const onChangePaymentHistory = props.onChangePaymentHistory;
	if (!onChangePaymentHistory) return <></>;

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

export default PaymentsTable;
