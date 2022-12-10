import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import Profiles from '../pages/Profiles';
import Projects from '../pages/Projects';
import Interests from '../pages/Interests';
import Home from '../pages/Home';
import Filter from '../pages/Filter';
import AddProject from '../pages/AddProject';
import YourProfile from '../pages/YourProfile';
import ContactAdmin from '../pages/ContactAdmin';
import ViewReports from '../pages/ViewReports';
import CreateSession from '../pages/CreateSession';
import JoinSession from '../pages/JoinSession';
import Calendar from '../pages/Calendar';
import LeaderBoard from '../pages/LeaderBoard';

function isLogged() {
  return Meteor.userId() !== null;
}

/* Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        <Route exact path="/" element={isLogged() ? <Navigate to="/home" /> : <Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/interests" element={<Interests />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/yourprofile" element={<ProtectedRoute><YourProfile /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><LeaderBoard /></ProtectedRoute>} />
        <Route path="/contact-admin" element={<ProtectedRoute><ContactAdmin /></ProtectedRoute>} />
        <Route path="/view-reports" element={<ProtectedRoute><ViewReports /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/filter" element={<ProtectedRoute><Filter /></ProtectedRoute>} />
        <Route path="/addproject" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
        <Route path="/createsession" element={<ProtectedRoute><CreateSession /></ProtectedRoute>} />
        <Route path="/joinsession" element={<ProtectedRoute><JoinSession /></ProtectedRoute>} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => (isLogged() ? children : <Navigate to="/signin" />);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Home />,
};

export default App;
