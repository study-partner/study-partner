import React from 'react';
import { AutoForm, TextField, LongTextField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profiles/Profiles';
import { updateProfileMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { NeedHelpClasses } from '../../api/NeedHelpClasses/NeedHelpClasses';
import { ProfilesNeedHelpClasses } from '../../api/profiles/ProfilesNeedHelpClasses';
import { HelpOthersClasses } from '../../api/HelpOthersClasses/HelpOthersClasses';
import { ProfilesHelpOthersClasses } from '../../api/profiles/ProfilesHelpOthersClasses';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allNeedHelpClasses, allHelpOthersClasses) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  bio: { type: String, label: 'Biographical statement', optional: true },
  title: { type: String, label: 'Title', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  needHelpClasses: { type: Array, label: 'Classes you need help with', optional: true },
  'needHelpClasses.$': { type: String, allowedValues: allNeedHelpClasses },
  helpOthersClasses: { type: Array, label: 'Classes you can help others with', optional: true },
  'helpOthersClasses.$': { type: String, allowedValues: allHelpOthersClasses },
});

/* Renders the YourProfile Page: what appears after the user logs in. */
const YourProfile = () => {

  /* On submit, insert the data. */
  const submit = (data) => {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  };

  const { ready, email } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(NeedHelpClasses.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesNeedHelpClasses.userPublicationName);
    const sub4 = Meteor.subscribe(HelpOthersClasses.userPublicationName);
    const sub5 = Meteor.subscribe(ProfilesHelpOthersClasses.userPublicationName);
    // delete sub6 and sub7 later
    /* const sub6 = Meteor.subscribe(Sessions.userPublicationName);
    const sub7 = Meteor.subscribe(JoinSessions.userPublicationName); */
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  // Create the form schema for uniforms. Need to determine all classes for muliselect list.
  const allNeedHelpClasses = _.pluck(NeedHelpClasses.collection.find().fetch(), 'name');
  const allHelpOthersClasses = _.pluck(HelpOthersClasses.collection.find().fetch(), 'name');
  const formSchema = makeSchema(allNeedHelpClasses, allHelpOthersClasses);
  const bridge = new SimpleSchema2Bridge(formSchema);
  // Now create the model with all the user information.
  const needHelpClasses = _.pluck(ProfilesNeedHelpClasses.collection.find({ profile: email }).fetch(), 'needHelpClass');
  const helpOthersClasses = _.pluck(ProfilesHelpOthersClasses.collection.find({ profile: email }).fetch(), 'helpOthersClass');
  const profile = Profiles.collection.findOne({ email });
  const model = _.extend({}, profile, { needHelpClasses, helpOthersClasses });
  return ready ? (
    <Container id={PageIDs.yourProfilePage} className="justify-content-center page">
      <Col>
        <Col className="justify-content-center text-center">
          <h2>Your Profile</h2>
          <br />
        </Col>
        <AutoForm model={model} schema={bridge} onSubmit={data => submit(data)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.yourProfileFormFirstName} name="firstName" showInlineError placeholder="First Name" /></Col>
                <Col xs={4}><TextField id={ComponentIDs.yourProfileFormLastName} name="lastName" showInlineError placeholder="Last Name" /></Col>
                <Col xs={4}><TextField name="email" showInlineError placeholder={Meteor.user().username} disabled /></Col>
              </Row>
              <LongTextField id={ComponentIDs.yourProfileFormBio} name="bio" placeholder="Write a little bit about yourself." />
              <Row>
                <Col xs={6}><TextField name="title" showInlineError placeholder="Title" /></Col>
                <Col xs={6}><TextField name="picture" showInlineError placeholder="URL to picture" /></Col>
              </Row>
              <Row>
                <Col xs={6}><SelectField name="needHelpClasses" showInlineError multiple /></Col>
                <Col xs={6}><SelectField name="helpOthersClasses" showInlineError multiple /></Col>
              </Row>
              <SubmitField id={ComponentIDs.yourProfileFormSubmit} value="Update" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
    </Container>
  ) : <LoadingSpinner />;
};

export default YourProfile;
