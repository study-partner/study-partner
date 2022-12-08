import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageIDs } from '../utilities/ids';
import { Sessions } from '../../api/sessions/Sessions';
import { JoinSessions } from '../../api/profiles/JoinSessions';
import { Profiles } from '../../api/profiles/Profiles';

/* Gets the Project data as well as Profiles and HelpWithClasses associated with the passed Project name. */
function getSessionData(text) {
  const data = Sessions.collection.findOne({ text });
  const evenId = _.pluck(Sessions.collection.find({ session: text }).fetch(), 'id');
  const startDate = _.pluck(Sessions.collection.find({ session: text }).fetch(), 'star');
  const endDate = _.pluck(Sessions.collection.find({ session: text }).fetch(), 'end');
  const profiles = _.pluck(JoinSessions.collection.find({ session: text }).fetch(), 'profile');
  const profilePictures = profiles.map(profile => Profiles.collection.findOne({ email: profile })?.picture);
  return _.extend({}, data, { evenId, text, startDate, endDate, participants: profilePictures });
}

/* Component for layout out a Project Card. */
const MakeCard = ({ session }) => (
  <Col>
    <Card className="h-100">
      <Card.Body>
        <Card.Img src={session.picture} width={50} />
        <Card.Title style={{ marginTop: '0px' }}>{session.text}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          ID: <span className="date">{session.id}</span>
        </Card.Subtitle>
        <hr size="10" color="#0D6EFD" className="hrstyle" />
        <Row>
          <Col>
            <h5>START DATE:</h5> {session.start.slice(0, 10)}
            <br />
            <br />
            <h5>START TIME:</h5> {session.start.slice(11, 20)}
            <br />
            <br />
          </Col>
          <Col>
            <h5>END DATE:</h5> {session.end.slice(0, 10)}
            <br />
            <br />
            <h5>END DATE:</h5> {session.end.slice(11, 20)}
          </Col>
        </Row>
        <h5>Attendees:</h5> {session.attendees}
      </Card.Body>
      <Card.Body>
        <Row>
          <Col><Button variant="primary">Join</Button></Col>
          <Col><Button variant="primary">Attendees</Button></Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    attendees: PropTypes.arrayOf(PropTypes.string),
    picture: PropTypes.string,
  }).isRequired,
};

/* Renders the Project Collection as a set of Cards. */
const JoinSession = () => {
  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Sessions.userPublicationName);
    return {
      ready: sub1.ready(),
    };
  }, []);
  const sessions = _.pluck(Sessions.collection.find().fetch(), 'text');
  const sessionData = sessions.map(session => getSessionData(session));
  return ready ? (
    <Container id={PageIDs.joinSessionsPage}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {sessionData.map((session, index) => <MakeCard key={index} session={session} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default JoinSession;
