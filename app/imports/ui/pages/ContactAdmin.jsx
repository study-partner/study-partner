import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Reports } from '../../api/report/Reports';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  subject: String,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the ContactAdmin page for filing a report. */
const ContactAdmin = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, subject, description } = data;
    const owner = Meteor.user().username;
    Reports.collection.insert(
      { firstName, lastName, subject, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3 page">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Contact Admin</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={6}><TextField name="firstName" showInlineError /></Col>
                  <Col xs={6}><TextField name="lastName" showInlineError /></Col>
                </Row>
                <Card.Text>Email: {Meteor.user().username}</Card.Text>
                <TextField name="subject" showInlineError />
                <LongTextField name="description" showInlineError />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactAdmin;
