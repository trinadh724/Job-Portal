import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {deleteJob, editJob} from '../../actions/jobs';
import moment from "moment";
import {Link} from 'react-router-dom';
// import deleteJob from '../../actions/jobs';


const TemplateRecruiter = ({jobs, deleteJob, editJob}) => {
    const code = jobs.map(({
            title,
            applications,
            positions,
            positionsfilled,
            applicationsapplied,
            deadline,
            skills,
            typeOfJob,
            duration,
            salary,
            date_of_posting,
            _id
        }) => <table className='table' key={_id}>
        {title ? 
<Fragment>
    <tr>
        <th>Title</th>
        <td>{title}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}
{applications ? 
<Fragment>
    <tr>
        <th>Number of Applications</th>
        <td>{applicationsapplied}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}
{positions ? 
<Fragment>
    <tr>
        <th>Remaining number of positions</th>
        <td>{positions - positionsfilled}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}
{date_of_posting ? 
    <Fragment>
        <tr>
            <th>date of posting</th>
            <td>{moment(date_of_posting).format('LLL')}</td>
        </tr>
    </Fragment>
    : 
    <Fragment> </Fragment>}
    
{deadline ? 
<Fragment>
    <tr>
        <th>Deadline of application</th>
        <td>{moment(deadline).format('LLL')}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}
{salary ? 
<Fragment>
    <tr>
        <th>salary</th>
        <td>{salary}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}
{skills ? 
<Fragment>
    <tr>
        <th>skills</th>
        <td>{skills}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}

{typeOfJob ? 
<Fragment>
    <tr>
        <th>Type Of Jobs</th>
        <td>{typeOfJob}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}
{duration ? 
<Fragment>
    <tr>
        <th>duration</th>
        <td>{duration}</td>
    </tr>
</Fragment>
: 
<Fragment> </Fragment>}
    <tr>
    <td><Link to={`/viewapplication/${_id}`} className="btn btn-primary">View Applications</Link></td> 
    <td><button className='btn btn-danger' onClick={() => {deleteJob(_id) }}>Delete Job</button></td>
    {/* <td><Link className='btn btn-primary' to={`/editjob/${_id}`} >Edit Job</Link></td> */}
    </tr>
    
</table>)
    return (
        <Fragment>
            <h2>Jobs Posted by me</h2>
            <td><Link className='btn btn-success' to='/successjob' >View Employees who joined this recruiter</Link></td>
            {code}
        </Fragment>
    );
}

TemplateRecruiter.propTypes = {
    jobs: PropTypes.array.isRequired,
    deleteJob: PropTypes.func.isRequired,
    editJob: PropTypes.func.isRequired,
}

export default connect(null, {deleteJob, editJob})(TemplateRecruiter);
