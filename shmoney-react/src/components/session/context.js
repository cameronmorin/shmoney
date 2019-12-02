import React from 'react';

const AuthUserContext = React.createContext(null)

//Gives components access to authUser by using: 
//this.props.authUser
export const withAuthUserContext = Component => {
	return props => {
		return (
			<AuthUserContext.Consumer>
				{context => context.state.authUser ?
					<Component {...props} authUser={context.state.authUser} groupState={context.state} />
					: null
				}
			</AuthUserContext.Consumer>
		)
	}
}

export default AuthUserContext;
