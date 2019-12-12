import React from 'react';
import { compose } from 'recompose';

import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';
import avatar from '../images/avatar.png';

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

			for(let i = 0; i < userResults.length; i++) {
				userResults[i].added = false;
			}
			
			return this.setState({userResults});
		}).catch(error => {
			console.error(error);
		})
	}
	addUser = (uid) => {
		let {groupId, userResults} = this.state;
		console.log(`Adding User ${uid}`);
		this.props.firebase.addUserToHouseGroup(uid, groupId).then(() => {
			//TODO Find a way to refresh search so add button no longer appears after adding them
			//to the group. Also good place to implement group reqest.
			for(let i = 0; i < userResults.length; i++) {
				if(userResults[i].uid === uid) {
					userResults[i].added = true;
					this.setState({userResults});
					
					this.props.firebase.getHouseGroupData().then(result => {
						const groupMembers = result.group_members;
						this.props.onGroupListUpdate(groupMembers);
					});
				}
			}
		}).catch(error => {
			console.error(error);
		});
	}
	componentDidMount() {
		const groupState = this.props.groupState;

		this.setState({
			groupId: groupState.groupId
		});
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
					<Button variant="secondary" type="submit" disabled={isInvalid}>Search</Button>
				</form>
				<div className="search-results">
					{userResults && <ul className="list-group">{userResults.map((item, key) => (
						<li className="list-group-item" key={key}>
						<Media>
							<img 
								width={64}
								height={64}
								className="mr-3"
								src={item.photoURL ? item.photoURL : avatar}
								alt="None"
							/>
							<Media.Body>
								<h5>{item.username}</h5>
								<p>{item.email}</p>
								{/* TODO Style button placement/spacing */}
								<Button variant="success" disabled={item.added} onClick={() => this.addUser(item.uid)}>
									{item.added ? <>Added</> : <>Add</>}
								</Button>
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
