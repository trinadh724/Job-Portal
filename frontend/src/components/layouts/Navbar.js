import React, { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutuser} from '../../actions/auth';
import {getUserProfile} from '../../actions/profile'
import PropTypes from 'prop-types';
import {getApplications} from '../../actions/applications';


const Navbar = ({logoutuser, auth, getApplications, getUserProfile}) => {
    const {userVerified, loading, user} = auth;
    const userNotLoggedIn = (
      <Fragment>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </Fragment>
    );
    const userLoggedIn = (
      <Fragment>
        {user && user.who === 'Applicant' ? <li><Link onClick = {getApplications} to="/myapplication">My Applications</Link></li>: <Fragment/>}
        {user && user.who === 'Recruiter' ? <li><Link  to="/successjob">Employees</Link></li>: <Fragment/>}
      <li><Link onClick = {getUserProfile} to="/profile">Profile</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link onClick = {logoutuser} to="/"> <i className="fa fa-sign-out"></i> Logout</Link></li>
      </Fragment>
    );
    return (
    <nav className="navbar navbar-dark bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      <ul>
        {
          (!loading && userVerified) ? (<Fragment>{userLoggedIn}</Fragment>) : (<Fragment>{userNotLoggedIn}</Fragment>) 
        }
      </ul>
    </nav>
    )
};

Navbar.propTypes = {
  logoutuser: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
  getApplications: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, {logoutuser, getApplications, getUserProfile})(Navbar);