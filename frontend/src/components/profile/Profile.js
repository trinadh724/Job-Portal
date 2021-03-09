import React , {Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import TemplateForEducation from './TemplateForEducation';
import {connect} from 'react-redux';
import {getUserProfile,getEducation} from '../../actions/profile';
import { loaduserusingtoken} from '../../actions/auth.js';
import { Applicant } from '../../actions/types';
import TemplateForProfile from './TemplateForProfile';


const Profile = ({profile: {profile, loading},auth,getUserProfile,getEducation}) => {
  useEffect(()=> {
    getUserProfile();
  }, [getUserProfile]);
  if((loading || !profile) || (auth.loading || !auth.user))
  {
    return <Fragment>loading...</Fragment>
  }
  // console.log(profile);
  // console.log(auth);
  const {who} = auth.user; 
    return (
        <div className="dash-buttons">
          <TemplateForProfile profile={profile}/>
        <Link to="/editprofile" className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i>Edit Profile   </Link>
          {who === Applicant ? <Fragment>
            <Link to="/addeducation" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i>Add Education</Link>
          
          <TemplateForEducation educations={profile.education}/>
          </Fragment>: <Fragment/>}
      </div>
    )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  getEducation: PropTypes.func.isRequired,
  loaduserusingtoken : PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.authReducer
});

export default connect(mapStateToProps,{getUserProfile, getEducation, loaduserusingtoken})(Profile);
