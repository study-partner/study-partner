import React from 'react';
import { AutoForm, DateField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { addSessionMethod } from '../../startup/both/Methods';
import { ComponentIDs, PageIDs } from '../utilities/ids';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = new SimpleSchema({
  text: String,
  startDate: String,
  duration: Number,
});
// TODO: change idCount to the number of sessions
let idCount = 2;
const getNextID = () => {
  idCount += 1;
  return idCount;
};
const bridge = new SimpleSchema2Bridge(makeSchema);
/* Renders the YourProfile Page: what appears after the user logs in. */
const AddSession = () => {

  /* On submit, insert the data. */
  const submit = (data, formRef) => {
    const doc = data;
    doc.id = getNextID();

    const alert = (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Session added successfully', 'success').then(() => formRef.reset());
      }
    };
    Meteor.call(addSessionMethod, doc, alert);
  };
  /* Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  let fRef = null;
  return (
    <Container id={PageIDs.addSessionPage} className="justify-content-center page">
      <Col>
        <Col className="justify-content-center text-center">
          <h2>Create Session</h2>
        </Col>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={6}><TextField id={ComponentIDs.addSessionFormCourse} name="text" label="Task" showInlineError placeholder="task" /></Col>
                <Col xs={4}><DateField id={ComponentIDs.addSessionStartDate} name="startDate" min={new Date()} label="Date" showInlineError /></Col>
                <Col xs={2}><NumField id={ComponentIDs.addSessionDuration} name="duration" min={1} label="Duration (minutes)" step={30} showInlineError /></Col>
              </Row>
              <SubmitField id={ComponentIDs.addSessionFormSubmit} className="justify-content-center text-center" value="Schedule Session" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
    </Container>
  );
};

export default AddSession;
