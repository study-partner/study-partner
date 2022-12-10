import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageIDs } from '../utilities/ids';
import { Point } from '../../api/point/Point';
import PointItem from '../components/PointItem';
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
    // Get the Stuff documents
    const pointItems = Profiles.collection.find({}).fetch();
    return {
      points: pointItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PageIDs.leaderboardPage} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Leaderboard</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Point</th>
              </tr>
            </thead>
            <tbody>
              {points.map((point) => <PointItem point={point} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default LeaderBoard;
