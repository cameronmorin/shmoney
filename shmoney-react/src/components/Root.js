import React from 'react';
import '../styles/RootStyle.css'
import './Home.jsx';
import { Table, Accordion, Card, Button, Modal, InputGroup, FormControl, ListGroup, Alert, AccordionCollapse } from 'react-bootstrap';
import { CardBody } from 'react-bootstrap/Card';

export default class NoPath extends React.Component {  
  render() {
    return (
    <>
        <Accordion defaultActiveKey = "1">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Past Payments
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <p> Hello! I'm the body </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Bills Due
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></Card.Body>
                </Accordion.Collapse>
              </Card>
        </Accordion>
    </>
    )
  }
}
// <div className = "PageWrap" style = {{height: '100vh'}}>
        //     <div className = "TempNavBar">

        //     </div>
        //     <div className = "HomeBody" >
        //         <div className = "Msg">
        //             Welcome to $hmoney, the new and easy way to split payments between friends
        //         </div>
        //     </div>
        //     <div className = "HomeButtons">
        //         <div className = "SignInButton">
        //             <div className = "Button">
        //                 <Link to='/signin'>Sign In</Link>
        //             </div> 
        //         </div>
        //         <div className = "OrDisplay">
        //             <div className = "Msg">
        //                 Or
        //             </div>
        //         </div>
        //         <div className = "SignUpButton:">
        //             <div className = "Button">
        //                 <Link to='/signup'>Sign Up</Link>
        //             </div>
        //         </div>
        //     </div>
        // </div>