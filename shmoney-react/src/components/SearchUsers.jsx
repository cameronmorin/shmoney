import React from 'react';

import Media from 'react-bootstrap/Media'

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, connectStateResults, Configure } from 'react-instantsearch-dom';

const searchClient = algoliasearch('UUDUIR4SFL', '563f2cebc4afdf50db5e7f84b044a623');

const Hit = ({hit}) => {
	//TODO Don't show current user in list and don't show users who are already in current group.
	return(
		<Media className="search-results">
			<img src={hit.photoURL} height="45" width="45" alt="user"/>
			<Media.Body>
				<p>{hit.username}</p>
				<button onClick={() => addUser(hit.uid)}>Add</button>
			</Media.Body>
		</Media>
	)
}

const addUser = uid => {
	//TODO Add user to group.
	console.log(`Add user ${uid}`);
}

const Content = connectStateResults(
	({searchState}) =>
		searchState && searchState.query ?
		<div className="content">
			<Hits hitComponent={Hit} />
		</div> : null
);

const SearchUser = () => {
	return (
		<InstantSearch searchClient={searchClient} indexName="users_search">
			<SearchBox translations={{placeholder: 'Search Box'}} />
			<Configure hitsPerPage={10} />
			<Content />
		</InstantSearch>
	)
}

export default SearchUser;
