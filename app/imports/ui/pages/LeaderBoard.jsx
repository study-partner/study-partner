import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageIDs } from '../utilities/ids';
import { Profiles } from '../../api/profiles/Profiles';

/* A simple static component to render the top 5. */
const LeaderBoard = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, points } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Profiles documents
    const pointItems = Profiles.collection.find({}).fetch().sort((a, b) => parseFloat(b.point) - parseFloat(a.point));
    return {
      points: pointItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PageIDs.leaderboardPage} className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Leaderboard</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            <Col key={points[0]._id}>
              <Card className="h-100">
                <Card.Header>
                  <Card.Title>#1 {points[0].firstName} {points[0].lastName}</Card.Title>
                  <Card.Text>Points: {points[0].point}</Card.Text>
                  <Image src={points[0].picture} width={75} />
                </Card.Header>
                <Card.Body>
                  <Card.Text>Biographical Statement:</Card.Text>
                  <Card.Text>{points[0].bio}</Card.Text>
                  <Card.Subtitle>Email: {points[0].email}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col key={points[1]._id}>
              <Card className="h-100">
                <Card.Header>
                  <Card.Title>#2 {points[1].firstName} {points[1].lastName}</Card.Title>
                  <Card.Text>Points: {points[1].point}</Card.Text>
                  <Image src={points[1].picture} width={75} />
                </Card.Header>
                <Card.Body>
                  <Card.Text>Biographical Statement:</Card.Text>
                  <Card.Text>{points[1].bio}</Card.Text>
                  <Card.Subtitle>Email: {points[1].email}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col key={points[2]._id}>
              <Card className="h-100">
                <Card.Header>
                  <Card.Title>#3 {points[2].firstName} {points[2].lastName}</Card.Title>
                  <Card.Text>Points: {points[2].point}</Card.Text>
                  <Image src={points[2].picture} width={75} />
                </Card.Header>
                <Card.Body>
                  <Card.Text>Biographical Statement:</Card.Text>
                  <Card.Text>{points[2].bio}</Card.Text>
                  <Card.Subtitle>Email: {points[2].email}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

    </Container>
  ) : <LoadingSpinner />);
};

export default LeaderBoard;
