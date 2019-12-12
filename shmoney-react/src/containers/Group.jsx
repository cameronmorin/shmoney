import React, { useContext, useState, Component } from 'react'

import AuthUserContext from '../components/session/context'

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

import NavBar from '../components/NavBar';
import { 
	AddBill, 
	AddMembers, 
	DeleteMembers, 
	TransferOwnership,
	DeleteGroup,
	LeaveGroup
} from '../components/GroupModals';

import { withAuthorization } from '../components/session';

class Group extends Component {
	render() {
		return (
			<div>
				<NavBar 
					onClickHome={this.props.onClickHome}
					onClickLogout={this.props.onClickLogout}
					onClickAvatar={this.props.onClickAvatar}
				/>
				<div className="main-grid">
					<LeftGrid />
					<RightGrid 
						onChangePaymentHistory={this.props.onChangePaymentHistory}
					/>
				</div>
			</div>
		)
	}
}

const LeftGrid = () => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;
	const isGroupMember = authState.isGroupMember;
	const isGroupOwner = authState.isGroupOwner;

	return (
		<div className="left-grid">
			<h1>{authState.groupName}</h1>
			<Figure>
				<Figure.Image 
					rounded
					width={180}
					alt="user"
					src="https://img.icons8.com/bubbles/2x/home.png"
				/>
			</Figure>
			{isGroupMember && <AddBill />}
			{isGroupOwner && <AddMembers />}
			{isGroupOwner && <DeleteMembers />}
			{isGroupOwner && <TransferOwnership />}
			{isGroupOwner && <DeleteGroup />}
			{isGroupMember && !isGroupOwner && <LeaveGroup />}
		</div>
	)
}

const RightGrid = (props) => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;
	const isGroupMember = authState.isGroupMember;
	const isGroupOwner = authState.isGroupOwner;

	return (
		<div className="right-grid">
			{isGroupMember && <RightInfo 
				onChangePaymentHistory={props.onChangePaymentHistory}
			/>}
		</div>
	)
}

const signedInRoute = true;

export default withAuthorization(signedInRoute)(Group);
