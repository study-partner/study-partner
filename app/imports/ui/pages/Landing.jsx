import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className={Roles.userIsInRole(Meteor.userId(), 'admin') ? 'landing-color-background-admin' : 'landing-color-background'}>
      <Container className="text-center">
        <h1 style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }}>
          Welcome to Study Partner
        </h1>
        <h3 style={{ paddingBottom: '50px', color: 'white' }}>
          Schdule face-to-face study sessions with your ICS classmates!
        </h3>
      </Container>
    </div>
    <div className="landing-white-background">
      <Container className="justify-content-center text-center">

        <h3 style={{ paddingBottom: '30px', color: '#376551' }}>
          <em>Study Partner is an application for UHM ICS students to self-organize face-to-face study groups around a course and/or specific homework or project topic.</em>
        </h3>
        <h2 style={Roles.userIsInRole(Meteor.userId(), 'admin') ? { color: '#F08000' } : { color: '#6495ED' }}>Start by making your profile....</h2>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image src="/images/home-page.png" width={500} />
          </Col>
          <Col xs={6}>
            <Image src="/images/profiles-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
    <div className={Roles.userIsInRole(Meteor.userId(), 'admin') ? 'landing-color-background-admin' : 'landing-color-background'}>
      <Container className="justify-content-center text-center">
        <h2 style={{ color: 'white' }}>...then go to calendar to join or create a session</h2>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image src="/images/add-project-page.png" width={500} />
          </Col>
          <Col xs={6}>
            <Image src="/images/projects-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-white-background text-center">
      <h2 style={Roles.userIsInRole(Meteor.userId(), 'admin') ? { color: '#F08000' } : { color: '#6495ED' }}>
        Use leaderboard to track your achivement and contact admin if you have any question
      </h2>
      <Container>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image src="/images/interests-page.png" width={500} />
          </Col>
          <Col xs={6}>
            <Image src="/images/filter-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default Landing;
