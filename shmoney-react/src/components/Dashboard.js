import React from 'react';
import '../styles/RootStyle.css'
import './Home.jsx';
import RedX from '../images/red_x.svg';
import GreenCheck from '../images/checked.svg';

import { Table, Accordion, Card, Alert, AccordionCollapse } from 'react-bootstrap';
import PieChart from './PieChart.js';
import { compose } from 'recompose';
import { withFirebase } from './firebase';
import { withAuthUserContext } from './session';

class DashboardBase extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      groupName: null
    }
  }
  componentDidMount() {
    this.props.firebase.getHouseGroupData().then(result => {
      this.setState({
        groupName: result.group_name
      });
    }).catch(error => {
      console.log(error);
    });
  }
  render() {
    return (
        <div className = "main-grid" >
          <div className = "left-grid" >
              
              <OutStandingBills/>
              <br/>
              <Pie/>
          </div>
          <div className = "right-grid">
            <h1> Your Group: {this.state.groupName && this.state.groupName}</h1>
              <BillCard/>             
          </div>

        </div>
    );
  };
};

const MyAccord = () => {
  return (
    <>
      <Accordion defaultActiveKey = "0">
        <Card text="dark" border="light">
            <Card.Header>
                <Accordion.Toggle as={Card.Header}  eventKey="0">
                    Group Info
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body >
                    <MemberTable/>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
      </Accordion>
      <br />
    </>
  );
};

const BillCard = () => {
  return (
    <>
      <div class = "card h-75 bg-light text-dark" > 
        <Card.Header >
            Current Bill
        </Card.Header>
        <Card.Body>
          <Card.Title>Due: November 31, 2019</Card.Title>
          <Card.Text>
            Amount: $400
          </Card.Text>
          <NotPaid/>
        </Card.Body>
      </div>
      <br />
    </>
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
		<>
      <Card className = "bg-light" text="light" >
        <Card.Title className = "bg-dark" text="light">
          On Time History
        </Card.Title>
        <Card.Body>
          <PieChart/>
        </Card.Body>
      </Card>
      <br />  
		</>
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
const MemberTable = () => {
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
      <tbody>
        <tr>
          <td>1</td>
          <td>Cameron</td>
          <td>800</td>
          <td><Paid/></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Chris</td>
          <td>800</td>
          <td><NotPaid/></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Cole</td>
          <td>400</td>
          <td><NotPaid/></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Alex</td>
          <td>400</td>
          <td><NotPaid/></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Kelton</td>
          <td>650</td>
          <td><Paid/></td>
        </tr>
      </tbody>
    </Table>
  );
};

const Dashboard = compose(
  withFirebase,
  withAuthUserContext
)(DashboardBase);

export default Dashboard;
