import React, { useContext, useState } from 'react'

import AuthUserContext from './session/context'
import FirebaseContext from './firebase/context'

export default function Test() {
	const [test, setTest] = useState('Test');
	const context = useContext(AuthUserContext);
	const firebase = useContext(FirebaseContext);
	const authState = context.state;

	//console.log(firebase)

	const groupMembers = [{uid: "1", username: "Jack"}];
	//if(authState.onGroupListUpdate) authState.onGroupListUpdate(groupMembers);

	const handleClick = event => {
		event.preventDefault();

		console.log(authState);

		authState.onGroupListUpdate(groupMembers);
	}

	return (
		<div>
			{authState.groupMembers && <ul>{authState.groupMembers.map((item, key) => (
				<li key={key}>{item.username}</li>
			))}</ul>}
			<button onClick={handleClick}>Test</button>
		</div>
	)
}