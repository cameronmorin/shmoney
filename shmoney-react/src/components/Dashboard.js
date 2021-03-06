import React from 'react';
import '../styles/RootStyle.css'
import './Home.jsx';
import RedX from '../images/red_x.svg';
import GreenCheck from '../images/checked.svg';

import { Table, Button, Accordion, Card, Alert, AccordionCollapse } from 'react-bootstrap';
import PieChart from './PieChart.js';
import { compose } from 'recompose';
import { withFirebase } from './firebase';
import { withAuthUserContext } from './session';

class DashboardBase extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      groupMembers: null,
      groupName: null,
      isNotGroupMember: false,
      isGroupMember: false,
      isGroupOwner: false,
      groupId: null,
      ownerUid: null,
      bills: null,
      currentBill: null
	  };
  }
  componentDidMount() {
    const authUser = this.props.authUser;
    const groupState = this.props.groupState;
    //Ensures that if the groupState is delayed in being updated 
    //then it will be updated properly
    if(!groupState.groupName) {
      setTimeout(() => { //Start Timer
        const authUser = this.props.authUser;
        const groupState = this.props.groupState;
        const isGroupOwner = authUser.uid === groupState.ownerUid;

        this.setState({
          authUser,
          groupMembers: groupState.groupMembers,
          groupName: groupState.groupName,
          isNotGroupMember: groupState.isNotGroupMember,
          isGroupMember: groupState.isGroupMember,
          isGroupOwner,
          groupId: groupState.groupId,
          ownerUid: groupState.ownerUid,
          bills: groupState.bills,
          currentBill: groupState.currentBill
        });
      }, 700);
    } else {
      const isGroupOwner = authUser.uid === groupState.ownerUid;

      this.setState({
        authUser,
        groupMembers: groupState.groupMembers,
        groupName: groupState.groupName,
        isNotGroupMember: groupState.isNotGroupMember,
        isGroupMember: groupState.isGroupMember,
        isGroupOwner,
        groupId: groupState.groupId,
        ownerUid: groupState.ownerUid,
        bills: groupState.bills,
        currentBill: groupState.currentBill
      });
    }
  }
  render() {
    const {isGroupOwner, isGroupMember} = this.state;

    return (
        <div className = "main-grid" >
          <div className = "left-grid" >
              {this.state.isGroupOwner && <BillCard 
              onChangeCurrentBill={this.state.currentBill} 
              onChangeAuthUser={this.state.authUser}
              onChangeIsGroupOwner={this.state.isGroupOwner} />}

              <Pie/>
          </div>
          <div className = "right-grid">
            {isGroupMember && 
            <>
            <h1> Your Group: {this.state.groupName && this.state.groupName}</h1>
            {isGroupMember && !isGroupOwner && <BillCard 
              onChangeCurrentBill={this.state.currentBill} 
              onChangeAuthUser={this.state.authUser}
              onChangeIsGroupOwner={this.state.isGroupOwner} />}
            {isGroupOwner && <MyAccord onChangeCurrentBill={this.state.currentBill} />}       
            </>
            }
            {!isGroupMember &&
            <>
              <h1 style={{display: "block"}}>Please Create or Join a Group!</h1>
            </>
            }
            </div>

        </div>
    );
  };
};

const MyAccord = ({onChangeCurrentBill}) => {
  if(!onChangeCurrentBill) return <h2 style={{display: "block", textAlign: "center"}}>No Bills Yet</h2>;

  return (
    <>
      <Accordion defaultActiveKey = "0">
        <Card text="dark" border="light">
            <Card.Header>
                <Accordion.Toggle as={Button} variant= "link" eventKey="0">
                    <h1>Group Info</h1>
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body >
                    <MemberTable onChangeCurrentBill={onChangeCurrentBill}/>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
      </Accordion>
      <br />
    </>
  );
};

const BillCard = ({onChangeCurrentBill, onChangeAuthUser, onChangeIsGroupOwner}) => {
  //Only show card once the state has updated and if a current bill exists
  if(!onChangeCurrentBill || !onChangeAuthUser) return <></>;

  const billMembers = onChangeCurrentBill.group_members;
  const dueDate = onChangeCurrentBill.due_date;

  let amountDue = null;
  let paidStatus = false;

  for(let item in billMembers) {
    if(billMembers[item].uid === onChangeAuthUser.uid) {
      amountDue = billMembers[item].amount_owed;
      paidStatus = billMembers[item].paid_status;
    }
  }
  
  return (
      <Card className="mb-4" text="dark">
        <Card.Header>
          <p>Current Bill</p>
        </Card.Header>
        <Card.Body>
          <Card.Title><p>Due: {dueDate.toDate().toLocaleDateString()}</p></Card.Title>
          <Card.Text>
            Amount: ${amountDue}
          </Card.Text>
          {paidStatus ? <Paid /> : <NotPaid />}
        </Card.Body>
      </Card>
  );
};

const OutStandingBills = () => {
  return(
    <>
    {/* 0here */}



      <Card bg="light"  text="dark">
        <Card.Header >
            Outstanding Bills
        </Card.Header>
        <Card.Body>
            
          <Card.Title>
            Past Bills 
            <CheckIcon/>
          </Card.Title>
          {/* If good display only check CheckIcon. If outstanding bill display XIcon and then card Text displaying amount and date values for outstanding bill */}
          <br/>

          <Card.Title>
            Future Bills
            <XIcon/>
          </Card.Title>

          <Card.Text>
            Amount: $600
          </Card.Text>

          <Card.Text>
            Due: December 31, 2019
          </Card.Text>

        </Card.Body>
      </Card>
    </>
  );
};

const XIcon = () => {
  return(
    <img className="check" src= {RedX} alt="RedX" />
  );
};

const CheckIcon = () => {
  return(
    <img className="check" src= {GreenCheck} alt="Check" />
  );
};

const Pie = () => {
	return (
      <Card className = "bg-light" text="light" >
        <Card.Title className = "bg-dark" text="light">
        <p>On Time History</p>
        </Card.Title>
        <Card.Body>
          <PieChart/>
        </Card.Body>
      </Card>
	);
};

// const NotPaidFlex = () => {
//   return(
//     <div role = "alert" class = "fade alert alert-danger show position-relative">
//       Not Paid
//     </div>
//   );
// };

const NotPaid = () => {
  return(
    <Alert variant="danger">
      Not Paid
    </Alert>
  );
};

const Paid = () => {
  return(
    <Alert variant="success">
      Paid
    </Alert>
  );
};

const MemberTable = ({onChangeCurrentBill}) => {
  const billMembers = onChangeCurrentBill.group_members;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Room #</th>
          <th>Username</th>
          <th>Rent Amount $</th>
          <th>Payment Status</th>
        </tr>
      </thead>
      {billMembers && <tbody>{billMembers.map((item, key) => (
        <tr key={key}>
          <td>{key + 1}</td>
          <td>{item.username}</td>
          <td>{item.amount_owed}</td>
          <td>{item.paid_status ? <Paid /> : <NotPaid />}</td>
        </tr>
      ))
      }</tbody>}
    </Table>
  );
};

const Dashboard = compose(
  withFirebase,
  withAuthUserContext
)(DashboardBase);

export default Dashboard;
