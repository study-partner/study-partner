import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';

/* The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer>
    <Container>
      <Row>
        <Col sm={2} className="d-flex justify-content-center">
          <Image src="https://manoa.hawaii.edu/speakers/wp-content/uploads/logo-1.png" width={140} />
        </Col>
        <Col sm={5}>
          <h2>The Study Partner Project</h2>
          <p>Study Partner is an application for UHM ICS students to self-organize face-to-face study groups around a course and/or specific homework or project topic.</p>
        </Col>
      </Row>
      <br />
      <Row>
        <hr />
        <a href="https://study-partner.github.io/">View project home page</a>
      </Row>
    </Container>
  </footer>
);

export default Footer;
