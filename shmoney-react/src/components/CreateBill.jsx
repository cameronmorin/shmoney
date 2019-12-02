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
			split: 0,
			created: false
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
	onClick = event => {
		event.preventDefault();

		const {groupId, groupMembers, dueDate, rentTotal, split} = this.state;

		//Set split for each group member and default paid status to false
		for(let item in groupMembers) {
			groupMembers[item].amount_owed = split;
			groupMembers[item].paid_status = false;
		}

		this.props.firebase.createBill(groupId, groupMembers, dueDate, rentTotal).then(() => {
			console.log("Bill Created");
			this.setState({created: true});
			window.location.reload();
		}).catch(error => {
			console.log(error.message);
		})
	}
	onChange = event => {
		this.setState({[event.target.name]: event.target.value});
	}
	componentDidUpdate() {
		const {groupMembers, rentTotal, split} = this.state;

		if(!groupMembers) return;

		const numberOfMembers = groupMembers.length;
		const newSplit = Math.round(rentTotal / numberOfMembers);
		
		if(newSplit !== split) this.setState({split: newSplit});
	}
	render() {
		const {groupMembers, rentTotal, split} = this.state;

		return (
			<div>
				<div className="rent-total-input">
					<div className="universal-padding-3">
						<label>Rent Total</label>
					</div>
					<input 
						type="number"
						name="rentTotal"
						value={rentTotal}
						onChange={this.onChange}
					/>
				</div>
				<div className="date-picker">
					<div className="universal-padding-3">
						<label>Due Date</label>
					</div>
					<DatePicker
						selected={this.state.dueDate}
						onSelect={this.updateDate}
						onChange={this.updateDate}
						minDate={this.state.startDate}
						showTimeSelect
  					dateFormat="Pp"
					/>
				</div>
				<div className="group-members-list my-1">
					{groupMembers && <ul className="list-group" >{groupMembers.map((item, key) => (
						<li className="list-group-item" key={key}>
							<p style={{margin: "auto"}}>{item.username} : ${split}</p>
						</li>
						))}
					</ul>}
				</div>
				<div className="universal-padding-3">
					<Button 
						variant="secondary" 
						onClick={this.onClick} 
						disabled={this.state.created}>
						{this.state.created ? <>Created</> : <>Create</>}
					</Button>
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
