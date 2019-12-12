import React, { useContext } from 'react';

import { AuthUserContext } from '../components/session';

import '../styles/RootStyle.css';

import '../components/Home.jsx';
import DashboardAccordion from '../components/DashboardAccordion';
import BillCard from '../components/BillCard';

const Dashboard = () => {
	return (
		<div className="main-grid">
			<LeftGrid />
			<RightGrid />
		</div>
	)
}

const LeftGrid = () => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;

	const isGroupOwner = authState.isGroupOwner;

	return (
		<div className="left-grid">
			{isGroupOwner && <BillCard />}
		</div>
	)
}

const RightGrid = () => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;
	
	const isGroupMember = authState.isGroupMember;
	const isNotGroupMember = authState.isNotGroupMember;
	const isGroupOwner = authState.isGroupOwner;
	const groupName = authState.groupName;

	return (
		<div className="right-grid">
			{isGroupMember &&
			<>
				<h1>Your Group: {groupName}</h1>
				{isGroupMember && !isGroupOwner && <BillCard />}
				{isGroupOwner && <DashboardAccordion />}
			</>
			}
			{isNotGroupMember &&
			<>
				<h1 style={{display: "block"}}>Please Create or Join a Group!</h1>
			</>
			}
		</div>
	)
}

export default Dashboard;
