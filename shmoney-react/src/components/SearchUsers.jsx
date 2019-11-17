import React from 'react';
import { compose } from 'recompose'

import Media from 'react-bootstrap/Media'

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, connectStateResults, Configure } from 'react-instantsearch-dom';

import { withFirebase } from './firebase';
import { withAuthorization, withAuthUserContext } from './session'

const searchClient = algoliasearch('UUDUIR4SFL', '563f2cebc4afdf50db5e7f84b044a623');

class SearchUsersBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			groupId: null
		}
	}
	Hit = ({hit}) => {
		return(
			<Media className="search-results">
				<img src={hit.photoURL} height="45" width="45" alt="user"/>
				<Media.Body>
					<p>{hit.username}</p>
					{!hit.group_id ? 
						<button onClick={() => this.addUser(hit.uid, hit.username)}>Add</button>
						: null
					}
				</Media.Body>
			</Media>
		)
	}
	addUser = (uid, username) => {
		let {groupId} = this.state;
		console.log(`Adding User ${uid}`);
		this.props.firebase.addUserToHouseGroup(uid, username, groupId).then(result => {
			//TODO Find a way to refresh search so add button no longer appears after adding them
			//to the group. Also good place to implement group reqest.
		}).catch(error => {
			console.log(error);
		});
	}
	componentDidMount() {
		//Populate state variables
		this.props.firebase.getHouseGroupData().then(result => {
			let groupId = result.group_id;
			console.log(groupId);
			this.setState({groupId});
		})
	}
	render() {
		const Content = connectStateResults(
			({searchState}) =>
				searchState && searchState.query ?
				<div className="content">
					<Hits hitComponent={this.Hit} />
				</div> : null
		);
		return (
			<InstantSearch searchClient={searchClient} indexName="users_search">
				<SearchBox translations={{placeholder: 'Search Box'}} />
				<Configure hitsPerPage={10} />
				<Content />
			</InstantSearch>
		)
	}
}

const signedInRoute = true;

const SearchUsers = compose(
	withFirebase,
	withAuthUserContext
)(SearchUsersBase);

export default withAuthorization(signedInRoute)(SearchUsers);
