import React from 'react';
import {Fragment , useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {setalert} from '../../actions/alert';
import { registeruser } from '../../actions/auth';
import PropTypes from 'prop-types';


export const Register = ({setalert, registeruser, isUserVerified, user}) => {

    const [registerdata, setregisterdata] = useState({
      who: '',
      name: '',
      email: '',
      password: '',
      password2: ''
    });
    const {who , name , email, password, password2} = registerdata;

    const onChange = (e) => {
      // console.log(e.target.value);
      setregisterdata({ ...registerdata, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      if(password !== password2)
      {
        setalert("Passwords donot match", 'danger');
        // console.log('Hi');
      }
      else if (who !== 'Applicant' && who !== 'Recruiter')
      {
        setalert("Please select your role", 'danger');
        // console.log("Nothing is selected");
      }
      else{
        registeruser({name, email, who, password});
      }
    }
    if(isUserVerified && user)
    {
      return (
        <Redirect to='/profile'></Redirect>
      );
    }
    return (
        <Fragment>
        <h1>Sign Up</h1>
      <p><i className="fas fa-user"></i> Create Your Account</p>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select class="custom-select" name="who" value={who} onChange={e => onChange(e)} required>
       <option selected>Which option best describes you</option>
        <option value="Applicant">Applicant</option>
        <option value="Recruiter">Recruiter</option>
</select>
</div>
        
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
        </div>
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
            value={password} onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
          className="form-control"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            required
            value={password2} onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/Login">Sign In</Link>
      </p>
        </Fragment>
    )
}

Register.propTypes = {
  setalert: PropTypes.func.isRequired,
  registeruser: PropTypes.func.isRequired,
  isUserVerified: PropTypes.bool,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isUserVerified: state.authReducer.userVerified,
  user: state.authReducer.user
});


export default connect(mapStateToProps, {setalert, registeruser})(Register);