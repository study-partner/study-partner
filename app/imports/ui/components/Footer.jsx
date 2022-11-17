import React from 'react';
import { Col, Container } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';

/* The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    loggedIn: !!Meteor.user(),
  }), []);
  const isAdmin = currentUser && Roles.userIsInRole(Meteor.userId(), 'admin');
  const footerClass = isAdmin ? 'footer mt-auto py-3 admin' : 'footer mt-auto py-3 user';

  return (
    <footer className={footerClass}>
      <Container>
        <Col className="text-center" style={{ color: 'white' }}>
          The Study Partner Project
          {' '}
          <br />
          University of Hawaii
          <br />
          Honolulu, HI 96822
          {' '}
          <br />
          <a style={{ color: 'white' }} href="https://study-partner.github.io/">https://study-partner.github.io/</a>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
