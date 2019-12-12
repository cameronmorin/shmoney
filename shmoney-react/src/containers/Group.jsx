import React, { useContext, Component } from 'react';

import AuthUserContext from '../components/session/context';

import { Figure } from 'react-bootstrap';
import '../styles/MyGroup.css';

import NavBar from '../components/NavBar';
import { 
	AddBillModal, 
	AddMembersModal, 
	DeleteMembersModal, 
	TransferOwnershipModal,
	DeleteGroupModal,
	LeaveGroupModal,
	CreateGroupModal
} from '../components/GroupModals';
import GroupAccordion from '../components/GroupAccordion';

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
	const isNotGroupMember = authState.isNotGroupMember;

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
			{isGroupMember && <AddBillModal />}
			{isGroupOwner && <AddMembersModal />}
			{isGroupOwner && <DeleteMembersModal />}
			{isGroupOwner && <TransferOwnershipModal />}
			{isGroupOwner && <DeleteGroupModal />}
			{isGroupMember && !isGroupOwner && <LeaveGroupModal />}
			{isNotGroupMember && <CreateGroupModal />}
		</div>
	)
}

const RightGrid = (props) => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;
	const isGroupMember = authState.isGroupMember;

	return (
		<div className="right-grid">
			{isGroupMember && <GroupAccordion
				onChangePaymentHistory={props.onChangePaymentHistory}
			/>}
		</div>
	)
}

const signedInRoute = true;

export default withAuthorization(signedInRoute)(Group);
