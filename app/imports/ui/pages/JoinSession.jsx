import React from 'react';
import { AutoForm, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import { addSessionMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { NeedHelpClasses } from '../../api/NeedHelpClasses/NeedHelpClasses';
import { ProfilesNeedHelpClasses } from '../../api/profiles/ProfilesNeedHelpClasses';
import { HelpOthersClasses } from '../../api/HelpOthersClasses/HelpOthersClasses';
import { ProfilesHelpOthersClasses } from '../../api/profiles/ProfilesHelpOthersClasses';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests, allProjects, allNeedHelpClasses, allHelpOthersClasses) => new SimpleSchema({
  course: { type: String, label: 'Courses', optional: true },
  time: { type: String, label: 'Time', optional: true },
  month: { type: String, label: 'Month', optional: true },
  day: { type: String, label: 'Day', optional: true },
  year: { type: String, label: 'Year', optional: true },

  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  bio: { type: String, label: 'Biographical statement', optional: true },
  title: { type: String, label: 'Class standing', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  needHelpClasses: { type: Array, label: 'Courses', optional: true },
  'needHelpClasses.$': { type: String, allowedValues: allNeedHelpClasses },
  helpOthersClasses: { type: Array, label: 'Classes you can help others with', optional: true },
  'helpOthersClasses.$': { type: String, allowedValues: allHelpOthersClasses },
  interests: { type: Array, label: 'Classes you need help with', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  projects: { type: Array, label: 'Classes you can help others with', optional: true },
  'projects.$': { type: String, allowedValues: allProjects },
});

/* Renders the YourProfile Page: what appears after the user logs in. */
const YourProfile = () => {

  /* On submit, insert the data. */
  const submit = (data) => {
    Meteor.call(addSessionMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Session updated successfully', 'success');
      }
    });
  };

  const { ready, email } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Interests.userPublicationName);
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub4 = Meteor.subscribe(ProfilesProjects.userPublicationName);
    const sub5 = Meteor.subscribe(Projects.userPublicationName);
    const sub6 = Meteor.subscribe(NeedHelpClasses.userPublicationName);
    const sub7 = Meteor.subscribe(ProfilesNeedHelpClasses.userPublicationName);
    const sub8 = Meteor.subscribe(HelpOthersClasses.userPublicationName);
    const sub9 = Meteor.subscribe(ProfilesHelpOthersClasses.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready() && sub7.ready() && sub8.ready() && sub9.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
  const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
  const allProjects = _.pluck(Projects.collection.find().fetch(), 'name');
  const allNeedHelpClasses = _.pluck(NeedHelpClasses.collection.find().fetch(), 'name');
  const allHelpOthersClasses = _.pluck(HelpOthersClasses.collection.find().fetch(), 'name');
  const formSchema = makeSchema(allInterests, allProjects, allNeedHelpClasses, allHelpOthersClasses);
  const bridge = new SimpleSchema2Bridge(formSchema);
  // Now create the model with all the user information.
  const projects = _.pluck(ProfilesProjects.collection.find({ profile: email }).fetch(), 'project');
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const needHelpClasses = _.pluck(ProfilesNeedHelpClasses.collection.find({ profile: email }).fetch(), 'needHelpClass');
  const helpOthersClasses = _.pluck(ProfilesHelpOthersClasses.collection.find({ profile: email }).fetch(), 'helpOthersClass');
  const profile = Profiles.collection.findOne({ email });
  const model = _.extend({}, profile, { interests, projects, needHelpClasses, helpOthersClasses });
  return ready ? (
    <Container id={PageIDs.homePage} className="justify-content-center page">
      <Col>
        <Col className="justify-content-center text-center"><h2>Join Sessions</h2></Col>
        <AutoForm model={model} schema={bridge} onSubmit={data => submit(data)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.sessionCourse} name="course" showInlineError placeholder="Course" disabled /></Col>
                <Col xs={4}><TextField id={ComponentIDs.sessionTime} name="time" showInlineError placeholder="Time" disabled /></Col>
              </Row>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.sessionMonth} name="month" showInlineError placeholder="Month" disabled /></Col>
                <Col xs={4}><TextField id={ComponentIDs.sessionDay} name="day" showInlineError placeholder="Day" disabled /></Col>
                <Col xs={4}><TextField id={ComponentIDs.sessionYear} name="year" showInlineError placeholder="Year" disabled /></Col>
              </Row>
              <SubmitField id={ComponentIDs.sessionSubmit} className="justify-content-center text-center" value="Join Session" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
    </Container>
  ) : <LoadingSpinner />;
};

export default YourProfile;
