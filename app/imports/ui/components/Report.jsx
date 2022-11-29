import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/** Renders a single report file in card */
const Report = ({ report }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{report.firstName} {report.lastName}</Card.Title>
      <Card.Text>{report.owner}</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Text>{report.subject}</Card.Text>
      <Card.Text>{report.description}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Report.propTypes = {
  report: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    subject: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default Report;
