import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { Reports } from '../../api/report/Reports';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { Point } from '../../api/point/Point';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: { type: String, label: 'First Name' },
  lastName: { type: String, label: 'Last Name' },
  email: { type: String, optional: true },
  subject: String,
  description: { type: String, label: 'Message' },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the ContactAdmin page for filing a report. */
const ContactAdmin = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, email, subject, description } = data;
    const owner = Meteor.user().username;

    Reports.collection.insert(
      { firstName, lastName, email, subject, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          const pointDoc = Point.collection.findOne({ owner: Meteor.user().username });
          let newPoint = 0;
          if (pointDoc == null) {
            Point.collection.insert({ firstName, lastName, newPoint, owner });
          } else {
            newPoint = pointDoc.point + 10;
            Point.collection.update(pointDoc._id, { $set: { point: newPoint } });
          }
          swal('Success', 'Report is filed successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub = Meteor.subscribe(Point.userPublicationName);
    return {
      ready: sub.ready(),
    };
  }, []);

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return ready ? (
    <Container id={PageIDs.contactAdminPage} className="py-3 page">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Contact Admin</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={6}><TextField id={ComponentIDs.contactAdminFormFirstName} name="firstName" showInlineError /></Col>
                  <Col xs={6}><TextField id={ComponentIDs.contactAdminFormLastName} name="lastName" showInlineError /></Col>
                </Row>
                <TextField name="email" placeholder={Meteor.user().username} showInlineError disabled />
                <TextField name="subject" id={ComponentIDs.contactAdminFormSubject} showInlineError />
                <LongTextField name="description" id={ComponentIDs.contactAdminFormDescription} showInlineError />
                <SubmitField id={ComponentIDs.contactAdminFormSubmit} value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ContactAdmin;
