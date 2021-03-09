import React from 'react';
import {Fragment , useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { loginuser } from '../../actions/auth';
import PropTypes from 'prop-types';

export const Login = ({loginuser, isUserVerified, user}) => {

    const [logindata, setlogindata] = useState({
        email: '',
        password: ''
      });
    const {email, password} = logindata;

    const onChange = (e) => {
      // console.log(e.target.value);
      setlogindata({ ...logindata, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      loginuser({email, password});
    }  
    if(isUserVerified && user)
    {
      return (
        <Redirect to='/dashboard'></Redirect>
      )
    }
    return (
        <Fragment>
        <h1>Sign In</h1>
      <p><i className="fas fa-user"></i> Sign into  Your Account</p>
      <form onSubmit={e => onSubmit(e)}>
        
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)}/>
        </div>
        <div className="form-group">
          <input
          className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
            value={password} 
            onChange={e => onChange(e)}
            />
        </div>
        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/Register">Sign Up</Link>
      </p>
        </Fragment>
    )
}

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  isUserVerified: PropTypes.bool,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  isUserVerified: state.authReducer.userVerified,
  user: state.authReducer.user
});

export default connect(mapStateToProps, {loginuser})(Login);