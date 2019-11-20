import React from 'react';
import '../styles/RootStyle.css'
import './Home.jsx';
import { Table, Accordion, Card, Alert, AccordionCollapse } from 'react-bootstrap';
import PieChart from './PieChart.js';

export default class NoPath extends React.Component {  
  render() {
    return (
        <div className = "main-grid" >
          <div className = "left-grid" >
              
              <BillCard/>
              <Pie/>
          </div>
          <div className = "right-grid">
            <h1> Your Group: KACCC</h1>
            <MyAccord/>
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
      <Card bg="light"  text="dark">
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
      </Card>
      <br />
    </>
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
