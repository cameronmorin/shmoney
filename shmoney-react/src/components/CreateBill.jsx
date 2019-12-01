import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from './firebase';
import { withAuthUserContext } from './session';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';

class CreateBillBase extends Component {
	constructor(props) {
		super(props)

		this.state = {
			startDate: new Date(),
			dueDate: new Date(),
			groupId: null,
			groupMembers: null,
			rentTotal: 0,
			amountOwed: 0
		}
	}
	componentDidMount() {
		const groupState = this.props.groupState;
		const groupMembers = groupState.groupMembers;
		let previousRentTotal = groupState.previousRentTotal;

		//Check if there was a previous total and if not default it to zero
		if(!previousRentTotal) {
			previousRentTotal = 0;
		}
		
		//Add amount owed key to each member's object
		for(let item in groupMembers) {
			groupMembers[item].amount_owed = 0;
		}

		this.setState({
			groupId: groupState.groupId,
			groupMembers,
			rentTotal: previousRentTotal
		});
	}
	updateDate = date => {
		this.setState({dueDate: date});
	}
	onClick = () => {
		
	}
	onChange = event => {
		this.setState({[event.target.name]: event.target.value});
	}
	render() {
		const {groupMembers, rentTotal, amountOwed} = this.state;

		return (
			<div>
				<div className="rent-total-input">
					<div className="universal-padding-3">
						<p>Rent Total</p>
					</div>
					<input 
						type="number"
						name="rentTotal"
						value={rentTotal}
						onChange={this.onChange}
					/>
				</div>
				<div className="date-picker">
					<DatePicker
						selected={this.state.dueDate}
						onSelect={this.updateDate}
						onChange={this.updateDate}
						minDate={this.state.startDate}
					/>
				</div>
				<div className="create-group-button">
					<Button variant="secondary" onClick={this.onClick}>Create</Button>
				</div>
			</div>
		);
	}
}

const CreateBill = compose(
	withFirebase,
	withAuthUserContext
)(CreateBillBase)

export default CreateBill;
