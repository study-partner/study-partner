import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const PointItem = ({ point }) => (
  <tr>
    <td>{point.firstName}</td>
    <td>{point.lastName}</td>
    <td>{point.point}</td>
  </tr>
);

// Require a document to be passed to this component.
PointItem.propTypes = {
  point: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    point: PropTypes.number,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default PointItem;
