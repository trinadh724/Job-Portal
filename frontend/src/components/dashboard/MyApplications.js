import React , {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobs';
import { Applicant } from '../../actions/types';
import {Link} from 'react-router-dom';
import {loaduserusingtoken} from '../../actions/auth';
import {getApplications} from '../../actions/applications';
import DisplayApplications from './DisplayApplications';

const MyApplications = ({ auth,applications, getApplications, loaduserusingtoken}) => {
    
    useEffect(()=> {
        loaduserusingtoken();
        getApplications();
      }, []);
    return (<Fragment>
            {auth.loading || !auth.user || applications.loading ? <Fragment>Loading...</Fragment> : 
    <Fragment>

        <h1>My Applications</h1>
            <DisplayApplications applicationjobs={applications.applications}/>
    </Fragment>}
    </Fragment>);
};

MyApplications.propTypes = {
    getJobs: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired,
    loaduserusingtoken: PropTypes.func.isRequired,
    applications: PropTypes.object.isRequired,
    getApplications: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    jobs: state.jobs,
    applications: state.applications, 
});

export default connect(mapStateToProps, { getJobs ,loaduserusingtoken, getApplications})(MyApplications);
