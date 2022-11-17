import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* Renders the Home Page: what appears after the user logs in. */
const Home = () => (
  <div id={PageIDs.homePage}>
    <div className="landing-color-background">
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
        <h2 style={{ color: '#3C1874' }}>
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
    <div className="landing-color-background">
      <Container className="justify-content-center text-center">
        <h2 style={{ color: 'white' }}>
          Schedule a study session or join one from the calendar.
        </h2>
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
      <h2 style={{ color: '#3C1874' }}>
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
