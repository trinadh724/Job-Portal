import React , {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobs';
import { Applicant } from '../../actions/types';
import {Link} from 'react-router-dom';
import {loaduserusingtoken} from '../../actions/auth';
import TemplateRecruiter from './TemplateRecruiter';
import TemplateApplicant from './TemplateApplicant';
import {getApplications} from '../../actions/applications';


const Dashboard = ({ getJobs, auth, jobs: {jobs, loading, cjob},applications, getApplications, loaduserusingtoken}) => {
    
    useEffect(()=> {
        loaduserusingtoken();
        getJobs();
        getApplications();
      }, []);
    return (<Fragment>
            {loading || auth.loading || !auth.user || cjob!=null || (auth.user.who === 'Recruiter' && !jobs) || applications.loading ? <Fragment>Loading...</Fragment> : 
    <Fragment>

        <h1>Dashboard</h1>
            {auth.user && auth.user.who === Applicant ? 
            <Fragment>
                <h3> 
                    <i className="fas fa-user"></i>
                    Applicants Dashboard
                </h3>
                <TemplateApplicant jobs={jobs}/>
            </Fragment>
            :
            <Fragment>
                <h3>
                    <i className="fas fa-user"></i>
                    Recruiter Dashborad
                </h3>
                <Link to="/addjob" className="btn btn-light"
                    ><i className="fas fa-user-circle text-primary"></i>Add New Job </Link>
                <TemplateRecruiter jobs={jobs}/>
            </Fragment>
            }
    </Fragment>}
    </Fragment>);
};

Dashboard.propTypes = {
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

export default connect(mapStateToProps, { getJobs ,loaduserusingtoken, getApplications})(Dashboard);
