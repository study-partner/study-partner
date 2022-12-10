import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
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
function getSessionData(text) {
  const data = Sessions.collection.findOne({ text });
  const evenId = _.pluck(Sessions.collection.find({ session: text }).fetch(), 'id');
  const startDate = _.pluck(Sessions.collection.find({ session: text }).fetch(), 'star');
  const endDate = _.pluck(Sessions.collection.find({ session: text }).fetch(), 'end');
  const profiles = _.pluck(JoinSessions.collection.find({ session: text }).fetch(), 'profile');
  const profilePictures = profiles.map(profile => Profiles.collection.findOne({ email: profile })?.picture);
  return _.extend({}, data, { evenId, text, startDate, endDate, attendees: profilePictures });
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

  const sessions = _.pluck(Sessions.collection.find().fetch(), 'text');
  const sessionData = sessions.map(session => getSessionData(session));

  return ready ? (
    <Container id={PageIDs.joinSessionPage} className="page">
      <Row xs={1} md={2} lg={4} className="g-2">
        {sessionData.map((session, index) => <MakeJoinSessionCard key={index} session={session} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default JoinSession;
