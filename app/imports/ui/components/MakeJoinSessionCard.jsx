import React from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Row } from 'react-bootstrap';
import { AutoForm, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Sessions } from '../../api/sessions/Sessions';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = new SimpleSchema({});

const bridge = new SimpleSchema2Bridge(makeSchema);

/* Component for layout out a Project Card. */
const MakeJoinSessionCard = ({ session }) => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { userEmail, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const email = Meteor.user().username;
    return {
      userEmail: email,
      ready: rdy,
    };
  }, []);

  // On successful submit, insert the data.
  const submit = () => {
    const document = Sessions.collection.find(session._id).fetch();
    const attendeesArray = document[0].attendees;
    // check if user is already joined the session, if not add user email in attendee array
    if (attendeesArray.includes(userEmail) === false) {
      attendeesArray.push(userEmail);
      Sessions.collection.update(
        session._id,
        {
          $set: { attendees: attendeesArray },
        },
        (error) => (error ?
          swal('Error', error.message, 'error') :
          swal('Success', 'Item updated successfully', 'success')),
      );
    } else {
      swal('Error', 'You have already joined this session', 'error');
    }
  };

  // temporial solution for session.attendee array not display
  const document = Sessions.collection.find(session._id).fetch();
  const attendeesArray = document[0].attendees;

  return ready ? (
    <Col>
      <Card className="h-100">
        <Card.Body>
          <Card.Img src={session.picture} width={50} />
          <Card.Title style={{ marginTop: '0px' }}>{session.text}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            ID: <span className="date">{session.id}</span>
          </Card.Subtitle>
          <hr size="10" color="#0D6EFD" className="hrstyle" />
          <Row>
            <Col>
              <h5>START DATE:</h5> {session.start.slice(0, 10)}
              <br />
              <br />
              <h5>START TIME:</h5> {session.start.slice(11, 20)}
              <br />
              <br />
            </Col>
            <Col>
              <h5>END DATE:</h5> {session.end.slice(0, 10)}
              <br />
              <br />
              <h5>END DATE:</h5> {session.end.slice(11, 20)}
            </Col>
          </Row>
          <h5>Attendees: </h5>
          {attendeesArray.map((item) => <li>{item}</li>)}
        </Card.Body>
        <Card.Body className="justify-content-center">
          <Row>
            <AutoForm schema={bridge} onClick={submit}>
              <SubmitField style={{ display: 'flex', justifyContent: 'center' }} value="Join" />
            </AutoForm>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  ) : <LoadingSpinner />;
};

MakeJoinSessionCard.propTypes = {
  session: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.number,
    text: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    picture: PropTypes.string,
    attendees: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default MakeJoinSessionCard;
