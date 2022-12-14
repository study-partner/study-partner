import React from 'react';
import { AutoForm, DateField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { addSessionMethod } from '../../startup/both/Methods';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { Sessions } from '../../api/sessions/Sessions';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = new SimpleSchema({
  text: String,
  startDate: String,
  duration: Number,
  picture: {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(makeSchema);
/* Renders the AddSession Page: what appears after the user logs in. */
const AddSession = () => {

  /* On submit, insert the data. */
  const submit = (data, formRef) => {
    const doc = data;
    doc.id = _.size(Sessions.collection.find().fetch(), 'id');

    const alert = (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        const pointDoc = Profiles.collection.findOne({ email: Meteor.user().username });
        let newPoint = pointDoc.point;
        if (newPoint == null || newPoint === '') {
          newPoint = 10;
        } else {
          newPoint += 10;
        }
        Profiles.collection.update(pointDoc._id, { $set: { point: newPoint } });
        swal('Success', 'Session added successfully', 'success').then(() => formRef.reset());
      }
    };
    Meteor.call(addSessionMethod, doc, alert);
  };

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Sessions.userPublicationName);
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready(),
    };
  }, []);

  /* Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  let fRef = null;
  return ready ? (
    <div className="create-session-background">
      <Container id={PageIDs.addSessionPage} className="justify-content-center page">
        <Col>
          <Col className="justify-content-center text-center" style={{ color: 'white' }}>
            <br />
            <h1>Create Session</h1>
            <br />
          </Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={6}><TextField id={ComponentIDs.addSessionFormCourse} name="text" label="Course" showInlineError placeholder="Course" /></Col>
                  <Col xs={4}><DateField id={ComponentIDs.addSessionDateAndTime} name="startDate" min={new Date()} label="Date" showInlineError /></Col>
                  <Col xs={2}><NumField id={ComponentIDs.addSessionDuration} name="duration" min={1} label="Duration (minutes)" step={30} showInlineError /></Col>
                  <Col><TextField name="picture" showInlineError placeholder="Session picture URL(optional)" /></Col>
                </Row>
                <SubmitField id={ComponentIDs.addSessionFormSubmit} className="justify-content-center text-center" value="Schedule Session" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Container>
    </div>
  ) : <LoadingSpinner />;
};

export default AddSession;
