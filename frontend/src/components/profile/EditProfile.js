import {connect} from 'react-redux';
import React, {useState, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {updateProfile, getUserProfile} from '../../actions/profile';
import { Applicant } from '../../actions/types';


const EditProfile = ({updateProfile, auth, profile: {profile, loading}, getUserProfile}) => {
    
    const [formData, setFormData] = useState({
        name: '',
        skills: '',
        who: '',
        contactnumber: '',
        bio: '',
        email: ''
    });
    const  {
        email,
        name,
        skills,
        who,
        contactnumber,
        bio
    } = formData;

      useEffect(() => {
        getUserProfile();
        setFormData({
          name: loading || !profile.name  ? '' : profile.name,
          skills: loading || !profile.skills  ? '' : profile.skills,
          who: loading || !profile.who  ? '' : profile.who,
          contactnumber: loading || !profile.contactnumber  ? '' : profile.contactnumber,
          bio: loading || !profile.bio  ? '' : profile.bio,
          email: loading || !profile.email  ? '' : profile.email,
        });
    },[loading, getUserProfile]);
    
    if(auth.loading || !auth.user || loading || !profile)
    {
      return (<Fragment>Loading...</Fragment>)
    }
    // setFormData({who: auth.who});
    const onChange = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setFormData({ ...formData, email: auth.user.email});
        updateProfile(formData, {who});
    };
    
    return (
        <Fragment>
        <h1>Edit Profile</h1>
      <p><i className="fas fa-user"></i> Edit your profile</p>
      <form onSubmit={e => onSubmit(e)}>
        
        <div className="form-group">
        <label for="nameid">Name</label>
          <input id="nameid" type="name" className="form-control" placeholder="*Name" name="name" value={name} onChange={e => onChange(e)} required/>
        </div>
        {auth.user.who === Applicant ? <Fragment>
          <div className="form-group">
        <label for="skillid">Skills</label>
          <input id="skillid" type="skills" className="form-control" placeholder="Skills" name="skills" value={skills} onChange={e => onChange(e)} />
        </div>  
        </Fragment>: 
        <Fragment>
          <div className="form-group">
        <label for="contactid">Contact Number</label>
          <input id="contactid" type="number" className="form-control" placeholder="*Mobile Number" name="contactnumber" value={contactnumber} onChange={e => onChange(e)} required/>
        </div>
        <div class="form-group">
      <label for="Textarea1">Bio</label>
      <textarea class="form-control" id="area1" rows="3" name="bio" value={bio} onChange={e => onChange(e)} required></textarea>
    </div>
        </Fragment>
        }
        <input type="submit" className="btn btn-primary" value="Update Profile" />
      </form>
      </Fragment>
    )
}

EditProfile.propTypes = {

    updateProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state =>({
    auth: state.authReducer,
    profile: state.profile,
});
export default connect(mapStateToProps, {updateProfile, getUserProfile})(EditProfile); 
