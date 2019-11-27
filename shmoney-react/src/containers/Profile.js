import React from 'react';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import { Card, Table, Accordion, Figure, Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import avatar from '../images/avatar.png';
import "../styles/Profile.css";
import { withAuthorization, withAuthUserContext } from '../components/session';
import { withFirebase } from '../components/firebase';

import UploadImage from '../components/UploadImage';



const EditName = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Edit Name
            </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Name"
              aria-label="Edit Name"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary">Submit</Button>
            </InputGroup.Append>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
                     </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const UpdatePhoto = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Update Profile Image
		</Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <UploadImage />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
                </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const PaymentsTable = () => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>House Name</th>
            <th>Payment Date</th>
            <th>Payment Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cool House</td>
            <td>11/11/19</td>
            <td>$1000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Cool House</td>
            <td>12/11/19</td>
            <td>$1000</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Cool House</td>
            <td>1/11/20</td>
            <td>$1000</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

const RightAccordion = ({ onChangeGroupMembers }) => {
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <h1>Bills Due</h1>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body> [TABLE] </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>

            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              <h1>House Members</h1>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {onChangeGroupMembers &&
                onChangeGroupMembers.map((item, key) => <p key={key}>{item.username}</p>)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              <h1>Recent Payments</h1>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body><PaymentsTable /></Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  )
}

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupMembers: null,
      groupName: null,
      isNotGroupMember: false,
      isGroupMember: false,
      isGroupOwner: false
    };
  }
  componentDidMount() {
    const authUser = this.props.authUser;
    this.props.firebase.getHouseGroupData().then(result => {
      console.log("Result:", result);
      let groupOwnerUid = result.owner_uid
      this.setState({
        groupMembers: result.group_members,
        groupName: result.group_name,
        isGroupMember: true
      });

      if (groupOwnerUid === authUser.uid) {
        console.log("Owner")
        this.setState({ isGroupOwner: true });
      }
    })
      .catch(error => {
        console.log(error.message);
        //If there is an error then they aren't part of a group
        //So they should see the Create Group button.
        this.setState({ isNotGroupMember: true });
      });
  }
  render() {
    const authUser = this.props.authUser;

    return (
      <div>
        <NavBar
          onClickHome={this.props.onClickHome}
          onClickMenu={this.props.onClickMenu}
          onClickLogout={this.props.onClickLogout}
          onClickAvatar={this.props.onClickAvatar}
          currPage="Profile"
        />
        <div className="main-grid">
          <div className="left-grid">
            <h1>Welcome, {authUser.displayName}</h1>
            <Figure>
              <Figure.Image
                rounded
                width={140}
                height={1}
                alt="user"
                src={authUser.photoURL ? authUser.photoURL : avatar}
              />
            </Figure>
            <UpdatePhoto />
            <EditName />
          </div>

          <div className="right-grid">
            <RightAccordion onChangeGroupMembers={this.state.groupMembers} />
          </div>
        </div>
      </div>
    );
  }
}

const signedInRoute = true;

const profilePage = withAuthUserContext(Profile);

export default withFirebase(withAuthorization(signedInRoute)(profilePage));
