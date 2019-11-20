import React from 'react';
import { compose } from 'recompose';

import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';
import avatar from '../images/avatar.svg';

import { withFirebase } from './firebase';
import { withAuthorization, withAuthUserContext } from './session'

class SearchUsersBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			groupId: null,
			searchName: '',
			userResults: null,
			searched: false
		}
	}
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}
	onSubmit = event => {
		event.preventDefault();

		const {searchName} = this.state;

		this.props.firebase.searchUser(searchName).then(querySnapshot => {
			let queryResults = [];
			let userResults = [];
			querySnapshot.forEach(doc => {
				queryResults.push(doc.data());
			});

			//Remove users who are already in a group from the results list
			const length = queryResults.length
			for(let i = 0; i < length; i++) {
				if(queryResults[i].group_id === null) {
					userResults.push(queryResults[i]);
				}
			}

			return this.setState({userResults});
		}).catch(error => {
			console.log(error);
		})
	}
	addUser = (username, uid) => {
		let {groupId} = this.state;
		console.log(`Adding User ${uid}`);
		this.props.firebase.addUserToHouseGroup(uid, username, groupId).then(() => {
			//TODO Find a way to refresh search so add button no longer appears after adding them
			//to the group. Also good place to implement group reqest.
			window.location.reload();
		}).catch(error => {
			console.log(error);
		});
	}
	componentDidMount() {
		//Populate state variables
		this.props.firebase.getHouseGroupData().then(result => {
			let groupId = result.group_id;
			this.setState({groupId});
		})
	}
	render() {
		const {searchName, userResults, searched} = this.state;
		let isInvalid = searchName === '';
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="universal-padding-3">
						Username:
					</div>
					<input
						type="text"
						name="searchName"
						value={searchName}
						onChange={this.onChange}
						placeholder=""
						id="rounded-corner-input"
					/>

					<button type="submit" disabled={isInvalid}>Search</button>
				</form>
				<div className="search-results">
					{userResults && <ul>{userResults.map((item, key) => (
						<li key={key}>
						<Media>
							<img 
								width={64}
								height={64}
								className="mr-3"
								src={item.photoURL ? item.photoURL : avatar}
								alt="No Image"
							/>
							<Media.Body>
								<h5>{item.username}</h5>
								<p>{item.email}</p>
								{/* TODO Style button placement/spacing */}
								<Button variant="success" onClick={() => this.addUser(item.username, item.uid)}>Add</Button>
							</Media.Body>
						</Media>
						</li>
					))
					}
					</ul>}
					{searched && !userResults && <p>No Results</p>}
				</div>
			</div>
		)
	}
}

const signedInRoute = true;

const SearchUsers = compose(
	withFirebase,
	withAuthUserContext
)(SearchUsersBase);

export default withAuthorization(signedInRoute)(SearchUsers);
