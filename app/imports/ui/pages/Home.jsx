import React from 'react';
import { Container, Col, Row, Image, Card, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { PageIDs } from '../utilities/ids';

/* Renders the Home Page: what appears after the user logs in. */
const Home = () => (
  <div id={PageIDs.homePage}>
    <div className={Roles.userIsInRole(Meteor.userId(), 'admin') ? 'landing-color-background-admin' : 'landing-color-background'}>
      <Container className="text-center">
        <h1 style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }}>
          Welcome to Study Partner!
        </h1>
        <h4 style={{ paddingBottom: '20px', color: 'white' }}>
          Let&apos;s work together.
        </h4>
      </Container>
    </div>
    <div className="landing-white-background">
      <Container className="justify-content-center text-center">
        <h2 style={Roles.userIsInRole(Meteor.userId(), 'admin') ? { color: '#F08000' } : { color: '#6495ED' }}>
          Please make sure your profile is up to date.
        </h2>
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
        <h2 style={{ paddingBottom: '20px', color: 'white' }}>
          Schedule a study session or join one from the calendar.
        </h2>
        <Row md={1} lg={2} style={Roles.userIsInRole(Meteor.userId(), 'admin') ? { color: '#F08000' } : { color: '#6495ED' }}>
          <Col xs={6}>
            <Card style={{ paddingTop: '20px', marginBottom: '20px' }}>
              <Card.Title><h3>Schedule a future study session</h3></Card.Title>
              <Card.Img variant="top" src="/images/add-project-page.png" />
              <Card.Body>
                <Card.Text>
                  Create a study session event that will be added to the event calendar.
                </Card.Text>
                <Button variant="primary"><Card.Link href="#" style={{ color: 'white' }}>Click here to get started</Card.Link></Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6}>
            <Card style={{ paddingTop: '20px', marginBottom: '20px' }}>
              <Card.Title><h3>I need help right now!</h3></Card.Title>
              <Card.Img variant="top" src="/images/projects-page.png" />
              <Card.Body>
                <Card.Text>
                  Notify all other members of your course to form a group right now.
                </Card.Text>
                <Button variant="primary"><Card.Link href="#" style={{ color: 'white' }}>Click here to get started</Card.Link></Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-white-background text-center">
      <h2 style={Roles.userIsInRole(Meteor.userId(), 'admin') ? { color: '#F08000' } : { color: '#6495ED' }}>
        Earning points by... Feel free to take a look at Leaderboard rankings.
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

export default Home;
