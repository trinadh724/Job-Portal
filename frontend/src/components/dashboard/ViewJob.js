import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { loadJobWithId, editJob } from '../../actions/jobs';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import DisplayRecruiterSide from './DisplayRecruiterSide';
import {getApplicationsById} from '../../actions/applications';


const ViewJob = ({match, jobs: {cjob, loading}, editJob, loadJobWithId, applicationjobs, getApplicationsById}) => {
    const id = match.params.id;
    useEffect(()=>{
        loadJobWithId(id);
        getApplicationsById(id);
    },[]);
    
    if(!cjob || loading || applicationjobs.loading){
      return <Fragment>Loading.....</Fragment>
    }
    const {
        title,
            applications,
            positions,
            deadline,
            skills,
            typeOfJob,
            duration,
            salary,
            date_of_posting
    } = cjob;
    return (
        <Fragment>
        <h1>Job</h1>
        <table className='table'>
    <tr>
        <th>Title</th>
        <td>{title}</td>
    </tr> 
    <tr>
        <th>Number of Applications</th>
        <td>{applications}</td>
    </tr>

    <tr>
        <th>Number of positions</th>
        <td>{positions}</td>
    </tr>
        <tr>
            <th>date of posting</th>
            <td>{moment(date_of_posting).format('LLL')}</td>
        </tr>
    <tr>
        <th>Deadline of application</th>
        <td>{moment(deadline).format('LLL')}</td>
    </tr>
    <tr>
        <th>salary</th>
        <td>{salary}</td>
    </tr>
    <tr>
        <th>skills</th>
        <td>{skills}</td>
    </tr>
    <tr>
        <th>Type Of Jobs</th>
        <td>{typeOfJob}</td>
    </tr>
    <tr>
        <th>duration</th>
        <td>{duration}</td>
    </tr>
    <tr>
    <td><Link className='btn btn-primary' to={`/editjob/${id}`} >Edit Job</Link></td>
    </tr>
    
</table>
        <h2>Applications For this Job</h2>

        <DisplayRecruiterSide applicationjobs={applicationjobs.applications}/>
        </Fragment>
    )
}

ViewJob.propTypes = {
    jobs: PropTypes.object.isRequired,
    editJob: PropTypes.func.isRequired,
    loadJobWithId: PropTypes.func.isRequired,
    getApplicationsById: PropTypes.func.isRequired,
    applicationjobs: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    jobs: state.jobs,
    applicationjobs: state.applications
});

export default connect(mapStateToProps, {editJob, loadJobWithId, getApplicationsById})(ViewJob);
