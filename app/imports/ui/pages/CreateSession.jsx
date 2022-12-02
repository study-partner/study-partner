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
  course: String,
  time: String,
  month: String,
  day: String,
  year: String,
});
const bridge = new SimpleSchema2Bridge(makeSchema);
/* Renders the YourProfile Page: what appears after the user logs in. */
const AddSession = () => {

  /* On submit, insert the data. */
  const submit = (data, formRef) => {
    Meteor.call(addSessionMethod, data, (error) => {
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
                <Col xs={4}><TextField id={ComponentIDs.addSessionFormCourse} name="course" showInlineError placeholder="Course" /></Col>
                <Col xs={4}><TextField id={ComponentIDs.addSessionFormTime} name="time" showInlineError placeholder="Time" /></Col>
              </Row>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.addSessionFormMonth} name="month" showInlineError placeholder="Month" /></Col>
                <Col xs={4}><TextField id={ComponentIDs.addSessionFormDay} name="day" showInlineError placeholder="Day" /></Col>
                <Col xs={4}><TextField id={ComponentIDs.addSessionFormYear} name="year" showInlineError placeholder="Year" /></Col>
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
