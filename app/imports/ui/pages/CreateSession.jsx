import React from 'react';
import { AutoForm, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { addSessionMethod } from '../../startup/both/Methods';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = new SimpleSchema({
  text: String,
  startD: String,
  startT: String,
  endD: String,
  endT: String,
});
let idCount = 0;
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
    console.log(doc);
    Meteor.call(addSessionMethod, doc, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Project added successfully', 'success').then(() => formRef.reset());
      }
    });
  };
  /* Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  let fRef = null;
  return (
    <Container id={PageIDs.addSessionPage} className="justify-content-center" style={pageStyle}>
      <Col>
        <Col className="justify-content-center text-center"><h2>Create Sessions</h2></Col>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.addSessionFormCourse} name="text" label="Course" showInlineError placeholder="Course" /></Col>
              </Row>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.addSessionStartdate} name="startD" label="Start Date" placeholder="YYYY-MM-DD" /></Col>
                <Col xs={4}><TextField id={ComponentIDs.addSessionStarttime} name="startT" label="Start Time" showInlineError placeholder="XX:XX:XX" /></Col>
              </Row>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.addSessionEnddate} name="endD" label="End Date" showInlineError placeholder="YYYY-MM-DD" /></Col>
                <Col xs={4}><TextField id={ComponentIDs.addSessionEndtime} name="endT" label="End Time" showInlineError placeholder="XX:XX:XX" /></Col>
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
