import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageIDs } from '../utilities/ids';
import { Sessions } from '../../api/sessions/Sessions';
import { JoinSessions } from '../../api/profiles/JoinSessions';
import Profiles from './Profiles';
import MakeJoinSessionCard from '../components/MakeJoinSessionCard';

/* Gets the Project data as well as Profiles and HelpWithClasses associated with the passed Project name. */
function getSessionData(id) {
  const data = Sessions.collection.findOne({ id });
  // const evenId = _.pluck(Sessions.collection.find({ session: id }).fetch(), 'id');
  const startDate = _.pluck(Sessions.collection.find({ session: id }).fetch(), 'star');
  const endDate = _.pluck(Sessions.collection.find({ session: id }).fetch(), 'end');
  const profiles = _.pluck(JoinSessions.collection.find({ session: id }).fetch(), 'profile');
  // console.log(profiles);
  const profilePictures = profiles.map(profile => Profiles.collection.findOne({ email: profile })?.picture);
  return _.extend({}, data, { id, startDate, endDate, attendees: profilePictures });
}

/* Renders the Project Collection as a set of Cards. */
const JoinSession = () => {
  const { _id } = useParams();

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Sessions.userPublicationName);
    // Get the document
    return {
      ready: sub1.ready(),
    };
  }, [_id]);

  const sessions = _.pluck(Sessions.collection.find().fetch(), 'id');
  const sessionData = sessions.map(session => getSessionData(session));

  return ready ? (
    <div className="join-session-background">
      <Container id={PageIDs.joinSessionPage} className="page">
        <Col className="text-center">
          <br />
          <h1 className="text-center text-outline" style={{ color: 'white' }}>Join Session</h1>
          <br />
        </Col>
        <Row xs={1} md={2} lg={4} className="g-2">
          {sessionData.map((session, index) => <MakeJoinSessionCard key={index} session={session} />)}
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />;
};

export default JoinSession;
