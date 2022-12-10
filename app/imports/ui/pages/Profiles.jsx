import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageIDs } from '../utilities/ids';
import { ProfilesHelpOthersClasses } from '../../api/profiles/ProfilesHelpOthersClasses';
import { ProfilesNeedHelpClasses } from '../../api/profiles/ProfilesNeedHelpClasses';

/* Returns the Profile and associated Sessions and HelpWithClasses associated with the passed user email. */
function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const needHelpClasses = _.pluck(ProfilesNeedHelpClasses.collection.find({ profile: email }).fetch(), 'needHelpClass');
  const helpOtherClasses = _.pluck(ProfilesHelpOthersClasses.collection.find({ profile: email }).fetch(), 'helpOthersClass');
  return _.extend({}, data, { needHelpClasses, helpOtherClasses });
}

/* Component for layout out a Profile Card. */
const MakeCard = ({ profile }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={profile.picture} width={50} />
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
        <Card.Subtitle><span className="date">{profile.title}</span></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {profile.bio}
        </Card.Text>
        <span>Can help with:</span>
        <ul>
          {profile.helpOtherClasses.map((helpOtherClasses) => <li>{helpOtherClasses}</li>)}
        </ul>
        <span>Need help with:</span>
        <ul>
          {profile.needHelpClasses.map((needHelpClasses) => <li>{needHelpClasses}</li>)}
        </ul>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.string,
    title: PropTypes.string,
    needHelpClasses: PropTypes.arrayOf(PropTypes.string),
    helpOtherClasses: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

/* Renders the Profile Collection as a set of Cards. */
const ProfilesPage = () => {

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(ProfilesNeedHelpClasses.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesHelpOthersClasses.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready(),
    };
  }, []);
  const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
  // There is a potential race condition. We might not be ready at this point.
  // Need to ensure that getProfileData doesn't throw an error on line 18.
  const profileData = emails.map(email => getProfileData(email));
  return ready ? (
    <Container id={PageIDs.profilesPage} className="page">
      <Row xs={1} md={2} lg={4} className="g-2">
        {profileData.map((profile, index) => <MakeCard key={index} profile={profile} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ProfilesPage;
