import React from 'react'
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Landing = ({userVerified}) => {
    if(userVerified)
    {
      // console.log('hihihihih');
      return (<Redirect to='/dashboard'/>)
    }
    return (
      <div className="dash-buttons">
      <Link to="/login" className="btn btn-light"
        ><i className="fa fa-sign-in text-primary"></i>Sign In</Link>
      <Link to="/register" className="btn btn-light"
        ><i className=" text-primary"></i>Sign Up</Link>
    </div>
    )
}
Landing.propTypes ={
  userVerified: PropTypes.bool,
};

const mapStateToProps = (State) => ({
  userVerified: State.authReducer.userVerified
});

export default connect(mapStateToProps)(Landing);