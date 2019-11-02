import React from 'react';

const AuthUserContext = React.createContext(null)

//Gives components access to authUser by using: 
//this.props.authUser
export const withAuthUserContext = Component => {
	return props => {
		return (
			<AuthUserContext.Consumer>
				{authUser => authUser ?
					<Component {...props} authUser={authUser} />
					: null
				}
			</AuthUserContext.Consumer>
		)
	}
}

export default AuthUserContext;
