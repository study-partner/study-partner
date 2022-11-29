import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ComponentIDs } from '../utilities/ids';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    loggedIn: !!Meteor.user(),
  }), []);
  const userOrAdmin = Roles.userIsInRole(Meteor.userId(), 'admin') ? 'admin' : 'user';
  const menuStyle = { marginBottom: '0px' };
  return (
    <Navbar expand="lg" style={menuStyle} className={userOrAdmin}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}><Image src="/images/study-partner-logo.png" width={50} style={{ marginBottom: 3 }} />Study Partner</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto justify-content-start">
            {currentUser ? (
              [
                <Nav.Link as={NavLink} to="/yourprofile" key="yourProfile">Profile</Nav.Link>,
                <Nav.Link as={NavLink} to="/profiles" key="viewProfiles">Profiles</Nav.Link>,
                <Nav.Link as={NavLink} to="" key="calendar">Calendar</Nav.Link>,
                <Nav.Link as={NavLink} to="" key="leaderboard">Leaderboard</Nav.Link>,
              ]
            ) : ''}
            {currentUser && !Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link as={NavLink} to="/contact-admin" key="contact-admin">Contact Admin</Nav.Link>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link as={NavLink} to="/view-reports" key="admin">View Report</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={ComponentIDs.loginDropdown} title="Login" key="login">
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignIn} as={NavLink} to="/signin" key="signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignUp} as={NavLink} to="/signup" key="signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={ComponentIDs.currentUserDropdown} title={currentUser}>
                <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOut} as={NavLink} to="/signout" key="signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
