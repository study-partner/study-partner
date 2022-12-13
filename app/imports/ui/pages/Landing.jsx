import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Link } from 'react-router-dom';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage} className="page">
    <div className="landing-main">
      <div className="landing-main-left">
        <h1 className="align-content-center justify-content-center" style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>Schedule Study Sessions</h1>
        <h2 style={{ fontSize: '1.2rem' }}>Organize study sessions around a course, assignment, or project topic</h2>
        <Link to="/signin"><button type="button">Sign in</button></Link>
        <Link to="/signup"><button type="button">Sign up</button></Link>
      </div>
      <div className="landing-main-right">
        <Image src="/images/charlesdeluvio-Lks7vei-eAg-unsplash.jpg" className="img-fluid landing-main-image" />
      </div>
    </div>
    <div className={Roles.userIsInRole(Meteor.userId(), 'admin') ? 'landing-color-background-admin' : 'landing-color-background'}>
      <Container className="justify-content-center text-center">
        <h2 style={{ color: 'white' }}>Start by making your profile...</h2>
        <Row>
          <Col>
            <Image src="/images/profile.png" width={600} className="page-pics" />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-white-background">
      <Container className="justify-content-center text-center">
        <h2 style={{ color: 'black' }}>...then join or create a session</h2>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image src="/images/join-session.png" width={500} className="page-pics" />
          </Col>
          <Col xs={6}>
            <Image src="/images/create-session.png" width={500} className="page-pics" />
          </Col>
        </Row>
      </Container>
    </div>
    <div className={Roles.userIsInRole(Meteor.userId(), 'admin') ? 'landing-color-background-admin text-center' : 'landing-color-background text-center'}>
      <h2 style={{ color: 'white' }}>
        Use leaderboard to track your achievement and contact admin if you have any question
      </h2>
      <Container>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image src="/images/leaderboard.png" width={500} className="page-pics" />
          </Col>
          <Col xs={6}>
            <Image src="/images/contact-admin.png" width={500} className="page-pics" />
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default Landing;
