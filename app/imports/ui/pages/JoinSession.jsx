import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageIDs } from '../utilities/ids';
import { Sessions } from '../../api/sessions/Sessions';

/* Component for layout out a Profile Card. */
const MakeCard = ({ session }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Card.Title>{session.text}</Card.Title>
      </Card.Header>
      <Card.Body>
        <div>Start: {session.start}</div>
        <div>End: {session.end}</div>
        <div>Attendees: {session.attendees}</div>
        <Button>Join Session</Button>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  session: PropTypes.shape({
    text: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    attendees: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

/* Renders the Profile Collection as a set of Cards. */
const JoinSessionPage = () => {

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Sessions.userPublicationName);
    return {
      ready: sub1.ready(),
    };
  }, []);

  // This returns an array of all session objects
  const sessions = Sessions.collection.find().fetch();
  return ready ? (
    <Container id={PageIDs.profilesPage} className="page">
      <Row xs={1} md={2} lg={4} className="g-2">
        {sessions.map((session) => <MakeCard session={session} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default JoinSessionPage;
