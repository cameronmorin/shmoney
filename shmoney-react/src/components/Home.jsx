import React from 'react';

import { AuthUserContext } from './session'

const WelcomeMessage = () => {
	return (
		<div className="welcome-message">
			<AuthUserContext.Consumer>
				{authUser => authUser ? <h1>Welcome {authUser.displayName}</h1> : null}
			</AuthUserContext.Consumer>
		</div>
	)
}

const Home = () => {
	return(
		<div>
			<WelcomeMessage />
		</div>
	)
}

export default Home
