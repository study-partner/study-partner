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
    <div className="leader-board-background">
      <Container id={PageIDs.leaderboardPage} className="py-3 page">
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h1 style={{ color: 'white' }}>Leaderboard</h1>
              <h2 style={{ color: 'white' }}> &lt;Ranking of Top 3 Study Partners&gt;</h2>
              <br />
            </Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              <Col key={points[0]._id}>
                <Card className="h-100 text-center" style={{ opacity: 0.9 }}>
                  <Card.Header>
                    <h3>#1 {points[0].firstName} {points[0].lastName}</h3>
                    <h4>Points: {points[0].point}</h4>
                    <Image src={points[0].picture} className="profile-picture-size" />
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>Biographical Statement:</Card.Text>
                    <Card.Text>{points[0].bio}</Card.Text>
                    <Card.Subtitle>Email: {points[0].email}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col key={points[1]._id}>
                <Card className="h-100 text-center" style={{ opacity: 0.9 }}>
                  <Card.Header>
                    <h3>#2 {points[1].firstName} {points[1].lastName}</h3>
                    <h4>Points: {points[1].point}</h4>
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
                <Card className="h-100 text-center" style={{ opacity: 0.9 }}>
                  <Card.Header>
                    <h3>#3 {points[2].firstName} {points[2].lastName}</h3>
                    <h4>Points: {points[2].point}</h4>
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
    </div>
  ) : <LoadingSpinner />);
};

export default LeaderBoard;
