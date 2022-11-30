import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router-dom';

const SignOut = () => {
  Meteor.logout();
  return (
    <Navigate to="/" />
  );
};

export default SignOut;
