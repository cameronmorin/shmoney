import React from 'react';

import Media from 'react-bootstrap/Media'

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, connectStateResults, Configure } from 'react-instantsearch-dom';

import { withFirebase } from './firebase';
import { withAuthorization, withAuthUserContext } from './session'

const searchClient = algoliasearch('UUDUIR4SFL', '563f2cebc4afdf50db5e7f84b044a623');

class SearchUserBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			groupList: null,
			ownerUid: null,
			groupId: null
		}
	}
	Hit = ({hit}) => {
		const {groupList, ownerUid} = this.state;
		let isInGroup = false;
		if(ownerUid === hit.uid) {
			isInGroup = true;
		}
		
		groupList.map(index => (hit.uid === index.uid) ? isInGroup = true : null);

		return(
			<Media className="search-results">
				<img src={hit.photoURL} height="45" width="45" alt="user"/>
				<Media.Body>
					<p>{hit.username}</p>
					{!isInGroup ? 
						<button onClick={() => this.addUser(hit.uid, hit.username)}>Add</button>
						: null
					}
				</Media.Body>
			</Media>
		)
	}
	addUser = (uid, username) => {
		let {groupId} = this.state;
		this.props.firebase.addUserToHouseGroup(uid, username, groupId);
	}
	componentDidMount() {
		//Populate state variables
		this.props.firebase.getHouseGroupData().then(result => {
			let groupList = result.house_members;
			let ownerUid = result.owner_uid;
			let groupId = result.group_id;
			this.setState({groupList, ownerUid, groupId});
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

const SearchUser = withAuthUserContext(SearchUserBase);

export default withFirebase(withAuthorization(signedInRoute)(SearchUser));
