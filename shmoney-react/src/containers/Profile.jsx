import React, { useContext, Component } from 'react';

import NavBar from '../components/NavBar';

import { Figure } from 'react-bootstrap';
import avatar from '../images/avatar.png';
import '../styles/Profile.css';

import { withAuthorization, AuthUserContext } from '../components/session';

import { UpdatePhotoModal, EditNameModal } from '../components/ProfileModals';
import ProfileAccordion from '../components/ProfileAccordion';

class Profile extends Component {
	render() {
		return (
			<div>
				<NavBar 
					onClickHome={this.props.onClickHome}
					onClickMenu={this.props.onClickMenu}
					onClickLogout={this.props.onClickLogout}
				/>
				<div className="main-grid">
					<LeftGrid />
					<RightGrid />
				</div>
			</div>
		)
	}
}

const LeftGrid = () => {
	const authContext = useContext(AuthUserContext);
	const authState = authContext.state;

	const authUser = authState.authUser;

	if (!authUser) return <></>;

	return (
		<div className="left-grid">
			<Figure>
				<Figure.Image
					rounded
					width={140}
					height={1}
					alt="user"
					src={authUser.photoURL ? authUser.photoURL : avatar}
				/>
			</Figure>
			<UpdatePhotoModal />
			<EditNameModal />
		</div>
	)
}

const RightGrid = () => {
	return (
		<div className="right-grid">
			<ProfileAccordion />
		</div>
	)
}

const signedInRoute = true;

export default withAuthorization(signedInRoute)(Profile);
