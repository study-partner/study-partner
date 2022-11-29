import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Report from '../components/Report';
import { Reports } from '../../api/report/Reports';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ViewReports = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, reports } = useTracker(() => {
    // Notes that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Reports.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Contact documents
    const reportItems = Reports.collection.find({}).fetch();
    return {
      reports: reportItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>View Reports</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {reports.map((report) => (<Col key={report._id}><Report report={report} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ViewReports;
